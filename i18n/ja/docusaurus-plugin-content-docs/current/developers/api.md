---
title: Video Controls Plus の API
sidebar_label: API
description: 自分の Video Controls Plus ライブラリーを扱う REST API。リクエスト、ページ分け、エラー、上限、各対象の curl 例を説明します。
last_update:
  date: 2026-11-21
---

# Video Controls Plus API

**API は[アクセスキー](./access-keys.md)を使い、HTTPS 経由で自分のライブラリーを読み書きします。** すべてのアドレスは次で始まります。

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

機械可読の仕様は OpenAPI 3.1 の <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>、Markdown 版は <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a> にあります。どちらもキーなしで読めます。

以下の例では接続先とキーをシェル変数に入れます。

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## リクエストの認証 {#signing-requests}

毎回キーをベアラートークンとして送り、本文は JSON にします。

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

接続済みアシスタントのトークンも使えます。ウェブサイトのログイン情報だけでは利用できず、API は `401` とともにアクセスキーかアシスタントのトークンを求めます。リクエストは自分の権限で動作します。データベースが行ごとに権限を判定するため、ウェブサイトで開けない他人のデータをキーで取得することはできません。

## 応答の形式 {#what-comes-back}

一件の項目：

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

一覧：

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

失敗：

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

時刻は ISO 8601、ID は以下で例外を示すもの以外 UUID です。個人データを含む応答はキャッシュされません。

## エラー {#errors}

| 状態 | `code` | 原因 |
|---|---|---|
| 400 | `invalid_request` | フィールド、絞り込み、並べ替え、カーソルが無効。`details.issues` に各項目が入ります。 |
| 401 | `invalid_token` | キーがない、誤り、期限切れ、削除済み。 |
| 403 | `scope_required` | 必要な権限がない。`details.scope` に権限名が入ります。 |
| 404 | `not_found` | このキーでそのアドレスに項目がない。他人の項目も存在しない項目と同じ応答です。 |
| 405 | `method_not_allowed` | 対象がその操作を許可しない。例：視聴履歴の変更。 |
| 409 | `conflict` | 既に存在するか、製品の規則で拒否された。理由はメッセージに入ります。 |
| 413 | `payload_too_large` | 本文が 65,536 バイトを超えた。 |
| 429 | `rate_limited` | リクエストが多すぎる。リセット時刻まで待ってください。 |
| 500 | `internal` | サーバー側のエラー。`correlation_id` を添えてお問い合わせください。 |

## 一覧のページ分け {#pages-of-results}

一覧は初期状態で 20 件を返します。`limit` は 1～50 に指定できます。続きがある場合、`meta.next_cursor` を次のリクエストの `cursor` に入れ、絞り込みと並べ替えは同じにします。カーソルは 15 分間、作成元のクエリでだけ使えます。`next_cursor` が `null` なら終わりです。

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**絞り込み**は `<field>.<operator>` 形式のクエリーパラメーターです。下記の対象ごとに許可されたものだけを使えます。`eq` は一致、`lte` はその時刻以前、`cs` はコンマ区切りのすべてのタグを含むことを意味します。**並べ替え**は `sort=<field>` で、先頭の `-` は新しい順または大きい順です。各対象で最初に記した値が既定です。

## リクエスト数の上限 {#rate-limits}

キーごとに毎分 120 件です。全キーとアシスタントを合算した一日の上限は Free が 5,000 件、Pro が 50,000 件、Team は各メンバー 100,000 件で、UTC の午前 0 時にリセットされます。すべての応答に、先に到達するほうの制限について `RateLimit-Limit`、`RateLimit-Remaining`、`RateLimit-Reset`（秒）が付きます。`429` には `Retry-After` も付きます。

## 削除 {#removing}

`DELETE` には対象の削除権限が必要です。アクセスキーならすぐ削除し、本文なしの `204` を返します。アシスタントのトークンではまだ削除しません。本人がウェブサイトで開いて承認するための、10 分間有効なリンクを `202` で返します。

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

次に同期するとき、拡張機能も各ブラウザーから対象を削除します。

## 自分のライブラリー {#your-library}

以下の各対象は、特記がなければ一覧の `GET /<part>` と単一項目の `GET /<part>/{id}` に対応します。`POST /<part>` は作成、`PATCH /<part>/{id}` は送ったフィールドの変更、`DELETE /<part>/{id}` は削除です。設定可能と記載のないフィールドは表示だけで、書き込めません。

これらの対象で動画を示すのは、サイトを表す `platform`（`youtube`、`netflix`、`linkedin` など）、そのサイトの動画 ID `video_id`、動画ページの `video_url`、`video_title` の四つです。

### ブックマーク {#bookmarks}

動画内で保存した時刻、ラベル、メモ、色です。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、作成、変更、削除 |
| 設定可能 | `video_id`、`video_url`、`label`、`position_seconds`（開始からの秒数）は必須。`platform`、`video_title`、`note`、`color`、`tags`、`folder` は任意。 |
| 絞り込み | `platform.eq`、`video_id.eq`、`tags.cs` |
| 並べ替え | `-created_at` |
| 権限 | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

動画の時刻は拡張機能と同様、ブックマークの保存時に決まります。

### メモ {#notes}

動画内の時刻に書いた文章、分類、タグです。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、作成、変更、削除 |
| 設定可能 | `video_id`、`video_url`、`content` は必須。`position_seconds`、`platform`、`video_title`、`category`（`important`、`question`、`summary`、`action`、`custom`）、`custom_category_name`、`color`、`tags` は任意。 |
| 絞り込み | `platform.eq`、`video_id.eq` |
| 並べ替え | `-created_at` |
| 権限 | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### コレクションと動画 {#collections}

`collections` は自分の動画コレクションで、更新の新しい順です。`collection_videos` はその中の動画で、拡張機能と同様に追加・削除でき、変更はできません。

| 項目 | `collections` | `collection_videos` |
|---|---|---|
| 操作 | 一覧、取得、作成、変更、削除 | 一覧、取得、作成、削除 |
| 設定可能 | `name` は必須。`description`、`is_public` は任意。 | `collection_id`、`video_id`、`video_url` は必須。`platform`、`video_title`、`thumbnail`、`duration_seconds` は任意。 |
| 絞り込み | | `collection_id.eq` |
| 並べ替え | `-updated_at` | `-added_at` |
| 権限 | `collections` | `collections` |

公開コレクションはリンクを知る人が開けます。`collection_id` には自分のコレクションを指定します。

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### フラッシュカード {#flashcards}

動画から作った表面、裏面、タグ、復習期限です。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、作成、変更、削除 |
| 設定可能 | `video_id`、`video_url`、`front`、`back` は必須。`position_seconds`、`platform`、`video_title`、`tags`、復習予定を示す `ease_factor`（1.3～10）、`interval_days`、`repetitions`、`next_review_at`、`last_reviewed_at` は任意。 |
| 絞り込み | `platform.eq`、`video_id.eq`、`tags.cs`、`next_review_at.lte` |
| 並べ替え | `next_review_at`、`-created_at` |
| 権限 | `flashcards` |

新しいカードの復習期限は現在です。拡張機能と同様、復習予定の変更を復習の記録とします。今日の終わりまでに復習するカード：

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### 学習経路と動画 {#learning-paths}

`learning_paths` は更新の新しい順に並ぶ学習経路です。`path_videos` は経路内の順番付き動画と完了状態です。

| 項目 | `learning_paths` | `path_videos` |
|---|---|---|
| 操作 | 一覧、取得、作成、変更、削除 | 一覧、取得、作成、変更、削除 |
| 設定可能 | `title` は必須。`description`、`is_public`、`estimated_minutes` は任意。 | `path_id`、`video_id`、`video_url` は必須。`platform`、`video_title`、`video_thumbnail`、`video_duration_seconds`、`position`、`is_completed`、`notes` は任意。 |
| 表示のみ | 拡張機能が計算する `actual_minutes`、`last_accessed_at` | |
| 絞り込み | | `path_id.eq` |
| 並べ替え | `-updated_at` | `position`、`-created_at` |
| 権限 | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### 視聴履歴 {#watch-history}

視聴履歴がオンのときに再生した動画、停止位置、視聴時間です。追加できるのは拡張機能だけです。API は読み取りと削除に対応し、変更はできません。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、削除 |
| 表示 | 動画の各フィールド、`video_thumbnail`、`video_duration_seconds`、`channel_name`、`last_position_seconds`、`watch_count`、`total_watch_seconds`、`first_watched_at`、`last_watched_at` |
| 絞り込み | `platform.eq`、`video_id.eq` |
| 並べ替え | `-last_watched_at` |
| 権限 | `history`（読み取り・削除） |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### あとで見る {#watch-later}

優先度とメモを付けて自分の順番に並べた一覧です。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、作成、変更、削除 |
| 設定可能 | `video_id`、`video_url` は必須。`platform`、`video_title`、`video_thumbnail`、`video_duration_seconds`、`channel_name`、`position`、`priority`（`high`、`normal`、`low`）、`notes` は任意。 |
| 並べ替え | `position`、`-added_at` |
| 権限 | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### 文字起こし {#transcripts}

`transcripts` は保存した文字起こしを言語・形式とともに新しい順で返し、本文を含まないため一覧が小さくなります。`transcript_texts` は同じ ID で本文と時刻付き行を取得、または新規保存します。

| 項目 | `transcripts` | `transcript_texts` |
|---|---|---|
| 操作 | 一覧、取得、削除 | 取得、作成 |
| 設定可能 | | `video_id`、`video_url`、`content` は必須。`platform`、`video_title`、`language`、`language_code`、`is_auto_generated`、`format`（`srt`、`vtt`、`txt`、`json`）、`segments` は任意。 |
| 表示 | 動画の各フィールド、`language`、`language_code`、`is_auto_generated`、`format`、`file_size`、`downloaded_at` | 左記に `content`、`segments` を追加 |
| 並べ替え | `-downloaded_at` | |
| 権限 | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

リクエスト本文は最大 65,536 バイトです。それより長い文字起こしは外部から保存できません。

### スクリーンショット {#screenshots}

動画の時刻と画像サイズを含む保存フレームです。読み取り専用で、削除は拡張機能で行います。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得 |
| 表示 | 動画の各フィールド、`position_seconds`、`image_url`、`format`（`png`、`jpeg`、`webp`）、`width`、`height`、`created_at` |
| 並べ替え | `-created_at` |
| 権限 | `screenshots`（読み取り） |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### 設定とショートカット {#settings}

同期済みの拡張機能設定とショートカットです。項目は一件で、ID はアカウントの ID です。`settings` と `keyboard_bindings` は拡張機能が保存する形のオブジェクトです。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、作成、変更 |
| 設定可能 | `settings`、`keyboard_bindings` |
| 表示 | `settings_updated_at`、`keyboard_bindings_updated_at`、`updated_at` |
| 権限 | `settings`（読み取り・変更） |

最初の同期前は一覧が空で、以後は一件です。ブラウザー間の同期と同様、保存時には新しいほうのコピーを保持します。

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### 端末 {#devices}

拡張機能を接続したブラウザーです。追加は拡張機能の接続時だけです。ここでは名前の変更と削除ができ、削除するとそのブラウザーの拡張機能がログアウトします。

| 項目 | 内容 |
|---|---|
| 操作 | 一覧、取得、変更、削除 |
| 設定可能 | `device_name` |
| 表示 | `device_id`、`browser`、`platform`、`extension_version`、`last_seen_at`、`created_at` |
| 並べ替え | `-last_seen_at` |
| 権限 | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## 共有部分は読み取り専用 {#shared-read-only}

他人も関わるため、キーの権限にかかわらず API は読み取りだけを許可します。Webhook イベントも送られません。

| 対象 | 内容 | 絞り込み | 並べ替え | 権限 |
|---|---|---|---|---|
| `watch_parties` | 主催・参加した共同視聴。動画、`is_host`、開始・終了予定・実際の終了時刻。招待用コードは含みません。 | | `-created_at` | `parties:read` |
| `party_members` | 各共同視聴の参加人数と参加時刻。`is_you` は自分を示します。名前、写真、アカウントは含みません。`id` は参加記録で、人の ID ではありません。 | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | 共有されたサイトのプレーヤー修正。承認済みのものと審査中の自分のものを `is_yours` 付きで表示し、投稿者名は出しません。 | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | 公開の要望一覧。タイトル、説明、分類、状態、投票数、`is_yours`。投稿者名は出しません。 | | `-created_at`、`-upvotes` | `requests:read` |
| `request_votes` | 自分の投票。賛成は `1`、反対は `-1`。`id` は対象の要望 ID です。 | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## プランと利用状況 {#your-plan-and-use}

`GET /account` はプラン、一日の AI 実行枠と今日の回数、クラウド保存容量と使用量、`other_apps` にある[プラン表](./index.md#limits-on-each-plan)の四つの上限と `requestsToday` を一件返します。どのキーでも、追加の権限選択なしで読めます。

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## API が提供しないもの {#what-the-api-never-serves}

フィールドは許可リスト方式です。このページにない列はデータベースから返されません。[アクセスできない内容](./index.md#what-it-never-reaches)に加え、拡張機能固有の同期キー、スクリーンショットの背後にある保存ファイルの記録、設定を最後に保存した端末、視聴履歴内の個別の視聴回も返しません。カレンダーフィードはありません。

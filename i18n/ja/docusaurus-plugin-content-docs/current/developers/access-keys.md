---
title: アクセスキー
description: Video Controls Plus のアクセスキーを作り、アクセス範囲と有効期限を選び、後から表示・交換・削除する方法。
last_update:
  date: 2026-11-21
---

# アクセスキー

**アクセスキーは一つのツール専用のパスワードのようなものです。** 学習用シートの同期、スクリプト、スマートフォンのショートカットなどが、[API](./api.md)への各リクエストにキーを添えます。作成時に選んだ範囲の、自分のライブラリーだけにアクセスできます。キーは `vcp_pat_` と長いランダム文字列で構成されます。共有するものに入れないでください。

## キーを作る {#making-a-key}

1. ウェブサイトの**アカウント → [ほかのアプリ](https://vcpeai.aoneahsan.com/account/apps)**で**キーを作成**を押します。
2. 「学習シートの同期」など、使うツールが分かる**名前**を付けます。
3. アクセスさせる対象を選びます。各対象に**読み取り**、**変更**、**削除**の欄があります。少なくとも一つの対象で読み取りを選んでください。
4. **有効期限**を 30 日、90 日、365 日、**なし**から選びます。期限なしは読み取り専用のキーだけです。変更や削除ができるキーには必ず期限があります。
5. **キーを作成**を押してコピーします。再ログインせずに全文を見られるのは、このときだけです。

作成には、過去 10 分以内のログインと、[二段階ログイン](./two-step-sign-in.md)がオンの場合はそのコードが必要です。作成をメールでお知らせしますが、キーはメールに含めません。

## 各権限の範囲 {#what-each-tick-reaches}

選んだ項目はキーの権限になります。許可されていない操作を API に要求すると、必要な権限名を添えた `403 scope_required` が返ります。

| ウェブサイトの対象 | 読み取り | 変更 | 削除 | API での対象 |
|---|---|---|---|---|
| ブックマーク | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| メモ | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| コレクション | `collections:read` | `collections:write` | `collections:delete` | `collections`、`collection_videos` |
| フラッシュカード | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| 学習経路 | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`、`path_videos` |
| 視聴履歴 | `history:read` | | `history:delete` | `watch_history` |
| あとで見る | `later:read` | `later:write` | `later:delete` | `watch_later` |
| 文字起こし | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`、`transcript_texts` |
| スクリーンショット | `screenshots:read` | | | `screenshots` |
| 設定とショートカット | `settings:read` | `settings:write` | | `settings` |
| 端末 | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| 共同視聴 | `parties:read` | | | `watch_parties`、`party_members` |
| コミュニティのサイト修正 | `fixes:read` | | | `site_fixes` |
| 機能リクエスト | `requests:read` | | | `feature_requests`、`request_votes` |

空欄はウェブサイトが提供していない権限です。視聴履歴は変更不可、スクリーンショットと共有部分は読み取り専用、設定は削除不可です。どのキーも、選択なしでプランと今日の利用状況（`account:read`、API の `account` 部分）を読めます。

## キーを再表示する {#showing-a-key-again}

対象のキーで**再表示**を押します。開いたままのブラウザーから持ち出せないよう、過去 10 分以内のログインが必要です。二段階ログインがオンなら、そのコードも必要です。記憶済みブラウザーでもここではコードを求めます。キーは短時間だけ表示されます。コピーしたら閉じてください。

## キーを交換する {#replacing-a-key}

漏れた可能性があるときや新しいキーが必要なときは、**交換**を押します。同じ名前と権限の新しいキーを発行します。古いキーは切り替えのため 24 時間だけ動作し、その後止まります。

## キーを削除する {#removing-a-key}

**削除**を押し、確認のためもう一度押します。そのキーによる次のリクエストは `401 invalid_token` で拒否されます。ライブラリー、ほかのキー、アシスタントは変わりません。

## キーの権限を確認する {#checking-what-a-key-can-do}

`GET /token` は、キーの種類と権限を並べて返します。

```bash
curl https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/token \
  -H "Authorization: Bearer $VCP_KEY"
```

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89",
    "client_id": null,
    "scopes": ["account:read", "bookmarks:read", "notes:read", "notes:write"]
  }
}
```

**ほかのアプリ**には、各キーの作成日、最終利用日、有効期限も表示されます。

## キーの保有数 {#how-many-you-can-have}

Free は 5 件、Pro は 25 件、Team はメンバーごとに 50 件です。削除済みのキーは数えません。上限に達した場合は一件削除するか、[プラン](https://vcpeai.aoneahsan.com/plans)で上限の多いプランを選んでください。

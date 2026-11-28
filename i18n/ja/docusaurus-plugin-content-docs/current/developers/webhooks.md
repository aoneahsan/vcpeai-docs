---
title: Webhook の接続
description: Video Controls Plus の Webhook イベント、署名付きメッセージの内容、Node と Python での署名確認、再送の仕組み。
last_update:
  date: 2026-11-21
---

# Webhook

**ライブラリーに変更があると、Webhook がすぐに自分のサーバーへ知らせます。** メモを保存すると、指定したアドレスに短い署名付きメッセージが届きます。初期状態では、何がいつ、どの項目に起きたかだけを伝えます。**記入した内容を含める**を選ばない限り、文章はライブラリーに残ります。

拡張機能、ウェブサイト、アクセスキー、アシスタントのどこから変更しても送信されます。

## 接続先を追加する {#adding-an-address}

1. ウェブサイトの**アカウント → [ほかのアプリ](https://vcpeai.aoneahsan.com/account/apps)**で**アドレスを追加**を押します。
2. 自分のサーバーの `https://` アドレスを貼り付けます。必要なら「Obsidian の受信箱」のような説明も付けます。
3. 送信するイベントを選びます。各対象の**すべての…イベント**で、その対象の全イベントを一度に選べます。
4. ほかの人と共用する接続先では、**記入した内容を含める**をオフのままにします。
5. **アドレスを追加**を押し、`whsec_` で始まる署名用シークレットをコピーします。

追加には、過去 10 分以内のログインと、[二段階ログイン](./two-step-sign-in.md)がオンの場合はコードが必要です。追加をメールでお知らせしますが、シークレットは含めません。

送信先はインターネットから到達可能なアドレスだけです。各送信前にも確認します。

- `https://` だけを使用し、ポートは 443 または 8443、長さは最大 2,048 文字。ユーザー名やパスワードは含められません。
- プライベートネットワーク、ローカルネットワーク、私たち自身のアドレスは使えません。
- ホスト名が名前解決できる必要があります。

## イベント {#events}

- **ブックマーク：** `bookmark.saved`、`bookmark.updated`、`bookmark.removed`
- **メモ：** `note.saved`、`note.updated`、`note.deleted`
- **コレクション：** `collection.created`、`collection.updated`、`collection.deleted`、`collection.video_added`、`collection.video_removed`
- **フラッシュカード：** `flashcard.created`、`flashcard.updated`、`flashcard.reviewed`、`flashcard.deleted`
- **学習経路：** `learning_path.created`、`learning_path.updated`、`learning_path.deleted`、`learning_path.video_added`、`learning_path.video_completed`、`learning_path.video_removed`
- **視聴履歴：** `watch_history.added`、`watch_history.removed`
- **あとで見る：** `watch_later.added`、`watch_later.removed`
- **文字起こし：** `transcript.saved`、`transcript.deleted`
- **スクリーンショット：** `screenshot.saved`、`screenshot.deleted`
- **設定とショートカット：** `settings.updated`
- **端末：** `device.added`、`device.removed`
- **接続先の確認：** **テスト送信**から `webhook.test`

`updated` は自分が書いた内容の変更を示します。利用しただけでは発生しません。カードの復習による予定変更は `flashcard.reviewed` であり、`flashcard.updated` ではありません。学習経路の視聴分数にもイベントはありません。視聴履歴は動画の初回視聴時に `added`、削除時に `removed` を送り、再生位置が動くたびには送りません。共同視聴、サイト修正、機能リクエストのイベントはありません。

## メッセージの内容 {#what-a-message-carries}

各メッセージは JSON 本文と三つのヘッダーを持つ `POST` です。

```http
POST /hooks/vcp HTTP/1.1
Content-Type: application/json
User-Agent: VideoControlsPlus-Webhooks/1.0
webhook-id: msg_3f1c9a7e52b84d0e9a6c41b27d58e0f3
webhook-timestamp: 1795252443
webhook-signature: v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=
```

```json
{"type":"note.saved","timestamp":"2026-11-21T09:14:03.512Z","data":{"id":"0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e","video_id":"dQw4w9WgXcQ","platform":"youtube","occurred_at":"2026-11-21T09:14:03.512418+00:00"}}
```

`data` には項目の `id`、動画に関係する場合は `video_id` と `platform`、および `occurred_at` が入ります。`settings.updated` では `id` はアカウント ID です。残りの情報が必要なら [API](./api.md) で項目を取得してください。

**記入した内容を含める**をオンにすると、対象ごとに次のフィールドも `data` に加わります。

| 対象 | `data` に加わるもの |
|---|---|
| ブックマーク | `label`、`note`、`color`、`position_seconds` |
| メモ | `content`、`category`、`tags` |
| コレクション | `name`、`description`。動画では `collection_id` と `video_title` も追加。 |
| フラッシュカード | `front`、`back`、`tags` |
| 学習経路 | `title`、`description`。動画では `path_id`、`video_title`、`notes` も追加。 |
| 視聴履歴 | `video_title`、`channel_name` |
| あとで見る | `video_title`、`priority`、`notes` |
| 文字起こし | `language`、`format` |
| スクリーンショット | `position_seconds`、`width`、`height` |
| 設定とショートカット | `changed`：`["settings"]`、`["shortcuts"]`、または両方 |
| 端末 | `device_name`、`browser` |

文字起こしの本文は、スイッチの状態にかかわらずメッセージに含まれません。必要ならキーを使って `transcript_texts` から読みます。

スイッチをオンにした場合の同じメモ：

```json
{
  "type": "note.saved",
  "timestamp": "2026-11-21T09:14:03.512Z",
  "data": {
    "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "video_id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "occurred_at": "2026-11-21T09:14:03.512418+00:00",
    "content": "Chorus comes back at 1:43. Use it for the timing exercise.",
    "category": "action",
    "tags": ["music-theory"]
  }
}
```

設定変更とテストメッセージ：

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## 送信元を確認する {#checking-a-message}

署名には <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a> を使用します。対応ライブラリーには、そのままシークレットを渡せます。自分で確認する場合：

1. 受信した `webhook-id`、`webhook-timestamp`、**加工前の本文**を、この順で `.` でつなぎます。
2. シークレットの `whsec_` を除いて Base64 で復号し、それを鍵として連結した文章の HMAC-SHA256 を計算します。
3. 結果を Base64 に変換します。空白区切りで一つ以上ある `webhook-signature` の `v1,` 値のいずれかと一致する必要があります。
4. 古いメッセージの再利用を防ぐため、時刻が自分の時計と 5 分以上違う場合は拒否します。

確認が通ってから JSON を解析してください。本文を一度解析して再び JSON にすると、署名と一致しなくなります。

以下の例は、このページ専用のシークレットで上記メッセージを確認できます。

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

正しい署名は `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=` です。自分のシークレットは**ほかのアプリ**にあります。

### Node {#node}

```js
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';

/** True when the message was signed with `secret` in the last five minutes. */
export function isFromVideoControlsPlus(secret, headers, rawBody, nowSeconds = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

createServer((req, res) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!isFromVideoControlsPlus(process.env.VCP_WEBHOOK_SECRET, req.headers, rawBody)) {
      res.writeHead(400).end();
      return;
    }
    const message = JSON.parse(rawBody);
    res.writeHead(204).end();
    // Handle message.type after answering, so a slow job never runs past the ten-second wait.
  });
}).listen(8443);
```

### Python {#python}

```python
import base64
import hashlib
import hmac
import time


def is_from_video_controls_plus(secret, headers, raw_body, now_seconds=None):
    """True when the message was signed with `secret` in the last five minutes."""
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now_seconds is None else now_seconds
    if abs(now - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()
    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

`raw_body` には受信したバイト列を渡します。Flask は `request.get_data()`、FastAPI は `await request.body()` です。

## 応答、再送、停止 {#answering-retries-and-turning-off}

10 秒以内に `2xx` を返してください。リダイレクトは追跡しないため、`3xx` は失敗です。

失敗時は 5 秒後、5 分後、30 分後、2 時間後、5 時間後、10 時間後、さらに 10 時間後に再送します。約 27 時間で合計 8 回です。同じメッセージの `webhook-id` は再送中も変わりません。処理済み ID を保存し、重複処理を避けてください。

`410 Gone` が返るか、5 日連続で送信に失敗すると、その接続先をオフにします。最後の応答を記したメールを送ります。サーバーの準備ができたら、**ほかのアプリ**で**再びオンにする**を押してください。

## 接続先を管理する {#managing-an-address}

**ほかのアプリ**には、送信するイベントとともに以下があります。

- **テスト送信**で `webhook.test` を送ります。サーバーが応答すると配信記録に表示されます。
- **一時停止**で送信を止めます。後から送るためにメッセージを溜めることはありません。**再びオンにする**以降の変更から送ります。
- **配信記録**には新しい順に、結果、所要時間、試行回数を表示します。**再送**は同じ `webhook-id` で一件を送り直します。
- **削除**すると、その接続先への送信をすべて止めます。

### シークレットの表示と交換 {#replacing-the-secret}

**署名用シークレットを表示**するには、過去 10 分以内のログインと、有効な場合は二段階ログインのコードが必要です。**シークレットを交換**すると新しいものを発行します。24 時間は各メッセージに新旧二つの署名を新しいものから順に含めるので、その間にサーバーを切り替えられます。

## 接続先の数 {#how-many-you-can-have}

Free は 3 件、Pro は 20 件、Team はメンバーごとに 40 件です。上限に達した場合は一件削除するか、[プラン](https://vcpeai.aoneahsan.com/plans)で上限の多いプランを選んでください。

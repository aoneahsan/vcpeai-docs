---
title: Webhooks
description: Every Video Controls Plus webhook event, what a signed message carries, how to check its signature in Node or Python, and how retries work.
last_update:
  date: 2026-11-21
---

# Webhooks

**A webhook tells your server the moment something changes in your library.** Save a note and we send a short signed message to an address of yours. By default it says what happened, to which item and when. What you wrote stays in your library unless you tick **Include what was written**.

A message goes out for a change made anywhere: in the extension, on the website, with an access key or by an assistant.

## Adding an address {#adding-an-address}

1. On the website, open **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** and press **Add an address**.
2. Paste an `https://` address on your server, and a description if you like, such as "Obsidian inbox".
3. Tick the events to send. Each part has an **Every … event** box that ticks all of its events at once.
4. Leave **Include what was written** off if the address is shared with other people.
5. Press **Add address**, then copy the signing secret. It starts with `whsec_`.

Adding an address needs a sign-in from the last ten minutes, and your two-step code when [two-step sign-in](./two-step-sign-in.md) is on. We email you that it was added; the email doesn't contain the secret.

We only send to addresses the internet can reach, and we check this again before every message:

- `https://` only, on port 443 or 8443, up to 2,048 characters, with no name or password in it;
- not a private or local network address, and not one of our own addresses;
- a host name that resolves.

## Events {#events}

- **Bookmarks:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **Notes:** `note.saved`, `note.updated`, `note.deleted`
- **Collections:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **Flashcards:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **Learning paths:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **Watch history:** `watch_history.added`, `watch_history.removed`
- **Watch later:** `watch_later.added`, `watch_later.removed`
- **Transcripts:** `transcript.saved`, `transcript.deleted`
- **Screenshots:** `screenshot.saved`, `screenshot.deleted`
- **Settings and shortcuts:** `settings.updated`
- **Devices:** `device.added`, `device.removed`
- **Your address:** `webhook.test`, from **Send test**

An `updated` event means something you wrote changed. Activity doesn't count: a review moves a card's schedule and sends `flashcard.reviewed`, not `flashcard.updated`, and a path's minutes watched send nothing. Watch history sends `added` the first time you watch a video and `removed` when it is removed, never as your place in the video moves. Watch parties, site fixes and feature requests send no events.

## What a message carries {#what-a-message-carries}

Each message is a `POST` with a JSON body and three headers:

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

`data` holds the item's `id`, its `video_id` and `platform` when it is about a video, and `occurred_at`. For `settings.updated`, `id` is your account's. Fetch the item with [the API](./api.md) when you need the rest of it.

With **Include what was written** on, `data` also carries a short list for each part:

| Part | Added to `data` |
|---|---|
| Bookmarks | `label`, `note`, `color`, `position_seconds` |
| Notes | `content`, `category`, `tags` |
| Collections | `name`, `description`; for videos, `collection_id` and `video_title` |
| Flashcards | `front`, `back`, `tags` |
| Learning paths | `title`, `description`; for videos, `path_id`, `video_title`, `notes` |
| Watch history | `video_title`, `channel_name` |
| Watch later | `video_title`, `priority`, `notes` |
| Transcripts | `language`, `format` |
| Screenshots | `position_seconds`, `width`, `height` |
| Settings and shortcuts | `changed`: `["settings"]`, `["shortcuts"]` or both |
| Devices | `device_name`, `browser` |

A transcript's text never goes out in a message, ticked or not. Read it with a key from `transcript_texts`.

The same note, with the box ticked:

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

A settings change, and the test message:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## Checking a message came from us {#checking-a-message}

Messages are signed with [Standard Webhooks](https://www.standardwebhooks.com/), so any Standard Webhooks library reads the secret as it is. To check by hand:

1. Join `webhook-id`, `webhook-timestamp` and the **raw body**, exactly as received, with a `.` between each.
2. Take your secret without `whsec_`, base64-decode it, and compute an HMAC-SHA256 of that text with it.
3. Base64-encode the result. It must equal one of the `v1,` values in `webhook-signature`, which holds one or more separated by spaces.
4. Refuse a timestamp more than five minutes from your clock, so an old message can't be sent again.

Parse the JSON only after the check passes. A body parsed and serialised again no longer matches its signature.

The samples below can be checked against the message above with this secret, made for this page only:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

Its correct signature is `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. Your own secret is on **Other apps**.

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

Pass `raw_body` as the bytes you received: `request.get_data()` in Flask, `await request.body()` in FastAPI.

## Answering, retries and turning off {#answering-retries-and-turning-off}

Answer with any `2xx` within ten seconds. We don't follow redirects, so a `3xx` counts as a failure.

A message that fails is tried again 5 seconds later, then after 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours and 10 hours: eight tries over about 27 hours. Every try of one message keeps the same `webhook-id`, so store the ids you've handled and skip a repeat.

An address is turned off when it answers `410 Gone`, or when its messages have failed for five days in a row. We email you when that happens, with its last answer. Press **Turn back on** in **Other apps** when your server is ready.

## Managing an address {#managing-an-address}

Each address in **Other apps** has these, beside the events it sends:

- **Send test** sends `webhook.test`. It shows in the delivery log when your server answers.
- **Pause** stops sending. Nothing piles up to send later; messages from the moment you press **Turn back on** go out.
- **Delivery log** lists the last messages, newest first, with the result, the time it took and the number of tries. **Send again** sends one again with the same `webhook-id`.
- **Remove** stops everything for that address.

### Showing and replacing the secret {#replacing-the-secret}

**Show signing secret** works within ten minutes of signing in, with your two-step code when it's on. **Replace secret** makes a new one. For 24 hours each message carries both signatures, new first, so switch your server to the new secret before then and no message fails in between.

## How many you can have {#how-many-you-can-have}

Free holds 3 webhook addresses, Pro 20 and Team 40 for each member. When you're at the limit, remove one, or move to a plan with more on [Plans](https://vcpeai.aoneahsan.com/plans).

---
title: Webhook
description: 了解 Video Controls Plus 的全部 Webhook 事件、签名消息包含什么、如何在 Node 或 Python 中验证签名，以及重试规则。
last_update:
  date: 2026-11-21
---

# Webhook

**资料库发生变更时，Webhook 会立即通知你的服务器。**保存笔记后，我们会向你指定的地址发送一条简短的签名消息。默认只说明发生了什么、涉及哪条记录及时间。除非勾选“包含写入内容”，你写的文字仍留在资料库中。

无论变更来自扩展、网站、访问密钥还是助手，都会发送对应消息。

## 添加地址 {#adding-an-address}

1. 在网站打开“账户”→[“其他应用”](https://vcpeai.aoneahsan.com/account/apps)，按“添加地址”。
2. 粘贴服务器上的 `https://` 地址，可以加说明，例如“Obsidian 收件箱”。
3. 勾选要发送的事件。每类资源都有“所有……事件”选项，可一次选中该类。
4. 如果地址与他人共用，请保持“包含写入内容”关闭。
5. 按“添加地址”，再复制以 `whsec_` 开头的签名密钥。

添加地址需要过去 10 分钟内的登录；若开启[两步登录](./two-step-sign-in.md)，还需要验证码。我们会发送添加通知邮件，邮件不包含密钥。

我们只向互联网可访问的地址发送消息，每次发送前都会重新检查：

- 只能使用 `https://`，端口限 443 或 8443；长度不超过 2,048 个字符，不能包含用户名或密码；
- 不能是私有或本地网络地址，也不能是我们自己的地址；
- 主机名必须能解析。

## 事件 {#events}

- **书签：**`bookmark.saved`、`bookmark.updated`、`bookmark.removed`
- **笔记：**`note.saved`、`note.updated`、`note.deleted`
- **合集：**`collection.created`、`collection.updated`、`collection.deleted`、`collection.video_added`、`collection.video_removed`
- **闪卡：**`flashcard.created`、`flashcard.updated`、`flashcard.reviewed`、`flashcard.deleted`
- **学习路径：**`learning_path.created`、`learning_path.updated`、`learning_path.deleted`、`learning_path.video_added`、`learning_path.video_completed`、`learning_path.video_removed`
- **观看历史：**`watch_history.added`、`watch_history.removed`
- **稍后观看：**`watch_later.added`、`watch_later.removed`
- **文字稿：**`transcript.saved`、`transcript.deleted`
- **截图：**`screenshot.saved`、`screenshot.deleted`
- **设置与快捷键：**`settings.updated`
- **设备：**`device.added`、`device.removed`
- **你的地址：**从“发送测试”触发的 `webhook.test`

`updated` 表示你写的内容改变了。单纯的活动不算更新：复习闪卡会改变排程并发送 `flashcard.reviewed`，不会发送 `flashcard.updated`；学习路径的观看分钟数不会产生事件。首次观看某个视频时，观看历史发送 `added`，移除记录时发送 `removed`；播放位置变化不会发送事件。同步观看、网站修复和功能请求都不发送事件。

## 消息内容 {#what-a-message-carries}

每条消息都是带 JSON 正文和 3 个标头的 `POST` 请求：

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

`data` 包含记录 `id`，视频相关事件还包含 `video_id` 和 `platform`，以及 `occurred_at`。对于 `settings.updated`，`id` 是你的账户 ID。需要更多字段时，可用 [API](./api.md) 获取记录。

开启“包含写入内容”后，`data` 还会按资源增加少量字段：

| 资源 | `data` 中增加的字段 |
|---|---|
| 书签 | `label`、`note`、`color`、`position_seconds` |
| 笔记 | `content`、`category`、`tags` |
| 合集 | `name`、`description`；视频还包括 `collection_id` 和 `video_title` |
| 闪卡 | `front`、`back`、`tags` |
| 学习路径 | `title`、`description`；视频还包括 `path_id`、`video_title`、`notes` |
| 观看历史 | `video_title`、`channel_name` |
| 稍后观看 | `video_title`、`priority`、`notes` |
| 文字稿 | `language`、`format` |
| 截图 | `position_seconds`、`width`、`height` |
| 设置与快捷键 | `changed`：`["settings"]`、`["shortcuts"]` 或两者 |
| 设备 | `device_name`、`browser` |

无论是否勾选，消息都不会发送文字稿正文。需使用密钥从 `transcript_texts` 读取。

勾选后的同一条笔记消息如下：

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

设置变更和测试消息：

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## 验证消息来源 {#checking-a-message}

消息使用 <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a> 签名，因此任何兼容的库都能直接读取密钥。手动验证步骤如下：

1. 将 `webhook-id`、`webhook-timestamp` 和收到的**原始正文**用 `.` 连接。
2. 去掉密钥的 `whsec_` 前缀，对剩余部分进行 base64 解码，用所得密钥对上一步的文本计算 HMAC-SHA256。
3. 将结果编码为 base64，必须等于 `webhook-signature` 中某个以 `v1,` 开头的值；多个值之间用空格分隔。
4. 拒绝与本机时间相差超过 5 分钟的时间戳，防止旧消息重放。

验证通过后再解析 JSON。先解析再重新序列化的正文无法匹配原签名。

下面的示例可使用此页面专用密钥与上述消息验证：

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

正确签名是 `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`。你自己的密钥位于“其他应用”。

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

`raw_body` 必须是收到的原始字节：Flask 使用 `request.get_data()`，FastAPI 使用 `await request.body()`。

## 响应、重试与关闭规则 {#answering-retries-and-turning-off}

请在 10 秒内返回任意 `2xx`。我们不会跟随重定向，因此 `3xx` 算失败。

失败消息会在 5 秒、5 分钟、30 分钟、2 小时、5 小时、10 小时和再过 10 小时重试；共约 27 小时内最多 8 次。一次消息的所有尝试使用相同的 `webhook-id`，请记录已处理的 ID 并跳过重复消息。

如果地址返回 `410 Gone`，或连续 5 天发送失败，该地址会被关闭。我们会发邮件告知最近的响应。服务器恢复后，在“其他应用”中按“重新开启”。

## 管理地址 {#managing-an-address}

“其他应用”中每个地址在事件列表旁提供：

- “发送测试”会发送 `webhook.test`，服务器响应后可在投递记录中查看。
- “暂停”会停止发送，期间消息不会积压；按“重新开启”后只发送之后的新消息。
- “投递记录”按时间从新到旧列出最近消息、结果、耗时和尝试次数。“再次发送”会使用相同 `webhook-id` 重发某条消息。
- “移除”会停止该地址的所有投递。

### 查看和更换签名密钥 {#replacing-the-secret}

“显示签名密钥”只在过去 10 分钟内登录后可用；开启两步登录时还需验证码。“更换密钥”会生成新密钥。接下来的 24 小时，每条消息同时带新旧两份签名，新签名在前，供你切换服务器，避免消息中断。

## 地址数量 {#how-many-you-can-have}

Free 可有 3 个 Webhook 地址，Pro 为 20 个，Team 每位成员为 40 个。达到上限时，可以移除一个，或在[计划页面](https://vcpeai.aoneahsan.com/plans)选择更高额度的计划。

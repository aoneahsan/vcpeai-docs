---
title: ویب ہُکس
description: Video Controls Plus کے تمام ویب ہُک ایونٹس، دستخط شدہ پیغامات، Node اور Python میں دستخط کی جانچ، اور دوبارہ بھیجنے کا طریقہ۔
last_update:
  date: 2026-11-21
---

# ویب ہُکس

**ویب ہُک آپ کی لائبریری میں تبدیلی ہوتے ہی آپ کے سرور کو بتاتا ہے۔** نوٹ محفوظ کریں تو ہم آپ کے پتے پر ایک مختصر، دستخط شدہ پیغام بھیجتے ہیں۔ عام طور پر اس میں صرف یہ ہوتا ہے کہ کیا ہوا، کس اندراج کے ساتھ اور کب۔ آپ کا لکھا ہوا متن لائبریری ہی میں رہتا ہے، جب تک **Include what was written** منتخب نہ کریں۔

تبدیلی ایکسٹینشن، ویب سائٹ، رسائی کلید یا اسسٹنٹ سے ہو، پیغام بھیجا جاتا ہے۔

## پتہ شامل کرنا {#adding-an-address}

1. ویب سائٹ پر **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** کھولیں اور **Add an address** دبائیں۔
2. اپنے سرور کا `https://` پتہ چسپاں کریں؛ چاہیں تو "Obsidian inbox" جیسی وضاحت دیں۔
3. بھیجنے والے ایونٹس منتخب کریں۔ ہر حصے کا **Every … event** خانہ ایک ساتھ اس کے تمام ایونٹس منتخب کرتا ہے۔
4. پتہ دوسرے لوگوں کے ساتھ مشترک ہو تو **Include what was written** بند رکھیں۔
5. **Add address** دبائیں، پھر دستخطی راز نقل کریں۔ اس کی ابتدا `whsec_` سے ہوتی ہے۔

پتہ شامل کرنے کے لیے پچھلے دس منٹ کا سائن اِن ضروری ہے؛ [دو مرحلہ جاتی سائن اِن](./two-step-sign-in.md) آن ہو تو اس کا کوڈ بھی چاہیے۔ پتہ شامل ہونے کی ای میل ملتی ہے، مگر راز اس میں نہیں ہوتا۔

ہم صرف ان پتوں پر بھیجتے ہیں جو انٹرنیٹ سے قابلِ رسائی ہوں، اور ہر پیغام سے پہلے دوبارہ جانچتے ہیں:

- صرف `https://`، پورٹ 443 یا 8443، زیادہ سے زیادہ 2,048 حروف، پتے میں نام یا پاس ورڈ نہیں؛
- نجی یا مقامی نیٹ ورک کا پتہ نہیں، اور ہمارا اپنا پتہ نہیں؛
- ایسا میزبان نام جس کا پتہ مل سکے۔

## ایونٹس {#events}

- **بک مارکس:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **نوٹس:** `note.saved`, `note.updated`, `note.deleted`
- **مجموعے:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **فلیش کارڈز:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **سیکھنے کے راستے:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **دیکھنے کی تاریخ:** `watch_history.added`, `watch_history.removed`
- **بعد میں دیکھیں:** `watch_later.added`, `watch_later.removed`
- **ٹرانسکرپٹس:** `transcript.saved`, `transcript.deleted`
- **اسکرین شاٹس:** `screenshot.saved`, `screenshot.deleted`
- **ترتیبات اور شارٹ کٹس:** `settings.updated`
- **ڈیوائسز:** `device.added`, `device.removed`
- **آپ کا پتہ:** **Send test** سے `webhook.test`

`updated` ایونٹ کا مطلب آپ کی لکھی چیز میں تبدیلی ہے۔ استعمال کی سرگرمی اس میں شمار نہیں: کارڈ کی دہرائی شیڈول بدلتی ہے اور `flashcard.reviewed` بھیجتی ہے، `flashcard.updated` نہیں؛ راستے پر دیکھی گئی ویڈیو کے منٹ کوئی ایونٹ نہیں بھیجتے۔ دیکھنے کی تاریخ میں پہلی بار ویڈیو دیکھنے پر `added` اور اندراج ہٹنے پر `removed` آتا ہے؛ ویڈیو میں آگے بڑھنے پر نہیں۔ واچ پارٹیز، سائٹ اصلاحات اور فیچر درخواستوں سے کوئی ایونٹ نہیں آتا۔

## پیغام میں کیا ہوتا ہے {#what-a-message-carries}

ہر پیغام JSON باڈی اور تین ہیڈرز کے ساتھ `POST` ہے:

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

`data` میں اندراج کی `id`، ویڈیو سے متعلق ہو تو `video_id` اور `platform`، اور `occurred_at` ہوتے ہیں۔ `settings.updated` میں `id` آپ کے اکاؤنٹ کی ہوتی ہے۔ باقی معلومات کے لیے [API](./api.md) سے اندراج حاصل کریں۔

**Include what was written** آن ہو تو ہر حصے کے لیے `data` میں یہ مختصر فہرست بھی آتی ہے:

| حصہ | `data` میں اضافہ |
|---|---|
| بک مارکس | `label`, `note`, `color`, `position_seconds` |
| نوٹس | `content`, `category`, `tags` |
| مجموعے | `name`, `description`؛ ویڈیوز کے لیے `collection_id` اور `video_title` |
| فلیش کارڈز | `front`, `back`, `tags` |
| سیکھنے کے راستے | `title`, `description`؛ ویڈیوز کے لیے `path_id`, `video_title`, `notes` |
| دیکھنے کی تاریخ | `video_title`, `channel_name` |
| بعد میں دیکھیں | `video_title`, `priority`, `notes` |
| ٹرانسکرپٹس | `language`, `format` |
| اسکرین شاٹس | `position_seconds`, `width`, `height` |
| ترتیبات اور شارٹ کٹس | `changed`: `["settings"]`، `["shortcuts"]` یا دونوں |
| ڈیوائسز | `device_name`, `browser` |

ٹرانسکرپٹ کا متن پیغام میں کبھی نہیں جاتا، خانہ منتخب ہو یا نہ ہو۔ اسے `transcript_texts` سے کلید کے ذریعے پڑھیں۔

اسی نوٹ کا پیغام، خانہ منتخب ہونے پر:

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

ترتیب میں تبدیلی اور آزمائشی پیغام:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## پیغام کی تصدیق {#checking-a-message}

پیغامات <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a> کے مطابق دستخط شدہ ہیں، لہٰذا کوئی بھی Standard Webhooks لائبریری راز کو اسی صورت میں پڑھ سکتی ہے۔ خود جانچنے کے مراحل:

1. موصول شدہ `webhook-id`، `webhook-timestamp` اور **خام باڈی** کو اسی حالت میں، ہر دو کے درمیان `.` لگا کر جوڑیں۔
2. راز سے `whsec_` ہٹائیں، اسے base64-decode کریں، اور اس کلید سے متن کا HMAC-SHA256 نکالیں۔
3. نتیجہ base64-encode کریں۔ اسے `webhook-signature` میں موجود `v1,` قدروں میں سے کسی ایک کے برابر ہونا چاہیے؛ کئی قدریں خالی جگہ سے الگ ہو سکتی ہیں۔
4. اپنی گھڑی سے پانچ منٹ سے زیادہ مختلف timestamp رد کریں، تاکہ پرانا پیغام دوبارہ نہ بھیجا جا سکے۔

جانچ کامیاب ہونے کے بعد ہی JSON parse کریں۔ parse کر کے دوبارہ serialise کی گئی باڈی کا دستخط نہیں ملے گا۔

یہ مثالیں اوپر کے پیغام اور صرف اس صفحے کے لیے بنے اس راز سے جانچی جا سکتی ہیں:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

اس کا درست دستخط `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=` ہے۔ آپ کا اپنا راز **Other apps** میں ہے۔

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

`raw_body` میں موصولہ bytes دیں: Flask میں `request.get_data()`، FastAPI میں `await request.body()`۔

## جواب، دوبارہ کوشش اور بند ہونا {#answering-retries-and-turning-off}

دس سیکنڈ کے اندر کوئی بھی `2xx` جواب دیں۔ redirect کی پیروی نہیں ہوتی، اس لیے `3xx` ناکامی ہے۔

ناکام پیغام 5 سیکنڈ بعد، پھر 5 منٹ، 30 منٹ، 2 گھنٹے، 5 گھنٹے، 10 گھنٹے اور 10 گھنٹے بعد دوبارہ بھیجا جاتا ہے: تقریباً 27 گھنٹوں میں آٹھ کوششیں۔ ایک پیغام کی ہر کوشش میں وہی `webhook-id` رہتی ہے؛ نمٹائے ہوئے ids محفوظ رکھیں اور دہرایا ہوا پیغام چھوڑ دیں۔

پتہ `410 Gone` جواب دے، یا اس کے پیغامات مسلسل پانچ دن ناکام رہیں، تو اسے بند کر دیا جاتا ہے۔ ہم آخری جواب کے ساتھ ای میل کرتے ہیں۔ سرور تیار ہو تو **Other apps** میں **Turn back on** دبائیں۔

## پتے کا انتظام {#managing-an-address}

**Other apps** میں ہر پتے کے ساتھ بھیجے جانے والے ایونٹس اور یہ سہولتیں ہوتی ہیں:

- **Send test** سے `webhook.test` بھیجیں۔ سرور کے جواب کے بعد یہ delivery log میں دکھتا ہے۔
- **Pause** بھیجنا روکتا ہے۔ بعد میں بھیجنے کے لیے پیغامات جمع نہیں ہوتے؛ **Turn back on** دبانے کے بعد کی تبدیلیوں کے پیغامات ہی جاتے ہیں۔
- **Delivery log** میں حالیہ پیغامات، نئے پہلے، نتیجہ، لگا ہوا وقت اور کوششوں کی تعداد دکھتی ہے۔ **Send again** ایک پیغام اسی `webhook-id` کے ساتھ دوبارہ بھیجتا ہے۔
- **Remove** اس پتے کے لیے سب کچھ بند کر دیتا ہے۔

### راز دیکھنا اور بدلنا {#replacing-the-secret}

**Show signing secret** پچھلے دس منٹ کے سائن اِن کے بعد کام کرتا ہے؛ دو مرحلہ جاتی سائن اِن آن ہو تو کوڈ بھی چاہیے۔ **Replace secret** نیا راز بناتا ہے۔ اگلے 24 گھنٹے ہر پیغام میں دونوں دستخط، نیا پہلے، ہوتے ہیں؛ اس مدت میں سرور کو نئے راز پر منتقل کریں تاکہ کوئی پیغام ناکام نہ ہو۔

## کتنے پتے رکھ سکتے ہیں {#how-many-you-can-have}

Free میں 3، Pro میں 20 اور Team میں ہر رکن کے لیے 40 ویب ہُک پتے ہیں۔ حد پوری ہو تو ایک ہٹائیں، یا [Plans](https://vcpeai.aoneahsan.com/plans) پر زیادہ حد والا پلان منتخب کریں۔

---
title: الويب هوكس
description: أحداث ويب هوك في Video Controls Plus، ومحتوى الرسالة الموقّعة، والتحقق من توقيعها في Node أو Python، وإعادة المحاولة.
last_update:
  date: 2026-11-21
---

# الويب هوكس

**يُخبر ويب هوك خادمك فور تغيّر شيء في مكتبتك.** احفظ ملاحظة، فنرسل رسالة قصيرة موقّعة إلى عنوان تحدده. تذكر الرسالة افتراضيًا ما حدث ولأي عنصر ومتى. يبقى ما كتبته في مكتبتك إلا إذا حددت **تضمين ما كُتب**.

تُرسل الرسالة سواء حدث التغيير داخل الإضافة أم على الموقع أم بمفتاح وصول أم بواسطة مساعد.

## إضافة عنوان {#adding-an-address}

1. افتح **الحساب ← [التطبيقات الأخرى](https://vcpeai.aoneahsan.com/account/apps)** على الموقع واضغط **إضافة عنوان**.
2. الصق عنوان `https://` على خادمك، وأضف وصفًا إن أردت، مثل «صندوق Obsidian الوارد».
3. حدد الأحداث التي تريد إرسالها. لكل جزء خانة **كل أحداث …** التي تحدد أحداثه كلها دفعةً واحدة.
4. اترك **تضمين ما كُتب** متوقفًا إذا كان آخرون يستخدمون العنوان.
5. اضغط **إضافة عنوان**، ثم انسخ سر التوقيع. يبدأ بـ`whsec_`.

تتطلب إضافة عنوان تسجيل دخول خلال آخر عشر دقائق، ورمز [تسجيل الدخول بخطوتين](./two-step-sign-in.md) عند تفعيله. نرسل إليك رسالة تفيد بإضافة العنوان، ولا تتضمن السر.

نرسل فقط إلى عناوين يمكن الوصول إليها عبر الإنترنت، ونتحقق من ذلك قبل كل رسالة:

- `https://` فقط، على المنفذ 443 أو 8443، بطول لا يتجاوز 2,048 حرفًا، ومن دون اسم مستخدم أو كلمة مرور؛
- ليس عنوان شبكة خاصة أو محلية، ولا أحد عناويننا؛
- اسم مضيف يمكن الوصول إلى عنوانه.

## الأحداث {#events}

- **الإشارات المرجعية:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **الملاحظات:** `note.saved`, `note.updated`, `note.deleted`
- **المجموعات:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **البطاقات التعليمية:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **مسارات التعلم:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **سجل المشاهدة:** `watch_history.added`, `watch_history.removed`
- **المشاهدة لاحقًا:** `watch_later.added`, `watch_later.removed`
- **النصوص المستخرجة:** `transcript.saved`, `transcript.deleted`
- **لقطات الشاشة:** `screenshot.saved`, `screenshot.deleted`
- **الإعدادات والاختصارات:** `settings.updated`
- **الأجهزة:** `device.added`, `device.removed`
- **عنوانك:** `webhook.test` من **إرسال تجربة**

يعني حدث `updated` أن شيئًا كتبته تغيّر. لا تُحتسب الأنشطة: مراجعة بطاقة تغيّر موعدها وترسل `flashcard.reviewed`، لا `flashcard.updated`، ولا ترسل دقائق مشاهدة مسار تعلم شيئًا. يرسل سجل المشاهدة `added` عند مشاهدة الفيديو أول مرة و`removed` عند إزالته، لا عند تغيّر موضعك فيه. ولا تُرسل حفلات المشاهدة أو إصلاحات المواقع أو طلبات الميزات أحداثًا.

## محتوى الرسالة {#what-a-message-carries}

كل رسالة طلب `POST` بجسم JSON وثلاث ترويسات:

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

يحمل `data` معرّف العنصر `id`، و`video_id` و`platform` إذا تعلق بفيديو، ووقت الحدث `occurred_at`. في `settings.updated` يكون `id` معرّف حسابك. اجلب العنصر عبر [واجهة API](./api.md) إذا احتجت بقية تفاصيله.

عند تشغيل **تضمين ما كُتب**، يحمل `data` كذلك قائمة محدودة من حقول كل جزء:

| الجزء | ما يُضاف إلى `data` |
|---|---|
| الإشارات المرجعية | `label`, `note`, `color`, `position_seconds` |
| الملاحظات | `content`, `category`, `tags` |
| المجموعات | `name`, `description`؛ وللفيديوهات `collection_id` و`video_title` |
| البطاقات التعليمية | `front`, `back`, `tags` |
| مسارات التعلم | `title`, `description`؛ وللفيديوهات `path_id`, `video_title`, `notes` |
| سجل المشاهدة | `video_title`, `channel_name` |
| المشاهدة لاحقًا | `video_title`, `priority`, `notes` |
| النصوص المستخرجة | `language`, `format` |
| لقطات الشاشة | `position_seconds`, `width`, `height` |
| الإعدادات والاختصارات | `changed`: `["settings"]` أو `["shortcuts"]` أو كلاهما |
| الأجهزة | `device_name`, `browser` |

لا يخرج نص الفيديو المستخرج في الرسالة، سواء شغّلت الخيار أم لا. اقرأه بمفتاح من `transcript_texts`.

الملاحظة نفسها بعد تحديد الخانة:

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

مثال لتغيير الإعدادات ورسالة التجربة:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## التحقق من أن الرسالة منا {#checking-a-message}

تُوقَّع الرسائل وفق <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a>؛ لذا تستطيع مكتباته قراءة السر كما هو. للتحقق يدويًا:

1. صِل `webhook-id` و`webhook-timestamp` و**الجسم الخام** كما وصل، مع `.` بين كل جزأين.
2. خذ السر من دون `whsec_`، وفك ترميزه من base64، ثم احسب HMAC-SHA256 للنص باستخدامه.
3. رمّز النتيجة بصيغة base64. يجب أن تطابق إحدى قيم `v1,` في `webhook-signature`، وقد تضم الترويسة أكثر من توقيع مفصول بمسافة.
4. ارفض توقيتًا يبتعد أكثر من خمس دقائق عن ساعتك حتى لا يُعاد إرسال رسالة قديمة.

لا تحلّل JSON إلا بعد نجاح التحقق. إذا حللت الجسم ثم أنشأته نصًا من جديد، فلن يطابق توقيعه.

يمكن التحقق من الأمثلة أدناه مقابل الرسالة السابقة باستخدام هذا السر المصنوع لهذه الصفحة وحدها:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

توقيعها الصحيح هو `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. تجد سرك أنت في **التطبيقات الأخرى**.

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

مرّر `raw_body` بوصفه البايتات المستلمة: `request.get_data()` في Flask، أو `await request.body()` في FastAPI.

## الرد وإعادة المحاولة والإيقاف {#answering-retries-and-turning-off}

ردّ برمز `2xx` خلال عشر ثوانٍ. لا نتبع إعادة التوجيه، لذا يُعد `3xx` فشلًا.

إذا فشلت الرسالة، نعيدها بعد 5 ثوانٍ، ثم بعد 5 دقائق و30 دقيقة وساعتين و5 ساعات و10 ساعات و10 ساعات: ثماني محاولات خلال نحو 27 ساعة. تحتفظ محاولات الرسالة كلها بقيمة `webhook-id` نفسها؛ فاحفظ المعرّفات التي عالجتها وتجاوز التكرار.

يُوقف العنوان إذا رد بـ`410 Gone` أو فشلت رسائله خمسة أيام متتالية. نراسلك عند ذلك مع آخر رد منه. اضغط **تشغيل مجددًا** في **التطبيقات الأخرى** عندما يصبح خادمك جاهزًا.

## إدارة العنوان {#managing-an-address}

تظهر هذه الخيارات بجانب أحداث كل عنوان في **التطبيقات الأخرى**:

- **إرسال تجربة** يرسل `webhook.test`. تظهر في سجل التسليم عندما يرد خادمك.
- **إيقاف مؤقت** يوقف الإرسال. لا تتراكم الرسائل لتُرسل لاحقًا؛ تُرسل الرسائل الجديدة من لحظة الضغط على **تشغيل مجددًا**.
- **سجل التسليم** يعرض الرسائل الأخيرة من الأحدث، مع النتيجة والوقت المستغرق وعدد المحاولات. يعيد **إرسال مجددًا** الرسالة نفسها بقيمة `webhook-id` نفسها.
- **إزالة** توقف كل ما يخص ذلك العنوان.

### إظهار السر واستبداله {#replacing-the-secret}

يعمل **إظهار سر التوقيع** خلال عشر دقائق من تسجيل الدخول، ومع رمز الخطوة الثانية عند تفعيلها. يصنع **استبدال السر** سرًا جديدًا. طوال 24 ساعة تحمل كل رسالة التوقيعين، الجديد أولًا؛ فبدّل السر على خادمك قبل انتهاء المدة حتى لا تفشل رسالة أثناء الانتقال.

## عدد العناوين المتاح {#how-many-you-can-have}

تسمح Free بثلاثة عناوين ويب هوك، وPro بعشرين، وTeam بأربعين لكل عضو. عند بلوغ الحد، أزل عنوانًا أو انتقل إلى خطة أعلى من [صفحة الخطط](https://vcpeai.aoneahsan.com/plans).

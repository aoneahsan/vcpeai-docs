---
title: वेबहुक
description: Video Controls Plus के सभी वेबहुक इवेंट, हस्ताक्षरित संदेश में आने वाला डेटा, Node या Python में हस्ताक्षर जाँचना और दोबारा भेजने का तरीका।
last_update:
  date: 2026-11-21
---

# वेबहुक

**वेबहुक आपकी लाइब्रेरी में बदलाव होते ही आपके सर्वर को बताता है।** नोट सहेजें और हम आपके पते पर छोटा, हस्ताक्षरित संदेश भेजते हैं। शुरू में वह बताता है क्या हुआ, किस चीज़ पर और कब। आपका लिखा पाठ लाइब्रेरी में ही रहता है, जब तक **Include what was written** न चुनें।

एक्सटेंशन, वेबसाइट, एक्सेस कुंजी या assistant—कहीं से भी बदलाव हो, संदेश जाता है।

## पता जोड़ें {#adding-an-address}

1. वेबसाइट पर **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** खोलकर **Add an address** दबाएँ।
2. अपने सर्वर का `https://` पता चिपकाएँ; चाहें तो “Obsidian inbox” जैसा विवरण दें।
3. भेजे जाने वाले इवेंट चुनें। हर हिस्से का **Every … event** बॉक्स उस हिस्से के सभी इवेंट एक साथ चुनता है।
4. पता दूसरे लोगों के साथ साझा हो तो **Include what was written** बंद रखें।
5. **Add address** दबाकर हस्ताक्षर रहस्य कॉपी करें। वह `whsec_` से शुरू होता है।

पता जोड़ने के लिए पिछले दस मिनट का साइन-इन और [दो-चरणीय साइन-इन](./two-step-sign-in.md) चालू हो तो उसका कोड चाहिए। पता जुड़ने का ईमेल भेजते हैं; उसमें रहस्य नहीं होता।

हम केवल इंटरनेट से पहुँचने योग्य पते पर भेजते हैं और हर संदेश से पहले फिर जाँचते हैं:

- केवल `https://`, पोर्ट 443 या 8443, अधिकतम 2,048 अक्षर; URL में नाम या पासवर्ड नहीं;
- निजी या स्थानीय नेटवर्क का पता नहीं, और हमारा अपना पता नहीं;
- होस्ट नाम का DNS समाधान होना चाहिए।

## इवेंट {#events}

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
- **आपका पता:** **Send test** से `webhook.test`

`updated` का अर्थ आपके लिखे में बदलाव है, केवल गतिविधि नहीं। समीक्षा से कार्ड का समय बदलता है और `flashcard.reviewed` जाता है, `flashcard.updated` नहीं। Learning path में देखे मिनटों पर कोई संदेश नहीं जाता। Watch History में वीडियो पहली बार देखने पर `added` और हटाने पर `removed` जाता है; हर बार वीडियो में जगह बदलने पर नहीं। Watch parties, site fixes और feature requests कोई इवेंट नहीं भेजते।

## संदेश में क्या होता है {#what-a-message-carries}

हर संदेश JSON body और तीन headers वाला `POST` है:

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

`data` में चीज़ का `id` होता है। वीडियो से जुड़ी हो तो `video_id` और `platform`; साथ में `occurred_at`। `settings.updated` में `id` आपके अकाउंट का है। बाकी जानकारी चाहिए तो [API](./api.md) से वह चीज़ पढ़ें।

**Include what was written** चालू करने पर हर हिस्से के लिए `data` में ये सीमित फ़ील्ड भी आते हैं:

| हिस्सा | `data` में अतिरिक्त |
|---|---|
| Bookmarks | `label`, `note`, `color`, `position_seconds` |
| Notes | `content`, `category`, `tags` |
| Collections | `name`, `description`; वीडियो के लिए `collection_id` और `video_title` |
| Flashcards | `front`, `back`, `tags` |
| Learning paths | `title`, `description`; वीडियो के लिए `path_id`, `video_title`, `notes` |
| Watch history | `video_title`, `channel_name` |
| Watch later | `video_title`, `priority`, `notes` |
| Transcripts | `language`, `format` |
| Screenshots | `position_seconds`, `width`, `height` |
| Settings and shortcuts | `changed`: `["settings"]`, `["shortcuts"]` या दोनों |
| Devices | `device_name`, `browser` |

ट्रांसक्रिप्ट का पूरा पाठ संदेश में कभी नहीं जाता, बॉक्स चुना हो तब भी। उसे कुंजी से `transcript_texts` में पढ़ें।

बॉक्स चुने होने पर वही नोट:

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

सेटिंग बदलने और टेस्ट संदेश के उदाहरण:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## संदेश हमारी ओर से है, कैसे जाँचें {#checking-a-message}

संदेशों पर <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a> से हस्ताक्षर होते हैं। उसकी लाइब्रेरी रहस्य को ज्यों का त्यों पढ़ती है। खुद जाँचने के लिए:

1. मिले हुए `webhook-id`, `webhook-timestamp` और **मूल body** को इसी क्रम में, बीच में `.` लगाकर जोड़ें।
2. रहस्य से `whsec_` हटाकर base64 decode करें। उस कुंजी से जुड़े पाठ का HMAC-SHA256 निकालें।
3. परिणाम base64 में बदलें। वह `webhook-signature` के खाली जगह से अलग किए एक या अधिक `v1,` मानों में से किसी से मेल खाना चाहिए।
4. अपनी घड़ी से पाँच मिनट से अधिक दूर timestamp अस्वीकार करें, ताकि पुराना संदेश फिर न चल सके।

जाँच सफल होने के बाद ही JSON पढ़ें। Body पढ़कर दोबारा serialise करने पर हस्ताक्षर मेल नहीं खाएगा।

नीचे के नमूने ऊपर के संदेश के साथ इस केवल-इस-पेज के लिए बने रहस्य से जाँचे जा सकते हैं:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

सही हस्ताक्षर `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=` है। आपका अपना रहस्य **Other apps** में है।

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

`raw_body` में मिले हुए bytes दें: Flask में `request.get_data()` और FastAPI में `await request.body()`।

## जवाब, पुनः प्रयास और बंद होना {#answering-retries-and-turning-off}

दस सेकंड के भीतर कोई भी `2xx` उत्तर दें। Redirect का पीछा नहीं करते, इसलिए `3xx` विफल है।

विफल संदेश 5 सेकंड बाद, फिर 5 मिनट, 30 मिनट, 2 घंटे, 5 घंटे, 10 घंटे और 10 घंटे बाद दोबारा भेजा जाता है: करीब 27 घंटे में आठ प्रयास। एक संदेश के हर प्रयास का `webhook-id` समान रहता है। सँभाले गए ID सहेजकर दोहराव छोड़ें।

पता `410 Gone` लौटाए या लगातार पाँच दिन उसके संदेश विफल हों तो बंद किया जाता है। अंतिम उत्तर सहित ईमेल भेजते हैं। सर्वर तैयार होने पर **Other apps** में **Turn back on** दबाएँ।

## पता सँभालें {#managing-an-address}

**Other apps** में हर पते के इवेंट के साथ ये विकल्प हैं:

- **Send test** `webhook.test` भेजता है। सर्वर के उत्तर के बाद delivery log में दिखता है।
- **Pause** भेजना रोकता है। बाद के लिए संदेश जमा नहीं होते; **Turn back on** दबाने के बाद के संदेश जाते हैं।
- **Delivery log** नए से पुराने संदेश, परिणाम, लगा समय और प्रयासों की संख्या दिखाता है। **Send again** उसी `webhook-id` से एक संदेश फिर भेजता है।
- **Remove** उस पते के लिए सब बंद करता है।

### रहस्य दिखाएँ और बदलें {#replacing-the-secret}

**Show signing secret** साइन-इन के दस मिनट के भीतर चलता है; दो-चरणीय सुरक्षा चालू हो तो उसका कोड भी चाहिए। **Replace secret** नया रहस्य बनाता है। 24 घंटे तक हर संदेश में दोनों हस्ताक्षर, नया पहले, होते हैं। इससे पहले सर्वर को नए रहस्य पर बदलें ताकि संदेश न छूटे।

## कितने पते रख सकते हैं {#how-many-you-can-have}

Free में 3, Pro में 20 और Team में हर सदस्य के लिए 40 वेबहुक पते। सीमा पूरी हो तो एक हटाएँ या [Plans](https://vcpeai.aoneahsan.com/plans) पर अधिक सीमा वाला प्लान लें।

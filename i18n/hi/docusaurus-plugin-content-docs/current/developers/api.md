---
title: Video Controls Plus API
sidebar_label: API
description: अपनी Video Controls Plus लाइब्रेरी का REST API, अनुरोध का रूप, परिणामों के पेज, त्रुटियाँ, सीमाएँ और हर हिस्से का curl उदाहरण।
last_update:
  date: 2026-11-21
---

# Video Controls Plus API

**[एक्सेस कुंजी](./access-keys.md) से API HTTPS पर आपकी अपनी लाइब्रेरी पढ़ता और बदलता है।** हर पता यहाँ से शुरू होता है:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

मशीन के लिए OpenAPI 3.1 विवरण <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a> पर और Markdown प्रति <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a> पर है। इन्हें कुंजी नहीं चाहिए।

नीचे के उदाहरण शुरुआती पता और कुंजी दो shell variables में रखते हैं:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## अनुरोध पर कुंजी भेजें {#signing-requests}

हर अनुरोध में कुंजी bearer token की तरह और body JSON में भेजें:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

जुड़े assistant का token भी यहाँ काम करता है। वेबसाइट का साइन-इन नहीं; API `401` लौटाकर एक्सेस कुंजी या assistant token माँगता है।

हर अनुरोध आपकी ओर से होता है। डेटाबेस हर पंक्ति पर आपकी ही अनुमति लागू करता है; कुंजी ऐसा डेटा नहीं लौटा सकती जिसे आप वेबसाइट पर खुद न खोल सकें।

## उत्तर का रूप {#what-comes-back}

एक चीज़:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

सूची:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

विफलता:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

समय ISO 8601 में हैं। ID, जहाँ नीचे अलग न कहा हो, UUID हैं। आपके डेटा वाले उत्तर कभी cache नहीं होते।

## त्रुटियाँ {#errors}

| स्थिति | `code` | क्या हुआ |
|---|---|---|
| 400 | `invalid_request` | फ़ील्ड, फ़िल्टर, क्रम या cursor गलत; `details.issues` हर फ़ील्ड बताता है। |
| 401 | `invalid_token` | कुंजी नहीं है, गलत है, समाप्त है या हटाई गई है। |
| 403 | `scope_required` | कुंजी को यह अनुमति नहीं मिली; `details.scope` उसका नाम बताता है। |
| 404 | `not_found` | इस कुंजी के लिए इस पते पर कुछ नहीं। दूसरे व्यक्ति की चीज़ भी ग़ायब चीज़ जैसी दिखती है। |
| 405 | `method_not_allowed` | यह हिस्सा उस method को नहीं लेता; जैसे Watch History बदलना। |
| 409 | `conflict` | चीज़ पहले से है या हमारा कोई नियम उसे रोकता है; संदेश बताता है कौन-सा। |
| 413 | `payload_too_large` | Body 65,536 bytes से बड़ी है। |
| 429 | `rate_limited` | बहुत अनुरोध हुए; reset समय तक रुकें। |
| 500 | `internal` | हमारी ओर समस्या हुई; `correlation_id` भेजें। |

## परिणामों के पेज {#pages-of-results}

सूची में आम तौर पर 20 चीज़ें आती हैं। `limit` देकर 1 से 50 माँग सकते हैं। और हों तो `meta.next_cursor` मिलता है। वही फ़िल्टर और क्रम रखते हुए उसे `cursor` में भेजकर अगला पेज लें। Cursor 15 मिनट चलता है और केवल उसी query के लिए है जिसने उसे बनाया। `next_cursor` का मान `null` हो तो सूची पूरी है।

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**Filters** query parameters हैं: `<field>.<operator>`, नीचे हर हिस्से की अनुमत छोटी सूची से। `eq` समान, `lte` उस समय या उससे पहले और `cs` का अर्थ टैगों में comma सूची के हर मान का होना है। **Sort** `sort=<field>` है; शुरू में `-` से नया या बड़ा पहले। हर हिस्से की सूची का पहला क्रम शुरुआती क्रम है।

## अनुरोध की सीमाएँ {#rate-limits}

हर कुंजी को प्रति मिनट 120 अनुरोध मिलते हैं। इसके अलावा सभी कुंजियों और assistants की संयुक्त दैनिक सीमा: Free में 5,000, Pro में 50,000 और Team में हर सदस्य को 100,000। आधी रात UTC पर नई गिनती शुरू होती है। हर उत्तर में निकट सीमा के लिए `RateLimit-Limit`, `RateLimit-Remaining` और `RateLimit-Reset` (सेकंड) हैं। `429` में `Retry-After` भी है।

## हटाना {#removing}

`DELETE` के लिए उस हिस्से की Delete अनुमति चाहिए। एक्सेस कुंजी तुरंत हटाकर बिना body के `204` लौटाती है।

Assistant token से अभी कुछ नहीं हटता। `202` के साथ वेबसाइट पर व्यक्ति की मंज़ूरी वाला लिंक मिलता है; वह दस मिनट मान्य है:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

अगली बार सिंक होने पर एक्सटेंशन हर ब्राउज़र से वह चीज़ ऐसे हटाता है जैसे आपने वहीं हटाई हो।

## आपकी लाइब्रेरी {#your-library}

नीचे हर हिस्सा, अलग न कहा हो तो, सूची के लिए `GET /<part>` और एक चीज़ के लिए `GET /<part>/{id}` लेता है। `POST /<part>` नई चीज़ बनाता है, `PATCH /<part>/{id}` भेजे फ़ील्ड बदलता है और `DELETE /<part>/{id}` हटाता है। जिन्हें अपना तय करने के लिए नहीं बताया गया, वे फ़ील्ड केवल दिखते हैं, लिखे नहीं जाते।

इन हिस्सों में वीडियो के चार फ़ील्ड हैं: `platform` (जैसे `youtube`, `netflix`, `linkedin`), `video_id` (उस साइट की ID), `video_url` (वीडियो पेज का पता) और `video_title`।

### Bookmarks {#bookmarks}

वीडियो में सहेजे पल: समय, लेबल, नोट और रंग।

| | |
|---|---|
| Methods | list, get, create, change, delete |
| आप तय करें | `video_id`, `video_url`, `label` (ज़रूरी), `position_seconds` (शुरू से सेकंड, ज़रूरी), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Filters | `platform.eq`, `video_id.eq`, `tags.cs` |
| Sort | `-created_at` |
| Permission | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

वीडियो का समय बुकमार्क सहेजते वक्त तय होता है, जैसे एक्सटेंशन में।

### Notes {#notes}

वीडियो के किसी समय पर आपके लिखे नोट्स, category और tags सहित।

| | |
|---|---|
| Methods | list, get, create, change, delete |
| आप तय करें | `video_id`, `video_url`, `content` (ज़रूरी), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` या `custom`), `custom_category_name`, `color`, `tags` |
| Filters | `platform.eq`, `video_id.eq` |
| Sort | `-created_at` |
| Permission | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Collections और उनके वीडियो {#collections}

`collections` आपकी वीडियो सूचियाँ हैं, नवीनतम बदलाव पहले। `collection_videos` उनमें रखे वीडियो हैं; वीडियो जोड़ा या हटाया जाता है, बदला नहीं जाता, जैसे एक्सटेंशन में।

| | `collections` | `collection_videos` |
|---|---|---|
| Methods | list, get, create, change, delete | list, get, create, delete |
| आप तय करें | `name` (ज़रूरी), `description`, `is_public` | `collection_id`, `video_id`, `video_url` (ज़रूरी), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Filters | | `collection_id.eq` |
| Sort | `-updated_at` | `-added_at` |
| Permission | `collections` | `collections` |

सार्वजनिक collection को उसके लिंक वाला कोई भी व्यक्ति खोल सकता है। `collection_id` आपकी अपनी collection की होनी चाहिए।

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Flashcards {#flashcards}

वीडियो से बने आपके फ्लैशकार्ड: सामने और पीछे का पाठ, tags और समीक्षा की तारीख।

| | |
|---|---|
| Methods | list, get, create, change, delete |
| आप तय करें | `video_id`, `video_url`, `front` और `back` (ज़रूरी), `position_seconds`, `platform`, `video_title`, `tags`; समीक्षा क्रम के `ease_factor` (1.3 से 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Filters | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Sort | `next_review_at`, `-created_at` |
| Permission | `flashcards` |

नया कार्ड तुरंत समीक्षा के लिए आता है। समीक्षा क्रम बदलना ही समीक्षा दर्ज करना है, जैसा एक्सटेंशन में। आज के अंत तक आने वाले कार्ड:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Learning paths और उनके वीडियो {#learning-paths}

`learning_paths` आपके पाठ मार्ग हैं, नवीनतम बदलाव पहले। `path_videos` हर मार्ग के क्रमबद्ध वीडियो और उनका पूरा होने का हाल हैं।

| | `learning_paths` | `path_videos` |
|---|---|---|
| Methods | list, get, create, change, delete | list, get, create, change, delete |
| आप तय करें | `title` (ज़रूरी), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id`, `video_url` (ज़रूरी), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| केवल दिखते | `actual_minutes`, `last_accessed_at` (एक्सटेंशन गिनता है) | |
| Filters | | `path_id.eq` |
| Sort | `-updated_at` | `position`, `-created_at` |
| Permission | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### Watch history {#watch-history}

Watch History चालू होने पर देखे वीडियो, जहाँ रुके और कितनी देर देखा। इसमें केवल एक्सटेंशन नई चीज़ डालता है। API पढ़ता और हटाता है; पंक्ति बदलता नहीं।

| | |
|---|---|
| Methods | list, get, delete |
| दिखते फ़ील्ड | वीडियो के फ़ील्ड, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Filters | `platform.eq`, `video_id.eq` |
| Sort | `-last_watched_at` |
| Permission | `history` (read और delete) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Watch later {#watch-later}

प्राथमिकता और नोट्स सहित, आपके तय क्रम की Watch Later सूची।

| | |
|---|---|
| Methods | list, get, create, change, delete |
| आप तय करें | `video_id`, `video_url` (ज़रूरी), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` या `low`), `notes` |
| Sort | `position`, `-added_at` |
| Permission | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Transcripts {#transcripts}

`transcripts` में सहेजे ट्रांसक्रिप्ट की सूची भाषा और फ़ॉर्मैट सहित नवीनतम पहले आती है। पाठ नहीं आता, ताकि सूची छोटी रहे। `transcript_texts` उसी ID से पाठ और समय वाली पंक्तियों सहित एक ट्रांसक्रिप्ट पढ़ता है या नया सहेजता है।

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Methods | list, get, delete | get, create |
| आप तय करें | | `video_id`, `video_url`, `content` (ज़रूरी), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` या `json`), `segments` |
| दिखते फ़ील्ड | वीडियो फ़ील्ड, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | वही, साथ में `content` और `segments` |
| Sort | `-downloaded_at` | |
| Permission | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

अनुरोध की body अधिकतम 65,536 bytes हो सकती है। इससे लंबा ट्रांसक्रिप्ट बाहर से सहेजा नहीं जा सकता।

### Screenshots {#screenshots}

वीडियो से सहेजे फ़्रेम, वीडियो में समय और चित्र के आकार सहित। केवल पढ़ सकते हैं; स्क्रीनशॉट एक्सटेंशन में हटाया जाता है।

| | |
|---|---|
| Methods | list, get |
| दिखते फ़ील्ड | वीडियो फ़ील्ड, `position_seconds`, `image_url`, `format` (`png`, `jpeg` या `webp`), `width`, `height`, `created_at` |
| Sort | `-created_at` |
| Permission | `screenshots` (read) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Settings और shortcuts {#settings}

सिंक की हुई एक्सटेंशन सेटिंग्स और कीबोर्ड शॉर्टकट: एक चीज़, जिसकी ID आपके अकाउंट की है। `settings` और `keyboard_bindings` उसी रूप के objects हैं जिसमें एक्सटेंशन उन्हें रखता है।

| | |
|---|---|
| Methods | list, get, create, change |
| आप तय करें | `settings`, `keyboard_bindings` |
| दिखते फ़ील्ड | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Permission | `settings` (read और change) |

पहली बार सिंक से पहले सूची खाली है; फिर उसमें आपकी एक चीज़ होती है। सहेजने पर नई प्रति रखी जाती है, जैसे आपके ब्राउज़र के बीच सिंक में।

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Devices {#devices}

वे ब्राउज़र जिनमें एक्सटेंशन अकाउंट से जुड़ा है। नए ब्राउज़र केवल एक्सटेंशन जोड़ने से आते हैं। यहाँ नाम बदल या उन्हें हटा सकते हैं। हटाने पर उस ब्राउज़र का एक्सटेंशन साइन आउट होता है।

| | |
|---|---|
| Methods | list, get, change, delete |
| आप तय करें | `device_name` |
| दिखते फ़ील्ड | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Sort | `-last_seen_at` |
| Permission | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## साझा हिस्से, केवल पढ़ना {#shared-read-only}

ये दूसरे लोगों से भी जुड़े हैं, इसलिए कुंजी पर कुछ भी चुना हो, API इन्हें केवल पढ़ता है। ये वेबहुक इवेंट नहीं भेजते।

| हिस्सा | क्या रखता है | फ़िल्टर | क्रम | अनुमति |
|---|---|---|---|---|
| `watch_parties` | आपकी मेज़बानी वाली या जिनमें आप जुड़े parties: वीडियो, `is_host`, शुरू, समाप्ति और खत्म होने का समय। निमंत्रण वाला join code नहीं आता। | | `-created_at` | `parties:read` |
| `party_members` | आपकी parties में कितने लोग और कब जुड़े। `is_you` आपको बताता है; किसी का नाम, फ़ोटो या अकाउंट नहीं आता। `id` सदस्यता का संकेत है, व्यक्ति का नहीं। | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | वेबसाइटों के साझा किए player fixes, स्वीकृत वाले और प्रतीक्षा में आपके अपने, `is_yours` सहित। योगदान देने वाले का नाम नहीं। | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | सार्वजनिक बोर्ड: शीर्षक, विवरण, category, स्थिति, वोट और `is_yours`। लेखक का नाम नहीं। | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | आपके अपने वोट: `1` पक्ष में, `-1` विरोध में। वोट का `id` उस request का है। | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## आपका प्लान और उपयोग {#your-plan-and-use}

`GET /account` एक चीज़ लौटाता है: प्लान, दैनिक और आज के AI रन, क्लाउड संग्रहण और उसका उपयोग। `other_apps` में [प्लान तालिका](./index.md#limits-on-each-plan) की चार सीमाएँ और `requestsToday` हैं। हर कुंजी इसे बिना अलग अनुमति पढ़ती है।

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## API कभी क्या नहीं देता {#what-the-api-never-serves}

फ़ील्ड की अनुमति सूची तय है: इस पेज पर नाम न हो तो डेटाबेस का कॉलम बाहर नहीं जाता। [जहाँ पहुँच नहीं है](./index.md#what-it-never-reaches) के अलावा एक्सटेंशन की अपनी सिंक कुंजियाँ, स्क्रीनशॉट के पीछे की संग्रहित फ़ाइल का रिकॉर्ड, आखिरी बार सेटिंग सहेजने वाला डिवाइस और Watch History के भीतर अलग-अलग देखने के सत्र भी बाहर नहीं आते। Calendar feed नहीं है।

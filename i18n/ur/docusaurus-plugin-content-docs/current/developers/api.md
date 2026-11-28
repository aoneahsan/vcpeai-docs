---
title: Video Controls Plus API
sidebar_label: API
description: اپنی Video Controls Plus لائبریری کی REST API، درخواستوں کی شکل، نتائج کے صفحات، غلطیاں، حدود اور ہر حصے کی curl مثال۔
last_update:
  date: 2026-11-21
---

# Video Controls Plus API

**[رسائی کلید](./access-keys.md) کے ذریعے API، HTTPS پر آپ کی اپنی لائبریری پڑھتی اور بدلتی ہے۔** ہر پتے کی ابتدا یہاں سے ہوتی ہے:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

مشین کے قابلِ مطالعہ بیان کی OpenAPI 3.1 دستاویز <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a> پر ہے؛ اس کی Markdown نقل <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a> پر ہے۔ دونوں کے لیے کلید نہیں چاہیے۔

نیچے کی مثالوں میں پتے کی ابتدا اور کلید دو shell متغیرات میں رکھی گئی ہے:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## درخواست کی شناخت {#signing-requests}

ہر درخواست میں کلید bearer token کے طور پر، اور باڈی JSON میں بھیجیں:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

جڑے ہوئے اسسٹنٹ کا ٹوکن بھی یہاں چلتا ہے۔ ویب سائٹ کا سائن اِن نہیں چلتا: API `401` کے ساتھ رسائی کلید یا اسسٹنٹ کا ٹوکن مانگتی ہے۔

ہر درخواست آپ کی حیثیت سے کام کرتی ہے۔ ڈیٹابیس آپ کی اپنی اجازتوں کے مطابق ہر ریکارڈ طے کرتا ہے، اس لیے کلید کوئی ایسا ریکارڈ واپس نہیں لا سکتی جو آپ ویب سائٹ پر خود نہ کھول سکتے ہوں۔

## جواب کی شکل {#what-comes-back}

ایک اندراج:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

فہرست:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

ناکامی:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

وقت ISO 8601 میں ہوتا ہے۔ شناختی قدریں UUID ہوتی ہیں، سوائے ان حصوں کے جہاں نیچے مختلف بتایا گیا ہے۔ آپ کا ڈیٹا رکھنے والے جواب cache نہیں کیے جاتے۔

## غلطیاں {#errors}

| اسٹیٹس | `code` | مطلب |
|---|---|---|
| 400 | `invalid_request` | کوئی فیلڈ، فلٹر، ترتیب یا کرسر درست نہیں؛ `details.issues` ہر متاثرہ فیلڈ بتاتا ہے۔ |
| 401 | `invalid_token` | کلید نہیں دی گئی، غلط ہے، ختم ہو گئی یا ہٹا دی گئی۔ |
| 403 | `scope_required` | کلید کو یہ اجازت نہیں ملی؛ `details.scope` اس کا نام بتاتا ہے۔ |
| 404 | `not_found` | اس کلید کے لیے اس پتے پر کچھ نہیں۔ کسی اور کا اندراج بھی غیر موجود اندراج جیسا دکھتا ہے۔ |
| 405 | `method_not_allowed` | یہ حصہ اس طریقے کو قبول نہیں کرتا، مثلاً دیکھنے کی تاریخ میں تبدیلی۔ |
| 409 | `conflict` | اندراج پہلے سے موجود ہے یا ہمارے کسی اصول نے اسے روکا ہے؛ پیغام وجہ بتاتا ہے۔ |
| 413 | `payload_too_large` | باڈی 65,536 بائٹس سے بڑی ہے۔ |
| 429 | `rate_limited` | بہت زیادہ درخواستیں؛ حد دوبارہ شروع ہونے تک انتظار کریں۔ |
| 500 | `internal` | ہماری طرف مسئلہ ہوا؛ `correlation_id` ہمیں بھیجیں۔ |

## نتائج کے صفحات {#pages-of-results}

فہرست عام طور پر 20 اندراجات دیتی ہے؛ `limit` سے 1 تا 50 مانگ سکتے ہیں۔ مزید ہوں تو `meta.next_cursor` میں کرسر آتا ہے؛ اگلا صفحہ لینے کے لیے اسے انہی فلٹرز اور ترتیب کے ساتھ `cursor` میں بھیجیں۔ کرسر 15 منٹ چلتا ہے اور صرف اسی سوال کے لیے ہوتا ہے جس سے بنا تھا۔ `next_cursor` کی قدر `null` ہو تو تمام نتائج مل چکے ہیں۔

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**فلٹرز** ہر حصے کی نیچے دی گئی مختصر فہرست سے `<field>.<operator>` شکل کے query parameters ہیں: `eq` برابر، `lte` اس وقت یا اس سے پہلے، اور `cs` کا مطلب ہے کہ tags میں کاما سے الگ دی گئی تمام قدریں موجود ہوں۔ **ترتیب** `sort=<field>` ہے؛ شروع میں `-` نئی یا بڑی قدر پہلے لاتا ہے۔ ہر حصے میں درج پہلا انتخاب پہلے سے طے شدہ ہے۔

## درخواستوں کی حدود {#rate-limits}

ہر کلید ایک منٹ میں 120 درخواستیں کر سکتی ہے۔ اس کے علاوہ آپ کے پلان کی روزانہ حد تمام کلیدوں اور اسسٹنٹس کی مشترکہ ہے: Free میں 5,000، Pro میں 50,000، اور Team کے ہر رکن کے لیے 100,000؛ گنتی نصف شب UTC پر دوبارہ شروع ہوتی ہے۔ ہر جواب میں قریبی حد کے `RateLimit-Limit`، `RateLimit-Remaining` اور `RateLimit-Reset` (سیکنڈ) ہوتے ہیں۔ `429` میں `Retry-After` بھی ہوتا ہے۔

## حذف کرنا {#removing}

`DELETE` کے لیے متعلقہ حصے کی Delete اجازت چاہیے۔ رسائی کلید سے اندراج فوراً ہٹتا ہے اور بغیر باڈی کے `204` جواب آتا ہے۔

اسسٹنٹ کے ٹوکن سے ابھی کچھ حذف نہیں ہوتا۔ `202` جواب میں ویب سائٹ کا ایک لنک آتا ہے جس پر شخص جا کر ہاں کہتا ہے؛ لنک دس منٹ تک چلتا ہے:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

اگلی سنک پر ہر براؤزر کی ایکسٹینشن بھی اسے ہٹا دیتی ہے، جیسے آپ نے وہیں سے ہٹایا ہو۔

## آپ کی لائبریری {#your-library}

نیچے ہر حصہ فہرست کے لیے `GET /<part>` اور ایک اندراج کے لیے `GET /<part>/{id}` قبول کرتا ہے، جب تک کچھ اور نہ کہا گیا ہو۔ `POST /<part>` اندراج بناتا ہے، `PATCH /<part>/{id}` صرف بھیجی گئی فیلڈز بدلتا ہے، اور `DELETE /<part>/{id}` اسے ہٹاتا ہے۔ جن فیلڈز کو آپ کی قابلِ ترتیب فہرست میں نہیں رکھا گیا، وہ دکھائی تو دیتی ہیں مگر لکھی نہیں جاتیں۔

ان حصوں میں ویڈیو کی شناخت چار فیلڈز سے ہے: `platform` (سائٹ، مثلاً `youtube`، `netflix` یا `linkedin`)، `video_id` (اس سائٹ پر ویڈیو کی شناخت)، `video_url` (ویڈیو صفحے کا پتہ) اور `video_title`۔

### بک مارکس {#bookmarks}

ویڈیو میں محفوظ کیے گئے لمحات: وقت، لیبل، نوٹ اور رنگ۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `video_id`، `video_url` اور `label` (لازمی)، `position_seconds` (لازمی، ابتدا سے سیکنڈ)، `platform`، `video_title`، `note`، `color`، `tags`، `folder` |
| فلٹرز | `platform.eq`, `video_id.eq`, `tags.cs` |
| ترتیب | `-created_at` |
| اجازت | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

بک مارک محفوظ کرتے وقت ویڈیو کا وقت بھی درج ہوتا ہے، جیسے ایکسٹینشن میں۔

### نوٹس {#notes}

ویڈیو کے کسی وقت پر لکھے گئے نوٹس، زمرے اور tags سمیت۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `video_id`، `video_url` اور `content` (لازمی)، `position_seconds`، `platform`، `video_title`، `category` (`important`، `question`، `summary`، `action` یا `custom`)، `custom_category_name`، `color`، `tags` |
| فلٹرز | `platform.eq`, `video_id.eq` |
| ترتیب | `-created_at` |
| اجازت | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### مجموعے اور ان کی ویڈیوز {#collections}

`collections` آپ کے ویڈیو مجموعے ہیں، نئی تبدیلی پہلے۔ `collection_videos` ان میں موجود ویڈیوز ہیں؛ ایکسٹینشن کی طرح ویڈیو شامل یا ہٹتی ہے، بدلی نہیں جاتی۔

| | `collections` | `collection_videos` |
|---|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا | فہرست، ایک اندراج، بنانا، حذف کرنا |
| آپ طے کرتے ہیں | `name` (لازمی)، `description`، `is_public` | `collection_id`، `video_id` اور `video_url` (لازمی)، `platform`، `video_title`، `thumbnail`، `duration_seconds` |
| فلٹرز | | `collection_id.eq` |
| ترتیب | `-updated_at` | `-added_at` |
| اجازت | `collections` | `collections` |

عوامی مجموعہ اس کے لنک والا کوئی بھی شخص کھول سکتا ہے۔ `collection_id` آپ ہی کے کسی مجموعے کا ہونا چاہیے۔

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### فلیش کارڈز {#flashcards}

ویڈیوز سے بنے فلیش کارڈز: سامنے اور پیچھے کا متن، tags اور اگلی دہرائی کا وقت۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `video_id`، `video_url`، `front` اور `back` (لازمی)، `position_seconds`، `platform`، `video_title`، `tags`، اور دہرائی کا شیڈول: `ease_factor` (1.3 تا 10)، `interval_days`، `repetitions`، `next_review_at`، `last_reviewed_at` |
| فلٹرز | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| ترتیب | `next_review_at`, `-created_at` |
| اجازت | `flashcards` |

نئے کارڈ کی دہرائی ابھی واجب ہوتی ہے۔ دہرائی کے شیڈول میں تبدیلی سے دہرائی ریکارڈ ہوتی ہے، جیسے ایکسٹینشن میں۔ آج کے اختتام تک واجب کارڈز:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### سیکھنے کے راستے اور ان کی ویڈیوز {#learning-paths}

`learning_paths` آپ کے راستے ہیں، نئی تبدیلی پہلے۔ `path_videos` ہر راستے کی ترتیب وار ویڈیوز اور ان کی تکمیل کی حیثیت ہیں۔

| | `learning_paths` | `path_videos` |
|---|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `title` (لازمی)، `description`، `is_public`، `estimated_minutes` | `path_id`، `video_id` اور `video_url` (لازمی)، `platform`، `video_title`، `video_thumbnail`، `video_duration_seconds`، `position`، `is_completed`، `notes` |
| صرف دکھائی دیتی ہیں | `actual_minutes`، `last_accessed_at` (ایکسٹینشن گنتی ہے) | |
| فلٹرز | | `path_id.eq` |
| ترتیب | `-updated_at` | `position`, `-created_at` |
| اجازت | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### دیکھنے کی تاریخ {#watch-history}

Watch History آن ہونے پر دیکھی گئی ویڈیوز، آخری مقام اور دیکھنے کا دورانیہ۔ صرف ایکسٹینشن اندراج شامل کرتی ہے؛ API اسے پڑھ یا ہٹا سکتی ہے، بدل نہیں سکتی۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، حذف کرنا |
| دکھائی دیتی ہیں | ویڈیو کی فیلڈز، `video_thumbnail`، `video_duration_seconds`، `channel_name`، `last_position_seconds`، `watch_count`، `total_watch_seconds`، `first_watched_at`، `last_watched_at` |
| فلٹرز | `platform.eq`, `video_id.eq` |
| ترتیب | `-last_watched_at` |
| اجازت | `history` (پڑھنا اور حذف کرنا) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### بعد میں دیکھیں {#watch-later}

بعد میں دیکھنے کی فہرست، آپ کی ترتیب، ترجیح اور نوٹس کے ساتھ۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `video_id` اور `video_url` (لازمی)، `platform`، `video_title`، `video_thumbnail`، `video_duration_seconds`، `channel_name`، `position`، `priority` (`high`، `normal` یا `low`)، `notes` |
| ترتیب | `position`, `-added_at` |
| اجازت | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### ٹرانسکرپٹس {#transcripts}

`transcripts` محفوظ ٹرانسکرپٹس کی زبان اور فارمیٹ سمیت فہرست دیتا ہے، نئی پہلے؛ متن شامل نہیں کرتا تاکہ صفحہ مختصر رہے۔ `transcript_texts` اسی شناخت سے متن اور وقت والی سطروں سمیت ٹرانسکرپٹ پڑھتا ہے، یا نیا محفوظ کرتا ہے۔

| | `transcripts` | `transcript_texts` |
|---|---|---|
| طریقے | فہرست، ایک اندراج، حذف کرنا | ایک اندراج، بنانا |
| آپ طے کرتے ہیں | | `video_id`، `video_url` اور `content` (لازمی)، `platform`، `video_title`، `language`، `language_code`، `is_auto_generated`، `format` (`srt`، `vtt`، `txt` یا `json`)، `segments` |
| دکھائی دیتی ہیں | ویڈیو کی فیلڈز، `language`، `language_code`، `is_auto_generated`، `format`، `file_size`، `downloaded_at` | یہی، مزید `content` اور `segments` |
| ترتیب | `-downloaded_at` | |
| اجازت | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

درخواست کی باڈی زیادہ سے زیادہ 65,536 بائٹس کی ہے، لہٰذا اس سے لمبا ٹرانسکرپٹ باہر سے محفوظ نہیں کیا جا سکتا۔

### اسکرین شاٹس {#screenshots}

ویڈیو سے محفوظ فریم، ویڈیو کے وقت اور تصویر کے حجم کے ساتھ۔ صرف پڑھنے کی رسائی ہے؛ اسکرین شاٹ ایکسٹینشن میں ہٹایا جاتا ہے۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج |
| دکھائی دیتی ہیں | ویڈیو کی فیلڈز، `position_seconds`، `image_url`، `format` (`png`، `jpeg` یا `webp`)، `width`، `height`، `created_at` |
| ترتیب | `-created_at` |
| اجازت | `screenshots` (پڑھنا) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### ترتیبات اور شارٹ کٹس {#settings}

سنک شدہ ایکسٹینشن ترتیبات اور کی بورڈ شارٹ کٹس کا ایک اندراج، جس کی شناخت آپ کے اکاؤنٹ کی ہے۔ `settings` اور `keyboard_bindings` اسی شکل کے objects ہیں جس میں ایکسٹینشن انہیں محفوظ کرتی ہے۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بنانا، بدلنا |
| آپ طے کرتے ہیں | `settings`، `keyboard_bindings` |
| دکھائی دیتی ہیں | `settings_updated_at`، `keyboard_bindings_updated_at`، `updated_at` |
| اجازت | `settings` (پڑھنا اور بدلنا) |

فہرست میں آپ کا ایک اندراج ہوتا ہے، یا پہلی سنک سے پہلے کچھ نہیں ہوتا۔ محفوظ کرتے وقت نئی نقل برقرار رہتی ہے، جیسے آپ کے براؤزرز کے درمیان سنک میں۔

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### ڈیوائسز {#devices}

وہ براؤزر جن پر ایکسٹینشن جڑی ہے۔ یہ صرف ایکسٹینشن جوڑتے وقت شامل ہوتے ہیں؛ یہاں آپ نام بدل یا ہٹا سکتے ہیں۔ ہٹانے سے اس براؤزر پر ایکسٹینشن سائن آؤٹ ہو جاتی ہے۔

| | |
|---|---|
| طریقے | فہرست، ایک اندراج، بدلنا، حذف کرنا |
| آپ طے کرتے ہیں | `device_name` |
| دکھائی دیتی ہیں | `device_id`، `browser`، `platform`، `extension_version`، `last_seen_at`، `created_at` |
| ترتیب | `-last_seen_at` |
| اجازت | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## مشترکہ، صرف پڑھنے کے لیے {#shared-read-only}

ان حصوں میں دوسرے لوگ بھی شامل ہیں، اس لیے کلید کی کسی بھی اجازت کے باوجود API انہیں صرف پڑھتی ہے، لکھتی نہیں۔ ان سے ویب ہُک ایونٹس نہیں بھیجے جاتے۔

| حصہ | معلومات | فلٹر | ترتیب | اجازت |
|---|---|---|---|---|
| `watch_parties` | آپ کی میزبانی یا شمولیت والی پارٹیز: ویڈیو، `is_host`، آغاز، اختتام کا وقت اور ختم ہونے کی تاریخ۔ شمولیتی کوڈ شامل نہیں، کیونکہ وہ دعوت ہے۔ | | `-created_at` | `parties:read` |
| `party_members` | آپ کی ہر پارٹی میں لوگوں کی تعداد اور ان کے شامل ہونے کا وقت۔ `is_you` آپ کی نشاندہی کرتا ہے؛ کسی کا نام، تصویر یا اکاؤنٹ شامل نہیں۔ `id` رکنیت کی شناخت ہے، شخص کی نہیں۔ | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | لوگوں کی شیئر کردہ ویب سائٹ پلیئر اصلاحات؛ منظور شدہ اور آپ کی زیرِ انتظار اصلاحات، `is_yours` سمیت۔ حصہ ڈالنے والے کا نام نہیں۔ | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | عوامی بورڈ: عنوان، بیان، زمرہ، حالت، ووٹ اور `is_yours`۔ لکھنے والے کا نام نہیں۔ | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | آپ کے اپنے ووٹ: حمایت میں `1`، مخالفت میں `-1`۔ ووٹ کی `id` متعلقہ درخواست کی ہے۔ | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## آپ کا پلان اور استعمال {#your-plan-and-use}

`GET /account` ایک اندراج دیتا ہے: آپ کا پلان، روزانہ دستیاب اور آج استعمال شدہ AI رنز، کلاؤڈ اسٹوریج اور اس کا استعمال، اور `other_apps` جس میں [پلان جدول](./index.md#limits-on-each-plan) کی چار حدود اور `requestsToday` ہوتے ہیں۔ ہر کلید اسے بغیر کسی انتخاب کے پڑھ سکتی ہے۔

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## API کبھی کیا نہیں دیتی {#what-the-api-never-serves}

فیلڈز اجازت یافتہ فہرست سے آتی ہیں: اس صفحے پر نام نہ دی گئی کوئی کالم ڈیٹابیس سے باہر نہیں جاتی۔ [غیر قابلِ رسائی چیزوں](./index.md#what-it-never-reaches) کے علاوہ، ایکسٹینشن کی اپنی سنک کلیدیں، اسکرین شاٹ کے پیچھے محفوظ فائل کا ریکارڈ، ترتیبات آخری بار محفوظ کرنے والی ڈیوائس اور دیکھنے کی تاریخ کے اندر الگ نشستیں بھی شامل نہیں۔ کوئی کیلنڈر فیڈ نہیں۔

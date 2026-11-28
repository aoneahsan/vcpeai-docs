---
title: واجهة Video Controls Plus البرمجية
sidebar_label: واجهة API
description: واجهة REST API لمكتبتك في Video Controls Plus، مع صيغة الطلب والصفحات والأخطاء والحدود ومثال curl لكل جزء.
last_update:
  date: 2026-11-21
---

# واجهة Video Controls Plus البرمجية

**تقرأ واجهة API مكتبتك وتغيّرها عبر HTTPS باستخدام [مفتاح وصول](./access-keys.md).** يبدأ كل عنوان بـ:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

تجد الوصف المقروء آليًا في وثيقة OpenAPI 3.1 على <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>، ونسخة Markdown على <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. لا تحتاج أي منهما إلى مفتاح.

تضع الأمثلة التالية بداية العنوان والمفتاح في متغيرين للطرفية:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## توثيق الطلبات {#signing-requests}

أرسل المفتاح رمز bearer مع كل طلب، وأرسل الأجسام بصيغة JSON:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

يعمل هنا أيضًا رمز مساعد متصل. أما تسجيل الدخول إلى الموقع فلا يكفي؛ ترد الواجهة بـ`401` وتطلب مفتاح وصول أو رمز مساعد.

يعمل كل طلب باسمك. تحدد قاعدة البيانات الصفوف بأذوناتك أنت؛ فلا يستطيع المفتاح إرجاع صف لا يمكنك فتحه من الموقع.

## صيغة الاستجابة {#what-comes-back}

عنصر واحد:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

قائمة:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

خطأ:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

الأوقات بصيغة ISO 8601. المعرّفات من نوع UUID، إلا إذا ذكر جزء أدناه خلاف ذلك. لا تُخزَّن الاستجابات التي تحمل بياناتك مؤقتًا.

## الأخطاء {#errors}

| الحالة | `code` | ما حدث |
|---|---|---|
| 400 | `invalid_request` | الحقل أو المرشح أو الترتيب أو المؤشر غير صالح. تسرد `details.issues` الحقول المعنية. |
| 401 | `invalid_token` | المفتاح مفقود أو غير صحيح أو منتهي الصلاحية أو محذوف. |
| 403 | `scope_required` | لم يُمنح المفتاح هذا الإذن، وتذكره `details.scope`. |
| 404 | `not_found` | لا يوجد شيء بهذا العنوان لهذا المفتاح. يظهر عنصر شخص آخر مثل عنصر غير موجود. |
| 405 | `method_not_allowed` | لا يقبل هذا الجزء تلك الطريقة، مثل تغيير سجل المشاهدة. |
| 409 | `conflict` | العنصر موجود مسبقًا أو منعته إحدى قواعدنا. تذكر الرسالة السبب. |
| 413 | `payload_too_large` | يتجاوز جسم الطلب 65,536 بايت. |
| 429 | `rate_limited` | طلبات كثيرة؛ انتظر وقت إعادة ضبط الحد. |
| 500 | `internal` | حدث خلل لدينا. أرسل إلينا `correlation_id`. |

## صفحات النتائج {#pages-of-results}

ترجع القائمة 20 عنصرًا ما لم تطلب `limit` بين 1 و50. إذا بقيت عناصر، تحمل `meta.next_cursor` مؤشرًا؛ أرسله باسم `cursor` مع المرشحات والترتيب نفسيهما لجلب الصفحة التالية. يبقى المؤشر صالحًا 15 دقيقة ويعمل فقط مع الاستعلام الذي أنشأه. عندما تكون `next_cursor` بقيمة `null`، فقد وصلت إلى النهاية.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**المرشحات** معاملات استعلام بصيغة `<field>.<operator>`، وفق الخيارات المسموحة لكل جزء أدناه: `eq` للمساواة، و`lte` لما يساوي القيمة أو يسبقها، و`cs` لاحتواء الوسوم جميع القيم في قائمة مفصولة بفواصل. **الترتيب** هو `sort=<field>`، مع `-` في البداية للأحدث أو الأكبر أولًا، وفق قائمة كل جزء؛ أول ترتيب مذكور هو الافتراضي.

## حدود الطلبات {#rate-limits}

لكل مفتاح 120 طلبًا في الدقيقة. وتحدد خطتك أيضًا حدًا يوميًا لجميع مفاتيحك ومساعديك معًا: 5,000 على Free، و50,000 على Pro، و100,000 لكل عضو Team؛ يُعاد ضبطه عند منتصف الليل بتوقيت UTC. تحمل كل استجابة `RateLimit-Limit` و`RateLimit-Remaining` و`RateLimit-Reset` بالثواني للحد الأقرب إلى النفاد. وتضيف استجابة `429` ترويسة `Retry-After`.

## الحذف {#removing}

يتطلب `DELETE` تحديد إذن الحذف لذلك الجزء. باستخدام مفتاح وصول، يُحذف العنصر فورًا وتعود `204` بلا جسم.

باستخدام رمز مساعد، لا يُحذف شيء بعد؛ تعود `202` مع رابط يفتحه الشخص للموافقة على الموقع، صالح لعشر دقائق:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

تزيله الإضافة من كل متصفح عند المزامنة التالية، كما لو حذفته منها.

## مكتبتك {#your-library}

يقبل كل جزء أدناه `GET /<part>` للقائمة و`GET /<part>/{id}` لعنصر واحد، إلا إذا ذكر خلاف ذلك. ينشئ `POST /<part>` عنصرًا، ويغيّر `PATCH /<part>/{id}` الحقول التي ترسلها، ويزيله `DELETE /<part>/{id}`. تُعرض الحقول التي لم نذكر أنك تستطيع ضبطها، ولا تُكتب عبر الواجهة.

يُعرَّف الفيديو بأربعة حقول في هذه الأجزاء: `platform` للموقع مثل `youtube` أو `netflix` أو `linkedin`؛ و`video_id` لمعرّف الفيديو فيه؛ و`video_url` لعنوان صفحته؛ و`video_title` لعنوانه.

### الإشارات المرجعية {#bookmarks}

اللحظات التي حفظتها في فيديو، مع الوقت والتسمية والملاحظة واللون.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف |
| تضبط | `video_id` و`video_url` و`label` إلزامية، و`position_seconds` إلزامي بالثواني من البداية، ثم `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| المرشحات | `platform.eq`, `video_id.eq`, `tags.cs` |
| الترتيب | `-created_at` |
| الإذن | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

يُحدد موضع الفيديو عند حفظ الإشارة، كما في الإضافة.

### الملاحظات {#notes}

ملاحظات كتبتها عند لحظة في فيديو، مع تصنيف ووسوم.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف |
| تضبط | `video_id` و`video_url` و`content` إلزامية، ثم `position_seconds`, `platform`, `video_title`, `category` بقيمة `important` أو `question` أو `summary` أو `action` أو `custom`، و`custom_category_name`, `color`, `tags` |
| المرشحات | `platform.eq`, `video_id.eq` |
| الترتيب | `-created_at` |
| الإذن | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### المجموعات وفيديوهاتها {#collections}

تمثل `collections` مجموعات فيديوهاتك، مع عرض الأحدث تغييرًا أولًا. وتمثل `collection_videos` الفيديوهات داخلها؛ تُضاف أو تُزال، ولا تُغيّر، كما في الإضافة.

| | `collections` | `collection_videos` |
|---|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف | عرض القائمة والتفاصيل والإنشاء والحذف |
| تضبط | `name` إلزامي، ثم `description`, `is_public` | `collection_id` و`video_id` و`video_url` إلزامية، ثم `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| المرشحات | | `collection_id.eq` |
| الترتيب | `-updated_at` | `-added_at` |
| الإذن | `collections` | `collections` |

يمكن لأي شخص يحمل رابط مجموعة عامة فتحها. ويجب أن يعود `collection_id` إلى إحدى مجموعاتك.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### البطاقات التعليمية {#flashcards}

بطاقاتك التعليمية من الفيديوهات: وجه البطاقة وخلفها ووسومها وموعد مراجعتها.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف |
| تضبط | `video_id` و`video_url` و`front` و`back` إلزامية، ثم `position_seconds`, `platform`, `video_title`, `tags`، وجدول المراجعة: `ease_factor` من 1.3 إلى 10، و`interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| المرشحات | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| الترتيب | `next_review_at`, `-created_at` |
| الإذن | `flashcards` |

تستحق البطاقة الجديدة المراجعة الآن. يُسجَّل إتمام المراجعة بتغيير جدولها، كما في الإضافة. البطاقات المستحقة حتى نهاية اليوم:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### مسارات التعلم وفيديوهاتها {#learning-paths}

تمثل `learning_paths` مساراتك، الأحدث تغييرًا أولًا. وتمثل `path_videos` فيديوهات كل مسار بترتيبها وما أكملته منها.

| | `learning_paths` | `path_videos` |
|---|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف |
| تضبط | `title` إلزامي، ثم `description`, `is_public`, `estimated_minutes` | `path_id` و`video_id` و`video_url` إلزامية، ثم `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| تُعرض فقط | `actual_minutes`, `last_accessed_at` وتحسبهما الإضافة | |
| المرشحات | | `path_id.eq` |
| الترتيب | `-updated_at` | `position`, `-created_at` |
| الإذن | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### سجل المشاهدة {#watch-history}

الفيديوهات التي شاهدتها مع تشغيل سجل المشاهدة: موضع توقفك والمدة التي شاهدتها. لا تضيف إليه إلا الإضافة؛ فتقرأ الواجهة صفوفه وتحذفها، ولا تغيّرها.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والحذف |
| تُعرض | حقول الفيديو، ثم `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| المرشحات | `platform.eq`, `video_id.eq` |
| الترتيب | `-last_watched_at` |
| الإذن | `history` للقراءة والحذف |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### المشاهدة لاحقًا {#watch-later}

قائمة المشاهدة لاحقًا بترتيبك، مع الأولوية والملاحظات.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير والحذف |
| تضبط | `video_id` و`video_url` إلزاميان، ثم `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` بقيمة `high` أو `normal` أو `low`، و`notes` |
| الترتيب | `position`, `-added_at` |
| الإذن | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### النصوص المستخرجة {#transcripts}

تسرد `transcripts` النصوص التي حفظتها مع اللغة والصيغة، الأحدث أولًا، من دون النص نفسه حتى تبقى الصفحة صغيرة. تقرأ `transcript_texts` نصًا واحدًا مع سطوره الموقّتة بالمعرّف نفسه، أو تحفظ نصًا جديدًا.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| الطرق | عرض القائمة والتفاصيل والحذف | عرض التفاصيل والإنشاء |
| تضبط | | `video_id` و`video_url` و`content` إلزامية، ثم `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` بقيمة `srt` أو `vtt` أو `txt` أو `json`، و`segments` |
| تُعرض | حقول الفيديو، ثم `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | الحقول نفسها، إضافةً إلى `content` و`segments` |
| الترتيب | `-downloaded_at` | |
| الإذن | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

الحد الأقصى لجسم الطلب 65,536 بايت؛ لذا لا يمكن حفظ نص أطول من خارج الإضافة.

### لقطات الشاشة {#screenshots}

إطارات حفظتها من فيديوهات، مع موضعها في الفيديو وحجم الصورة. القراءة فقط؛ تُزال اللقطة من الإضافة.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل |
| تُعرض | حقول الفيديو، ثم `position_seconds`, `image_url`, `format` بقيمة `png` أو `jpeg` أو `webp`، و`width`, `height`, `created_at` |
| الترتيب | `-created_at` |
| الإذن | `screenshots` للقراءة |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### الإعدادات والاختصارات {#settings}

إعدادات الإضافة واختصارات لوحة المفاتيح المتزامنة: عنصر واحد معرّفه معرّف حسابك. يحتوي `settings` و`keyboard_bindings` كائنات بالشكل الذي تحفظه الإضافة.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والإنشاء والتغيير |
| تضبط | `settings`, `keyboard_bindings` |
| تُعرض | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| الإذن | `settings` للقراءة والتغيير |

تضم القائمة عنصرك الواحد، أو تكون فارغة قبل مزامنتك الأولى. يحتفظ الحفظ بالنسخة الأحدث، مثل المزامنة بين متصفحاتك.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### الأجهزة {#devices}

المتصفحات التي تتصل عليها الإضافة بحسابك. لا تُضاف إلا عند ربط الإضافة؛ ويمكنك إعادة تسميتها أو إزالتها هنا. إزالة متصفح تسجّل خروج الإضافة عليه.

| | |
|---|---|
| الطرق | عرض القائمة والتفاصيل والتغيير والحذف |
| تضبط | `device_name` |
| تُعرض | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| الترتيب | `-last_seen_at` |
| الإذن | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## أجزاء مشتركة للقراءة فقط {#shared-read-only}

تتعلق هذه الأجزاء بأشخاص آخرين؛ لذلك تقرؤها الواجهة ولا تكتب إليها مهما كانت أذونات المفتاح. ولا تُرسل أحداث ويب هوك.

| الجزء | ما يحمله | المرشح | الترتيب | الإذن |
|---|---|---|---|---|
| `watch_parties` | حفلات تستضيفها أو انضممت إليها: الفيديو، و`is_host`، وأوقات بدئها ونهايتها. لا يظهر رمز الانضمام لأنه الدعوة نفسها. | | `-created_at` | `parties:read` |
| `party_members` | عدد أعضاء حفلاتك وأوقات انضمامهم. تحدد `is_you` صفك؛ لا يظهر اسم أي شخص أو صورته أو حسابه، و`id` معرّف للعضوية لا للشخص. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | إصلاحات مشغّلات المواقع التي شاركها الناس: المعتمدة وإصلاحاتك المنتظرة، مع `is_yours`. لا يُذكر المساهم. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | لوحة الطلبات العامة: العنوان والوصف والتصنيف والحالة والأصوات و`is_yours`. لا يُذكر الكاتب. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | أصواتك: `1` للموافقة و`-1` للرفض. يكون `id` معرّف الطلب الذي صوّتَّ عليه. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## خطتك واستخدامك {#your-plan-and-use}

يعيد `GET /account` عنصرًا واحدًا: خطتك وحد طلبات الذكاء الاصطناعي اليومية وما استخدمته اليوم، وسعتك السحابية وما استهلكته منها، و`other_apps` الذي يحمل حدودك الأربعة من [جدول الخطط](./index.md#limits-on-each-plan) مع `requestsToday`. يستطيع كل مفتاح قراءته بلا إذن إضافي.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## ما لا تقدمه الواجهة أبدًا {#what-the-api-never-serves}

الحقول قائمة سماح: أي عمود لم يُذكر في هذه الصفحة لا يخرج من قاعدة بياناتنا. إضافةً إلى قائمة [ما لا يمكن الوصول إليه](./index.md#what-it-never-reaches)، يمنع ذلك خروج مفاتيح المزامنة الخاصة بالإضافة، وسجل الملف المخزّن وراء لقطة الشاشة، والجهاز الذي حفظ إعداداتك آخر مرة، وجلسات المشاهدة المفصلة داخل سجلك. ولا توجد خلاصة تقويم.

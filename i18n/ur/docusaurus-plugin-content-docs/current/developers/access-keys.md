---
title: رسائی کلیدیں
description: اپنے ٹول کے لیے Video Controls Plus کی رسائی کلید بنائیں، اس کی اجازتیں اور آخری تاریخ طے کریں، پھر اسے دکھائیں، بدلیں یا ہٹائیں۔
last_update:
  date: 2026-11-21
---

# رسائی کلیدیں

**رسائی کلید ایک ٹول کے پاس ورڈ کی طرح کام کرتی ہے:** مطالعے کی شیٹ سنک، اسکرپٹ یا فون شارٹ کٹ کے لیے۔ ٹول ہر [API](./api.md) درخواست کے ساتھ کلید بھیجتا ہے۔ کلید صرف لائبریری کے ان حصوں تک پہنچتی ہے جو آپ بناتے وقت منتخب کرتے ہیں۔ کلید `vcp_pat_` کے بعد ایک لمبے بے ترتیب متن پر مشتمل ہوتی ہے۔ اسے کسی مشترکہ چیز میں شامل نہ کریں۔

## کلید بنانا {#making-a-key}

1. ویب سائٹ پر **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** کھولیں اور **Make a key** دبائیں۔
2. اسے **Name** دیں، تاکہ معلوم رہے کون سا ٹول اسے استعمال کرتا ہے؛ مثلاً "مطالعے کی شیٹ کا سنک"۔
3. قابلِ رسائی حصے منتخب کریں۔ ہر حصے کے تین خانے ہیں: **Read**، **Change** اور **Delete**۔ کم از کم ایک حصے کے لیے Read منتخب کریں۔
4. **Stops working after** میں 30، 90 یا 365 دن، یا **Never** منتخب کریں۔ Never صرف ایسی کلید کے لیے دستیاب ہے جو محض پڑھ سکتی ہو؛ بدلنے یا حذف کرنے والی کلید کی آخری تاریخ لازمی ہے۔
5. **Make key** دبائیں اور کلید نقل کر لیں۔ دوبارہ سائن اِن کے بغیر اسے پورا دیکھنے کا یہی ایک موقع ہے۔

کلید بنانے کے لیے پچھلے دس منٹ کا سائن اِن ضروری ہے؛ [دو مرحلہ جاتی سائن اِن](./two-step-sign-in.md) آن ہو تو اس کا کوڈ بھی چاہیے۔ نئی کلید کی اطلاع ای میل سے ملتی ہے؛ ای میل میں کلید نہیں ہوتی۔

## ہر اجازت کی رسائی {#what-each-tick-reaches}

منتخب خانہ کلید کی اجازت بن جاتا ہے۔ غیر مجاز درخواست پر API، مطلوبہ اجازت کے نام سمیت، `403 scope_required` دیتی ہے۔

| ویب سائٹ کا حصہ | Read | Change | Delete | API میں شامل حصے |
|---|---|---|---|---|
| بک مارکس | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| نوٹس | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| مجموعے | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| فلیش کارڈز | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| سیکھنے کے راستے | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| دیکھنے کی تاریخ | `history:read` | | `history:delete` | `watch_history` |
| بعد میں دیکھیں | `later:read` | `later:write` | `later:delete` | `watch_later` |
| ٹرانسکرپٹس | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| اسکرین شاٹس | `screenshots:read` | | | `screenshots` |
| ترتیبات اور شارٹ کٹس | `settings:read` | `settings:write` | | `settings` |
| ڈیوائسز | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| واچ پارٹیز | `parties:read` | | | `watch_parties`, `party_members` |
| کمیونٹی کی سائٹ اصلاحات | `fixes:read` | | | `site_fixes` |
| فیچر درخواستیں | `requests:read` | | | `feature_requests`, `request_votes` |

خالی خانے کی اجازت ویب سائٹ نہیں دیتی: دیکھنے کی تاریخ بدلی نہیں جا سکتی، اسکرین شاٹس اور مشترکہ حصے صرف پڑھے جا سکتے ہیں، اور ترتیبات حذف نہیں کی جا سکتیں۔ ہر کلید انتخاب کے بغیر بھی اپنا پلان اور آج کا استعمال (`account:read`، API کا `account` حصہ) پڑھ سکتی ہے۔

## کلید دوبارہ دیکھنا {#showing-a-key-again}

کلید پر **Show again** دبائیں۔ اسے صرف پچھلے دس منٹ میں سائن اِن کے بعد دکھایا جاتا ہے، تاکہ کھلا چھوڑا ہوا براؤزر اسے ظاہر نہ کر سکے؛ دو مرحلہ جاتی سائن اِن آن ہو تو کوڈ بھی درکار ہے۔ یاد رکھا ہوا براؤزر بھی یہاں کوڈ مانگتا ہے۔ کلید تھوڑی دیر اسکرین پر رہتی ہے؛ نقل کرنے کے بعد اسے بند کر دیں۔

## کلید بدلنا {#replacing-a-key}

کلید افشا ہونے کا امکان ہو یا نئی کلید چاہیے ہو تو **Replace** دبائیں۔ نئی کلید کا نام اور اجازتیں وہی رہتی ہیں۔ پرانی کلید 24 گھنٹے تک چلتی ہے تاکہ ٹول میں اسے بدل سکیں، پھر بند ہو جاتی ہے۔

## کلید ہٹانا {#removing-a-key}

**Remove** دبائیں، پھر تصدیق کے لیے دوبارہ دبائیں۔ اس کلید کی اگلی درخواست پر "اجازت نہیں" (`401 invalid_token`) ملتا ہے۔ آپ کی لائبریری، دوسری کلیدیں اور اسسٹنٹس جوں کے توں رہتے ہیں۔

## کلید کی اجازتیں جانچنا {#checking-what-a-key-can-do}

`GET /token` کلید کی قسم اور مرتب اجازتیں بتاتا ہے:

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

**Other apps** میں ہر کلید کے بننے، آخری استعمال اور بند ہونے کا وقت بھی نظر آتا ہے۔

## کتنی کلیدیں رکھ سکتے ہیں {#how-many-you-can-have}

Free میں 5، Pro میں 25 اور Team میں ہر رکن کے لیے 50 کلیدیں رکھی جا سکتی ہیں۔ ہٹائی ہوئی کلید شمار نہیں ہوتی۔ حد پوری ہو جائے تو ایک ہٹائیں، یا [Plans](https://vcpeai.aoneahsan.com/plans) پر زیادہ حد والا پلان منتخب کریں۔

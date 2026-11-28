---
title: एक्सेस कुंजियाँ
description: अपने टूल के लिए Video Controls Plus एक्सेस कुंजी बनाएँ, उसकी पहुँच और समाप्ति चुनें, फिर ज़रूरत पर उसे दिखाएँ, बदलें या हटाएँ।
last_update:
  date: 2026-11-21
---

# एक्सेस कुंजियाँ

**एक्सेस कुंजी एक टूल का पासवर्ड है:** पढ़ाई की शीट का सिंक, स्क्रिप्ट या फ़ोन शॉर्टकट। टूल हर [API](./api.md) अनुरोध के साथ इसे भेजता है। कुंजी केवल उन लाइब्रेरी हिस्सों तक पहुँचती है जिन्हें बनाते समय आपने चुना था। कुंजियाँ `vcp_pat_` के बाद लंबी यादृच्छिक स्ट्रिंग जैसी दिखती हैं। साझा की जाने वाली किसी चीज़ में कुंजी न रखें।

## कुंजी बनाएँ {#making-a-key}

1. वेबसाइट पर **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** खोलकर **Make a key** दबाएँ।
2. **Name** दें जिससे टूल पहचानें, जैसे “Study sheet sync”।
3. पहुँच चुनें। हर हिस्से में **Read**, **Change** और **Delete** के बॉक्स हैं। कम से कम एक हिस्सा पढ़ने की अनुमति दें।
4. **Stops working after** में 30, 90 या 365 दिन, या **Never** चुनें। Never केवल पढ़ने वाली कुंजी के लिए है। बदलने या हटाने की अनुमति वाली कुंजी की समाप्ति तारीख ज़रूरी है।
5. **Make key** दबाकर कुंजी कॉपी करें। दोबारा साइन-इन के बिना यह पूरी कुंजी देखने का एकमात्र मौका है।

कुंजी बनाने के लिए पिछले दस मिनट का साइन-इन और, [दो-चरणीय साइन-इन](./two-step-sign-in.md) चालू हो तो, उसका कोड चाहिए। कुंजी बनने का ईमेल भेजते हैं; उसमें कुंजी नहीं होती।

## हर अनुमति की पहुँच {#what-each-tick-reaches}

चुना बॉक्स कुंजी की अनुमति बनता है। बिना अनुमति का काम माँगने पर API `403 scope_required` और ज़रूरी अनुमति बताता है।

| वेबसाइट का हिस्सा | Read | Change | Delete | API में शामिल भाग |
|---|---|---|---|---|
| Bookmarks | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| Notes | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| Collections | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| Flashcards | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| Learning paths | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| Watch history | `history:read` | | `history:delete` | `watch_history` |
| Watch later | `later:read` | `later:write` | `later:delete` | `watch_later` |
| Transcripts | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| Screenshots | `screenshots:read` | | | `screenshots` |
| Settings and shortcuts | `settings:read` | `settings:write` | | `settings` |
| Devices | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| Watch parties | `parties:read` | | | `watch_parties`, `party_members` |
| Community site fixes | `fixes:read` | | | `site_fixes` |
| Feature requests | `requests:read` | | | `feature_requests`, `request_votes` |

खाली बॉक्स का विकल्प वेबसाइट देती ही नहीं: Watch History बदली नहीं जा सकती; स्क्रीनशॉट और साझा हिस्से केवल पढ़े जा सकते हैं; सेटिंग्स हटाई नहीं जा सकतीं। हर कुंजी बिना अलग बॉक्स चुने भी आपका प्लान और आज का उपयोग पढ़ सकती है (`account:read`, API का `account` भाग)।

## कुंजी फिर दिखाएँ {#showing-a-key-again}

कुंजी पर **Show again** दबाएँ। हम उसे केवल साइन-इन के दस मिनट के भीतर दिखाते हैं, ताकि खुला छोड़ा ब्राउज़र उसे न निकाल सके। दो-चरणीय साइन-इन चालू हो तो उसका कोड भी चाहिए; याद रखा ब्राउज़र भी यहाँ कोड माँगता है। कुंजी थोड़ी देर स्क्रीन पर रहती है। कॉपी करने के बाद बंद करें।

## कुंजी बदलें {#replacing-a-key}

कुंजी लीक होने की आशंका हो या नई चाहिए तो **Replace** दबाएँ। वही नाम और अनुमतियों वाली नई कुंजी मिलेगी। पुरानी कुंजी बदलने के लिए 24 घंटे चलती रहती है, फिर बंद हो जाती है।

## कुंजी हटाएँ {#removing-a-key}

**Remove** दबाएँ और पुष्टि के लिए फिर दबाएँ। अगला अनुरोध `401 invalid_token` “not allowed” पाता है। लाइब्रेरी, दूसरी कुंजियाँ और assistants नहीं बदलते।

## कुंजी की पहुँच जाँचें {#checking-what-a-key-can-do}

`GET /token` कुंजी का प्रकार और क्रमबद्ध अनुमतियाँ लौटाता है:

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

**Other apps** पर हर कुंजी के बनने, आखिरी इस्तेमाल और समाप्त होने का समय भी दिखता है।

## कितनी कुंजियाँ रख सकते हैं {#how-many-you-can-have}

Free पर 5, Pro पर 25 और Team में हर सदस्य पर 50। हटाई गई कुंजी नहीं गिनी जाती। सीमा पूरी हो तो एक हटाएँ या [Plans](https://vcpeai.aoneahsan.com/plans) पर अधिक सीमा वाला प्लान लें।

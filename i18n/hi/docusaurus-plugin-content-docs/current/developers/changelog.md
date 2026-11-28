---
title: डेवलपर बदलाव
description: Video Controls Plus API, assistant पते, वेबहुक और दो-चरणीय साइन-इन के बदलाव, नए से पुराने क्रम में।
last_update:
  date: 2026-11-21
---

# डेवलपर बदलाव

Video Controls Plus से जोड़कर कुछ बनाने वालों के लिए बदलाव, नए से पुराने क्रम में। उत्पाद की रिलीज़ [मुख्य बदलाव सूची](/changelog) में हैं।

## 2026-11-21: दूसरे ऐप और दो-चरणीय साइन-इन {#2026-11-21}

- **नया: [एक्सेस कुंजियाँ](./access-keys.md)** (`vcp_pat_…`), **Account → Other apps** पर बनती हैं। हर कुंजी को अलग Read, Change और Delete अनुमतियाँ और, केवल पढ़ने वाली न हो तो, समाप्ति तारीख मिलती है।
- **नया: [API](./api.md), संस्करण 1**, बुकमार्क, नोट्स, collections, flashcards, learning paths, watch history, watch later, transcripts, screenshots, settings और devices के लिए; watch parties, site fixes, feature requests और प्लान को केवल पढ़ने के लिए। OpenAPI 3.1 दस्तावेज़ `/v1/openapi.json` पर है।
- **नया: [assistant पता](./assistants.md)** Claude, ChatGPT, Claude Code और Cursor के लिए। Assistant का हटाने वाला काम वेबसाइट पर आपकी मंज़ूरी का इंतज़ार करता है।
- **नया: [वेबहुक](./webhooks.md)** Standard Webhooks से हस्ताक्षरित; चुनने के लिए 32 इवेंट और एक टेस्ट संदेश। शुरू में छोटे संदेश; हर पते पर **Include what was written** चुन सकते हैं।
- **नया: [दो-चरणीय साइन-इन](./two-step-sign-in.md)** वेबसाइट पर, दस रिकवरी कोड और वैकल्पिक 7 दिन के लिए याद रहने वाला ब्राउज़र। चालू होने पर जुड़ा एक्सटेंशन भी 7 दिन के लिए विश्वसनीय रहता है।
- **सीमाएँ:** Free में 5 कुंजियाँ, रोज़ 5,000 अनुरोध, 3 वेबहुक पते और 3 assistants; Pro में 25, 50,000, 20 और 10; Team में हर सदस्य को 50, 100,000, 40 और 25।

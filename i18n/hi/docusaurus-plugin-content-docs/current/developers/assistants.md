---
title: Claude, ChatGPT, Claude Code या Cursor जोड़ें
sidebar_label: Assistants
description: Assistant को Video Controls Plus का पता दें, वेबसाइट पर उसकी पहुँच चुनें और उससे अपने नोट्स, बुकमार्क और फ्लैशकार्ड पूछें।
last_update:
  date: 2026-11-21
---

# Assistants

**Assistant जोड़कर अपनी लाइब्रेरी के बारे में पूछें:** “पिछले सप्ताह के व्याख्यानों के कौन-से फ्लैशकार्ड दोहराने हैं?”, “इस वीडियो के नोट्स का सारांश बनाओ”, “यह वार्ता Watch Later में जोड़ो”। Claude, ChatGPT, Claude Code और Cursor एक पते से जुड़ते हैं:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

Assistant आपको Video Controls Plus वेबसाइट पर ले जाता है। वहाँ साइन इन करके उसकी पहुँच चुनें और मंज़ूरी दें। उसे आपका पासवर्ड या कुंजी नहीं देनी पड़ती। पता कॉपी बटन सहित **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** पर भी है।

## जोड़ें {#connecting}

### Claude {#claude}

1. Claude में **Settings → Connectors** खोलकर **Add custom connector** चुनें।
2. नाम Video Controls Plus रखें और ऊपर वाला पता चिपकाएँ।
3. Claude हमारी वेबसाइट खोलेगा। पहुँच चुनकर मंज़ूरी दें।

### ChatGPT {#chatgpt}

1. ChatGPT में **Settings → Apps and connectors**, फिर **Advanced** खोलें और developer mode चालू करें।
2. **Create** चुनें, नाम Video Controls Plus रखें और पता चिपकाएँ।
3. ChatGPT हमारी वेबसाइट खोलेगा। पहुँच चुनकर मंज़ूरी दें।

### Claude Code {#claude-code}

1. टर्मिनल में चलाएँ:

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Claude Code में `/mcp` चलाकर साइन-इन के लिए Video Controls Plus चुनें।
3. ब्राउज़र हमारी वेबसाइट खोलेगा। पहुँच चुनकर मंज़ूरी दें।

### Cursor {#cursor}

1. Cursor में **Settings → Tools & MCP** खोलकर **New MCP server** चुनें।
2. खुली फ़ाइल में ये पंक्तियाँ जोड़कर सहेजें:

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor में **Needs login** दिखेगा। उसे दबाएँ, वेबसाइट पर पहुँच चुनें और मंज़ूरी दें।

## आप क्या मंज़ूर करते हैं {#what-you-approve}

मंज़ूरी पेज assistant का नाम और लौटने की जगह बताता है। फिर [एक्सेस कुंजी](./access-keys.md#what-each-tick-reaches) जैसे Read, Change और Delete बॉक्स दिखते हैं। Delete शुरू में बंद है। कम से कम एक पढ़ने की अनुमति चुनें या **Deny** दबाएँ। मना किए assistant को “denied” उत्तर मिलता है और कोई पहुँच नहीं।

[दो-चरणीय साइन-इन](./two-step-sign-in.md) चालू हो तो मंज़ूरी के लिए कोड लिखें। याद रखा ब्राउज़र केवल पढ़ने वाले कनेक्शन पर कोड छोड़ता है। बदलने या हटाने की अनुमति के लिए पिछले दस मिनट में साइन-इन भी चाहिए। Assistant जुड़ने पर ईमेल भेजते हैं।

जो पढ़ता है, आपकी ओर से पढ़ता है। आपका साइन-इन, कुंजियाँ या किसी दूसरे की लाइब्रेरी नहीं देखता।

## हटाने के लिए आपकी मंज़ूरी चाहिए {#deleting-waits-for-your-yes}

Delete चुना हो तब भी assistant खुद कुछ नहीं हटाता। नोट हटाने को कहें तो वह लिंक देता है; अनुरोध वेबसाइट पर रुकता है:

1. Assistant लिंक देता है और **Other apps** में अनुरोध **Asked to delete, waiting for you** के अंतर्गत दिखता है।
2. लिंक खोलें। पेज बताता है क्या हटेगा, किस वीडियो पर है, कब पूछा गया और जवाब की आखिरी घड़ी।
3. **Delete the note** (या bookmark, card आदि) दबाएँ, या **Keep it** चुनें।

अनुरोध दस मिनट तक रहता है। फिर कुछ नहीं हटता; अभी भी हटाना हो तो assistant से दोबारा कहें। अगली जाँच पर assistant को “deleted” उत्तर मिलता है।

## नाम बदलें और कनेक्शन हटाएँ {#renaming-and-disconnecting}

**Other apps** में हर assistant के साथ जुड़ने और अंतिम इस्तेमाल का समय है। पहचानने योग्य नाम दें या **Disconnect** दबाकर फिर पुष्टि करें। उसका अगला अनुरोध अस्वीकार होगा।

## कितने जोड़ सकते हैं {#how-many-you-can-connect}

Free पर 3, Pro पर 10 और Team में हर सदस्य पर 25 कनेक्शन। वही assistant दोबारा जोड़ने पर पुरानी मंज़ूरी बदलती है; अतिरिक्त जगह नहीं लेता। उसके अनुरोध आपकी कुंजियों के साथ दैनिक सीमा में गिने जाते हैं ([सीमाएँ](./index.md#limits-on-each-plan))।

## Assistant आपका लिखा पाठ पढ़ता है {#your-own-writing}

नोट्स, लेबल और कार्ड का पाठ assistant को डेटा के रूप में ठीक वैसे मिलता है जैसा आपने लिखा। नोट में कोई निर्देश चिपकाया हो तो वह भी लाइब्रेरी का पाठ बनकर दिखता है। बातचीत के लिए जितने हिस्से ज़रूरी हों, उतने ही चुनें।

## MCP client डेवलपर के लिए {#for-mcp-client-developers}

| | |
|---|---|
| Transport | Streamable HTTP, stateless, एक endpoint |
| साइन-इन | OAuth 2.1 with PKCE, हमारे Supabase authorization server `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` से |
| Discovery | Protected-resource metadata: `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| Token न हो | metadata की ओर इशारा करता `WWW-Authenticate` header सहित `401` |
| एक्सेस कुंजी | खुद चलाए client में `vcp_pat_` कुंजी bearer token भी बन सकती है |
| सीमाएँ | हर कनेक्शन पर 120 अनुरोध प्रति मिनट, साथ में प्लान की दैनिक सीमा |

टूल [API](./api.md#your-library) के उन्हीं हिस्सों से बनते हैं: `list_<part>`, `get_<part>`, `create_<part>`, `update_<part>` और `prepare_delete_<part>`, जहाँ उस हिस्से में अनुमति हो। `tools/list` केवल इस कनेक्शन की अनुमतियों वाले टूल दिखाता है। साझा हिस्से और प्लान के लिए केवल list और get हैं; वॉइस नोट्स और AI इतिहास किसी टूल में नहीं।

---
title: "网站：其他应用与两步登录"
description: "通过脚本、Claude、ChatGPT 或自己的服务器访问资料库，并在网站的 Google 登录后添加手机验证码。"
slug: "other-apps-and-two-step"
date: 2026-11-21T12:00:00Z
last_update:
  date: 2026-11-21
---

网站账户增加了两个页面：**其他应用**，用于连接访问个人资料库的工具；**安全**，用于在 Google 登录后增加第二步验证。

- **新增：访问密钥。**在“其他应用”中为脚本或电子表格同步创建密钥，勾选可访问的内容，再通过 API 使用。[访问密钥](/docs/developers/access-keys)。
- **新增：AI 助手。**连接 Claude、ChatGPT、Claude Code 或 Cursor，询问你的笔记、书签和闪卡。助手请求删除的内容会留在网站上，等待你确认。[AI 助手](/docs/developers/assistants)。
- **新增：Webhook。**保存笔记或书签时，你的服务器会立即收到一条简短的签名消息。除非勾选“包含写入内容”，消息不会包含你写下的文字。[Webhook](/docs/developers/webhooks)。
- **新增：两步登录。**在 Google 登录后输入手机上的 6 位验证码，还会获得 10 个恢复码。你可以勾选“记住此浏览器 7 天”。启用后，扩展每次保持连接 7 天，随后要求重新连接。[两步登录](/docs/developers/two-step-sign-in)。

访问密钥、AI 助手和 Webhook 适用于包括 Free 在内的所有计划。开发者相关内容都在[Video Controls Plus 开发者文档](/docs/developers)。

---
title: 连接 Claude、ChatGPT、Claude Code 或 Cursor
sidebar_label: 助手
description: 将 Video Controls Plus 地址提供给助手，在网站选择它可访问的内容，然后询问自己的笔记、书签和闪卡。
last_update:
  date: 2026-11-21
---

# 助手

**连接助手后，就可以向它询问自己的资料库：**“上周讲座的哪些闪卡该复习了？”“把这个视频的笔记整理成摘要。”“把这段演讲加入稍后观看。”Claude、ChatGPT、Claude Code 和 Cursor 使用同一个地址：

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

助手会带你前往 Video Controls Plus 网站，在那里登录、勾选访问范围并批准。你无需向助手交出密码或密钥。“账户”→[“其他应用”](https://vcpeai.aoneahsan.com/account/apps)也显示此地址，并提供复制按钮。

## 连接步骤 {#connecting}

### Claude {#claude}

1. 在 Claude 打开 **Settings → Connectors**，选择 **Add custom connector**。
2. 名称填 Video Controls Plus，粘贴上述地址。
3. Claude 会打开我们的网站；勾选可访问的内容并批准。

### ChatGPT {#chatgpt}

1. 在 ChatGPT 打开 **Settings → Apps and connectors**，进入 **Advanced**，开启开发者模式。
2. 选择 **Create**，名称填 Video Controls Plus，并粘贴上述地址。
3. ChatGPT 会打开我们的网站；勾选可访问的内容并批准。

### Claude Code {#claude-code}

1. 在终端运行：

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. 在 Claude Code 中运行 `/mcp`，选择 Video Controls Plus 登录。
3. 浏览器会打开我们的网站；勾选可访问的内容并批准。

### Cursor {#cursor}

1. 在 Cursor 打开 **Settings → Tools & MCP**，选择 **New MCP server**。
2. 在打开的文件中加入以下内容并保存：

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor 会显示 **Needs login**。按下后，在我们的网站勾选访问范围并批准。

## 你批准什么 {#what-you-approve}

批准页面会列出助手名称和返回位置，并显示与[访问密钥](./access-keys.md#what-each-tick-reaches)相同的“读取”“修改”“删除”选项。“删除”默认关闭。至少勾选一项可读取内容，也可以按“拒绝”；被拒绝的助手会收到拒绝结果，无法访问任何内容。

开启[两步登录](./two-step-sign-in.md)后，批准时需要验证码。已记住的浏览器只有在连接仅为只读时才能跳过验证码。允许助手修改或删除，还需要过去 10 分钟内的登录。助手连接后，我们会发送通知邮件。

助手以你的身份读取你自己的文字，无法查看你的登录资料、密钥或他人的资料库。

## 删除操作等待你确认 {#deleting-waits-for-your-yes}

即使勾选“删除”，助手也不能自行删除。你让它移除一条笔记时，它只会得到确认链接，请求会在网站等待：

1. 助手把链接给你，“其他应用”的“请求删除，等待确认”中也会显示。
2. 打开链接。页面列出要删除的内容、所属视频、请求时间和确认期限。
3. 按“删除笔记”（或书签、卡片等），也可以按“保留”。

请求有效期为 10 分钟，超时后不会删除。若仍想删除，可重新向助手提出请求。助手下次检查时会收到“已删除”的结果。

## 重命名与断开连接 {#renaming-and-disconnecting}

“其他应用”会列出每个已连接助手及其连接、上次使用时间。你可以改成容易辨认的名称，也可以按“断开连接”，再按一次确认。之后它的请求都会被拒绝。

## 连接数量 {#how-many-you-can-connect}

Free 可连接 3 个助手，Pro 为 10 个，Team 每位成员为 25 个。重新连接同一助手会替换旧授权，不多占名额。助手请求与你的密钥请求共同计入每日额度（见[限制](./index.md#limits-on-each-plan)）。

## 助手读取你的原文 {#your-own-writing}

笔记、标签和卡片文字会按你写下的样子作为数据发送给助手。如果你把指令粘贴进笔记，助手也会将其视作资料库文字。只勾选当前对话所需的部分。

## MCP 客户端开发者说明 {#for-mcp-client-developers}

| 项目 | 内容 |
|---|---|
| 传输 | 无状态的 Streamable HTTP，单一端点 |
| 登录 | OAuth 2.1 + PKCE，通过 `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` 的 Supabase 授权服务器 |
| 发现 | 受保护资源元数据位于 `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| 无令牌时 | 返回 `401`，`WWW-Authenticate` 标头指向该元数据 |
| 访问密钥 | 对你自己运行的客户端，`vcp_pat_` 密钥也可用作 bearer 令牌 |
| 限制 | 每连接每分钟 120 次请求，另受计划每日额度限制 |

工具来自与 [API](./api.md#your-library)相同的资源：按资源允许的方法提供 `list_<part>`、`get_<part>`、`create_<part>`、`update_<part>` 和 `prepare_delete_<part>`。`tools/list` 只会列出该连接获准使用的工具。共享资源和计划仅有列表与单项读取工具；语音笔记和 AI 历史不在任何工具中。

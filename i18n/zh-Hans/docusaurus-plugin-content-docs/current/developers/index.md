---
title: Video Controls Plus 开发者文档
sidebar_label: 概览
description: 通过脚本、Claude、ChatGPT 或自己的服务器，读取或修改你在 Video Controls Plus 中的书签、笔记、闪卡等内容。
last_update:
  date: 2026-11-21
---

# Video Controls Plus 开发者文档

**你可以从扩展之外访问自己的 Video Controls Plus 资料库，但需要自行连接工具：**使用访问密钥的脚本、Claude 或 ChatGPT 等助手，或通过 Webhook 接收变更的自有服务器。三者都在网站的“账户”→[“其他应用”](https://vcpeai.aoneahsan.com/account/apps)中设置，包括 Free 在内的所有计划都能使用。

每把密钥、每个助手和 Webhook 只能访问你勾选的部分，并以你的身份执行。它看不到你自己在网站上无权查看的内容。

## 3 种接入方式 {#three-ways-in}

| 你想做什么 | 使用 | 页面 |
|---|---|---|
| 让脚本、电子表格同步或手机快捷指令读写资料库 | 访问密钥和 REST API | [访问密钥](./access-keys.md)、[API](./api.md) |
| 向 Claude、ChatGPT、Claude Code 或 Cursor 询问笔记和闪卡 | 助手连接地址（MCP） | [助手](./assistants.md) |
| 保存笔记或书签时立即通知自己的服务器 | Webhook 地址 | [Webhook](./webhooks.md) |

## 外部应用可以访问什么 {#what-an-outside-app-can-reach}

只限你勾选的内容，也只限你自己的内容：

- **读取和修改**书签、笔记、合集及其中的视频、闪卡、学习路径及其中的视频、稍后观看、文字稿、设置，以及扩展所连接的浏览器。
- **读取和删除**观看历史。只有扩展会在“观看历史”开启时添加记录。
- **读取**截图。删除截图仍需在扩展中操作。
- **删除**某类内容，需要勾选该类的“删除”权限。访问密钥会立即删除；助手请求删除时，网站会等待你确认。
- **只读：**你主持或加入的同步观看、社区网站修复，以及含你投票记录的功能请求。
- **始终可读：**你的计划、限制和今天的使用量。

### 绝不会访问什么 {#what-it-never-reaches}

无论勾选什么，密钥、助手和 Webhook 都不能：

- 访问他人的资料库，或透露同步观看中的其他成员；
- 主持或加入同步观看、投票、发布网站修复或修改功能请求；
- 查看你的登录、两步验证码、恢复码、密钥或签名密钥；
- 修改计划、付款或邮箱，或连接扩展；
- 读取语音笔记、AI 历史、付款、邀请奖励或使用情况分析；
- 打开工作人员页面。

## 地址 {#the-addresses}

| 内容 | 地址 |
|---|---|
| REST API | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1` |
| OpenAPI 文档 | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json` |
| 同内容的 Markdown 版本 | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md` |
| 助手（MCP）地址 | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp` |

OpenAPI 文档与 API 使用同一份资源和字段列表生成，因此不会描述 API 没有的路由。

## 各计划限制 {#limits-on-each-plan}

| | Free | Pro | Team（每位成员） |
|---|---|---|---|
| 访问密钥 | 5 | 25 | 50 |
| 每天 API 和助手请求 | 5,000 | 50,000 | 100,000 |
| Webhook 地址 | 3 | 20 | 40 |
| 助手连接 | 3 | 10 | 25 |

每天请求数合并统计你所有密钥和助手，并在 UTC 午夜重置。每把密钥或每个助手还单独受每分钟 120 次限制，以阻止失控脚本。“其他应用”会显示当前计划的用量。计划和价格见[计划页面](https://vcpeai.aoneahsan.com/plans)。

## 重新登录后才能再次查看密钥 {#keys-and-secrets-stay-hidden}

密钥或 Webhook 签名密钥在创建时完整显示一次。之后，只有重新登录后的 10 分钟内才能再次查看；如果开启了[两步登录](./two-step-sign-in.md)，还需要身份验证器的验证码。长期打开的浏览器标签页不能直接取出密钥。每次创建密钥、连接助手或添加 Webhook 地址，我们都会发送通知邮件，但邮件不包含密钥或签名密钥。

## 本节内容 {#in-this-section}

- [访问密钥](./access-keys.md)：创建、显示、更换和删除密钥，以及各项权限。
- [API](./api.md)：请求、分页、错误、限制，以及每类资源的 `curl` 示例。
- [助手](./assistants.md)：连接 Claude、ChatGPT、Claude Code 或 Cursor。
- [Webhook](./webhooks.md)：事件列表、消息内容和签名验证。
- [两步登录](./two-step-sign-in.md)：网站和扩展中的 Google 登录后验证码。
- [开发者更新记录](./changelog.md)：开发者相关变更，按时间从新到旧排列。

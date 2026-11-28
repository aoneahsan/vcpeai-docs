---
title: 访问密钥
description: 为你使用的工具创建 Video Controls Plus 访问密钥，选择可访问内容和有效期，并了解如何再次查看、更换或移除。
last_update:
  date: 2026-11-21
---

# 访问密钥

**访问密钥相当于某个工具专用的密码，**例如学习表格同步、脚本或手机快捷指令。工具每次请求 [API](./api.md) 时都会携带密钥；它只能访问创建时勾选的资料库部分。密钥以 `vcp_pat_` 开头，后接一长串随机字符。不要把密钥放进要分享的内容。

## 创建密钥 {#making-a-key}

1. 在网站打开“账户”→[“其他应用”](https://vcpeai.aoneahsan.com/account/apps)，按“创建密钥”。
2. 填写“名称”，用来辨认所用工具，例如“学习表格同步”。
3. 勾选可访问的部分。每部分有“读取”“修改”和“删除”3 个选项，至少选择一项读取权限。
4. 设置“多久后失效”：30、90、365 天或“永不”。只有只读密钥可以永不过期；能够修改或删除的密钥必须有到期日。
5. 按“创建密钥”并复制。此时是无需重新登录即可完整查看密钥的唯一机会。

创建密钥需要在过去 10 分钟内登录；如果开启[两步登录](./two-step-sign-in.md)，还需要验证码。我们会发送创建通知邮件，邮件不包含密钥。

## 各项权限控制什么 {#what-each-tick-reaches}

勾选项会变成密钥权限。如果请求没有获准的内容，API 返回 `403 scope_required`，并指出缺少的权限。

| 网站中的部分 | 读取 | 修改 | 删除 | API 资源 |
|---|---|---|---|---|
| 书签 | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| 笔记 | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| 合集 | `collections:read` | `collections:write` | `collections:delete` | `collections`、`collection_videos` |
| 闪卡 | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| 学习路径 | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`、`path_videos` |
| 观看历史 | `history:read` | | `history:delete` | `watch_history` |
| 稍后观看 | `later:read` | `later:write` | `later:delete` | `watch_later` |
| 文字稿 | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`、`transcript_texts` |
| 截图 | `screenshots:read` | | | `screenshots` |
| 设置与快捷键 | `settings:read` | `settings:write` | | `settings` |
| 设备 | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| 同步观看 | `parties:read` | | | `watch_parties`、`party_members` |
| 社区网站修复 | `fixes:read` | | | `site_fixes` |
| 功能请求 | `requests:read` | | | `feature_requests`、`request_votes` |

空白栏表示网站不提供该操作：观看历史不能修改；截图和共享资源只能读取；设置不能删除。所有密钥无需勾选即可读取计划和当天用量，即 API 中 `account` 资源的 `account:read` 权限。

## 再次查看密钥 {#showing-a-key-again}

在密钥旁按“再次显示”。只有过去 10 分钟内完成登录，才能再次查看，防止长期打开的浏览器直接交出密钥。开启两步登录时还需验证码；即使此浏览器已被记住，也仍需验证。密钥只会在屏幕上显示一小段时间，复制后请关闭。

## 更换密钥 {#replacing-a-key}

如果怀疑密钥泄露，或需要新密钥，请按“更换”。新密钥保留原名称和访问范围。旧密钥仍可使用 24 小时，供你完成切换，随后失效。

## 移除密钥 {#removing-a-key}

按“移除”，再按一次确认。此后使用该密钥的请求会被拒绝（`401 invalid_token`）。资料库、其他密钥和助手都不受影响。

## 查看密钥权限 {#checking-what-a-key-can-do}

`GET /token` 会返回密钥类型及排序后的权限：

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

“其他应用”也会显示每把密钥的创建时间、上次使用时间和失效时间。

## 可创建多少把密钥 {#how-many-you-can-have}

Free 最多 5 把、Pro 最多 25 把、Team 每位成员最多 50 把。已移除的密钥不计数。达到上限后，可移除一把，或在[计划页面](https://vcpeai.aoneahsan.com/plans)选择更高额度的计划。

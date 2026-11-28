---
title: Video Controls Plus API
sidebar_label: API
description: 用 REST API 访问自己的 Video Controls Plus 资料库，了解请求格式、分页、错误、限制及各类资源的 curl 示例。
last_update:
  date: 2026-11-21
---

# Video Controls Plus API

**通过 HTTPS 和[访问密钥](./access-keys.md)，API 可读取和修改你自己的资料库。**所有地址均以此开头：

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

机器可读的 OpenAPI 3.1 文档位于 <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>，Markdown 版本位于 <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>。两者都无需密钥。

下方示例将地址前缀和密钥保存在两个 shell 变量中：

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## 请求认证 {#signing-requests}

每次请求都以 bearer 令牌发送密钥，正文使用 JSON：

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

已连接助手的令牌也可以使用。网站登录状态则不能作为 API 凭据；API 会返回 `401`，要求访问密钥或助手令牌。

每次请求都以你的身份执行。数据库按你的权限判断每一行，因此密钥无法返回你自己在网站上无权打开的记录。

## 返回格式 {#what-comes-back}

单项结果：

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

列表：

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

错误：

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

时间使用 ISO 8601。除下方个别资源特别说明外，ID 均为 UUID。含有你的数据的响应不会被缓存。

## 错误 {#errors}

| 状态码 | `code` | 含义 |
|---|---|---|
| 400 | `invalid_request` | 字段、筛选、排序或游标无效；`details.issues` 列出每个有问题的字段。 |
| 401 | `invalid_token` | 密钥缺失、错误、过期或已移除。 |
| 403 | `scope_required` | 密钥没有对应权限；`details.scope` 指出所需权限。 |
| 404 | `not_found` | 此密钥下找不到该地址的内容；他人的记录与不存在的记录显示相同结果。 |
| 405 | `method_not_allowed` | 此资源不接受所用方法，例如修改观看历史。 |
| 409 | `conflict` | 内容已存在，或违反产品规则；消息会说明原因。 |
| 413 | `payload_too_large` | 请求正文超过 65,536 字节。 |
| 429 | `rate_limited` | 请求过多，需等待重置。 |
| 500 | `internal` | 服务端发生错误；联系团队时请提供 `correlation_id`。 |

## 分页 {#pages-of-results}

列表默认返回 20 项；可用 `limit` 指定 1 至 50 项。如有更多结果，`meta.next_cursor` 会给出游标。保持筛选和排序不变，下一次以 `cursor` 传回即可获取下一页。游标有效 15 分钟，且只适用于创建它的查询。`next_cursor` 为 `null` 时表示已取完。

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**筛选**使用 `<field>.<operator>` 形式的查询参数，各资源允许的参数见下文：`eq` 表示相等，`lte` 表示不晚于，`cs` 表示标签包含逗号分隔列表中的每个值。**排序**使用 `sort=<field>`；前置 `-` 表示从新到旧或从大到小。每个资源列出的第一个排序为默认值。

## 频率限制 {#rate-limits}

每把密钥每分钟最多 120 次请求。此外，所有密钥和助手共享所在计划的每日额度：Free 为 5,000 次，Pro 为 50,000 次，Team 每位成员为 100,000 次，在 UTC 午夜重置。每个响应都带有 `RateLimit-Limit`、`RateLimit-Remaining` 和 `RateLimit-Reset`（秒），表示较先达到的限制。`429` 还会带 `Retry-After`。

## 删除 {#removing}

`DELETE` 需要相应资源的“删除”权限。使用访问密钥时会立即删除，返回无正文的 `204`。

使用助手令牌时不会立即删除，而是返回 `202` 和供用户到网站确认的链接，10 分钟内有效：

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

下次同步时，扩展会在所有已连接浏览器中移除该记录，效果与你在扩展中删除相同。

## 你的资料库 {#your-library}

除特别注明外，下列每类资源都支持 `GET /<part>` 列表和 `GET /<part>/{id}` 单项。`POST /<part>` 创建，`PATCH /<part>/{id}` 修改发送的字段，`DELETE /<part>/{id}` 删除。未列为可写的字段仅供显示，不能修改。

这些资源通常使用 4 个字段标识视频：`platform`（如 `youtube`、`netflix`、`linkedin`）、`video_id`（网站中的视频 ID）、`video_url`（视频页地址）和 `video_title`。

### 书签 {#bookmarks}

你在视频中保存的时刻，含时间、标签、笔记和颜色。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、创建、修改、删除 |
| 可设置 | `video_id`、`video_url` 和 `label`（必填），`position_seconds`（必填，从开头算的秒数），`platform`、`video_title`、`note`、`color`、`tags`、`folder` |
| 筛选 | `platform.eq`、`video_id.eq`、`tags.cs` |
| 排序 | `-created_at` |
| 权限 | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

与扩展一样，书签保存时便确定视频中的位置。

### 笔记 {#notes}

你在视频某一时刻写的笔记，可附分类和标签。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、创建、修改、删除 |
| 可设置 | `video_id`、`video_url` 和 `content`（必填），`position_seconds`、`platform`、`video_title`、`category`（`important`、`question`、`summary`、`action` 或 `custom`）、`custom_category_name`、`color`、`tags` |
| 筛选 | `platform.eq`、`video_id.eq` |
| 排序 | `-created_at` |
| 权限 | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### 合集与其中的视频 {#collections}

`collections` 是你的合集，按最近修改排序。`collection_videos` 是合集中的视频；与扩展一样，可以添加和移除，但不修改单条视频记录。

| 项目 | `collections` | `collection_videos` |
|---|---|---|
| 方法 | 列表、单项、创建、修改、删除 | 列表、单项、创建、删除 |
| 可设置 | `name`（必填）、`description`、`is_public` | `collection_id`、`video_id` 和 `video_url`（必填），`platform`、`video_title`、`thumbnail`、`duration_seconds` |
| 筛选 | | `collection_id.eq` |
| 排序 | `-updated_at` | `-added_at` |
| 权限 | `collections` | `collections` |

公开合集可由知道链接的任何人打开。`collection_id` 必须属于你自己的合集。

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### 闪卡 {#flashcards}

从视频保存的闪卡，含正面、背面、标签和下次复习时间。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、创建、修改、删除 |
| 可设置 | `video_id`、`video_url`、`front` 和 `back`（必填），`position_seconds`、`platform`、`video_title`、`tags`，以及复习排程：`ease_factor`（1.3 至 10）、`interval_days`、`repetitions`、`next_review_at`、`last_reviewed_at` |
| 筛选 | `platform.eq`、`video_id.eq`、`tags.cs`、`next_review_at.lte` |
| 排序 | `next_review_at`、`-created_at` |
| 权限 | `flashcards` |

新卡片立即需要复习。修改排程就会记录一次复习，与扩展中的做法相同。查询今天结束前到期的卡片：

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### 学习路径与其中的视频 {#learning-paths}

`learning_paths` 是你的学习路径，按最近修改排序。`path_videos` 是各路径中的视频，包含顺序及完成状态。

| 项目 | `learning_paths` | `path_videos` |
|---|---|---|
| 方法 | 列表、单项、创建、修改、删除 | 列表、单项、创建、修改、删除 |
| 可设置 | `title`（必填）、`description`、`is_public`、`estimated_minutes` | `path_id`、`video_id` 和 `video_url`（必填），`platform`、`video_title`、`video_thumbnail`、`video_duration_seconds`、`position`、`is_completed`、`notes` |
| 仅显示 | `actual_minutes`、`last_accessed_at`（由扩展统计） | |
| 筛选 | | `path_id.eq` |
| 排序 | `-updated_at` | `position`、`-created_at` |
| 权限 | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### 观看历史 {#watch-history}

开启观看历史后看过的视频，包含停止位置与观看时长。只有扩展会新增记录，因此 API 只能读取和删除，不能修改。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、删除 |
| 显示字段 | 视频字段、`video_thumbnail`、`video_duration_seconds`、`channel_name`、`last_position_seconds`、`watch_count`、`total_watch_seconds`、`first_watched_at`、`last_watched_at` |
| 筛选 | `platform.eq`、`video_id.eq` |
| 排序 | `-last_watched_at` |
| 权限 | `history`（读取和删除） |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### 稍后观看 {#watch-later}

你的稍后观看列表，包含顺序、优先级和笔记。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、创建、修改、删除 |
| 可设置 | `video_id` 和 `video_url`（必填），`platform`、`video_title`、`video_thumbnail`、`video_duration_seconds`、`channel_name`、`position`、`priority`（`high`、`normal` 或 `low`）、`notes` |
| 排序 | `position`、`-added_at` |
| 权限 | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### 文字稿 {#transcripts}

`transcripts` 列出你保存的文字稿，含语言与格式，按时间从新到旧排列。列表不返回正文，以保持页面结果精简。`transcript_texts` 可用相同 ID 读取文字与分段时间，或保存新文字稿。

| 项目 | `transcripts` | `transcript_texts` |
|---|---|---|
| 方法 | 列表、单项、删除 | 单项、创建 |
| 可设置 | | `video_id`、`video_url` 和 `content`（必填），`platform`、`video_title`、`language`、`language_code`、`is_auto_generated`、`format`（`srt`、`vtt`、`txt` 或 `json`）、`segments` |
| 显示字段 | 视频字段、`language`、`language_code`、`is_auto_generated`、`format`、`file_size`、`downloaded_at` | 同左，另含 `content` 和 `segments` |
| 排序 | `-downloaded_at` | |
| 权限 | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

请求正文最多 65,536 字节，因此较长的文字稿无法从外部保存。

### 截图 {#screenshots}

从视频保存的画面，包含视频时间和图片尺寸。只能读取；删除截图需在扩展中操作。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项 |
| 显示字段 | 视频字段、`position_seconds`、`image_url`、`format`（`png`、`jpeg` 或 `webp`）、`width`、`height`、`created_at` |
| 排序 | `-created_at` |
| 权限 | `screenshots`（只读） |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### 设置与快捷键 {#settings}

你同步到云端的扩展设置和快捷键：一条记录，ID 为账户 ID。`settings` 和 `keyboard_bindings` 是与扩展存储格式相同的对象。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、创建、修改 |
| 可设置 | `settings`、`keyboard_bindings` |
| 显示字段 | `settings_updated_at`、`keyboard_bindings_updated_at`、`updated_at` |
| 权限 | `settings`（读取和修改） |

首次同步前，列表为空；之后仅有你的一条记录。保存时保留较新的副本，与浏览器间同步一致。

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### 设备 {#devices}

扩展已连接的浏览器。只有连接扩展时才会新增；这里可重命名或移除。移除后该浏览器的扩展会退出。

| 项目 | 内容 |
|---|---|
| 方法 | 列表、单项、修改、删除 |
| 可设置 | `device_name` |
| 显示字段 | `device_id`、`browser`、`platform`、`extension_version`、`last_seen_at`、`created_at` |
| 排序 | `-last_seen_at` |
| 权限 | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## 共享资源，只读 {#shared-read-only}

这些资源涉及其他人，因此不论密钥勾选什么，API 都只读，不产生 Webhook 事件。

| 资源 | 内容 | 筛选 | 排序 | 权限 |
|---|---|---|---|---|
| `watch_parties` | 你主持或加入的房间：视频、`is_host`、开始、到期及结束时间。加入代码不返回，因为它就是邀请。 | | `-created_at` | `parties:read` |
| `party_members` | 各房间的成员数量及加入时间。`is_you` 标记你自己；不包含他人的姓名、照片或账户；`id` 只是成员记录的标识，不是个人标识。 | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | 社区分享的网站播放器修复，包括已批准的，以及你自己待审的，带 `is_yours`。不显示贡献者姓名。 | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | 公开看板：标题、说明、分类、状态、票数与 `is_yours`，不显示作者。 | | `-created_at`、`-upvotes` | `requests:read` |
| `request_votes` | 你自己的投票：`1` 为赞成，`-1` 为反对。投票 `id` 是对应的请求。 | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## 计划和用量 {#your-plan-and-use}

`GET /account` 返回一条记录：你的计划、每日 AI 运行额度和当天用量、云存储额度和使用量，以及 `other_apps` 中[计划表](./index.md#limits-on-each-plan)列出的 4 项限制与 `requestsToday`。任何密钥无需勾选即可读取。

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## API 绝不提供什么 {#what-the-api-never-serves}

字段采用允许列表：本页未列出的数据库字段不会返回。除[绝不会访问的内容](./index.md#what-it-never-reaches)外，扩展自身的同步密钥、截图背后的存储文件记录、上次保存设置的设备，以及观看历史中的单独观看会话都不会返回。没有日历订阅。

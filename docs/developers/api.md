---
title: The Video Controls Plus API
sidebar_label: The API
description: The REST API for your own Video Controls Plus library, with the request shape, pages, errors, limits and a curl example for every part.
last_update:
  date: 2026-11-21
---

# The Video Controls Plus API

**The API reads and changes your own library over HTTPS with an [access key](./access-keys.md).** Every address starts with:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

The machine-readable description is the OpenAPI 3.1 document at <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>, with a Markdown copy at <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. Neither needs a key.

The examples below keep the start of the address and the key in two shell variables:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## Signing requests {#signing-requests}

Send the key as a bearer token on every request, and send bodies as JSON:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

A token from a connected assistant works here too. A website sign-in does not: the API answers `401` and asks for an access key or an assistant's token.

Each request acts as you. Our database decides every row with your own permissions, so a key can never return a row you couldn't open on the website.

## What comes back {#what-comes-back}

One item:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

A list:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

A failure:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

Times are ISO 8601. Ids are UUIDs, except where a part below says otherwise. Answers that carry your data are never cached.

## Errors {#errors}

| Status | `code` | What happened |
|---|---|---|
| 400 | `invalid_request` | A field, filter, sort or cursor isn't valid. `details.issues` lists each field. |
| 401 | `invalid_token` | The key is missing, wrong, expired or removed. |
| 403 | `scope_required` | The key wasn't given this permission. `details.scope` names it. |
| 404 | `not_found` | Nothing at this address for this key. Another person's item looks the same as a missing one. |
| 405 | `method_not_allowed` | This part doesn't take that method, such as a change to watch history. |
| 409 | `conflict` | It already exists, or one of our rules refused it. The message says which. |
| 413 | `payload_too_large` | The body is over 65,536 bytes. |
| 429 | `rate_limited` | Too many requests. Wait for the reset time. |
| 500 | `internal` | Something went wrong on our side. Send us the `correlation_id`. |

## Pages of results {#pages-of-results}

A list returns 20 items unless you ask for `limit`, from 1 to 50. When there are more, `meta.next_cursor` holds a cursor; send it back as `cursor` with the same filters and sort to get the next page. A cursor lasts 15 minutes and works only for the query that made it. When `next_cursor` is `null`, you have everything.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**Filters** are query parameters named `<field>.<operator>`, from the short list each part allows below: `eq` is equal, `lte` is on or before, and `cs` means the tags contain every value in a comma list. **Sort** is `sort=<field>`, with a leading `-` for newest or largest first, from the part's list; the first one listed is the default.

## Rate limits {#rate-limits}

Each key gets 120 requests a minute. On top of that, your plan sets requests a day for all your keys and assistants together: 5,000 on Free, 50,000 on Pro and 100,000 for each Team member, starting again at midnight UTC. Every answer carries `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset` (seconds), for whichever limit is closer. A `429` adds `Retry-After`.

## Removing {#removing}

`DELETE` needs the part's Delete tick. With an access key it removes the item at once and answers `204` with no body.

With an assistant's token it removes nothing yet. It answers `202` with a link the person opens on the website to say yes, valid for ten minutes:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

The extension removes it on every browser the next time it syncs, as if you had removed it there.

## Your library {#your-library}

Every part below takes `GET /<part>` for a list and `GET /<part>/{id}` for one item, unless it says otherwise. `POST /<part>` makes one, `PATCH /<part>/{id}` changes the fields you send, and `DELETE /<part>/{id}` removes it. Fields not listed as yours to set are shown and never written.

A video is named by four fields across these parts: `platform` (the site, such as `youtube`, `netflix` or `linkedin`), `video_id` (the video's own id on that site), `video_url` (the address of the video page) and `video_title`.

### Bookmarks {#bookmarks}

Moments you saved in a video: the time, a label, a note and a color.

| | |
|---|---|
| Methods | list, get, create, change, delete |
| You set | `video_id`, `video_url` and `label` (required), `position_seconds` (required, seconds from the start), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Filters | `platform.eq`, `video_id.eq`, `tags.cs` |
| Sort | `-created_at` |
| Permission | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

The time in the video is set when the bookmark is saved, as in the extension.

### Notes {#notes}

Notes you wrote at a time in a video, with a category and tags.

| | |
|---|---|
| Methods | list, get, create, change, delete |
| You set | `video_id`, `video_url` and `content` (required), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` or `custom`), `custom_category_name`, `color`, `tags` |
| Filters | `platform.eq`, `video_id.eq` |
| Sort | `-created_at` |
| Permission | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Collections and their videos {#collections}

`collections` are your video collections, newest change first. `collection_videos` are the videos in them; a video is added or removed, never changed, as in the extension.

| | `collections` | `collection_videos` |
|---|---|---|
| Methods | list, get, create, change, delete | list, get, create, delete |
| You set | `name` (required), `description`, `is_public` | `collection_id`, `video_id` and `video_url` (required), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Filters | | `collection_id.eq` |
| Sort | `-updated_at` | `-added_at` |
| Permission | `collections` | `collections` |

A public collection can be opened by anyone with its link. `collection_id` has to be one of your collections.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Flashcards {#flashcards}

Your flashcards from videos: front, back, tags and when each card is due.

| | |
|---|---|
| Methods | list, get, create, change, delete |
| You set | `video_id`, `video_url`, `front` and `back` (required), `position_seconds`, `platform`, `video_title`, `tags`, and the review schedule: `ease_factor` (1.3 to 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Filters | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Sort | `next_review_at`, `-created_at` |
| Permission | `flashcards` |

A new card is due now. Changing the review schedule is how a review is recorded, as it is in the extension. Cards due by the end of today:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Learning paths and their videos {#learning-paths}

`learning_paths` are your paths, newest change first. `path_videos` are the videos in each path, in order, and which you finished.

| | `learning_paths` | `path_videos` |
|---|---|---|
| Methods | list, get, create, change, delete | list, get, create, change, delete |
| You set | `title` (required), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id` and `video_url` (required), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| Shown only | `actual_minutes`, `last_accessed_at` (counted by the extension) | |
| Filters | | `path_id.eq` |
| Sort | `-updated_at` | `position`, `-created_at` |
| Permission | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### Watch history {#watch-history}

Videos you watched with Watch History on: where you stopped and how long you watched. Only the extension adds to it, so the API reads and removes, and never changes a row.

| | |
|---|---|
| Methods | list, get, delete |
| Shown | the video fields, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Filters | `platform.eq`, `video_id.eq` |
| Sort | `-last_watched_at` |
| Permission | `history` (read and delete) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Watch later {#watch-later}

Your watch later list, in your order, with priority and notes.

| | |
|---|---|
| Methods | list, get, create, change, delete |
| You set | `video_id` and `video_url` (required), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` or `low`), `notes` |
| Sort | `position`, `-added_at` |
| Permission | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Transcripts {#transcripts}

`transcripts` lists the transcripts you saved, with language and format, newest first, and leaves the text out so a page stays small. `transcript_texts` reads one transcript with its text and timed lines, by the same id, or saves a new one.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Methods | list, get, delete | get, create |
| You set | | `video_id`, `video_url` and `content` (required), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` or `json`), `segments` |
| Shown | the video fields, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | the same, plus `content` and `segments` |
| Sort | `-downloaded_at` | |
| Permission | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

A request body is at most 65,536 bytes, so a longer transcript can't be saved from outside.

### Screenshots {#screenshots}

Frames you saved from videos, with the time in the video and the image size. Read only: a screenshot is removed in the extension.

| | |
|---|---|
| Methods | list, get |
| Shown | the video fields, `position_seconds`, `image_url`, `format` (`png`, `jpeg` or `webp`), `width`, `height`, `created_at` |
| Sort | `-created_at` |
| Permission | `screenshots` (read) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Settings and shortcuts {#settings}

Your synced extension settings and keyboard shortcuts: one item, whose id is your account's. `settings` and `keyboard_bindings` are objects in the shape the extension stores them.

| | |
|---|---|
| Methods | list, get, create, change |
| You set | `settings`, `keyboard_bindings` |
| Shown | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Permission | `settings` (read and change) |

The list holds your one item, or nothing before you first sync. A save keeps the newer copy, as sync between your browsers does.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Devices {#devices}

Browsers the extension is connected on. They are added only by connecting the extension; here you rename or remove them. Removing one signs the extension out on that browser.

| | |
|---|---|
| Methods | list, get, change, delete |
| You set | `device_name` |
| Shown | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Sort | `-last_seen_at` |
| Permission | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## Shared, read only {#shared-read-only}

These involve other people, so the API reads them and never writes them, whatever a key says. They send no webhook events.

| Part | What it holds | Filter | Sort | Permission |
|---|---|---|---|---|
| `watch_parties` | Parties you host or joined: the video, `is_host`, when it started, ends and ended. The join code is left out, because it is the invitation. | | `-created_at` | `parties:read` |
| `party_members` | How many people are in each of your parties and when they joined. `is_you` marks you; nobody's name, photo or account is included, and `id` is a handle for the membership, not the person. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | Player fixes people shared for websites, approved ones and your own while they wait, with `is_yours`. The contributor isn't named. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | The public board: title, description, category, status, votes and `is_yours`. The author isn't named. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | Your own votes: `1` up, `-1` down. A vote's `id` is the request it is on. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## Your plan and use {#your-plan-and-use}

`GET /account` returns one item: your plan, its AI runs a day and today's, your cloud storage and what you use of it, and `other_apps`, which holds your four limits from [the plan table](./index.md#limits-on-each-plan) with `requestsToday`. Every key reads it, with no tick.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## What the API never serves {#what-the-api-never-serves}

Fields are an allowlist: a column not named on this page never leaves our database. Beyond the list in [What it never reaches](./index.md#what-it-never-reaches), that also keeps out the extension's own sync keys, the stored-file record behind a screenshot, the device that last saved your settings, and the separate sittings inside your watch history. There is no calendar feed.

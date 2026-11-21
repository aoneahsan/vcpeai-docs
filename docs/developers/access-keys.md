---
title: Access keys
description: Make a Video Controls Plus access key for a tool you run, choose what it reaches and when it stops, and show, replace or remove it later.
tags: [developers, api, access-keys]
last_update:
  date: 2026-11-21
---

# Access keys

**An access key works like a password for one tool:** a study-sheet sync, a script, a phone shortcut. The tool sends it with each request to [the API](./api.md), and the key reaches only the parts of your library you ticked when you made it. Keys look like `vcp_pat_` followed by a long random string. Keep a key out of anything you share.

## Making a key {#making-a-key}

1. On the website, open **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** and press **Make a key**.
2. Give it a **Name**, so you know which tool uses it, like "Study sheet sync".
3. Tick what it can reach. Each part has three boxes: **Read**, **Change** and **Delete**. Tick at least one part to read.
4. Choose when it **Stops working after**: 30, 90 or 365 days, or **Never**. Never is allowed only for a key that only reads; a key that can change or delete always has an end date.
5. Press **Make key**, then copy it. This is the one time it is shown without signing in again.

Making a key needs a sign-in from the last ten minutes, and your two-step code when [two-step sign-in](./two-step-sign-in.md) is on. We email you that a key was made. The email never contains the key.

## What each tick reaches {#what-each-tick-reaches}

A tick becomes a permission on the key. The API answers `403 scope_required`, naming the permission, when a key asks for something it wasn't given.

| Part on the website | Read | Change | Delete | What it covers in the API |
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

An empty box is a box the website doesn't offer: watch history has no change, screenshots and the shared parts are read only, and settings can't be deleted. Every key can also read your plan and today's use (`account:read`, the `account` part of the API) without a tick.

## Showing a key again {#showing-a-key-again}

Press **Show again** on the key. We show it only within ten minutes of signing in, so a browser left open can't hand it out, and with your two-step code when two-step is on. A remembered browser still asks for the code here. The key stays on screen for a short while; close it when you've copied it.

## Replacing a key {#replacing-a-key}

Press **Replace** when a key may have leaked, or when you want a fresh one. You get a new key with the same name and the same parts. The key it replaced keeps working for 24 hours so you can swap it over, then it stops.

## Removing a key {#removing-a-key}

Press **Remove**, then press it again to confirm. The next request with that key gets "not allowed" (`401 invalid_token`). Nothing else changes: your library, your other keys and your assistants stay as they are.

## Checking what a key can do {#checking-what-a-key-can-do}

`GET /token` answers with the key's kind and its permissions, sorted:

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

**Other apps** also shows when each key was made, when it was last used and when it stops working.

## How many you can have {#how-many-you-can-have}

Free holds 5 keys, Pro 25 and Team 50 for each member. A removed key doesn't count. When you're at the limit, remove one, or move to a plan with more on [Plans](https://vcpeai.aoneahsan.com/plans).

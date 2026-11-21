---
title: Video Controls Plus for developers
sidebar_label: Overview
description: Read and change your own Video Controls Plus bookmarks, notes, flashcards and more from a script, Claude or ChatGPT, or your own server.
tags: [developers, api, mcp, webhooks]
last_update:
  date: 2026-11-21
---

# Video Controls Plus for developers

**Your Video Controls Plus library can be reached from outside the extension, by tools you connect yourself:** a script with an access key, an assistant such as Claude or ChatGPT, or your own server hearing about each change through a webhook. You set all three up on the website, in **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)**, on every plan, Free included.

Each key, assistant or webhook reaches only the parts you tick for it, and acts as you. It never sees anything you couldn't see on the website yourself.

## Three ways in {#three-ways-in}

| You want | Use | Page |
|---|---|---|
| A script, a spreadsheet sync or a phone shortcut that reads or changes your library | An access key and the REST API | [Access keys](./access-keys.md), [The API](./api.md) |
| To ask Claude, ChatGPT, Claude Code or Cursor about your notes and flashcards | The assistant address (MCP) | [Assistants](./assistants.md) |
| Your server told the moment you save a note or a bookmark | A webhook address | [Webhooks](./webhooks.md) |

## What an outside app can reach {#what-an-outside-app-can-reach}

Only what you tick, and only your own:

- **Read and change** your bookmarks, notes, collections and the videos in them, flashcards, learning paths and their videos, watch later, transcripts, settings and the browsers the extension is connected on.
- **Read and remove** your watch history. Only the extension adds to it, while Watch History is on.
- **Read** your screenshots. Removing one stays in the extension.
- **Delete**, when you tick Delete for that part. A key deletes straight away. A delete an assistant asks for waits on the website for your yes.
- **Read only:** watch parties you host or joined, community site fixes, and feature requests with your votes.
- **Always readable:** your plan, its limits and what you used today.

### What it never reaches {#what-it-never-reaches}

Whatever you tick, no key, assistant or webhook can:

- reach anyone else's library, or say who else is in your watch party;
- host or join a watch party, vote, post a site fix or change a feature request;
- see your sign-in, two-step codes, recovery codes, keys or signing secrets;
- change your plan, payments or email, or connect the extension;
- read your voice notes, AI history, payments, referrals or usage analytics;
- open a staff page.

## The addresses {#the-addresses}

| What | Address |
|---|---|
| REST API | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1` |
| OpenAPI document | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json` |
| The same, as Markdown | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md` |
| Assistant (MCP) address | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp` |

The OpenAPI document is built from the same list of parts and fields as the API itself, so it never describes a route the API lacks.

## Limits on each plan {#limits-on-each-plan}

| | Free | Pro | Team (each member) |
|---|---|---|---|
| Access keys | 5 | 25 | 50 |
| API and assistant requests a day | 5,000 | 50,000 | 100,000 |
| Webhook addresses | 3 | 20 | 40 |
| Assistant connections | 3 | 10 | 25 |

Requests a day count every key and assistant of yours together, and start again at midnight UTC. Each key or assistant also has its own limit of 120 requests a minute, so a runaway script stops itself. **Other apps** shows what you have used against your plan. Plans and prices are on [Plans](https://vcpeai.aoneahsan.com/plans).

## Keys and secrets stay hidden until you sign in again {#keys-and-secrets-stay-hidden}

A key or a webhook signing secret is shown in full once, when you make it. After that, we show it again only within ten minutes of signing in, and with a code from your authenticator when [two-step sign-in](./two-step-sign-in.md) is on. A browser left open can't hand one out. We email you each time a key is made, an assistant is connected or a webhook address is added. The email never contains the key or the secret.

## In this section {#in-this-section}

- [Access keys](./access-keys.md): make, show, replace and remove a key, and what each tick reaches.
- [The API](./api.md): requests, pages of results, errors, limits, and every part with a `curl` example.
- [Assistants](./assistants.md): connect Claude, ChatGPT, Claude Code or Cursor.
- [Webhooks](./webhooks.md): every event, what a message carries, and how to check its signature.
- [Two-step sign-in](./two-step-sign-in.md): a code after Google, on the website and for the extension.
- [Developers changelog](./changelog.md): what changed for developers, newest first.

---
title: Developers changelog
description: Changes to the Video Controls Plus API, assistant address, webhooks and two-step sign-in, newest first.
last_update:
  date: 2026-11-21
---

# Developers changelog

Changes for anyone building on Video Controls Plus, newest first. Product releases are in the [main changelog](/changelog).

## 2026-11-21: Other apps and two-step sign-in {#2026-11-21}

- **New: [access keys](./access-keys.md)** (`vcp_pat_…`), made on **Account → Other apps**, each with its own Read, Change and Delete ticks, and an end date unless it only reads.
- **New: [the API](./api.md), version 1**, for bookmarks, notes, collections, flashcards, learning paths, watch history, watch later, transcripts, screenshots, settings and devices, plus read-only watch parties, site fixes, feature requests and your plan. The OpenAPI 3.1 document is at `/v1/openapi.json`.
- **New: [the assistant address](./assistants.md)** for Claude, ChatGPT, Claude Code and Cursor. An assistant's delete waits on the website for your yes.
- **New: [webhooks](./webhooks.md)**, signed with Standard Webhooks, with 32 events to choose from and a test message, thin messages by default and **Include what was written** per address.
- **New: [two-step sign-in](./two-step-sign-in.md)** on the website, with ten recovery codes and an opt-in remembered browser for 7 days. A connected extension is trusted for 7 days with it on.
- **Limits:** Free 5 keys, 5,000 requests a day, 3 webhook addresses and 3 assistants; Pro 25, 50,000, 20 and 10; Team 50, 100,000, 40 and 25 for each member.

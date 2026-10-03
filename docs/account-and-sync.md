---
title: Account, sync, export and delete
sidebar_label: Account and sync
description: What a Google sign-in adds to Video Controls Plus, how to delete your data, how settings sync works, and how to export your settings.
---

You sign in with Google, from the **Account & Sync** tab in Settings. The table lists what that adds.

There is no Google sign-in in the Firefox add-on today, so on Firefox the signed-out controls work and everything in the table below is unavailable.

## What sign-in adds

| Needs a sign-in today | Page |
|---|---|
| A-B loop | [A-B loop](/docs/user-guide/ab-loop) |
| Audio boost | [Audio boost](/docs/user-guide/audio-boost) |
| Video filters | [Video filters](/docs/user-guide/video-filters) |
| Screenshots | [Screenshots](/docs/user-guide/screenshots) |
| Auto-skip | [Auto-skip](/docs/user-guide/auto-skip) |
| The bookmark key, [`Ctrl + Alt + O`](/docs/keyboard-shortcuts/defaults) | [Notes and bookmarks](/docs/user-guide/notes-and-bookmarks) |
| Cloud sync | This page |
| The New Features, YouTube, Netflix and LinkedIn tabs in Settings | [YouTube](/docs/platforms/youtube), [Netflix](/docs/platforms/netflix), [LinkedIn](/docs/platforms/linkedin) |
| The AI daily allowance | [AI features](/docs/ai-features) |

Signed out, you have speed, presets, frame step, Picture-in-Picture, share timestamp, theater mode, notes and the widget.

The YouTube and LinkedIn extras that are on by default run signed out, and only the Settings tab where you switch them is behind a sign-in.

## What sign-in records

Signed in, the extension stores your account data, your settings, and which video sites you used it on, by site name only. The full list is in [Privacy and permissions](/docs/privacy-and-permissions).

## How can I delete my data?

Open Settings, go to the **Privacy & Data** tab, and click **Delete All Data** on the **Your Data** card. The button needs a sign-in, because it deletes what is stored with your account.

**Export My Data** is on the same card. It downloads your data as a JSON file. It also needs a sign-in.

You can also send a request from the website's [data deletion page](https://vcpeai.aoneahsan.com/data-deletion).

## Sync

1. Sign in on the Account & Sync tab.
2. Turn on **Enable Cloud Sync**.

Your speeds, key bindings and site settings are synced. The tab shows the last sync time.

| Button | What it does |
|---|---|
| Upload to Cloud | Saves the settings on this device to your account |
| Load from Cloud | Replaces the settings on this device with the copy in your account |

Settings you changed on this device and did not upload are overwritten by **Load from Cloud**.

Another device picks up your keyboard shortcuts the next time you open Settings on it, but the list of sites you paused does not sync. It stays on the device where you paused them.

## Export and import your settings

Open the **Data Management** tab in Settings.

- **Export Settings** downloads your settings as a JSON file. You choose whether to include video memory and filter presets.
- **Import Settings** restores from a file you exported: **Replace All** replaces your current settings, and **Merge** keeps your current values where the file has none.

For anything else about your account, use the [contact page](https://vcpeai.aoneahsan.com/contact).

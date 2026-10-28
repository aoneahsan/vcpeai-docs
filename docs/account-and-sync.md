---
title: Account, sync, export and delete
sidebar_label: Account and sync
description: How to connect Video Controls Plus to your account on the website, what connecting adds, how sync works, how to buy Pro, and how to export or delete your data.
---

There is no sign-in inside the extension. You create your account on [vcpeai.aoneahsan.com](https://vcpeai.aoneahsan.com), where you sign in with Google, and then you connect the extension to it. Connecting works the same way on Chrome, Edge and Firefox.

An account that existed before 16.0.0 opens empty until we finish moving the old cloud data, which follows this release. Nothing saved in your browser is affected.

## Connect the extension to your account

1. Press **Connect to your account**. The button is in the popup, on the account step of the welcome page and on the **Account & Sync** tab in Settings.
2. A tab opens on vcpeai.aoneahsan.com. If the page asks you to sign in, press **Continue with Google**.
3. Check that the page and the extension show the same code. If the codes are different, press **Cancel**.
4. Press **Connect this browser**.

The extension shows the connection within a few seconds while the popup or Settings stays open, and otherwise within about 30 seconds.

The code lasts 10 minutes. If you closed the tab, press **Open the page again** in the extension. [Troubleshooting](/docs/troubleshooting) covers what to do when connecting fails.

## What connecting adds

| Needs a connected account today | Page |
|---|---|
| A-B loop | [A-B loop](/docs/user-guide/ab-loop) |
| Audio boost | [Audio boost](/docs/user-guide/audio-boost) |
| Video filters | [Video filters](/docs/user-guide/video-filters) |
| Screenshots | [Screenshots](/docs/user-guide/screenshots) |
| Auto-skip | [Auto-skip](/docs/user-guide/auto-skip) |
| Timestamped account notes and connected bookmark saves | [Notes and bookmarks](/docs/user-guide/notes-and-bookmarks) |
| Cloud sync | This page |
| The New Features, YouTube, Netflix and LinkedIn tabs in Settings | [YouTube](/docs/platforms/youtube), [Netflix](/docs/platforms/netflix), [LinkedIn](/docs/platforms/linkedin) |
| The shared AI allowance | [AI features](/docs/ai-features) |

Without an account, you have speed, presets, frame step, Picture-in-Picture, share timestamp, theater mode, bookmarks saved in this browser and the widget.

The YouTube and LinkedIn extras that are on by default run without an account, and only the Settings tab where you switch them asks you to connect.

## What a connected account records

Connected, the extension stores your account data and your settings, and while the Usage analytics switch is on it records which sites, features and speeds you used. The full list is in [Privacy and permissions](/docs/privacy-and-permissions).

## Sync

1. Connect the extension to your account.
2. Open the Account & Sync tab in Settings and turn on **Enable Cloud Sync**.

Your settings are uploaded when you turn it on. Your speeds, key bindings and site settings are synced. The tab shows the last sync time. Bookmarks saved while connected sync to your account separately from this settings switch; bookmarks made while signed out remain in that browser.

| Button | What it does |
|---|---|
| Upload to Cloud | Saves the settings on this device to your account |
| Load from Cloud | Replaces the settings on this device with the copy in your account |

Newer settings win: when two browsers save to the same account, the account keeps the newer copy. Settings you changed on this device and did not upload are overwritten by **Load from Cloud**.

Another device picks up your keyboard shortcuts the next time you open Settings on it, but the list of sites you paused does not sync. It stays on the device where you paused them.

## Sign out

**Sign out**, in the popup or on the Account & Sync tab, disconnects this browser only. Your account stays, and so does every other browser you connected. To connect this browser again, press **Connect to your account**.

## How can I delete my data?

Open Settings, go to the **Privacy & Data** tab, and click **Delete All Data** on the **Your Data** card. It deletes the account itself, the files stored under it and everything saved under it. It cannot be undone. The button needs a connected account, because it deletes what is stored with your account.

**Export My Data** is on the same card. It downloads your data as a JSON file. It also needs a connected account.

You can also delete your account from the website's [data deletion page](https://vcpeai.aoneahsan.com/data-deletion) when you are signed in there.

## Export and import your settings

Open the **Data Management** tab in Settings.

- **Export Settings** downloads your settings as a JSON file. You choose whether to include video memory and filter presets.
- **Import Settings** restores from a file you exported: **Replace All** replaces your current settings, and **Merge** keeps your current values where the file has none.

## Plans and payment

Every feature works on Free. Pro raises your daily AI runs and your AI level, for one person, and Team does the same
for each member. The prices are on [Plans](https://vcpeai.aoneahsan.com/plans).

To get Pro, sign in on the website, open Plans and press **Upgrade to Pro**, monthly or yearly. You pay on Polar's
checkout page, and Pro starts on your account as soon as Polar confirms the payment.

Polar emails you a link to its customer portal, where you can cancel, change your card and download invoices. Cancel
any time. Your plan runs to the end of the period you paid for.

Team is set up with us: press **Choose Team** on Plans, which opens the [contact page](https://vcpeai.aoneahsan.com/contact).

Plans are bought on the website only, never inside the extension or the Android app.

For anything else about your account, use the [contact page](https://vcpeai.aoneahsan.com/contact).

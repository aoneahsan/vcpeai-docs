---
title: Privacy and permissions
sidebar_label: Privacy and permissions
description: What Video Controls Plus stores and records, signed out and signed in, and what each browser permission is used for.
---

Signed out, Video Controls Plus keeps your settings in your browser, and two things still leave it: the first time you accept the privacy notice in Settings, your IP address goes to ipapi.co for an approximate location, and anonymous usage events from the popup are saved to the team's database with no account attached. Signed in, your account data, your settings and the names of the video sites you used it on are synced.

It does not record the videos you watch, their titles or their addresses.

This page is a plain reading of the [privacy policy](https://vcpeai.aoneahsan.com/privacy). The policy is the legal text. Where the two differ, the policy is the one that counts.

## What stays in your browser

Your settings, your keyboard shortcuts, the speed remembered for each video, your playback position, your filter presets and your audio settings are stored in your browser. They go to your account only when you sign in and turn sync on.

Audio download is processed on your device. A screenshot stays on your device unless you choose a cloud action for it, which uploads the image.

## What is recorded

| Data | When | What it is |
|---|---|---|
| Approximate location | Signed out and signed in, the first time you accept the privacy notice in Settings | Your IP address is sent to ipapi.co to look up an approximate location. The IP address is not stored. |
| Anonymous usage events | Signed out and signed in, from the popup | The event name, the site's hostname, your browser and platform, and a session id, saved to the team's database with no account attached. There is no switch for these today. |
| Account | Signed in | Email address, display name, profile photo and your Google user ID |
| Settings | Signed in | Your settings, synced to your account |
| Site names | Signed in | The names of the video sites where the extension ran, such as youtube.com, with first use, last use and a count of sessions |
| Error reports | While the switch is on | Crash reports sent to Sentry |
| AI text | Only when you start an AI feature | The captions of the video, or the text you are drafting. See [AI features](/docs/ai-features). |

Site names are hostnames only. Full addresses, page paths, page titles and sites without a video are not recorded.

## What is not collected

The policy lists these as not collected: the addresses or titles of videos you watch, video content or media files, passwords, payment information, personal communications, your general browsing history, and the content of pages you visit apart from text you send to an AI feature yourself.

Your data is not sold.

## Your switches

Open Settings and go to the **Privacy & Data** tab.

| Switch | Default | What it controls |
|---|---|---|
| Third-Party Error Tracking | On | Crash reports to Sentry |
| Marketing Communications | Off | Emails about new features and updates |
| Settings Sync | On | Storing your settings with your account |

Third-Party Error Tracking is the one analytics switch. The location lookup and the anonymous usage events have no switch today. Under **Your Data** on the same tab you can export or delete your data, and [Account and sync](/docs/account-and-sync) has the steps.

## What each permission is for

| Permission | Why the extension asks for it |
|---|---|
| `storage` | Saves your settings, shortcuts, speed memory, filter presets and theme in the browser |
| `activeTab` | Lets the popup read and change the video in the tab you are on when you open it |
| `contextMenus` | Adds the right-click menu items |
| `identity` | Signs you in with Google. Sign-in is optional. |
| `alarms` | Runs timed jobs: ending a per-site pause, the sleep timer, sync, and a daily check |
| `notifications` | Shows speed changes, loop status and sleep timer alerts when the widget is hidden or the display mode is Notification Only |
| `scripting` | Brings the controls to a video embedded inside another page, and only into a frame that contains a video |
| Access to all sites | Finds and controls the video on any site you open |

Access to all sites is the broad one. The extension needs it because a video can be on any site. While a site is [paused](/docs/getting-started/pause-per-site), the extension does nothing there.

## Other apps from the same team

Settings has a tab that lists other apps from the same team. The list comes with the extension. Nothing is fetched to show it, and opening an app from it is not tracked. No ad network and no ad SDK are in the extension.

## Legal text and contact

- [Privacy policy](https://vcpeai.aoneahsan.com/privacy)
- [Terms](https://vcpeai.aoneahsan.com/terms)
- [Data deletion](https://vcpeai.aoneahsan.com/data-deletion)
- [Contact the team](https://vcpeai.aoneahsan.com/contact)

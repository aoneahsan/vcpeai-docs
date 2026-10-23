---
title: Privacy and permissions
sidebar_label: Privacy and permissions
description: What Video Controls Plus stores and records, with and without an account, where the data lives, and what each browser permission is used for.
---

Video Controls Plus keeps your settings in your browser. While the **Usage analytics** switch is on, and it is on by default, usage events are sent to the team's backend with or without an account, and your IP address goes to ipapi.co for a location lookup at most once a day. A connected account also stores your account data and, with sync on, your settings.

Turn the switch off and none of the usage recording happens.

It does not record the videos you watch, their titles or their addresses. A connected account keeps a video's title and address only with something you save to it: a note, a watch-later item, an uploaded screenshot, extracted video details or a transcript.

This page is a plain reading of the [privacy policy](https://vcpeai.aoneahsan.com/privacy). The policy is the legal text. Where the two differ, the policy is the one that counts.

## What stays in your browser

Your settings, your keyboard shortcuts, the speed remembered for each video, your playback position, your filter presets and your audio settings are stored in your browser. They go to your account only when you connect the extension and turn sync on.

Audio download is processed on your device. A screenshot stays on your device unless you choose a cloud action for it, which uploads the image.

## What is recorded

| Data | When | What it is |
|---|---|---|
| Usage events | While Usage analytics is on, with or without an account | The event name, the site's hostname, your browser, your operating system, the extension version and a session id, plus your account when the extension is connected |
| Location lookup | While Usage analytics is on, at most once a day | Your IP address is sent to ipapi.co. The country, city and timezone it returns are saved to your profile when an account is connected; the region stays in your browser. The IP address is not stored. |
| Sites, features and speeds | While Usage analytics is on, with a connected account | Which sites, features and speeds you used |
| Account | With a connected account | Email address, display name, profile photo and your Google account id |
| This browser | With a connected account | A device name, the browser, the operating system, the extension version and when it was last seen |
| Settings | With a connected account and sync on | Your settings, synced to your account |
| What you save to your account | With a connected account, each only when you save it | Notes, bookmarks, watch-later items, uploaded screenshots, extracted video details (the right-click extract action) and transcripts you save to the account, each with the video's title and address. A bookmark also saves its timestamp. |
| Error reports | While Third-Party Error Tracking is on | Crash reports sent to Sentry |
| AI text | Only when you start an AI feature | The captions of the video, or the text you are drafting. A usage record for each Shared allowance run is kept for 13 months, without the text. See [AI features](/docs/ai-features). |
| Speak recordings | Only when you record with Speak | Your voice, up to 2 minutes, with its transcripts and the proposed note. All three are deleted within 24 hours, or at once when you press **Discard** ([privacy policy](https://vcpeai.aoneahsan.com/privacy), 1.8). |

In usage events a site is its hostname, such as youtube.com. Full addresses, page paths and page titles are not part of an event.

## The Usage analytics switch

Open Settings, go to the **Privacy & Data** tab, and find **Usage analytics**. It works with and without an account.

Off, it stops three things:

1. Usage events are not sent to the team's backend.
2. A connected account does not record which sites, features and speeds you used.
3. Your IP address does not go to ipapi.co.

If the switch is off in this browser or in your account at the moment you connect, it ends up off in both.

## Your other switches

They are on the same tab.

| Switch | Default | What it controls |
|---|---|---|
| Third-Party Error Tracking | On | Crash reports to Sentry |
| Marketing Communications | Off | One thing: an occasional browser notification about new features or another product from the team. No marketing email is sent. |
| Settings Sync | On | Storing your settings with your account |

Third-Party Error Tracking is separate from Usage analytics, so turning one off does not turn off the other. Under **Your Data** on the same tab you can export or delete your data, and [Account and sync](/docs/account-and-sync) has the steps.

## Where your data lives

| Service | What it holds |
|---|---|
| Supabase | The database and the sign-in for your account |
| FilesHub | Stored screenshots, Speak recordings for up to 24 hours, and the email the team sends |
| Sentry | Crash reports, while Third-Party Error Tracking is on |
| ipapi.co | Receives your IP address for the location lookup, while Usage analytics is on |
| Anthropic, OpenAI and Groq | The text of an AI run you start, and the audio or transcripts of a Speak recording. [AI features](/docs/ai-features) says which one gets what. |

Four features contact a service of their own, each only while you use the feature: SponsorBlock (`sponsor.ajay.app`), Netflix subtitle translation or dual subtitles (`api.mymemory.translated.net`), Netflix ratings with your own key (`www.omdbapi.com`), and an AI summary that has to fetch a video's captions (`video.google.com/timedtext`).

## What is not collected

The policy lists these as not collected: the videos you watch, video content or media files apart from a screenshot you choose to upload, your browsing on pages where the extension does nothing, passwords, payment information, and the content of pages you visit apart from text you send to an AI feature yourself and what the four features above send to their own services.

Your data is not sold.

## The microphone

Speak is the only feature that uploads your voice, and the microphone is asked for the first time you use it.

| Where | What you see |
|---|---|
| The extension | **Speak a note** shows "Allow the microphone once". Press **Open the microphone page**, and a tab called "Allow the microphone for Speak" opens. Press **Allow microphone**, then choose Allow in your browser's own box. You do this once. |
| The Android app | The app asks for the microphone permission when you first press record in Speak. |
| The Firefox add-on | Firefox also asks for its optional "Personal communications" data permission before anything is recorded or sent. |

The microphone is on only while you record. If you block it, the page tells you where to switch it back on. Turn Speak off in Settings, on the **AI Features** tab, and the extension stops offering it.

## What each permission is for

The extension asks for six permissions and for access to sites, and on Chrome and Edge for a seventh, `offscreen`. It does not ask for the `identity` permission, because there is no sign-in inside the extension. The microphone is not a permission it asks for at install.

| Permission | Why the extension asks for it |
|---|---|
| `storage` | Saves your settings, shortcuts, speed memory, filter presets and theme in the browser |
| `activeTab` | Lets the popup read and change the video in the tab you are on when you open it |
| `contextMenus` | Adds the right-click menu items |
| `alarms` | Timers for the sleep timer, sending queued sync and usage batches, checking a pending account connection, refreshing remote switches, lifting a per-site pause when it ends, and one daily check for an announcement notification. |
| `notifications` | Shows speed changes, loop status and sleep timer alerts when the widget is hidden or the display mode is Notification Only |
| `scripting` | Brings the controls to a video embedded inside another page, and only into a frame that contains a video |
| `offscreen` (Chrome and Edge) | Lets Speak record in a hidden page of the extension and send the recording from there, so the recording keeps going while the upload runs. Firefox records in its background page and does not need it. |
| Access to all sites | Finds and controls the video on any site you open |

Access to all sites is the broad one. The extension needs it because a video can be on any site. While a site is [paused](/docs/getting-started/pause-per-site), the extension does nothing there.

## On Firefox

Firefox asks for three optional data permissions, and each one gates what is sent.

| Firefox permission | What it gates |
|---|---|
| Technical and interaction data | Usage events are sent only if it is allowed. The Usage analytics switch asks for it. |
| Website content | Page content (a screenshot you upload, a transcript you save to the account, captions for an AI run) is sent only after you allow it. The add-on asks the first time you use one of those. |
| Personal communications | A Speak recording and its transcripts are sent only after you allow it. The add-on asks the first time you use Speak. |

## Other apps from the same team

Settings has a tab that lists other apps from the same team. The list comes with the extension, and nothing is fetched to show it. Announcements shown beside it are read from the team's backend. No ad network and no ad SDK are in the extension.

## Legal text and contact

- [Privacy policy](https://vcpeai.aoneahsan.com/privacy)
- [Terms](https://vcpeai.aoneahsan.com/terms)
- [Data deletion](https://vcpeai.aoneahsan.com/data-deletion)
- [Contact the team](https://vcpeai.aoneahsan.com/contact)

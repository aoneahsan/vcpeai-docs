---
title: When Video Controls Plus is not working on a site
sidebar_label: Troubleshooting
description: What to check when Video Controls Plus does not appear on a site, a key does nothing, a control is unavailable, or a setting has no effect.
---

Check that the site is not paused in the popup, then reload the page. That is the first thing to check, and the rest are below, each as what you see, why, and what to do.

## The controls do not appear on a site

**Why:** the site is paused, the extension is not enabled there, or the widget is hidden.

1. Open the popup on that site.
2. If it shows **Paused**, click **Resume**.
3. If it shows **Not enabled**, click **Enable on this site**.
4. Reload the page.
5. Press `Esc` or `Ctrl + Alt + H` in case the widget is hidden.

If the page has no standard HTML5 video, there is nothing for the extension to control, and [Other sites](/docs/platforms/other-sites) says which sites it works on.

## A letter or digit key does nothing

**Why:** letter and digit keys need `Ctrl + Alt`. Only `[`, `]`, `=`, `\`, `'`, `,`, `.` and `Esc` work alone.

1. Press the key with `Ctrl + Alt`, for example `Ctrl + Alt + P`.
2. If it still does nothing, open Settings, go to the Keyboard Shortcuts tab, and check that the shortcut and its section are switched on.

The full table is in [Default shortcuts](/docs/keyboard-shortcuts/defaults).

## Loop, audio boost, filters or screenshots are unavailable

**Why:** these open after you sign in. So do auto-skip and the bookmark key, `Ctrl + Alt + O`.

1. Open Settings and go to the Account & Sync tab.
2. Sign in with Google.

See [what sign-in adds](/docs/account-and-sync).

## On Firefox, the sign-in controls are missing

**Why:** there is no Google sign-in in the Firefox add-on today, so the A-B loop, audio boost, filters, screenshots, auto-skip, the bookmark key and cloud sync are unavailable on Firefox.

There is no step for this one. The signed-out controls ([list](/docs/account-and-sync)) work on Firefox.

## The speed stops at 4x

**Why:** the slider and the `[` and `]` keys stop at 4x.

1. Open the widget and type the speed into the custom input. It takes values up to 16x.
2. Or open Settings, go to the General tab, and use the **Custom Speed (0.1x - 16x)** boxes.

## A Netflix or LinkedIn switch changed nothing

**Why:** on/off switches apply after a reload.

1. Change the switch in Settings.
2. Reload the page on that site.

On Netflix, every extra starts off. See [Netflix](/docs/platforms/netflix).

## The YouTube, Netflix or LinkedIn tab in Settings shows a sign-in prompt

**Why:** those tabs are behind a sign-in. The YouTube and LinkedIn extras that are on by default still run signed out; only the tab where you switch them asks for the sign-in.

1. Sign in on the Account & Sync tab.
2. Open the tab again.

## The widget is in English and Settings is not

**Why:** the widget is in English today. Settings and the popup are in English, Spanish, French and German.

There is no step for this one. It is a limit of the current build.

## A new key is refused

**Why:** a key can belong to only one shortcut.

1. Read the message. It names the shortcut that holds the key.
2. Follow its link to that shortcut.
3. Give that shortcut another key, or pick a different key for yours.

See [Change a shortcut](/docs/keyboard-shortcuts/rebinding).

## Your shortcuts are different on another device

**Why:** a device picks up your keys the next time you open Settings on it, while you are signed in.

1. Sign in on that device.
2. Open Settings.

## Still stuck

Write to the team through the [contact page](https://vcpeai.aoneahsan.com/contact). Say which site, which browser and which key.

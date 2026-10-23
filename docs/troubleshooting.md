---
title: When Video Controls Plus is not working on a site
sidebar_label: Troubleshooting
description: What to check when Video Controls Plus does not appear on a site, a key does nothing, connecting fails, or a setting has no effect.
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

**Why:** these open after you connect the extension to your account. So does auto-skip. The bookmark key, `Ctrl + Alt + O`, also works without an account and saves locally.

1. Open Settings and go to the Account & Sync tab.
2. Press **Connect to your account**, and confirm on the website.

This is the same on Chrome, Edge and Firefox. See [the steps and what connecting adds](/docs/account-and-sync).

## The connect tab did not open

**Why:** the browser did not open the tab, or you closed it.

1. Go back to the extension. It shows **Waiting for you to connect...** and your code.
2. Press **Open the page again**.

## The code on the website is different

**Why:** the page belongs to another request, not the one this browser is waiting on.

1. Press **Cancel** on the page.
2. Start again from the extension with **Connect to your account**.

Do not press **Connect this browser** while the two codes differ.

## The connect request ran out of time

**Why:** the code lasts 10 minutes, and after that the website shows **This request is no longer valid.** and the extension says the request ran out of time.

1. Go back to the extension.
2. Press **Try again**, and confirm on the website within 10 minutes.

## Too many attempts

**Why:** the extension asked to connect too many times in a short while.

1. Wait a few minutes.
2. Press **Try again**.

## Connected, but your lists are empty

**Why:** an account that existed before 16.0.0 opens empty until we finish moving the old cloud data, which follows this release. Nothing saved in your browser is affected.

There is no step for this one. [Account and sync](/docs/account-and-sync) says what an account holds.

## On Firefox, an upload or an AI run says Firefox needs your permission

**Why:** on Firefox, page content (a screenshot you upload, a transcript you save to the account, captions for an AI run) is sent only after you allow "website content". The add-on asks the first time you use one of those.

1. Allow it when Firefox asks.
2. Or open the add-on's permissions in Firefox and allow it there, then try again.

## The speed stops at 4x

**Why:** the slider and the `[` and `]` keys stop at 4x.

1. Open the widget and type the speed into the custom input. It takes values up to 16x.
2. Or open Settings, go to the General tab, and use the **Custom Speed (0.1x - 16x)** boxes.

## A Netflix or LinkedIn switch changed nothing

**Why:** on/off switches apply after a reload.

1. Change the switch in Settings.
2. Reload the page on that site.

On Netflix, every extra starts off. See [Netflix](/docs/platforms/netflix).

## The YouTube, Netflix or LinkedIn tab in Settings asks you to connect

**Why:** those tabs need a connected account, while the YouTube and LinkedIn extras that are on by default still run without one; only the tab where you switch them asks.

1. Connect on the Account & Sync tab.
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

**Why:** a device picks up your keys the next time you open Settings on it, while it is connected to your account.

1. Connect the extension on that device.
2. Open Settings.

## Still stuck

Write to the team through the [contact page](https://vcpeai.aoneahsan.com/contact). Say which site, which browser and which key.

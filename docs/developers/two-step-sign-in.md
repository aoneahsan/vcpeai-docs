---
title: Two-step sign-in
description: Add a six-digit code after Google to your Video Controls Plus account, keep ten recovery codes, remember a browser for 7 days, and connect the extension.
tags: [developers, security, two-step-sign-in, account]
last_update:
  date: 2026-11-21
---

# Two-step sign-in

**Two-step sign-in asks for a six-digit code from an authenticator app after you sign in with Google.** Someone with your Google password still can't get into your Video Controls Plus account without it. It is optional for everyone and on for every staff account. You turn it on in **Account → [Security](https://vcpeai.aoneahsan.com/account/security)** on the website, and the extension follows it: see [The extension](#the-extension).

## Setting it up {#setting-it-up}

It takes about two minutes. You need your phone and somewhere to keep ten recovery codes.

1. Open **Security** and press **Set up two-step**.
2. Scan the QR code with Google Authenticator, Microsoft Authenticator, 1Password, Authy or any app that reads these codes. Can't scan? Type the setup key into the app as a time-based key.
3. Type the code the app shows for Video Controls Plus and press **Turn on two-step**. The code changes every 30 seconds, so use the one showing now.
4. Save the ten recovery codes: **Copy all** or **Download .txt**, then press **I've saved them**.

## Recovery codes {#recovery-codes}

A recovery code gets you in when you don't have your phone. Each one works once, and looks like `k7m2p-x9qr4`; type it with or without the dash. We keep only a scrambled copy, so the setup screen is the only time you see them.

**Security** shows how many you have left, and warns you when you're down to three. **Make new codes** replaces the whole set: the ten old codes stop working the moment the new ones appear. It needs your authenticator code and a sign-in from the last ten minutes.

## Signing in {#signing-in}

Sign in with Google as before, then type the code from your authenticator. After several codes that don't match, you wait ten minutes, or use a recovery code.

### Remembering a browser {#remembering-a-browser}

After a code you can tick **Remember this browser for 7 days**. It starts unticked; tick it only on a browser that's yours. That browser then skips the code at sign-in until the seven days are up. Visiting doesn't extend them.

A remembered browser still asks for a code before it shows an access key or a webhook signing secret, and staff pages ask every time. **Security** lists each remembered browser with the time it stops skipping the code. **Forget** one, or **Forget all browsers**, and each asks for a code next time. Signing out on a browser forgets it too.

## Losing your phone {#losing-your-phone}

1. On the code screen, choose **Lost your phone?** and **Use a recovery code instead**.
2. Type one of your codes. You're in for this session, and two-step stays on. We email you that a recovery code was used.
3. Press **Add a new phone** straight away and scan the new QR code. Showing a key or a secret needs a code from an authenticator, so do this before you need one.

Lost your phone and every recovery code? Write to us from the email address on your account through the [contact page](https://vcpeai.aoneahsan.com/contact). We check that it's you with questions about your own library, then turn two-step off so you can sign in with Google and set it up again. We email you when it's done. We never turn it off for a message from any other address.

## A new phone, or turning it off {#a-new-phone-or-turning-it-off}

- **New phone:** type a code from your current phone, then scan the new QR code. The old phone's codes stop working.
- **Turn off:** type a code from your authenticator and press **Turn it off**. Signing in needs only Google again, and your recovery codes and remembered browsers go too.

Staff accounts keep two-step on.

## Recent sign-ins {#recent-sign-ins}

**Security** lists each time you signed in on the website or connected the extension on a browser, with how: Google, Google and two-step, a remembered browser, a recovery code or an extension connect. **Sign out everywhere else** ends every other session. It also disconnects the extension on those browsers until you connect it again.

## The extension {#the-extension}

The extension has no password and no sign-in of its own. It connects to your website account: it opens the website, you sign in, compare the short code and press **Connect this browser** ([how connecting works](/docs/account-and-sync#connect-the-extension-to-your-account)). With two-step on, you type your code (or use a remembered browser) before you approve.

- **Seven days.** With two-step on, a connected extension stays trusted for 7 days from when you connected it, never longer. Then it shows **Connect again**, and you connect it the same way to keep syncing. Speed control and everything that works without an account carry on in between.
- **Turned on later.** Turn two-step on after connecting, and that connection isn't trusted. Connect the extension again.
- **Removing a browser.** Remove a browser under **The extension** on **Security**, or with [the API](./api.md#devices), and the extension on that browser is signed out. It shows **Connect again**.

Two-step sign-in never asks for a code inside the extension. Every code is typed on the website.

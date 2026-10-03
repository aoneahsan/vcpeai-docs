---
title: AI features and what they send
sidebar_label: AI features
description: Video summaries and LinkedIn writing help run through a daily allowance, your own OpenAI or Anthropic key, or a local model; here is what each one sends.
---

Video Controls Plus has two AI features: a summary of a YouTube video made from its captions, and writing help on LinkedIn. Both are off until you start them. With your own key or a local model they run signed out, and only the daily allowance asks you to [sign in](/docs/account-and-sync).

To start a summary, open the popup (the toolbar icon, or `Alt + V`, a [browser-level shortcut](/docs/keyboard-shortcuts/defaults)) on a YouTube watch page and click **Summarize this video**. Writing help starts on LinkedIn, and the [LinkedIn page](/docs/platforms/linkedin) covers it.

Every playback control works without them.

## Three ways to run it

Open Settings and go to the **AI Features** tab. On the **AI provider** card, pick one. You can switch at any time.

| Way | Option on the card | What you need | Where your text goes |
|---|---|---|---|
| The daily allowance | The first option | A Google sign-in. No key. | To the Video Controls Plus AI proxy, which forwards the request to OpenAI |
| Your own key | **Your OpenAI key** or **Your Anthropic key** | An OpenAI or Anthropic API key | Directly from your browser to OpenAI or Anthropic, using your key |
| A local model | **Local (Ollama)** | Ollama running on your machine | Nowhere. It stays on your device. |

The daily allowance is small, and the AI Features tab in Settings shows how many runs are left today. When they are used up, add your own key or come back the next day.

## What is sent

Only the text the feature needs is sent, and only when you start it.

| Feature | Text that is sent |
|---|---|
| Video summary | The caption or transcript text of the current YouTube video |
| LinkedIn writing help | The text you are drafting |

No other page content is sent. The video itself is not sent.

A summary is made from the captions, so a YouTube video with no captions or transcript gives the feature no text, and there is no summary.

## What is kept

The Video Controls Plus team does not store the content of your AI requests.

An API key you add is stored locally in your browser. It is not sent to the team. It is sent to the provider it belongs to, because that is how the provider accepts your request.

Once your text reaches OpenAI or Anthropic, their own privacy policies apply to it. With a local model, the text you submit does not leave your device.

## When AI is not available

Every AI feature falls back to the built-in generators when AI is not available. The result is then made by the extension's own rules and not by a model.

For everything else the extension records, see [Privacy and permissions](/docs/privacy-and-permissions).

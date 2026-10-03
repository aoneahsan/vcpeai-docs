---
title: AI features and what they send
sidebar_label: AI features
description: Video summaries and LinkedIn writing help run through a daily allowance, your own OpenAI or Anthropic key, or a local model; here is what each one sends.
---

Video Controls Plus has two AI features: a summary of a YouTube video made from its captions, and writing help on LinkedIn. Both are off until you start them. With your own key or a local model they need no account, and only the shared allowance needs a [connected account](/docs/account-and-sync).

To start a summary, open the popup (the toolbar icon, or `Alt + V`, a [browser-level shortcut](/docs/keyboard-shortcuts/defaults)) on a YouTube watch page and click **Summarize this video**. The button is on YouTube watch pages only. Writing help starts on LinkedIn, and the [LinkedIn page](/docs/platforms/linkedin) covers it.

Every playback control works without them.

## Three ways to run it

Open Settings and go to the **AI Features** tab. On the **AI provider** card, pick one. You can switch at any time.

| Way | Option on the card | What you need | Where your text goes |
|---|---|---|---|
| The shared allowance | **Shared allowance** | A connected account. No key. | To the Video Controls Plus server, which forwards the request to OpenAI on the team's key |
| Your own key | **Your OpenAI key** or **Your Anthropic key** | An OpenAI or Anthropic API key. No account. | Directly from your browser to OpenAI or Anthropic, using your key |
| A local model | **Local (Ollama)** | Ollama running on your machine. No account. | Nowhere. It stays on your device. |

The shared allowance is 3 runs a day. The runs are counted on the server, against your account, so they are the same 3 in every browser you connect. The AI Features tab shows how many are left today, and when they are used up you add your own key or come back the next day.

Your own key and a local model have no limit from the team.

## What is sent

Only the text the feature needs is sent, and only when you start it.

| Feature | Text that is sent |
|---|---|
| Video summary | The caption or transcript text of the current YouTube video |
| LinkedIn writing help | The text you are drafting |

No other page content is sent. The video itself is not sent.

A summary is made from the captions, so a YouTube video with no captions or transcript gives the feature no text, and there is no summary.

## What is kept

The Video Controls Plus team does not store the content of your AI requests. With the shared allowance, the server keeps the count of your runs for the day.

An API key you add is stored locally in your browser. It is not sent to the team. It is sent to the provider it belongs to, because that is how the provider accepts your request.

Once your text reaches OpenAI or Anthropic, their own privacy policies apply to it. With a local model, the text you submit does not leave your device.

## When AI is not available

A video summary falls back to the built-in generator when AI is not available, and the summary is then made by the extension's own rules. No model is used.

For everything else the extension records, see [Privacy and permissions](/docs/privacy-and-permissions).

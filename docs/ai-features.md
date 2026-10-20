---
title: AI features and what they send
sidebar_label: AI features
description: Video summaries and LinkedIn writing help run on the Shared allowance, your own OpenAI or Anthropic key, or a local model. Speak runs on the Shared allowance only. Here is what each one sends.
---

Video Controls Plus has three AI features: a summary of a YouTube video made from its captions, writing help on LinkedIn, and Speak, which turns what you say into a note. Each runs only when you start it. Your own key or a local model needs no account, and the Shared allowance and Speak need a [connected account](/docs/account-and-sync).

Open the popup on a YouTube watch page and press **Summarize this video**. Writing help starts on LinkedIn ([LinkedIn page](/docs/platforms/linkedin)). Every playback control works without AI.

## Three ways to run it

Pick one on the **AI provider** card, in Settings → **AI Features**.

| Option on the card | What you need | Where your text goes |
|---|---|---|
| **Shared allowance** | A connected account | To the Video Controls Plus server, which sends it to Anthropic. On Pro or Team only, when that route is unavailable, it goes to OpenAI instead. |
| **Your OpenAI key** or **Your Anthropic key** | Your API key, no account | Straight from your browser to that provider |
| **Local (Ollama)** | Ollama on your machine | Nowhere. It stays on your device. |

A summary, a LinkedIn writing-help answer or a Speak proposal uses 1 of your plan's daily runs on the Shared allowance, and the popup's AI card shows how many you've used today. Each plan's daily runs and its AI level (Spark, Pulse or Surge) are on [Plans](https://vcpeai.aoneahsan.com/plans).

On Free, AI sometimes pauses. The card says "AI is resting until …", your runs are untouched, and everything else works. On Pro and Team the run goes to a second provider instead, and your own key and a local model have no limit from the team.

## Speak

Say it, then check what was written before anything is saved. Speak is in three places:

- **The extension:** **Speak a note** on the widget's **Tools** tab, on any video. It pins the note at that moment of the video.
- **The website:** Notes, Flashcards, Contact and Feature requests.
- **The Android app:** the same four pages.

A recording is up to 2 minutes. The first time, the extension opens a page, "Allow the microphone for Speak", to ask once. A recording where nothing was heard, or that failed to upload, uses no run. Speak works on the Shared allowance only.

## What is sent

| Feature | What is sent |
|---|---|
| Video summary | The caption or transcript text of the video |
| LinkedIn writing help | The text you are drafting |
| Speak | Your recording, to our server, which sends the audio for a transcript and then only the transcripts to the AI (see [Three ways to run it](#three-ways-to-run-it)) |

While you record, your browser's own speech recognition may also send your voice to your browser's maker. The video itself is never sent.

## What is kept

Your recording, its transcripts and the proposal are deleted within 24 hours, or at once when you press **Discard**, and if our file storage cannot be reached at that moment, the audio file is removed at the next hourly check. For a summary or writing help, the team does not store the text you send or the answer. For each Shared allowance run, the server keeps a usage record for 13 months, without your text, and a count of today's runs. A key you add stays in your browser and goes only to its provider.

Without AI, a summary falls back to the extension's built-in generator, with no model. The microphone and everything else are on [Privacy and permissions](/docs/privacy-and-permissions).

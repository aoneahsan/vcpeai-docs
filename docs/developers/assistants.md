---
title: Connect Claude, ChatGPT, Claude Code or Cursor
sidebar_label: Assistants
description: Give an assistant the Video Controls Plus address, choose on the website what it can reach, and ask it about your notes, bookmarks and flashcards.
last_update:
  date: 2026-11-21
---

# Assistants

**Connect an assistant and you can ask it about your own library:** "Which flashcards from last week's lectures are due?", "Turn my notes on this video into a summary", "Add this talk to Watch later". Claude, ChatGPT, Claude Code and Cursor connect to one address:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

The assistant sends you to the Video Controls Plus website, where you sign in, tick what it can reach and approve. It never gets a password or a key from you. The address is also on **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)**, with a copy button.

## Connecting {#connecting}

### Claude {#claude}

1. In Claude, open **Settings → Connectors** and choose **Add custom connector**.
2. Name it Video Controls Plus and paste the address above.
3. Claude opens our website. Tick what it can reach and approve.

### ChatGPT {#chatgpt}

1. In ChatGPT, open **Settings → Apps and connectors**, then **Advanced**, and turn on developer mode.
2. Choose **Create**, name it Video Controls Plus and paste the address above.
3. ChatGPT opens our website. Tick what it can reach and approve.

### Claude Code {#claude-code}

1. In a terminal, run:

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Run `/mcp` inside Claude Code and choose Video Controls Plus to sign in.
3. Your browser opens our website. Tick what it can reach and approve.

### Cursor {#cursor}

1. In Cursor, open **Settings → Tools & MCP** and choose **New MCP server**.
2. Add these lines to the file it opens, then save:

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor shows **Needs login**. Press it, tick what it can reach on our website and approve.

## What you approve {#what-you-approve}

The approval page names the assistant and the place it returns to, then shows the same Read, Change and Delete boxes as an [access key](./access-keys.md#what-each-tick-reaches). Delete starts off. Tick at least one thing it can read, or press **Deny**; a denied assistant gets a "denied" answer and reaches nothing.

With [two-step sign-in](./two-step-sign-in.md) on, you type your code to approve. A remembered browser skips the code only when the connection just reads. Letting an assistant change or delete also needs a sign-in from the last ten minutes. We email you that an assistant was connected.

Whatever it reads, it reads as your own words. It never sees your sign-in, keys or anyone else's library.

## Deleting waits for your yes {#deleting-waits-for-your-yes}

An assistant never deletes anything by itself, even with Delete ticked. When you ask it to remove a note, it gets a link instead, and the request waits on the website:

1. The assistant gives you the link, and **Other apps** shows it under **Asked to delete, waiting for you**.
2. Open it. The page shows what would go, the video it is on, when it was asked and the time to answer by.
3. Press **Delete the note** (or bookmark, card and so on), or **Keep it**.

The request lasts ten minutes. After that nothing is deleted, and you ask the assistant again if you still want it gone. The assistant gets a "deleted" answer the next time it checks.

## Renaming and disconnecting {#renaming-and-disconnecting}

Each connected assistant has a line in **Other apps** with when it was connected and last used. Give it a name you'll recognise, or press **Disconnect**, then again to confirm. Its next request is refused.

## How many you can connect {#how-many-you-can-connect}

Free holds 3 assistant connections, Pro 10 and Team 25 for each member. Connecting the same assistant again replaces its old approval and takes no extra place. Its requests count toward your requests a day, with your keys ([limits](./index.md#limits-on-each-plan)).

## The assistant reads your own writing {#your-own-writing}

Your notes, labels and card text go to the assistant as data, exactly as you wrote them. If you pasted instructions into a note, the assistant sees them as text from your library. Tick only the parts a conversation needs.

## For developers of MCP clients {#for-mcp-client-developers}

| | |
|---|---|
| Transport | Streamable HTTP, stateless, one endpoint |
| Sign-in | OAuth 2.1 with PKCE, through our Supabase authorization server at `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` |
| Discovery | Protected-resource metadata at `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| No token | `401` with a `WWW-Authenticate` header pointing at that metadata |
| Access keys | A `vcp_pat_` key works as the bearer token too, for a client you run yourself |
| Limits | 120 requests a minute per connection, plus the plan's requests a day |

The tools come from the same parts as [the API](./api.md#your-library): `list_<part>`, `get_<part>`, `create_<part>`, `update_<part>` and `prepare_delete_<part>`, as each part allows. `tools/list` shows only the tools this connection's ticks allow. The shared parts and your plan have list and get tools only, and voice notes and AI history are in no tool.

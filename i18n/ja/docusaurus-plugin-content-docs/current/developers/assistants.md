---
title: Claude、ChatGPT、Claude Code、Cursor を接続する
sidebar_label: アシスタント
description: Video Controls Plus の接続先をアシスタントに登録し、ウェブサイトでアクセス範囲を選んで、メモやブックマークなどについて質問します。
last_update:
  date: 2026-11-21
---

# アシスタント

**アシスタントを接続すると、自分のライブラリーについて質問できます。**「先週の講義のフラッシュカードで復習が必要なのは？」「この動画のメモを要約して」「この講演をあとで見るに追加して」などと頼めます。Claude、ChatGPT、Claude Code、Cursor は同じ接続先を使います。

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

アシスタントから Video Controls Plus のウェブサイトへ移動し、ログインしてアクセス範囲を選び、承認します。パスワードやキーをアシスタントに渡す必要はありません。接続先は**アカウント → [ほかのアプリ](https://vcpeai.aoneahsan.com/account/apps)**にもコピー用ボタンとともにあります。

## 接続方法 {#connecting}

### Claude {#claude}

1. Claude の **Settings → Connectors** で **Add custom connector** を選びます。
2. 名前を Video Controls Plus にして、上のアドレスを貼り付けます。
3. 開いたウェブサイトでアクセス範囲を選び、承認します。

### ChatGPT {#chatgpt}

1. ChatGPT の **Settings → Apps and connectors** から **Advanced** を開き、開発者モードを有効にします。
2. **Create** を選び、名前を Video Controls Plus にして上のアドレスを貼り付けます。
3. 開いたウェブサイトでアクセス範囲を選び、承認します。

### Claude Code {#claude-code}

1. ターミナルで次を実行します。

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Claude Code 内で `/mcp` を実行し、Video Controls Plus を選んでログインします。
3. ブラウザーで開いたウェブサイトからアクセス範囲を選び、承認します。

### Cursor {#cursor}

1. Cursor の **Settings → Tools & MCP** で **New MCP server** を選びます。
2. 開いたファイルに次を追加して保存します。

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. **Needs login** と表示されたら押し、ウェブサイトでアクセス範囲を選んで承認します。

## 承認する内容 {#what-you-approve}

承認ページにはアシスタント名と戻り先を表示し、[アクセスキー](./access-keys.md#what-each-tick-reaches)と同じ**読み取り・変更・削除**を選べます。削除は初期状態でオフです。少なくとも一つの読み取りを選んでください。**拒否**すると、アシスタントには拒否の応答が返り、何にもアクセスできません。

[二段階ログイン](./two-step-sign-in.md)がオンの場合は、承認にコードを入力します。記憶済みブラウザーでコードを省略できるのは、読み取り専用の接続だけです。変更や削除を許可するには、過去 10 分以内のログインも必要です。接続時にはメールでお知らせします。

読めるのは自分の文章だけです。ログイン情報、キー、他人のライブラリーは見えません。

## 削除には自分の承認が必要 {#deleting-waits-for-your-yes}

削除を許可しても、アシスタントだけで削除することはできません。メモの削除を頼むと、代わりにリンクが返り、ウェブサイトで確認を待ちます。

1. アシスタントからリンクが渡され、**ほかのアプリ**の**削除依頼・承認待ち**にも表示されます。
2. リンクを開くと、削除対象、関連する動画、依頼時刻、回答期限を確認できます。
3. **メモを削除**などのボタン、または**残す**を押します。

依頼は 10 分で期限切れになります。期限後は何も削除されません。まだ削除したければ、もう一度アシスタントに頼んでください。アシスタントが次に確認すると「削除済み」の応答を受け取ります。

## 名前の変更と切断 {#renaming-and-disconnecting}

**ほかのアプリ**には接続済みアシスタントと接続日、最終利用日が並びます。分かりやすい名前に変更できます。**切断**を押し、もう一度確認すると、次のリクエストから拒否されます。

## 接続数の上限 {#how-many-you-can-connect}

Free は 3 件、Pro は 10 件、Team はメンバーごとに 25 件です。同じアシスタントを再接続すると以前の承認を置き換え、枠を余分に使いません。リクエストはキーと合わせて一日の上限に数えられます（[上限](./index.md#limits-on-each-plan)）。

## アシスタントは自分の文章を読む {#your-own-writing}

メモ、ラベル、カードの文章は、書いたとおりのデータとしてアシスタントに渡されます。メモに命令文を貼り付けた場合も、ライブラリー内の文章として見えます。会話に必要な範囲だけを選んでください。

## MCP クライアントの開発者向け {#for-mcp-client-developers}

| 項目 | 内容 |
|---|---|
| 通信方式 | ステートレスの Streamable HTTP、接続先は一つ |
| ログイン | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` の Supabase 認可サーバーを使う OAuth 2.1 と PKCE |
| 発見用メタデータ | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| トークンなし | このメタデータを指す `WWW-Authenticate` ヘッダー付きの `401` |
| アクセスキー | 自分で動かすクライアントでは `vcp_pat_` キーもベアラートークンとして利用可能 |
| 上限 | 接続ごとに毎分 120 リクエストと、プランごとの一日上限 |

ツールは [API](./api.md#your-library) と同じ対象から作られます。対象が許す操作に応じて `list_<part>`、`get_<part>`、`create_<part>`、`update_<part>`、`prepare_delete_<part>` を提供します。`tools/list` に表示されるのは、その接続に許可されたツールだけです。共有部分とプランは一覧・取得のみで、音声メモと AI 履歴はどのツールにもありません。

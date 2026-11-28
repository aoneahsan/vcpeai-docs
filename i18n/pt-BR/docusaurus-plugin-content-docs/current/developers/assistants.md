---
title: Conectar Claude, ChatGPT, Claude Code ou Cursor
sidebar_label: Assistentes
description: Informe o endereço do Video Controls Plus ao assistente, escolha no site o que ele pode acessar e pergunte sobre notas, favoritos e cartões.
last_update:
  date: 2026-11-21
---

# Assistentes

**Conecte um assistente para perguntar sobre sua biblioteca:** “Quais cartões das aulas da semana passada estão para revisar?”, “Resuma minhas notas deste vídeo” ou “Adicione esta palestra a Assistir mais tarde”. Claude, ChatGPT, Claude Code e Cursor usam o mesmo endereço:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

O assistente leva você ao site do Video Controls Plus, onde você entra, marca o alcance e aprova. Você não entrega senha nem chave a ele. O endereço também está em **Conta → [Outros aplicativos](https://vcpeai.aoneahsan.com/account/apps)**, com botão para copiar.

## Conectar {#connecting}

### Claude {#claude}

1. Abra **Settings → Connectors** no Claude e escolha **Add custom connector**.
2. Dê o nome Video Controls Plus e cole o endereço acima.
3. O Claude abre nosso site. Marque o alcance e aprove.

### ChatGPT {#chatgpt}

1. No ChatGPT, abra **Settings → Apps and connectors**, depois **Advanced**, e ative o modo de desenvolvedor.
2. Escolha **Create**, dê o nome Video Controls Plus e cole o endereço.
3. O ChatGPT abre nosso site. Marque o alcance e aprove.

### Claude Code {#claude-code}

1. Em um terminal, execute:

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Execute `/mcp` no Claude Code e escolha Video Controls Plus para entrar.
3. O navegador abre nosso site. Marque o alcance e aprove.

### Cursor {#cursor}

1. Abra **Settings → Tools & MCP** no Cursor e escolha **New MCP server**.
2. Adicione estas linhas ao arquivo aberto:

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. O Cursor mostra **Needs login**. Pressione, marque o alcance no site e aprove.

## O que você aprova {#what-you-approve}

A página informa o assistente e seu endereço de retorno e mostra as mesmas opções Ler, Alterar e Excluir de uma [chave](./access-keys.md#what-each-tick-reaches). Excluir começa desligado. Marque pelo menos uma parte para leitura ou pressione **Negar**; um assistente negado não acessa nada.

Com [duas etapas](./two-step-sign-in.md) ativas, informe o código. Um navegador lembrado dispensa o código apenas se a conexão tiver só leitura. Permitir alterações ou exclusões também exige entrada na conta nos últimos dez minutos. Enviamos email ao conectar um assistente.

Ele lê seus próprios dados e nunca vê entrada na conta, chaves ou bibliotecas de outras pessoas.

## Exclusões aguardam sua confirmação {#deleting-waits-for-your-yes}

Um assistente nunca exclui sozinho, mesmo com Excluir marcado. Ao pedir a remoção de uma nota, ele recebe um link e a solicitação aguarda no site:

1. O assistente fornece o link; **Outros aplicativos** mostra **Exclusão solicitada, aguardando você**.
2. Abra-o. A página mostra o item, vídeo, horário da solicitação e prazo.
3. Pressione **Excluir nota** (ou favorito, cartão etc.) ou **Manter**.

A solicitação dura dez minutos. Depois disso, nada é excluído; peça novamente se ainda quiser. O assistente recebe a resposta “excluído” na próxima consulta.

## Renomear e desconectar {#renaming-and-disconnecting}

Cada assistente aparece em **Outros aplicativos** com data de conexão e último uso. Dê um nome reconhecível ou pressione **Desconectar** duas vezes para confirmar. A próxima requisição será recusada.

## Limite de conexões {#how-many-you-can-connect}

Free permite 3 assistentes, Pro 10 e Team 25 por integrante. Reconectar o mesmo assistente substitui a aprovação anterior sem ocupar outra vaga. Requisições entram no limite diário compartilhado com suas chaves ([limites](./index.md#limits-on-each-plan)).

## O assistente lê o que você escreveu {#your-own-writing}

Notas, rótulos e textos de cartões chegam ao assistente como dados, exatamente como você escreveu. Se uma nota contém instruções coladas, o assistente as vê como texto da biblioteca. Marque apenas as partes necessárias à conversa.

## Para desenvolvedores de clientes MCP {#for-mcp-client-developers}

| | |
|---|---|
| Transporte | Streamable HTTP, sem estado, um endpoint |
| Entrada na conta | OAuth 2.1 com PKCE pelo servidor de autorização Supabase em `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` |
| Descoberta | Metadados do recurso protegido em `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| Sem token | `401` com cabeçalho `WWW-Authenticate` apontando aos metadados |
| Chaves de acesso | Uma chave `vcp_pat_` também funciona como bearer token para cliente operado por você |
| Limites | 120 requisições/minuto por conexão, além do limite diário do plano |

As ferramentas vêm das mesmas partes da [API](./api.md#your-library): `list_<part>`, `get_<part>`, `create_<part>`, `update_<part>` e `prepare_delete_<part>`, conforme permitido. `tools/list` mostra apenas o que a conexão autorizou. Partes compartilhadas e plano têm apenas listagem e leitura; notas de voz e histórico de IA não têm ferramenta.

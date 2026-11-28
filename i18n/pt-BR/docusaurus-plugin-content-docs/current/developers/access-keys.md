---
title: Chaves de acesso
description: Crie uma chave de acesso do Video Controls Plus para sua ferramenta, escolha alcance e prazo e revele, substitua ou remova depois.
last_update:
  date: 2026-11-21
---

# Chaves de acesso

**Uma chave funciona como a senha de uma ferramenta:** sincronização de planilhas, script ou atalho do celular. A ferramenta a envia em cada requisição à [API](./api.md), e ela alcança apenas as partes da biblioteca marcadas na criação. As chaves começam com `vcp_pat_` seguido de uma longa sequência aleatória. Nunca inclua uma chave em algo que você compartilha.

## Criar uma chave {#making-a-key}

1. No site, abra **Conta → [Outros aplicativos](https://vcpeai.aoneahsan.com/account/apps)** e pressione **Criar chave**.
2. Dê um **Nome** que identifique a ferramenta, como “Sincronização da planilha de estudo”.
3. Marque o que a chave pode acessar. Cada parte oferece **Ler**, **Alterar** e **Excluir**. Marque ao menos uma parte para leitura.
4. Escolha quando **Deixa de funcionar após**: 30, 90 ou 365 dias, ou **Nunca**. Sem prazo só é permitido para uma chave de leitura; chaves que alteram ou excluem sempre expiram.
5. Pressione **Criar chave** e copie-a. É a única vez que aparece sem nova entrada na conta.

Criar exige entrada na conta nos últimos dez minutos e o código de duas etapas, se ativo. Enviamos um email avisando da criação, sem a chave.

## Alcance de cada opção {#what-each-tick-reaches}

Uma opção marcada vira uma permissão na chave. Se faltar permissão, a API responde `403 scope_required` e informa qual é necessária.

| Parte no site | Ler | Alterar | Excluir | Parte da API |
|---|---|---|---|---|
| Favoritos | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| Notas | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| Coleções | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| Cartões de estudo | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| Caminhos de aprendizado | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| Histórico de vídeos | `history:read` | | `history:delete` | `watch_history` |
| Assistir mais tarde | `later:read` | `later:write` | `later:delete` | `watch_later` |
| Transcrições | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| Capturas de tela | `screenshots:read` | | | `screenshots` |
| Configurações e atalhos | `settings:read` | `settings:write` | | `settings` |
| Dispositivos | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| Sessões em grupo | `parties:read` | | | `watch_parties`, `party_members` |
| Correções comunitárias | `fixes:read` | | | `site_fixes` |
| Sugestões de recursos | `requests:read` | | | `feature_requests`, `request_votes` |

Uma célula vazia indica permissão indisponível: Histórico de vídeos não pode ser alterado, capturas e partes compartilhadas são somente leitura, e Configurações não podem ser excluídas. Toda chave lê plano e uso de hoje (`account:read` e parte `account`), sem opção adicional.

## Revelar uma chave novamente {#showing-a-key-again}

Pressione **Mostrar novamente**. Ela só aparece nos dez minutos após entrar na conta e, com duas etapas ativas, após informar o código. Mesmo um navegador lembrado pede o código aqui. A chave fica visível por pouco tempo; feche após copiá-la.

## Substituir uma chave {#replacing-a-key}

Pressione **Substituir** se suspeitar de vazamento ou quiser outra chave. A nova mantém nome e permissões. A antiga funciona por mais 24 horas para você atualizar a ferramenta; depois para.

## Remover uma chave {#removing-a-key}

Pressione **Remover** e confirme pressionando novamente. A próxima requisição com ela recebe `401 invalid_token`. Biblioteca, demais chaves e assistentes permanecem.

## Conferir permissões de uma chave {#checking-what-a-key-can-do}

`GET /token` devolve o tipo de chave e permissões em ordem:

```bash
curl https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/token \
  -H "Authorization: Bearer $VCP_KEY"
```

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89",
    "client_id": null,
    "scopes": ["account:read", "bookmarks:read", "notes:read", "notes:write"]
  }
}
```

**Outros aplicativos** também mostra criação, último uso e prazo de cada chave.

## Quantas chaves você pode ter {#how-many-you-can-have}

Free permite 5, Pro 25 e Team 50 por integrante. Chaves removidas não contam. Ao atingir o limite, remova uma ou escolha um plano com mais na [página Planos](https://vcpeai.aoneahsan.com/plans).

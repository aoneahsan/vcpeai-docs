---
title: Video Controls Plus para desenvolvedores
sidebar_label: Visão geral
description: Consulte e altere seus favoritos, notas, cartões e outros dados do Video Controls Plus por script, Claude, ChatGPT ou servidor próprio.
last_update:
  date: 2026-11-21
---

# Video Controls Plus para desenvolvedores

**Você pode acessar sua biblioteca fora da extensão com ferramentas conectadas por você:** um script com chave de acesso, um assistente como Claude ou ChatGPT, ou seu servidor recebendo cada alteração por webhook. Configure os três no site em **Conta → [Outros aplicativos](https://vcpeai.aoneahsan.com/account/apps)**. Estão disponíveis em todos os planos, inclusive Free.

Cada chave, assistente ou webhook alcança apenas as partes que você marcou e age em seu nome. Não vê nada que você mesmo não possa abrir no site.

## Três formas de conectar {#three-ways-in}

| Se você quer | Use | Página |
|---|---|---|
| Um script, sincronização com planilha ou atalho do celular que lê ou altera a biblioteca | Chave de acesso e API REST | [Chaves](./access-keys.md), [API](./api.md) |
| Perguntar ao Claude, ChatGPT, Claude Code ou Cursor sobre notas e cartões | Endereço do assistente (MCP) | [Assistentes](./assistants.md) |
| Avisar seu servidor ao salvar nota ou favorito | Endereço de webhook | [Webhooks](./webhooks.md) |

## O que um aplicativo externo pode acessar {#what-an-outside-app-can-reach}

Apenas seus dados e apenas as partes que você marcar:

- **Ler e alterar:** favoritos, notas, coleções e seus vídeos, cartões de estudo, caminhos de aprendizado e seus vídeos, Assistir mais tarde, transcrições, configurações e navegadores conectados.
- **Ler e remover:** Histórico de vídeos. Apenas a extensão acrescenta registros, enquanto essa opção está ativa.
- **Ler:** capturas de tela. A remoção continua na extensão.
- **Excluir:** quando você marca Excluir para aquela parte. Uma chave exclui imediatamente; uma exclusão pedida por assistente aguarda seu sim no site.
- **Somente leitura:** sessões para assistir em grupo das quais você participa, correções comunitárias de sites e sugestões de recursos com seus votos.
- **Sempre legíveis:** plano, limites e uso de hoje.

### O que nunca pode acessar {#what-it-never-reaches}

Independentemente das opções marcadas, nenhuma chave, assistente ou webhook pode:

- acessar a biblioteca de outra pessoa ou revelar outros participantes de uma sessão;
- criar ou entrar em sessão, votar, publicar correção de site ou alterar sugestão de recurso;
- ver sua entrada na conta, códigos de duas etapas, códigos de recuperação, chaves ou segredos de assinatura;
- alterar plano, pagamentos ou email, nem conectar a extensão;
- ler notas de voz, histórico de IA, pagamentos, indicações ou análise de uso;
- abrir páginas da equipe.

## Endereços {#the-addresses}

| O quê | Endereço |
|---|---|
| API REST | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1` |
| Documento OpenAPI | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json` |
| Versão Markdown | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md` |
| Endereço do assistente (MCP) | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp` |

O documento OpenAPI é gerado da mesma lista de partes e campos da API, para não descrever rotas inexistentes.

## Limites por plano {#limits-on-each-plan}

| | Free | Pro | Team (por integrante) |
|---|---|---|---|
| Chaves de acesso | 5 | 25 | 50 |
| Requisições da API e dos assistentes por dia | 5.000 | 50.000 | 100.000 |
| Endereços de webhook | 3 | 20 | 40 |
| Conexões de assistentes | 3 | 10 | 25 |

O limite diário soma todas as suas chaves e assistentes e reinicia à meia-noite UTC. Cada chave ou assistente também tem limite próprio de 120 requisições por minuto. **Outros aplicativos** mostra seu uso em relação ao plano. Planos e preços estão em [Planos](https://vcpeai.aoneahsan.com/plans).

## Chaves e segredos exigem nova entrada na conta {#keys-and-secrets-stay-hidden}

Uma chave ou segredo de assinatura de webhook é mostrado por inteiro uma vez, na criação. Depois disso, só é revelado nos dez minutos após você entrar na conta e, com [verificação em duas etapas](./two-step-sign-in.md), após informar o código do autenticador. Um navegador deixado aberto não pode revelá-lo. Enviamos email quando uma chave é criada, um assistente conectado ou um webhook adicionado; o email nunca contém chave ou segredo.

## Nesta seção {#in-this-section}

- [Chaves de acesso](./access-keys.md): criar, revelar, substituir e remover, com o alcance de cada opção.
- [API](./api.md): requisições, páginas de resultados, erros, limites e exemplos `curl`.
- [Assistentes](./assistants.md): conectar Claude, ChatGPT, Claude Code ou Cursor.
- [Webhooks](./webhooks.md): eventos, conteúdo da mensagem e verificação de assinatura.
- [Verificação em duas etapas](./two-step-sign-in.md): código após Google no site e na extensão.
- [Histórico para desenvolvedores](./changelog.md): alterações mais recentes primeiro.

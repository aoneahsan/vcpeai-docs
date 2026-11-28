---
title: Histórico para desenvolvedores
description: Mudanças na API, endereço de assistentes, webhooks e verificação em duas etapas do Video Controls Plus, da mais recente à mais antiga.
last_update:
  date: 2026-11-21
---

# Histórico para desenvolvedores

Mudanças para quem cria integrações com o Video Controls Plus, da mais recente à mais antiga. Lançamentos do produto estão no [histórico principal](/changelog).

## 2026-11-21: Outros aplicativos e verificação em duas etapas {#2026-11-21}

- **Novo: [chaves de acesso](./access-keys.md)** (`vcp_pat_…`), criadas em **Conta → Outros aplicativos**, cada uma com permissões de Ler, Alterar e Excluir e prazo, exceto quando apenas lê.
- **Novo: [API](./api.md), versão 1**, para favoritos, notas, coleções, cartões, caminhos, histórico, Assistir mais tarde, transcrições, capturas, configurações e dispositivos, além de leitura de sessões, correções de sites, sugestões e plano. OpenAPI 3.1 em `/v1/openapi.json`.
- **Novo: [endereço de assistentes](./assistants.md)** para Claude, ChatGPT, Claude Code e Cursor. Exclusões solicitadas por assistentes aguardam sua confirmação no site.
- **Novo: [webhooks](./webhooks.md)** com assinatura Standard Webhooks, 32 eventos, mensagem de teste, conteúdo resumido por padrão e **Incluir o que foi escrito** por endereço.
- **Novo: [verificação em duas etapas](./two-step-sign-in.md)** no site, com dez códigos de recuperação e lembrança opcional do navegador por 7 dias. A extensão conectada é confiável por 7 dias quando a verificação está ativa.
- **Limites:** Free: 5 chaves, 5.000 requisições/dia, 3 webhooks e 3 assistentes; Pro: 25, 50.000, 20 e 10; Team: 50, 100.000, 40 e 25 por integrante.

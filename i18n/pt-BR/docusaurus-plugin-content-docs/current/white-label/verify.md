---
title: Verificar uma licença de marca própria
sidebar_label: Verificar licença
description: Confira uma licença de marca própria do Video Controls Plus por chave ou domínio e conheça o arquivo servido em cada implantação.
last_update:
  date: 2026-11-13
---

Qualquer pessoa pode consultar uma licença na [página de verificação](https://vcpeai.aoneahsan.com/verify-license), operada pelo nosso serviço de licenciamento.

## Pela chave

Escolha **Chave da licença**, cole-a e pressione **Verificar**. A página mostra se está ativa, o titular, os domínios cobertos, o estado e até quando há atualizações. Nunca mostra email, telefone ou preço.

## Pelo domínio

Escolha **Domínio**, digite o host (por exemplo, `videos.example.com`) e pressione **Verificar**. O serviço lê o arquivo de licença servido por aquele domínio e confere a chave.

| Resposta | Significado |
|---|---|
| Este domínio serve uma licença válida. | O arquivo existe e a chave cobre o domínio. |
| Este domínio serve uma licença emitida para outro domínio. | A chave é real, mas não vale para este domínio. |
| Este domínio não serve um arquivo de licença. | O arquivo não está no endereço abaixo. |
| Não foi possível acessar o domínio. | O domínio não respondeu por HTTPS. |

## Arquivo de licença

Cada implantação de marca própria serve:

```text
/.well-known/vcpeai-white-label-license.json
```

O arquivo informa produto, cliente, domínio e chave da licença, com link para verificação. Um certificado PDF fica ao lado, no mesmo caminho terminado em `.pdf`. Nós adicionamos ambos ao publicar sua versão; você não precisa criá-los.

Uma versão com chave revogada ou domínio não coberto mostra “Esta licença não está ativa” no lugar do aplicativo. Nenhum dado é excluído.

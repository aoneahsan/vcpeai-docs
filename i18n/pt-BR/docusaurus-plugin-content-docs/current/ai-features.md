---
title: Recursos de IA e dados enviados
sidebar_label: Recursos de IA
description: Resumos e ajuda para escrever no LinkedIn usam a Franquia compartilhada, sua chave OpenAI ou Anthropic ou um modelo local. Speak usa apenas a Franquia compartilhada.
---

O Video Controls Plus tem três recursos de IA: resumo de vídeo do YouTube feito a partir das legendas, ajuda para escrever no LinkedIn e Speak, que transforma sua fala em nota. Cada um só funciona quando você o inicia. Sua chave própria ou um modelo local dispensam conta; a Franquia compartilhada e Speak exigem [conta conectada](/docs/account-and-sync).

Abra o popup em uma página de vídeo do YouTube e pressione **Resumir este vídeo**. A ajuda para escrever começa no LinkedIn ([página do LinkedIn](/docs/platforms/linkedin)). Todos os controles de reprodução funcionam sem IA.

## Três formas de usar {#three-ways-to-run-it}

Escolha no cartão **Provedor de IA**, em Configurações → **Recursos de IA**.

| Opção | O que você precisa | Destino do texto |
|---|---|---|
| **Franquia compartilhada** | Conta conectada | Servidor do Video Controls Plus, que envia à Anthropic. No Pro ou Team, se essa rota estiver indisponível, envia à OpenAI. |
| **Sua chave OpenAI** ou **Sua chave Anthropic** | Chave de API própria, sem conta | Diretamente do navegador ao provedor |
| **Local (Ollama)** | Ollama no computador | Fica no dispositivo |

Um resumo, uma resposta para o LinkedIn ou uma proposta Speak consome 1 uso diário do seu plano na Franquia compartilhada. O cartão de IA do popup mostra quantos você usou hoje. Limites e nível (Spark, Pulse ou Surge) estão em [Planos](https://vcpeai.aoneahsan.com/plans).

No Free, a IA às vezes pausa. O cartão mostra “A IA descansa até …”; seus usos não são consumidos e os demais recursos continuam. No Pro e Team, a solicitação segue por um segundo provedor. Com chave própria ou modelo local, a equipe não impõe limite.

## Speak

Fale e confira o texto antes de salvar. Speak está em:

- **Extensão:** **Speak a note** na aba **Ferramentas** do widget, em qualquer vídeo. A nota fica marcada no ponto da gravação.
- **Site:** Notas, Cartões de estudo, Contato e Sugestões de recursos.
- **Aplicativo Android:** as mesmas quatro páginas.

A gravação dura até 2 minutos. Na primeira vez, a extensão abre “Permitir o microfone para Speak” para pedir a permissão. Gravações silenciosas ou cujo envio falha não consomem usos. Speak funciona apenas com a Franquia compartilhada.

## Dados enviados

| Recurso | O que é enviado |
|---|---|
| Resumo de vídeo | Legendas ou transcrição do vídeo |
| Ajuda para escrever no LinkedIn | Texto que você está redigindo |
| Speak | Gravação para nosso servidor, que envia o áudio para transcrição e depois apenas as transcrições à IA (veja [Três formas de usar](#three-ways-to-run-it)) |

Durante a gravação, o reconhecimento de fala do navegador também pode enviar sua voz ao fabricante do navegador. O vídeo em si nunca é enviado.

## Dados guardados

A gravação, suas transcrições e a proposta são excluídas em até 24 horas, ou imediatamente quando você pressiona **Descartar**. Se o armazenamento de arquivos estiver indisponível nesse momento, o áudio é removido na próxima verificação horária. Para resumos e ajuda de escrita, a equipe não guarda seu texto nem a resposta. Cada uso da Franquia compartilhada gera um registro de uso sem texto mantido por 13 meses, além da contagem diária. Uma chave informada por você fica no navegador e vai apenas para seu provedor.

Sem IA, o resumo recorre ao gerador integrado da extensão, sem modelo. Veja microfone e demais dados em [Privacidade e permissões](/docs/privacy-and-permissions).

---
title: Webhooks
description: Eventos de webhook do Video Controls Plus, conteúdo das mensagens assinadas, verificação em Node ou Python e novas tentativas de envio.
last_update:
  date: 2026-11-21
---

# Webhooks

**Um webhook avisa seu servidor assim que algo muda na sua biblioteca.** Ao salvar uma nota, enviamos uma mensagem curta e assinada para um endereço seu. Por padrão, ela informa o que aconteceu, em qual item e quando. Seu texto permanece na biblioteca, a menos que você marque **Incluir o que foi escrito**.

Mensagens são enviadas para mudanças feitas na extensão, no site, com chave de acesso ou por assistente.

## Adicionar um endereço {#adding-an-address}

1. No site, abra **Conta → [Outros aplicativos](https://vcpeai.aoneahsan.com/account/apps)** e pressione **Adicionar endereço**.
2. Cole um endereço `https://` do seu servidor e, se quiser, uma descrição como “Caixa de entrada Obsidian”.
3. Marque os eventos desejados. Cada parte tem **Todos os eventos de …** para marcar todos de uma vez.
4. Deixe **Incluir o que foi escrito** desligado se outras pessoas compartilham o endereço.
5. Pressione **Adicionar endereço** e copie o segredo de assinatura, iniciado por `whsec_`.

Adicionar exige entrada na conta nos últimos dez minutos e código de [duas etapas](./two-step-sign-in.md), se ativo. Enviamos email de aviso sem o segredo.

Enviamos apenas a endereços acessíveis pela internet e conferimos isso antes de cada mensagem:

- apenas `https://` nas portas 443 ou 8443, com no máximo 2.048 caracteres, sem usuário ou senha no endereço;
- nada de rede local ou privada nem de endereços nossos;
- nome de host que resolve.

## Eventos {#events}

- **Favoritos:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **Notas:** `note.saved`, `note.updated`, `note.deleted`
- **Coleções:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **Cartões de estudo:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **Caminhos de aprendizado:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **Histórico de vídeos:** `watch_history.added`, `watch_history.removed`
- **Assistir mais tarde:** `watch_later.added`, `watch_later.removed`
- **Transcrições:** `transcript.saved`, `transcript.deleted`
- **Capturas:** `screenshot.saved`, `screenshot.deleted`
- **Configurações e atalhos:** `settings.updated`
- **Dispositivos:** `device.added`, `device.removed`
- **Seu endereço:** `webhook.test`, ao usar **Enviar teste**

Um evento `updated` indica mudança no que você escreveu. Atividade por si só não conta: revisar um cartão muda sua agenda e envia `flashcard.reviewed`, não `flashcard.updated`; minutos assistidos em um caminho não geram evento. Histórico envia `added` na primeira visualização e `removed` na exclusão, nunca quando a posição muda. Sessões em grupo, correções comunitárias e sugestões de recursos não geram eventos.

## Conteúdo de uma mensagem {#what-a-message-carries}

Cada mensagem é um `POST` com corpo JSON e três cabeçalhos:

```http
POST /hooks/vcp HTTP/1.1
Content-Type: application/json
User-Agent: VideoControlsPlus-Webhooks/1.0
webhook-id: msg_3f1c9a7e52b84d0e9a6c41b27d58e0f3
webhook-timestamp: 1795252443
webhook-signature: v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=
```

```json
{"type":"note.saved","timestamp":"2026-11-21T09:14:03.512Z","data":{"id":"0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e","video_id":"dQw4w9WgXcQ","platform":"youtube","occurred_at":"2026-11-21T09:14:03.512418+00:00"}}
```

`data` contém `id` e, quando se refere a vídeo, `video_id` e `platform`, além de `occurred_at`. Para obter o restante, consulte o item pela [API](./api.md).

Com **Incluir o que foi escrito** ativo, `data` recebe também alguns campos por parte:

| Parte | Campos adicionais em `data` |
|---|---|
| Favoritos | `label`, `note`, `color`, `position_seconds` |
| Notas | `content`, `category`, `tags` |
| Coleções | `name`, `description`; para vídeos, `collection_id` e `video_title` |
| Cartões | `front`, `back`, `tags` |
| Caminhos | `title`, `description`; para vídeos, `path_id`, `video_title`, `notes` |
| Histórico | `video_title`, `channel_name` |
| Assistir mais tarde | `video_title`, `priority`, `notes` |
| Transcrições | `language`, `format` |
| Capturas | `position_seconds`, `width`, `height` |
| Configurações e atalhos | `changed`: `["settings"]`, `["shortcuts"]` ou ambos |
| Dispositivos | `device_name`, `browser` |

O texto de uma transcrição nunca é enviado por webhook, mesmo com a opção marcada. Consulte-o com uma chave em `transcript_texts`.

A mesma nota com a opção marcada:

```json
{
  "type": "note.saved",
  "timestamp": "2026-11-21T09:14:03.512Z",
  "data": {
    "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "video_id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "occurred_at": "2026-11-21T09:14:03.512418+00:00",
    "content": "Chorus comes back at 1:43. Use it for the timing exercise.",
    "category": "action",
    "tags": ["music-theory"]
  }
}
```

Uma mudança de configuração e a mensagem de teste:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## Verificar a origem da mensagem {#checking-a-message}

As mensagens seguem <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a>; uma biblioteca compatível aceita o segredo sem ajustes. Para conferir manualmente:

1. Una `webhook-id`, `webhook-timestamp` e o **corpo bruto** exatamente como recebido, separados por `.`.
2. Remova `whsec_` do segredo, decodifique o restante em base64 e calcule o HMAC-SHA256 do texto unido.
3. Codifique o resultado em base64. Ele deve corresponder a um dos valores `v1,` do cabeçalho `webhook-signature`, separados por espaços.
4. Recuse horários com diferença superior a cinco minutos para impedir repetição de mensagens antigas.

Leia o JSON somente depois da verificação. Decodificar e serializar o corpo novamente muda a assinatura.

Os exemplos abaixo podem ser conferidos contra a mensagem acima com este segredo, criado apenas para a documentação:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

A assinatura correta é `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. Seu segredo verdadeiro está em **Outros aplicativos**.

### Node {#node}

```js
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';

/** True when the message was signed with `secret` in the last five minutes. */
export function isFromVideoControlsPlus(secret, headers, rawBody, nowSeconds = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

createServer((req, res) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!isFromVideoControlsPlus(process.env.VCP_WEBHOOK_SECRET, req.headers, rawBody)) {
      res.writeHead(400).end();
      return;
    }
    const message = JSON.parse(rawBody);
    res.writeHead(204).end();
    // Handle message.type after answering, so a slow job never runs past the ten-second wait.
  });
}).listen(8443);
```

### Python {#python}

```python
import base64
import hashlib
import hmac
import time


def is_from_video_controls_plus(secret, headers, raw_body, now_seconds=None):
    """True when the message was signed with `secret` in the last five minutes."""
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now_seconds is None else now_seconds
    if abs(now - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()
    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Passe `raw_body` como os bytes recebidos: `request.get_data()` no Flask ou `await request.body()` no FastAPI.

## Resposta, novas tentativas e desativação {#answering-retries-and-turning-off}

Responda com qualquer `2xx` em até dez segundos. Não seguimos redirecionamentos; `3xx` conta como falha.

Uma mensagem que falha é reenviada após 5 segundos, 5 minutos, 30 minutos, 2 horas, 5 horas, 10 horas e mais 10 horas: oito tentativas em cerca de 27 horas. O mesmo `webhook-id` acompanha todas; guarde os identificadores já processados e ignore duplicatas.

O endereço é desligado se responder `410 Gone` ou se as entregas falharem por cinco dias seguidos. Enviamos email com a última resposta. Pressione **Reativar** em **Outros aplicativos** quando seu servidor estiver pronto.

## Gerenciar um endereço {#managing-an-address}

Cada endereço em **Outros aplicativos** mostra os eventos e:

- **Enviar teste** envia `webhook.test`; aparece no registro de entregas quando seu servidor responde.
- **Pausar** interrompe envios. Nada fica enfileirado; os próximos partem depois de **Reativar**.
- **Registro de entregas** lista mensagens recentes, resultado, duração e tentativas. **Enviar novamente** usa o mesmo `webhook-id`.
- **Remover** interrompe tudo para aquele endereço.

### Revelar e substituir o segredo {#replacing-the-secret}

**Mostrar segredo de assinatura** funciona nos dez minutos após entrar na conta e pede o código de duas etapas, se ativo. **Substituir segredo** cria outro. Durante 24 horas, cada mensagem inclui as duas assinaturas, a nova primeiro, para você atualizar seu servidor sem perder mensagens.

## Quantos endereços você pode ter {#how-many-you-can-have}

Free permite 3 endereços, Pro 20 e Team 40 por integrante. Ao atingir o limite, remova um ou escolha outro plano em [Planos](https://vcpeai.aoneahsan.com/plans).

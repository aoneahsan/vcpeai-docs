---
title: Вебхуки
description: События вебхуков Video Controls Plus, состав подписанного сообщения, проверка подписи в Node и Python и правила повторной отправки.
last_update:
  date: 2026-11-21
---

# Вебхуки

**Вебхук сообщает вашему серверу об изменении в библиотеке.** При сохранении заметки мы отправляем короткое подписанное сообщение на ваш адрес. По умолчанию оно содержит действие, элемент и время. Ваш текст остаётся в библиотеке, если вы не включили **Include what was written**.

Сообщение отправляется при изменении из расширения, сайта, через ключ доступа или помощника.

## Добавьте адрес {#adding-an-address}

1. На сайте откройте **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** и нажмите **Add an address**.
2. Вставьте адрес своего сервера с `https://` и при желании описание, например «Входящие Obsidian».
3. Отметьте события. Поле **Every … event** включает сразу все события раздела.
4. Оставьте **Include what was written** выключенным, если адресом пользуются другие люди.
5. Нажмите **Add address** и скопируйте секрет подписи, начинающийся с `whsec_`.

Для добавления нужен вход за последние 10 минут и, при [двухэтапном входе](./two-step-sign-in.md), код. О добавлении придёт письмо без секрета.

Мы отправляем сообщения только на доступные из интернета адреса и проверяем адрес перед каждой отправкой:

- Только `https://`, порт 443 или 8443, длина не более 2 048 символов, без имени пользователя и пароля.
- Не частный или локальный сетевой адрес и не наш собственный адрес.
- Имя хоста должно разрешаться.

## События {#events}

- **Закладки:** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **Заметки:** `note.saved`, `note.updated`, `note.deleted`
- **Коллекции:** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **Карточки:** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **Учебные пути:** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **История просмотра:** `watch_history.added`, `watch_history.removed`
- **Отложенные видео:** `watch_later.added`, `watch_later.removed`
- **Расшифровки:** `transcript.saved`, `transcript.deleted`
- **Снимки:** `screenshot.saved`, `screenshot.deleted`
- **Настройки и клавиши:** `settings.updated`
- **Устройства:** `device.added`, `device.removed`
- **Ваш адрес:** `webhook.test` после **Send test**

Событие `updated` означает изменение написанного вами текста. Обычная активность не считается: повтор карточки меняет расписание и отправляет `flashcard.reviewed`, а не `flashcard.updated`; минуты просмотра учебного пути ничего не отправляют. История просмотра отправляет `added` при первом просмотре видео и `removed` при удалении, но не при перемещении позиции. Для совместного просмотра, исправлений сайтов и запросов функций событий нет.

## Что содержит сообщение {#what-a-message-carries}

Каждое сообщение — запрос `POST` с JSON и тремя заголовками:

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

`data` содержит `id` элемента, `video_id` и `platform` для видео, а также `occurred_at`. У `settings.updated` идентификатор принадлежит учётной записи. Если нужны остальные поля, запросите элемент через [API](./api.md).

При включённом **Include what was written** в `data` добавляются поля:

| Раздел | Дополнительные поля `data` |
|---|---|
| Закладки | `label`, `note`, `color`, `position_seconds` |
| Заметки | `content`, `category`, `tags` |
| Коллекции | `name`, `description`; у видео также `collection_id`, `video_title` |
| Карточки | `front`, `back`, `tags` |
| Учебные пути | `title`, `description`; у видео также `path_id`, `video_title`, `notes` |
| История просмотра | `video_title`, `channel_name` |
| Отложенные видео | `video_title`, `priority`, `notes` |
| Расшифровки | `language`, `format` |
| Снимки | `position_seconds`, `width`, `height` |
| Настройки и клавиши | `changed`: `["settings"]`, `["shortcuts"]` или оба значения |
| Устройства | `device_name`, `browser` |

Текст расшифровки никогда не входит в сообщение, даже при включённом поле. Читайте его с ключом из `transcript_texts`.

Та же заметка с включённым полем:

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

Изменение настроек и тестовое сообщение:

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## Проверьте происхождение сообщения {#checking-a-message}

Подпись следует стандарту <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a>. Библиотека Standard Webhooks принимает секрет как есть. Для ручной проверки:

1. Соедините `webhook-id`, `webhook-timestamp` и **исходное тело запроса** точками.
2. Уберите у секрета `whsec_`, декодируйте остаток из base64 и вычислите HMAC-SHA256.
3. Закодируйте результат в base64 и сравните с одним из значений `v1,` в заголовке `webhook-signature`; значений может быть несколько, через пробел.
4. Отклоняйте сообщения с отметкой времени дальше 5 минут от текущего времени, чтобы нельзя было повторно отправить старое.

Разбирайте JSON только после проверки. Повторная сериализация тела меняет подпись.

Следующий секрет создан только для примеров на этой странице:

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

Правильная подпись для примера: `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. Ваш секрет находится в **Other apps**.

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

Передавайте `raw_body` как полученные байты: `request.get_data()` в Flask или `await request.body()` в FastAPI.

## Ответы, повторы и отключение {#answering-retries-and-turning-off}

Ответьте любым `2xx` за 10 секунд. Перенаправления не выполняются, поэтому `3xx` считается ошибкой.

После неудачи сообщение повторяется через 5 секунд, затем через 5 минут, 30 минут, 2 часа, 5 часов, 10 часов и ещё 10 часов: всего 8 попыток примерно за 27 часов. У повторов один `webhook-id`; храните обработанные идентификаторы, чтобы не выполнять действие дважды.

Адрес выключается после `410 Gone` или 5 дней подряд неудачных доставок. Мы отправим письмо с последним ответом сервера. Когда сервер готов, нажмите **Turn back on** в **Other apps**.

## Управляйте адресом {#managing-an-address}

Рядом с событиями каждого адреса в **Other apps** находятся:

- **Send test** отправляет `webhook.test`; результат появляется в журнале доставки.
- **Pause** останавливает отправку. Сообщения не копятся; новые начнут отправляться после **Turn back on**.
- **Delivery log** показывает последние сообщения, их результат, длительность и число попыток. **Send again** повторяет сообщение с тем же `webhook-id`.
- **Remove** прекращает все отправки на адрес.

### Покажите или замените секрет {#replacing-the-secret}

**Show signing secret** доступна в течение 10 минут после входа и требует код при двухэтапном входе. **Replace secret** создаёт новый. В течение 24 часов каждое сообщение несёт обе подписи, сначала новую. Переключите сервер до конца этого периода.

## Сколько адресов доступно {#how-many-you-can-have}

Free позволяет 3 адреса, Pro — 20, Team — 40 на участника. При достижении лимита удалите адрес или выберите план с большим лимитом на [странице планов](https://vcpeai.aoneahsan.com/plans).

---
title: API Video Controls Plus
sidebar_label: API
description: "REST API собственной библиотеки Video Controls Plus: запросы, страницы результатов, ошибки, лимиты и примеры curl для каждого раздела."
last_update:
  date: 2026-11-21
---

# API Video Controls Plus

**API читает и изменяет вашу библиотеку через HTTPS с [ключом доступа](./access-keys.md).** Каждый адрес начинается с:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

Машиночитаемое описание — документ OpenAPI 3.1 по адресу <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>, его копия в Markdown находится по адресу <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. Оба доступны без ключа.

В примерах начало адреса и ключ хранятся в двух переменных оболочки:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## Передача ключа {#signing-requests}

Передавайте ключ как bearer-токен в каждом запросе, а тела запросов — как JSON:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

Токен подключённого помощника тоже подходит. Одного входа на сайт недостаточно: API ответит `401` и запросит ключ доступа либо токен помощника.

Каждый запрос выполняется от вашего имени. База данных проверяет доступ к каждой строке по вашим разрешениям: ключ не вернёт то, чего вы сами не можете открыть на сайте.

## Формат ответа {#what-comes-back}

Один элемент:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

Список:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

Ошибка:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

Время записывается в ISO 8601. Идентификаторы имеют формат UUID, если ниже не сказано иначе. Ответы с вашими данными не кешируются.

## Ошибки {#errors}

| Статус HTTP | `code` | Значение |
|---|---|---|
| 400 | `invalid_request` | Поле, фильтр, сортировка или курсор недопустимы. `details.issues` перечисляет поля. |
| 401 | `invalid_token` | Ключ отсутствует, неверен, просрочен или удалён. |
| 403 | `scope_required` | Ключу не дано разрешение, указанное в `details.scope`. |
| 404 | `not_found` | По этому адресу нет доступного ключу элемента. Чужой элемент неотличим от отсутствующего. |
| 405 | `method_not_allowed` | Раздел не допускает метод, например изменение истории просмотра. |
| 409 | `conflict` | Элемент уже есть или правило отклонило действие; причина указана в сообщении. |
| 413 | `payload_too_large` | Тело запроса больше 65 536 байт. |
| 429 | `rate_limited` | Слишком много запросов. Дождитесь сброса лимита. |
| 500 | `internal` | Ошибка на нашей стороне. Передайте нам `correlation_id`. |

## Страницы результатов {#pages-of-results}

Список содержит 20 элементов, если не задать `limit` от 1 до 50. Если элементы остались, `meta.next_cursor` содержит курсор. Передайте его как `cursor` с теми же фильтрами и сортировкой для следующей страницы. Курсор действует 15 минут только для породившего его запроса. При `next_cursor: null` список закончен.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**Фильтры** — параметры `<field>.<operator>` из разрешённого для раздела списка: `eq` — равно, `lte` — не позже, `cs` — теги содержат все значения списка через запятую. **Сортировка** задаётся `sort=<field>`; начальный `-` ставит новые или большие значения первыми. Первое указанное ниже поле сортировки используется по умолчанию.

## Лимиты запросов {#rate-limits}

Каждому ключу разрешено 120 запросов в минуту. Общий дневной лимит ключей и помощников: 5 000 для Free, 50 000 для Pro и 100 000 на участника Team; он обнуляется в полночь UTC. Каждый ответ содержит `RateLimit-Limit`, `RateLimit-Remaining` и `RateLimit-Reset` (секунды) для ближайшего лимита. Ответ `429` добавляет `Retry-After`.

## Удаление {#removing}

Для `DELETE` требуется отметка Delete у раздела. С ключом доступа элемент удаляется сразу, ответ — `204` без тела.

С токеном помощника пока ничего не удаляется. Ответ `202` содержит ссылку для подтверждения на сайте, действующую 10 минут:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

При следующей синхронизации расширение уберёт элемент на всех браузерах, как при удалении внутри него.

## Ваша библиотека {#your-library}

Каждый раздел ниже поддерживает `GET /<part>` для списка и `GET /<part>/{id}` для элемента, если не сказано иначе. `POST /<part>` создаёт, `PATCH /<part>/{id}` меняет переданные поля, `DELETE /<part>/{id}` удаляет. Поля, не перечисленные как изменяемые, только показываются.

В этих разделах видео описывается четырьмя полями: `platform` (сайт, например `youtube`, `netflix` или `linkedin`), `video_id` (идентификатор на нём), `video_url` (адрес страницы) и `video_title` (название).

### Закладки {#bookmarks}

Сохранённые моменты видео: время, подпись, заметка и цвет.

| | |
|---|---|
| Методы | список, элемент, создание, изменение, удаление |
| Вы задаёте | `video_id`, `video_url` и `label` (обязательно), `position_seconds` (обязательно, секунды от начала), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Фильтры | `platform.eq`, `video_id.eq`, `tags.cs` |
| Сортировка | `-created_at` |
| Разрешение | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

Время видео задаётся при сохранении закладки, как и в расширении.

### Заметки {#notes}

Заметки, привязанные к моменту видео, с категорией и тегами.

| | |
|---|---|
| Методы | список, элемент, создание, изменение, удаление |
| Вы задаёте | `video_id`, `video_url` и `content` (обязательно), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` или `custom`), `custom_category_name`, `color`, `tags` |
| Фильтры | `platform.eq`, `video_id.eq` |
| Сортировка | `-created_at` |
| Разрешение | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Коллекции и их видео {#collections}

`collections` — ваши подборки видео, начиная с последних изменений. `collection_videos` — видео в них; добавление и удаление доступны, изменение нет, как в расширении.

| | `collections` | `collection_videos` |
|---|---|---|
| Методы | список, элемент, создание, изменение, удаление | список, элемент, создание, удаление |
| Вы задаёте | `name` (обязательно), `description`, `is_public` | `collection_id`, `video_id` и `video_url` (обязательно), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Фильтры | | `collection_id.eq` |
| Сортировка | `-updated_at` | `-added_at` |
| Разрешение | `collections` | `collections` |

Публичную коллекцию может открыть любой обладатель ссылки. `collection_id` должен принадлежать вашей коллекции.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Карточки {#flashcards}

Карточки по видео: лицевая и оборотная стороны, теги и дата повторения.

| | |
|---|---|
| Методы | список, элемент, создание, изменение, удаление |
| Вы задаёте | `video_id`, `video_url`, `front` и `back` (обязательно), `position_seconds`, `platform`, `video_title`, `tags`, и расписание повторения: `ease_factor` (от 1.3 до 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Фильтры | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Сортировка | `next_review_at`, `-created_at` |
| Разрешение | `flashcards` |

Новую карточку можно повторить сразу. Изменение расписания записывает результат повторения, как в расширении. Карточки к концу сегодняшнего дня:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Учебные пути и их видео {#learning-paths}

`learning_paths` — ваши пути, сначала последние изменения. `path_videos` — видео каждого пути по порядку с отметками завершения.

| | `learning_paths` | `path_videos` |
|---|---|---|
| Методы | список, элемент, создание, изменение, удаление | список, элемент, создание, изменение, удаление |
| Вы задаёте | `title` (обязательно), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id` и `video_url` (обязательно), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| Только показ | `actual_minutes`, `last_accessed_at` (подсчитываются расширением) | |
| Фильтры | | `path_id.eq` |
| Сортировка | `-updated_at` | `position`, `-created_at` |
| Разрешение | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### История просмотра {#watch-history}

Видео, просмотренные при включённой Watch History: место остановки и время просмотра. Записи добавляет только расширение; API читает и удаляет их, но не меняет.

| | |
|---|---|
| Методы | список, элемент, удаление |
| Показывается | поля видео, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Фильтры | `platform.eq`, `video_id.eq` |
| Сортировка | `-last_watched_at` |
| Разрешение | `history` (чтение и удаление) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Отложенные видео {#watch-later}

Ваш список для просмотра позже, с порядком, приоритетом и заметками.

| | |
|---|---|
| Методы | список, элемент, создание, изменение, удаление |
| Вы задаёте | `video_id` и `video_url` (обязательно), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` или `low`), `notes` |
| Сортировка | `position`, `-added_at` |
| Разрешение | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Расшифровки {#transcripts}

`transcripts` перечисляет сохранённые расшифровки с языком и форматом, начиная с новых, без полного текста. `transcript_texts` читает текст и строки со временем по тому же идентификатору либо сохраняет новую расшифровку.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Методы | список, элемент, удаление | элемент, создание |
| Вы задаёте | | `video_id`, `video_url` и `content` (обязательно), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` или `json`), `segments` |
| Показывается | поля видео, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | то же, плюс `content` и `segments` |
| Сортировка | `-downloaded_at` | |
| Разрешение | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

Тело запроса ограничено 65 536 байтами; более длинную расшифровку нельзя сохранить через API.

### Снимки {#screenshots}

Кадры видео со временем и размером изображения. Только чтение; снимок удаляется в расширении.

| | |
|---|---|
| Методы | список, элемент |
| Показывается | поля видео, `position_seconds`, `image_url`, `format` (`png`, `jpeg` или `webp`), `width`, `height`, `created_at` |
| Сортировка | `-created_at` |
| Разрешение | `screenshots` (чтение) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Настройки и клавиши {#settings}

Синхронизированные настройки и сочетания расширения — один элемент с идентификатором вашей учётной записи. `settings` и `keyboard_bindings` имеют формат хранения расширения.

| | |
|---|---|
| Методы | список, элемент, создание, изменение |
| Вы задаёте | `settings`, `keyboard_bindings` |
| Показывается | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Разрешение | `settings` (чтение и изменение) |

Список содержит один элемент либо пуст до первой синхронизации. При сохранении остаётся более новая копия, как при синхронизации между браузерами.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Устройства {#devices}

Браузеры с подключённым расширением. Они появляются только при подключении; здесь их можно переименовать или удалить. Удаление отключает расширение на этом браузере.

| | |
|---|---|
| Методы | список, элемент, изменение, удаление |
| Вы задаёте | `device_name` |
| Показывается | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Сортировка | `-last_seen_at` |
| Разрешение | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## Общие данные только для чтения {#shared-read-only}

Эти разделы затрагивают других людей. API читает их, но не изменяет независимо от разрешений ключа. Событий вебхуков для них нет.

| Раздел | Содержимое | Фильтр | Сортировка | Разрешение |
|---|---|---|---|---|
| `watch_parties` | Группы, которые вы создали или к которым присоединились: видео, `is_host`, время начала, окончания и завершения. Код входа не выдаётся: он служит приглашением. | | `-created_at` | `parties:read` |
| `party_members` | Число участников и время входа. `is_you` отмечает вас; имён, фото и учётных записей других нет, а `id` обозначает участие, не человека. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | Предложенные пользователями исправления плееров: утверждённые и ваши ожидающие, отмеченные `is_yours`. Автор не называется. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | Общая доска: название, описание, категория, статус, голоса и `is_yours`. Автор не называется. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | Ваши голоса: `1` за, `-1` против. `id` голоса соответствует запросу функции. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## План и использование {#your-plan-and-use}

`GET /account` возвращает план, дневной лимит ИИ и сегодняшний расход, объём облачного хранилища и его использование, а также `other_apps` с четырьмя лимитами из [таблицы планов](./index.md#limits-on-each-plan) и `requestsToday`. Любой ключ читает это без отдельной отметки.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## Что API не выдаёт {#what-the-api-never-serves}

Поля перечислены по разрешительному списку: столбец, не названный на этой странице, не выходит из базы данных. Помимо разделов из [списка недоступного](./index.md#what-it-never-reaches), API не выдаёт собственные ключи синхронизации расширения, внутреннюю запись файла снимка, устройство последнего сохранения настроек и отдельные сеансы внутри истории просмотра. Календарной ленты нет.

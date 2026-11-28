---
title: Ключи доступа
description: Создайте ключ доступа Video Controls Plus для своего инструмента, выберите доступные ему разделы, срок действия и способ замены или удаления.
last_update:
  date: 2026-11-21
---

# Ключи доступа

**Ключ доступа — пароль для одного инструмента:** синхронизации учебной таблицы, скрипта или команды на телефоне. Инструмент передаёт ключ с каждым запросом к [API](./api.md). Ключ достигает только отмеченных вами частей библиотеки. Его вид — `vcp_pat_` и длинная случайная строка. Не включайте ключ в то, чем делитесь.

## Создайте ключ {#making-a-key}

1. На сайте откройте **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** и нажмите **Make a key**.
2. Дайте ключу **Name**, например «Синхронизация учебной таблицы».
3. Отметьте доступные разделы: для каждого есть **Read**, **Change** и **Delete**. Хотя бы один раздел должен быть доступен для чтения.
4. В **Stops working after** выберите 30, 90 или 365 дней либо **Never**. Бессрочным может быть только ключ для чтения; ключ на изменение или удаление всегда имеет срок.
5. Нажмите **Make key** и скопируйте его. Без повторного входа полный ключ показывается только сейчас.

Создание требует входа в течение последних 10 минут и кода при включённом [двухэтапном входе](./two-step-sign-in.md). Мы отправляем письмо о создании без самого ключа.

## Что разрешают отметки {#what-each-tick-reaches}

Отметка становится разрешением ключа. Если ключ запрашивает неразрешённое действие, API возвращает `403 scope_required` с названием нужного разрешения.

| Раздел на сайте | Чтение (Read) | Изменение (Change) | Удаление (Delete) | Ресурсы API |
|---|---|---|---|---|
| Закладки | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| Заметки | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| Коллекции | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| Карточки | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| Учебные пути | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| История просмотра | `history:read` | | `history:delete` | `watch_history` |
| Посмотреть позже | `later:read` | `later:write` | `later:delete` | `watch_later` |
| Расшифровки | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| Снимки экрана | `screenshots:read` | | | `screenshots` |
| Настройки и клавиши | `settings:read` | `settings:write` | | `settings` |
| Устройства | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| Совместный просмотр | `parties:read` | | | `watch_parties`, `party_members` |
| Исправления для сайтов | `fixes:read` | | | `site_fixes` |
| Запросы функций | `requests:read` | | | `feature_requests`, `request_votes` |

Пустая ячейка означает, что сайт не предлагает такую отметку: историю нельзя менять, снимки и общие разделы доступны только для чтения, настройки нельзя удалить. Каждый ключ также читает ваш план и сегодняшний расход через `account:read` без отметки.

## Покажите ключ снова {#showing-a-key-again}

Нажмите **Show again**. Полный ключ показывается только в течение 10 минут после входа и, при двухэтапном входе, после ввода кода. Запомненный браузер всё равно должен запросить код. Ключ виден короткое время; закройте показ после копирования.

## Замените ключ {#replacing-a-key}

Нажмите **Replace**, если ключ мог раскрыться или вам нужен новый. Вы получите ключ с тем же названием и разрешениями. Старый продолжит работать 24 часа для перехода на новый, затем перестанет.

## Удалите ключ {#removing-a-key}

Нажмите **Remove**, затем подтвердите повторным нажатием. Следующий запрос со старым ключом получит `401 invalid_token`. Библиотека, другие ключи и помощники останутся.

## Проверьте разрешения ключа {#checking-what-a-key-can-do}

`GET /token` возвращает тип ключа и отсортированные разрешения:

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

**Other apps** также показывает дату создания, последнего использования и окончания действия ключа.

## Сколько ключей доступно {#how-many-you-can-have}

Free позволяет 5 ключей, Pro — 25, Team — 50 на участника. Удалённый ключ не считается. При достижении лимита удалите один или выберите план с большим лимитом на [странице планов](https://vcpeai.aoneahsan.com/plans).

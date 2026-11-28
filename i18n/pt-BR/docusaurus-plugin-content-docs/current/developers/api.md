---
title: API do Video Controls Plus
sidebar_label: API
description: API REST da sua biblioteca do Video Controls Plus, com requisições, paginação, erros, limites e exemplos curl para cada parte.
last_update:
  date: 2026-11-21
---

# API do Video Controls Plus

**A API consulta e altera sua própria biblioteca por HTTPS usando uma [chave de acesso](./access-keys.md).** Todos os endereços começam por:

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

A descrição legível por máquina é o documento OpenAPI 3.1 em <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>, com cópia Markdown em <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. Nenhum exige chave.

Os exemplos usam duas variáveis de shell:

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## Autenticar requisições {#signing-requests}

Envie a chave como bearer token em toda requisição e o corpo em JSON:

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

Um token de assistente conectado também funciona. A sessão de entrada no site não funciona aqui: a API responde `401` e pede chave ou token de assistente.

Cada requisição age em seu nome. O banco de dados verifica o acesso a cada registro, impedindo que uma chave retorne dados que você não poderia abrir no site.

## Formato das respostas {#what-comes-back}

Um item:

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

Uma lista:

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

Um erro:

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

Horários seguem ISO 8601. Identificadores são UUIDs, salvo indicação contrária. Respostas com seus dados nunca são armazenadas em cache.

## Erros {#errors}

| Estado | `code` | O que aconteceu |
|---|---|---|
| 400 | `invalid_request` | Campo, filtro, ordenação ou cursor inválido; `details.issues` lista os campos |
| 401 | `invalid_token` | Chave ausente, incorreta, expirada ou removida |
| 403 | `scope_required` | Falta a permissão indicada em `details.scope` |
| 404 | `not_found` | Nenhum item nesse endereço para esta chave; item de outra pessoa parece inexistente |
| 405 | `method_not_allowed` | A parte não aceita esse método, como alterar Histórico de vídeos |
| 409 | `conflict` | Item já existe ou uma regra recusou a ação; a mensagem explica |
| 413 | `payload_too_large` | Corpo acima de 65.536 bytes |
| 429 | `rate_limited` | Muitas requisições; aguarde a redefinição do limite |
| 500 | `internal` | Falha do nosso lado; envie o `correlation_id` |

## Paginação {#pages-of-results}

Uma lista devolve 20 itens por padrão. Use `limit` entre 1 e 50. Se houver mais, `meta.next_cursor` contém um cursor; envie-o como `cursor` com os mesmos filtros e ordenação. Ele vale por 15 minutos e só funciona para aquela consulta. Quando `next_cursor` for `null`, a lista acabou.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

**Filtros** usam parâmetros `<field>.<operator>` permitidos por cada parte abaixo: `eq` é igualdade, `lte` é até a data/valor e `cs` exige todas as etiquetas de uma lista separada por vírgulas. **Ordenação** usa `sort=<field>`; `-` antes do campo traz os mais recentes ou maiores primeiro. A primeira opção listada é a padrão.

## Limites de requisições {#rate-limits}

Cada chave permite 120 requisições por minuto. Além disso, o limite diário somado de chaves e assistentes é de 5.000 no Free, 50.000 no Pro e 100.000 por integrante Team; reinicia à meia-noite UTC. Toda resposta traz `RateLimit-Limit`, `RateLimit-Remaining` e `RateLimit-Reset` (segundos) para o limite mais próximo. Uma resposta `429` inclui `Retry-After`.

## Remover itens {#removing}

`DELETE` exige permissão Excluir daquela parte. Com chave de acesso, remove imediatamente e responde `204` sem corpo.

Com token de assistente, ainda não remove. Responde `202` com link para confirmação no site, válido por dez minutos:

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

Na próxima sincronização, a extensão remove o item em todos os navegadores, como se você o tivesse removido nela.

## Sua biblioteca {#your-library}

Salvo indicação contrária, cada parte aceita `GET /<part>` para listar e `GET /<part>/{id}` para obter um item. `POST /<part>` cria, `PATCH /<part>/{id}` altera os campos enviados e `DELETE /<part>/{id}` remove. Campos não listados como editáveis são exibidos, mas não gravados.

Quatro campos identificam um vídeo: `platform` (site, como `youtube`, `netflix` ou `linkedin`), `video_id` (identificador naquele site), `video_url` (endereço da página) e `video_title`.

### Favoritos {#bookmarks}

Momentos salvos em vídeo: horário, rótulo, nota e cor.

| | |
|---|---|
| Métodos | listar, obter, criar, alterar, excluir |
| Você define | `video_id`, `video_url` e `label` (obrigatórios), `position_seconds` (obrigatório, segundos desde o início), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Filtros | `platform.eq`, `video_id.eq`, `tags.cs` |
| Ordenação | `-created_at` |
| Permissão | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

O horário é definido quando você salva o favorito, como na extensão.

### Notas {#notes}

Notas feitas em um ponto do vídeo, com categoria e etiquetas.

| | |
|---|---|
| Métodos | listar, obter, criar, alterar, excluir |
| Você define | `video_id`, `video_url` e `content` (obrigatórios), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` ou `custom`), `custom_category_name`, `color`, `tags` |
| Filtros | `platform.eq`, `video_id.eq` |
| Ordenação | `-created_at` |
| Permissão | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Coleções e seus vídeos {#collections}

`collections` são suas coleções, da alteração mais recente à mais antiga. `collection_videos` são os vídeos nelas; um vídeo pode ser adicionado ou removido, nunca alterado, como na extensão.

| | `collections` | `collection_videos` |
|---|---|---|
| Métodos | listar, obter, criar, alterar, excluir | listar, obter, criar, excluir |
| Você define | `name` (obrigatório), `description`, `is_public` | `collection_id`, `video_id`, `video_url` (obrigatórios), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Filtros | | `collection_id.eq` |
| Ordenação | `-updated_at` | `-added_at` |
| Permissão | `collections` | `collections` |

Uma coleção pública pode ser aberta por qualquer pessoa com seu link. `collection_id` deve apontar para uma coleção sua.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Cartões de estudo {#flashcards}

Cartões de vídeos: frente, verso, etiquetas e próxima revisão.

| | |
|---|---|
| Métodos | listar, obter, criar, alterar, excluir |
| Você define | `video_id`, `video_url`, `front`, `back` (obrigatórios), `position_seconds`, `platform`, `video_title`, `tags` e agenda: `ease_factor` (1.3 a 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Filtros | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Ordenação | `next_review_at`, `-created_at` |
| Permissão | `flashcards` |

Um cartão novo está pronto para revisão. Alterar a agenda registra uma revisão, como na extensão. Cartões até o fim de hoje:

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Caminhos de aprendizado e seus vídeos {#learning-paths}

`learning_paths` são seus caminhos, da última alteração para trás. `path_videos` são seus vídeos, na ordem, com marcação de conclusão.

| | `learning_paths` | `path_videos` |
|---|---|---|
| Métodos | listar, obter, criar, alterar, excluir | listar, obter, criar, alterar, excluir |
| Você define | `title` (obrigatório), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id`, `video_url` (obrigatórios), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| Apenas exibidos | `actual_minutes`, `last_accessed_at` (contados pela extensão) | |
| Filtros | | `path_id.eq` |
| Ordenação | `-updated_at` | `position`, `-created_at` |
| Permissão | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### Histórico de vídeos {#watch-history}

Vídeos assistidos com Histórico de vídeos ativo, mostrando onde você parou e por quanto tempo assistiu. Só a extensão acrescenta registros; a API permite ler e excluir, nunca alterar.

| | |
|---|---|
| Métodos | listar, obter, excluir |
| Exibidos | campos do vídeo, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Filtros | `platform.eq`, `video_id.eq` |
| Ordenação | `-last_watched_at` |
| Permissão | `history` (ler e excluir) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Assistir mais tarde {#watch-later}

Lista ordenada por você, com prioridade e notas.

| | |
|---|---|
| Métodos | listar, obter, criar, alterar, excluir |
| Você define | `video_id`, `video_url` (obrigatórios), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` ou `low`), `notes` |
| Ordenação | `position`, `-added_at` |
| Permissão | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Transcrições {#transcripts}

`transcripts` lista as transcrições salvas com idioma e formato, sem texto para manter a página pequena. `transcript_texts` lê uma transcrição com texto e trechos marcados por horário, usando o mesmo id, ou salva uma nova.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Métodos | listar, obter, excluir | obter, criar |
| Você define | | `video_id`, `video_url`, `content` (obrigatórios), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` ou `json`), `segments` |
| Exibidos | campos do vídeo, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | os mesmos, mais `content` e `segments` |
| Ordenação | `-downloaded_at` | |
| Permissão | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

O corpo de uma requisição tem no máximo 65.536 bytes; transcrições maiores não podem ser salvas por fora.

### Capturas de tela {#screenshots}

Quadros salvos de vídeos, com horário e dimensões. Somente leitura; a remoção é feita na extensão.

| | |
|---|---|
| Métodos | listar, obter |
| Exibidos | campos do vídeo, `position_seconds`, `image_url`, `format` (`png`, `jpeg` ou `webp`), `width`, `height`, `created_at` |
| Ordenação | `-created_at` |
| Permissão | `screenshots` (ler) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Configurações e atalhos {#settings}

Configurações sincronizadas da extensão e atalhos: um item cujo id é o da sua conta. `settings` e `keyboard_bindings` são objetos no formato armazenado pela extensão.

| | |
|---|---|
| Métodos | listar, obter, criar, alterar |
| Você define | `settings`, `keyboard_bindings` |
| Exibidos | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Permissão | `settings` (ler e alterar) |

A lista contém seu único item ou fica vazia antes da primeira sincronização. Ao salvar, prevalece a cópia mais recente, como na sincronização entre navegadores.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Dispositivos {#devices}

Navegadores conectados à extensão. São acrescentados apenas pelo processo de conexão; aqui você os renomeia ou remove. Remover desconecta a extensão naquele navegador.

| | |
|---|---|
| Métodos | listar, obter, alterar, excluir |
| Você define | `device_name` |
| Exibidos | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Ordenação | `-last_seen_at` |
| Permissão | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## Partes compartilhadas, somente leitura {#shared-read-only}

Como envolvem outras pessoas, a API permite apenas leitura, independentemente das opções de uma chave. Não geram eventos de webhook.

| Parte | Conteúdo | Filtro | Ordenação | Permissão |
|---|---|---|---|---|
| `watch_parties` | Sessões criadas por você ou das quais participou: vídeo, `is_host`, início, fim previsto e encerramento. O código de entrada é omitido por ser o convite. | | `-created_at` | `parties:read` |
| `party_members` | Quantidade de participantes e horário de entrada. `is_you` marca você; nomes, fotos e contas não são enviados. `id` identifica a participação, não a pessoa. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | Correções compartilhadas de sites: aprovadas ou suas aguardando análise, com `is_yours`. Colaborador não é identificado. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | Quadro público: título, descrição, categoria, estado, votos e `is_yours`; autor omitido. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | Seus votos: `1` positivo, `-1` negativo. `id` identifica a sugestão. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## Seu plano e uso {#your-plan-and-use}

`GET /account` retorna um item: plano, usos de IA permitidos e feitos hoje, armazenamento na nuvem e consumo, e `other_apps` com quatro limites da [tabela de planos](./index.md#limits-on-each-plan) e `requestsToday`. Toda chave pode ler, sem opção adicional.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## O que a API nunca serve {#what-the-api-never-serves}

Os campos são uma lista permitida: uma coluna não mencionada aqui não sai do banco. Além do que consta em [O que nunca pode acessar](./index.md#what-it-never-reaches), isso exclui chaves internas de sincronização da extensão, o registro do arquivo por trás de uma captura, o dispositivo que salvou suas configurações pela última vez e os trechos de reprodução internos do Histórico de vídeos. Não há feed de calendário.

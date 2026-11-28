---
title: API Video Controls Plus
sidebar_label: API
description: "API REST de votre bibliothèque Video Controls Plus : requêtes, pagination, erreurs, limites et exemples curl pour chaque catégorie."
last_update:
  date: 2026-11-21
---

# API Video Controls Plus

**L’API lit et modifie votre propre bibliothèque en HTTPS avec une [clé d’accès](/fr/docs/developers/access-keys).** Chaque adresse commence par :

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1
```

Sa description lisible par les machines est le document OpenAPI 3.1 à <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json" target="_blank" rel="nofollow noopener noreferrer">`/openapi.json`</a>, également disponible en Markdown à <a href="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md" target="_blank" rel="nofollow noopener noreferrer">`/openapi.md`</a>. Aucun des deux ne demande de clé.

Les exemples ci-dessous placent l’adresse de base et la clé dans deux variables de shell :

```bash
export VCP_API="https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1"
export VCP_KEY="vcp_pat_..."
```

## Authentifier les requêtes {#signing-requests}

Envoyez la clé comme jeton Bearer avec chaque requête. Envoyez les corps de requête en JSON :

```bash
curl "$VCP_API/notes" \
  -H "Authorization: Bearer $VCP_KEY"
```

Le jeton d’un assistant associé fonctionne également. Une connexion au site ne suffit pas : l’API répond `401` et demande une clé d’accès ou le jeton d’un assistant.

Chaque requête agit en votre nom. La base de données autorise chaque ligne selon vos propres droits ; une clé ne peut donc pas renvoyer une ligne que vous ne pourriez pas consulter sur le site.

## Format des réponses {#what-comes-back}

Un élément :

```json
{ "data": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "label": "Proof of the second lemma" } }
```

Une liste :

```json
{ "data": [ { "id": "…" }, { "id": "…" } ], "meta": { "next_cursor": "eyJyIjoi…", "limit": 20 } }
```

Une erreur :

```json
{ "error": { "code": "scope_required", "message": "This credential needs the notes:write permission.", "details": { "scope": "notes:write" }, "correlation_id": "req_9c41b27d58e0f3a6" } }
```

Les dates utilisent ISO 8601. Les identifiants sont des UUID, sauf indication contraire pour une catégorie ci-dessous. Les réponses contenant vos données ne sont jamais mises en cache.

## Erreurs {#errors}

| Statut | `code` | Signification |
|---|---|---|
| 400 | `invalid_request` | Champ, filtre, tri ou curseur invalide. `details.issues` détaille les champs concernés. |
| 401 | `invalid_token` | Clé absente, incorrecte, expirée ou supprimée. |
| 403 | `scope_required` | Autorisation manquante sur la clé. Son nom figure dans `details.scope`. |
| 404 | `not_found` | Aucun élément à cette adresse pour cette clé. Un élément appartenant à quelqu’un d’autre apparaît lui aussi comme absent. |
| 405 | `method_not_allowed` | La catégorie n’accepte pas cette méthode, par exemple une modification de l’historique de visionnage. |
| 409 | `conflict` | L’élément existe déjà ou une règle refuse l’opération. Le message précise laquelle. |
| 413 | `payload_too_large` | Corps de requête supérieur à 65 536 octets. |
| 429 | `rate_limited` | Trop de requêtes. Attendez l’heure de réinitialisation. |
| 500 | `internal` | Erreur de notre côté. Communiquez-nous le `correlation_id`. |

## Pagination {#pages-of-results}

Une liste renvoie 20 éléments par défaut. Le paramètre `limit` accepte de 1 à 50. S’il reste des éléments, `meta.next_cursor` contient un curseur. Renvoyez-le dans `cursor` avec les mêmes filtres et le même tri pour obtenir la page suivante. Il reste valable 15 minutes et ne fonctionne que pour la requête qui l’a produit. Quand `next_cursor` vaut `null`, tous les résultats ont été obtenus.

```bash
curl "$VCP_API/bookmarks?limit=50" -H "Authorization: Bearer $VCP_KEY"
curl "$VCP_API/bookmarks?limit=50&cursor=eyJyIjoi…" -H "Authorization: Bearer $VCP_KEY"
```

Les **filtres** sont des paramètres `<field>.<operator>` choisis dans la liste de chaque catégorie ci-dessous : `eq` signifie égal à, `lte` au plus tard, et `cs` signifie que les étiquettes contiennent toutes les valeurs d’une liste séparée par des virgules. Pour le **tri**, utilisez `sort=<field>` ; un `-` initial place d’abord les valeurs les plus récentes ou les plus grandes. Le premier tri indiqué pour une catégorie est celui par défaut.

## Limites de requêtes {#rate-limits}

Chaque clé peut envoyer 120 requêtes par minute. En plus, la formule limite l’ensemble de vos clés et assistants à 5 000 requêtes par jour avec Free, 50 000 avec Pro et 100 000 par membre avec Team. Le compteur repart à zéro à minuit UTC. Chaque réponse comporte `RateLimit-Limit`, `RateLimit-Remaining` et `RateLimit-Reset` (en secondes) pour la limite la plus proche. Une réponse `429` ajoute `Retry-After`.

## Suppression {#removing}

`DELETE` demande l’autorisation Supprimer de la catégorie. Avec une clé d’accès, l’élément est supprimé immédiatement et l’API répond `204` sans corps.

Avec le jeton d’un assistant, rien n’est encore supprimé. L’API répond `202` avec un lien valable dix minutes, à ouvrir sur le site pour confirmer :

```json
{ "data": { "status": "pending_confirmation", "confirm_url": "https://vcpeai.aoneahsan.com/developers/confirm/4e2b…", "expires_at": "2026-11-21T09:24:03.000Z" } }
```

L’extension retire l’élément sur chaque navigateur lors de sa prochaine synchronisation, comme si vous l’aviez supprimé depuis l’extension.

## Votre bibliothèque {#your-library}

Sauf indication contraire, chaque catégorie accepte `GET /<part>` pour une liste et `GET /<part>/{id}` pour un élément. `POST /<part>` crée un élément, `PATCH /<part>/{id}` modifie les champs envoyés et `DELETE /<part>/{id}` le supprime. Les champs non mentionnés comme modifiables sont affichés, mais jamais écrits.

Quatre champs identifient une vidéo dans ces catégories : `platform` (le site, comme `youtube`, `netflix` ou `linkedin`), `video_id` (son identifiant sur ce site), `video_url` (l’adresse de sa page) et `video_title`.

### Favoris {#bookmarks}

Instants enregistrés dans une vidéo, avec heure, libellé, note et couleur.

| | |
|---|---|
| Méthodes | liste, consultation, création, modification, suppression |
| Champs modifiables | `video_id`, `video_url` et `label` (obligatoires), `position_seconds` (obligatoire, secondes depuis le début), `platform`, `video_title`, `note`, `color`, `tags`, `folder` |
| Filtres | `platform.eq`, `video_id.eq`, `tags.cs` |
| Tri | `-created_at` |
| Autorisation | `bookmarks` |

```bash
curl -X POST "$VCP_API/bookmarks" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk","position_seconds":754,"label":"Where gradient descent starts","tags":["ml","week-3"]}'
```

L’instant de la vidéo est fixé lors de l’enregistrement du favori, comme dans l’extension.

### Notes {#notes}

Notes rédigées à un moment de la vidéo, avec catégorie et étiquettes.

| | |
|---|---|
| Méthodes | liste, consultation, création, modification, suppression |
| Champs modifiables | `video_id`, `video_url` et `content` (obligatoires), `position_seconds`, `platform`, `video_title`, `category` (`important`, `question`, `summary`, `action` ou `custom`), `custom_category_name`, `color`, `tags` |
| Filtres | `platform.eq`, `video_id.eq` |
| Tri | `-created_at` |
| Autorisation | `notes` |

```bash
curl "$VCP_API/notes?video_id.eq=aircAruvnKk" -H "Authorization: Bearer $VCP_KEY"
```

### Collections et vidéos associées {#collections}

`collections` contient vos collections de vidéos, triées par modification récente. `collection_videos` contient les vidéos de chaque collection ; comme dans l’extension, vous pouvez en ajouter ou en retirer, mais pas les modifier.

| | `collections` | `collection_videos` |
|---|---|---|
| Méthodes | liste, consultation, création, modification, suppression | liste, consultation, création, suppression |
| Champs modifiables | `name` (obligatoire), `description`, `is_public` | `collection_id`, `video_id` et `video_url` (obligatoires), `platform`, `video_title`, `thumbnail`, `duration_seconds` |
| Filtres | | `collection_id.eq` |
| Tri | `-updated_at` | `-added_at` |
| Autorisation | `collections` | `collections` |

Une collection publique est accessible à toute personne qui possède son lien. `collection_id` doit désigner l’une de vos collections.

```bash
curl -X POST "$VCP_API/collection_videos" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"collection_id":"7d1e4c2a-5b3f-4a6e-8c9d-0e1f2a3b4c5d","platform":"youtube","video_id":"aircAruvnKk","video_url":"https://www.youtube.com/watch?v=aircAruvnKk"}'
```

### Fiches de révision {#flashcards}

Fiches créées à partir de vidéos, avec recto, verso, étiquettes et date de révision prévue.

| | |
|---|---|
| Méthodes | liste, consultation, création, modification, suppression |
| Champs modifiables | `video_id`, `video_url`, `front` et `back` (obligatoires), `position_seconds`, `platform`, `video_title`, `tags`, ainsi que le calendrier de révision : `ease_factor` (de 1.3 à 10), `interval_days`, `repetitions`, `next_review_at`, `last_reviewed_at` |
| Filtres | `platform.eq`, `video_id.eq`, `tags.cs`, `next_review_at.lte` |
| Tri | `next_review_at`, `-created_at` |
| Autorisation | `flashcards` |

Une nouvelle fiche est à revoir immédiatement. Modifier le calendrier de révision enregistre une révision, comme dans l’extension. Pour les fiches à revoir avant la fin de la journée :

```bash
curl "$VCP_API/flashcards?next_review_at.lte=2026-11-21T23:59:59Z&sort=next_review_at" \
  -H "Authorization: Bearer $VCP_KEY"
```

### Parcours d’apprentissage et vidéos associées {#learning-paths}

`learning_paths` contient vos parcours, triés par modification récente. `path_videos` contient les vidéos de chaque parcours, dans l’ordre, et leur état d’avancement.

| | `learning_paths` | `path_videos` |
|---|---|---|
| Méthodes | liste, consultation, création, modification, suppression | liste, consultation, création, modification, suppression |
| Champs modifiables | `title` (obligatoire), `description`, `is_public`, `estimated_minutes` | `path_id`, `video_id` et `video_url` (obligatoires), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `position`, `is_completed`, `notes` |
| Affichés seulement | `actual_minutes`, `last_accessed_at` (calculés par l’extension) | |
| Filtres | | `path_id.eq` |
| Tri | `-updated_at` | `position`, `-created_at` |
| Autorisation | `paths` | `paths` |

```bash
curl -X PATCH "$VCP_API/path_videos/3c9e1a7b-2d4f-4b8e-a1c6-5f7e9d0b2a4c" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"is_completed":true}'
```

### Historique de visionnage {#watch-history}

Vidéos regardées lorsque l’historique est activé, avec votre point d’arrêt et le temps de visionnage. Seule l’extension y ajoute des entrées. L’API peut les lire ou les supprimer, mais ne peut pas les modifier.

| | |
|---|---|
| Méthodes | liste, consultation, suppression |
| Champs affichés | champs vidéo, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `last_position_seconds`, `watch_count`, `total_watch_seconds`, `first_watched_at`, `last_watched_at` |
| Filtres | `platform.eq`, `video_id.eq` |
| Tri | `-last_watched_at` |
| Autorisation | `history` (lecture et suppression) |

```bash
curl -X DELETE "$VCP_API/watch_history/9a2c4e6f-1b3d-4f5a-8c7e-0d2f4a6b8c1e" \
  -H "Authorization: Bearer $VCP_KEY"
```

### À regarder plus tard {#watch-later}

Vidéos de votre liste « À regarder plus tard », dans l’ordre choisi, avec priorité et notes.

| | |
|---|---|
| Méthodes | liste, consultation, création, modification, suppression |
| Champs modifiables | `video_id` et `video_url` (obligatoires), `platform`, `video_title`, `video_thumbnail`, `video_duration_seconds`, `channel_name`, `position`, `priority` (`high`, `normal` ou `low`), `notes` |
| Tri | `position`, `-added_at` |
| Autorisation | `later` |

```bash
curl -X POST "$VCP_API/watch_later" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"platform":"youtube","video_id":"IHZwWFHWa-w","video_url":"https://www.youtube.com/watch?v=IHZwWFHWa-w","priority":"high"}'
```

### Transcriptions {#transcripts}

`transcripts` liste les transcriptions enregistrées, avec langue et format, des plus récentes aux plus anciennes. Le texte est omis pour garder les pages de résultats légères. `transcript_texts` permet de lire une transcription avec son texte et ses segments horodatés, à l’aide du même identifiant, ou d’en enregistrer une nouvelle.

| | `transcripts` | `transcript_texts` |
|---|---|---|
| Méthodes | liste, consultation, suppression | consultation, création |
| Champs modifiables | | `video_id`, `video_url` et `content` (obligatoires), `platform`, `video_title`, `language`, `language_code`, `is_auto_generated`, `format` (`srt`, `vtt`, `txt` ou `json`), `segments` |
| Champs affichés | champs vidéo, `language`, `language_code`, `is_auto_generated`, `format`, `file_size`, `downloaded_at` | mêmes champs, plus `content` et `segments` |
| Tri | `-downloaded_at` | |
| Autorisation | `transcripts` | `transcripts` |

```bash
curl "$VCP_API/transcript_texts/5e7a9c1b-3d5f-4a2e-9b8c-1f3a5c7e9d0b" \
  -H "Authorization: Bearer $VCP_KEY"
```

Le corps d’une requête est limité à 65 536 octets. Une transcription plus longue ne peut donc pas être enregistrée depuis une application externe.

### Captures d’écran {#screenshots}

Images enregistrées depuis des vidéos, avec l’instant de la vidéo et la taille de l’image. Lecture seule : la suppression d’une capture se fait dans l’extension.

| | |
|---|---|
| Méthodes | liste, consultation |
| Champs affichés | champs vidéo, `position_seconds`, `image_url`, `format` (`png`, `jpeg` ou `webp`), `width`, `height`, `created_at` |
| Tri | `-created_at` |
| Autorisation | `screenshots` (lecture) |

```bash
curl "$VCP_API/screenshots?limit=10" -H "Authorization: Bearer $VCP_KEY"
```

### Réglages et raccourcis {#settings}

Réglages synchronisés de l’extension et raccourcis clavier : un seul élément, dont l’identifiant est celui de votre compte. `settings` et `keyboard_bindings` sont des objets ayant la structure utilisée par l’extension.

| | |
|---|---|
| Méthodes | liste, consultation, création, modification |
| Champs modifiables | `settings`, `keyboard_bindings` |
| Champs affichés | `settings_updated_at`, `keyboard_bindings_updated_at`, `updated_at` |
| Autorisation | `settings` (lecture et modification) |

La liste contient votre élément unique, ou aucun élément avant la première synchronisation. Comme entre vos navigateurs, l’enregistrement conserve la copie la plus récente.

```bash
curl "$VCP_API/settings" -H "Authorization: Bearer $VCP_KEY"
```

### Appareils {#devices}

Navigateurs auxquels l’extension est associée. Seule la procédure d’association en ajoute ; l’API permet de les renommer ou de les retirer. Retirer un navigateur y déconnecte l’extension.

| | |
|---|---|
| Méthodes | liste, consultation, modification, suppression |
| Champ modifiable | `device_name` |
| Champs affichés | `device_id`, `browser`, `platform`, `extension_version`, `last_seen_at`, `created_at` |
| Tri | `-last_seen_at` |
| Autorisation | `devices` |

```bash
curl -X PATCH "$VCP_API/devices/2b4d6f8a-1c3e-4a5b-9d7f-0e2a4c6e8b1d" \
  -H "Authorization: Bearer $VCP_KEY" -H "Content-Type: application/json" \
  -d '{"device_name":"Work laptop, Firefox"}'
```

## Catégories partagées en lecture seule {#shared-read-only}

Ces catégories concernent d’autres personnes. L’API permet de les lire, jamais de les modifier, quelles que soient les autorisations d’une clé. Elles ne produisent aucun événement de webhook.

| Catégorie | Contenu | Filtre | Tri | Autorisation |
|---|---|---|---|---|
| `watch_parties` | Séances que vous organisez ou auxquelles vous participez : vidéo, `is_host`, heures de début, de fin prévue et de fin réelle. Le code d’invitation est exclu. | | `-created_at` | `parties:read` |
| `party_members` | Nombre de personnes dans chaque séance et heure de leur arrivée. `is_you` vous désigne ; aucun nom, photo ou compte d’une autre personne n’est transmis. `id` identifie la participation, pas la personne. | `party_id.eq` | `joined_at` | `parties:read` |
| `site_fixes` | Corrections de lecteur proposées pour des sites, qu’elles soient approuvées ou, si ce sont les vôtres, en attente, avec `is_yours`. Le contributeur n’est pas nommé. | `hostname.eq` | `-created_at` | `fixes:read` |
| `feature_requests` | Tableau public : titre, description, catégorie, statut, votes et `is_yours`. L’auteur n’est pas nommé. | | `-created_at`, `-upvotes` | `requests:read` |
| `request_votes` | Vos propres votes : `1` pour, `-1` contre. L’`id` d’un vote désigne la demande concernée. | | `-created_at` | `requests:read` |

```bash
curl "$VCP_API/site_fixes?hostname.eq=www.coursera.org" -H "Authorization: Bearer $VCP_KEY"
```

## Votre formule et votre utilisation {#your-plan-and-use}

`GET /account` renvoie un élément : votre formule, son nombre d’utilisations quotidiennes de l’IA et votre utilisation du jour, votre espace de stockage dans le cloud et son occupation, ainsi que `other_apps`. Ce dernier contient les quatre limites du [tableau des formules](/fr/docs/developers#limits-on-each-plan) avec `requestsToday`. Chaque clé peut le lire sans autorisation supplémentaire.

```bash
curl "$VCP_API/account" -H "Authorization: Bearer $VCP_KEY"
```

## Données jamais fournies par l’API {#what-the-api-never-serves}

Les champs transmis suivent une liste autorisée : une colonne absente de cette page ne sort jamais de la base de données. Au-delà des exclusions décrites dans [Données et actions toujours exclues](/fr/docs/developers#what-it-never-reaches), cela protège aussi les clés de synchronisation internes de l’extension, l’enregistrement du fichier stocké derrière une capture d’écran, l’appareil qui a enregistré vos réglages en dernier et les sessions distinctes de votre historique de visionnage. Il n’existe pas de flux de calendrier.

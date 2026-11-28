---
title: Journal des changements pour les développeurs
description: Évolutions de l’API Video Controls Plus, de l’adresse des assistants, des webhooks et de la connexion en deux étapes.
last_update:
  date: 2026-11-21
---

# Journal des changements pour les développeurs

Les changements utiles aux personnes qui développent avec Video Controls Plus sont classés du plus récent au plus ancien. Les versions du produit figurent dans le [journal général](/fr/changelog).

## 2026-11-21 : autres applications et connexion en deux étapes {#2026-11-21}

- **Nouveau : [clés d’accès](/fr/docs/developers/access-keys)** (`vcp_pat_…`), créées dans **Account → Other apps**. Chacune dispose de ses propres autorisations Lire, Modifier et Supprimer, ainsi que d’une date d’expiration sauf si elle autorise uniquement la lecture.
- **Nouveau : [API](/fr/docs/developers/api) version 1**, pour les favoris, notes, collections, fiches de révision, parcours d’apprentissage, historique de visionnage, liste « À regarder plus tard », transcriptions, captures d’écran, réglages et appareils. Les séances de visionnage, corrections de sites, demandes de fonctions et informations de formule sont accessibles en lecture seule. Le document OpenAPI 3.1 est à l’adresse `/v1/openapi.json`.
- **Nouveau : [adresse des assistants](/fr/docs/developers/assistants)** pour Claude, ChatGPT, Claude Code et Cursor. Une suppression demandée par un assistant attend votre confirmation sur le site.
- **Nouveau : [webhooks](/fr/docs/developers/webhooks)** signés selon Standard Webhooks, avec 32 événements au choix et un message de test. Les messages sont courts par défaut ; l’option **Include what was written** se règle pour chaque adresse.
- **Nouveau : [connexion en deux étapes](/fr/docs/developers/two-step-sign-in)** sur le site, avec dix codes de récupération et la possibilité de mémoriser un navigateur pendant 7 jours. Une extension associée reste reconnue pendant 7 jours lorsque cette protection est activée.
- **Limites :** Free comprend 5 clés, 5 000 requêtes par jour, 3 adresses de webhook et 3 assistants ; Pro comprend 25 clés, 50 000 requêtes, 20 adresses et 10 assistants ; Team comprend 50 clés, 100 000 requêtes, 40 adresses et 25 assistants par membre.

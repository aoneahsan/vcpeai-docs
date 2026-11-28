---
title: Clés d’accès
description: Créez une clé d’accès Video Controls Plus, choisissez ses autorisations et sa date d’expiration, puis affichez-la, remplacez-la ou supprimez-la.
last_update:
  date: 2026-11-21
---

# Clés d’accès

**Une clé d’accès fonctionne comme un mot de passe pour un de vos outils** : synchronisation de fiches d’étude, script ou raccourci sur téléphone. L’outil l’envoie à chaque requête vers [l’API](/fr/docs/developers/api). La clé ne donne accès qu’aux catégories de votre bibliothèque que vous avez choisies lors de sa création. Elle commence par `vcp_pat_`, suivi d’une longue chaîne aléatoire. Ne la mettez dans aucun contenu que vous partagez.

## Créer une clé {#making-a-key}

1. Sur le site, ouvrez **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** et cliquez sur **Make a key**.
2. Donnez-lui un **Name** qui identifie l’outil, par exemple « Synchronisation des fiches d’étude ».
3. Cochez ce à quoi elle peut accéder. Chaque catégorie possède trois cases : **Read**, **Change** et **Delete**. Cochez la lecture d’au moins une catégorie.
4. Choisissez quand elle **Stops working after** : 30, 90 ou 365 jours, ou **Never**. Une clé sans expiration ne peut disposer que d’autorisations de lecture. Une clé autorisée à modifier ou supprimer doit avoir une date de fin.
5. Cliquez sur **Make key**, puis copiez-la. C’est la seule fois où elle apparaît sans nouvelle connexion.

Pour créer une clé, vous devez vous être connecté au cours des dix dernières minutes et, si la [connexion en deux étapes](/fr/docs/developers/two-step-sign-in) est activée, saisir votre code. Nous vous prévenons par e-mail de la création ; l’e-mail ne contient jamais la clé.

## Portée de chaque autorisation {#what-each-tick-reaches}

Chaque case cochée devient une autorisation de la clé. Si celle-ci demande une opération non autorisée, l’API répond `403 scope_required` et nomme l’autorisation requise.

| Catégorie sur le site | Lecture | Modification | Suppression | Éléments couverts dans l’API |
|---|---|---|---|---|
| Favoris | `bookmarks:read` | `bookmarks:write` | `bookmarks:delete` | `bookmarks` |
| Notes | `notes:read` | `notes:write` | `notes:delete` | `notes` |
| Collections | `collections:read` | `collections:write` | `collections:delete` | `collections`, `collection_videos` |
| Fiches de révision | `flashcards:read` | `flashcards:write` | `flashcards:delete` | `flashcards` |
| Parcours d’apprentissage | `paths:read` | `paths:write` | `paths:delete` | `learning_paths`, `path_videos` |
| Historique de visionnage | `history:read` | | `history:delete` | `watch_history` |
| À regarder plus tard | `later:read` | `later:write` | `later:delete` | `watch_later` |
| Transcriptions | `transcripts:read` | `transcripts:write` | `transcripts:delete` | `transcripts`, `transcript_texts` |
| Captures d’écran | `screenshots:read` | | | `screenshots` |
| Réglages et raccourcis | `settings:read` | `settings:write` | | `settings` |
| Appareils | `devices:read` | `devices:write` | `devices:delete` | `devices` |
| Séances de visionnage | `parties:read` | | | `watch_parties`, `party_members` |
| Corrections de sites proposées par la communauté | `fixes:read` | | | `site_fixes` |
| Demandes de fonctions | `requests:read` | | | `feature_requests`, `request_votes` |

Une case vide correspond à une autorisation que le site ne propose pas : l’historique n’est pas modifiable, les captures et catégories partagées sont accessibles en lecture seule, et les réglages ne peuvent pas être supprimés. Chaque clé peut aussi lire votre formule et votre utilisation du jour (`account:read`, catégorie `account` de l’API) sans case supplémentaire.

## Afficher de nouveau une clé {#showing-a-key-again}

Cliquez sur **Show again**. La clé ne s’affiche que dans les dix minutes suivant une nouvelle connexion, afin qu’un navigateur laissé ouvert ne puisse pas la révéler. Si la connexion en deux étapes est activée, vous devez également saisir son code, même sur un navigateur mémorisé. La clé reste affichée brièvement ; fermez l’affichage après l’avoir copiée.

## Remplacer une clé {#replacing-a-key}

Cliquez sur **Replace** si une clé a pu être exposée ou si vous en souhaitez une nouvelle. La nouvelle clé conserve le même nom et les mêmes autorisations. L’ancienne reste utilisable pendant 24 heures, le temps de la remplacer dans votre outil, puis cesse de fonctionner.

## Supprimer une clé {#removing-a-key}

Cliquez sur **Remove**, puis confirmez avec le même bouton. La requête suivante utilisant cette clé est refusée (`401 invalid_token`). Votre bibliothèque, vos autres clés et vos assistants ne changent pas.

## Vérifier les autorisations d’une clé {#checking-what-a-key-can-do}

`GET /token` renvoie le type de clé et ses autorisations triées :

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

**Other apps** indique également la date de création de chaque clé, sa dernière utilisation et sa date d’expiration.

## Nombre de clés autorisées {#how-many-you-can-have}

Free permet 5 clés, Pro 25 et Team 50 par membre. Une clé supprimée ne compte plus. Si vous atteignez la limite, supprimez une clé ou choisissez une formule supérieure sur la page [Plans](https://vcpeai.aoneahsan.com/plans).

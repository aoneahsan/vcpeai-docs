---
title: Video Controls Plus pour les développeurs
sidebar_label: Présentation
description: Consulter et modifier vos favoris, notes, fiches de révision et autres données Video Controls Plus depuis vos propres outils.
last_update:
  date: 2026-11-21
---

# Video Controls Plus pour les développeurs

**Vous pouvez accéder à votre bibliothèque Video Controls Plus depuis des outils que vous associez vous-même** : un script avec une clé d’accès, un assistant comme Claude ou ChatGPT, ou votre serveur averti des changements par webhook. Les trois se configurent sur le site, dans **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)**, avec toutes les formules, y compris Free.

Chaque clé, assistant ou webhook accède seulement aux catégories que vous autorisez, en votre nom. Il ne peut voir aucune donnée que vous ne pourriez pas consulter vous-même sur le site.

## Trois façons d’y accéder {#three-ways-in}

| Vous souhaitez | Utilisez | Guide |
|---|---|---|
| Lire ou modifier votre bibliothèque depuis un script, un tableur ou un raccourci sur téléphone | Une clé d’accès et l’API REST | [Clés d’accès](/fr/docs/developers/access-keys), [API](/fr/docs/developers/api) |
| Interroger Claude, ChatGPT, Claude Code ou Cursor sur vos notes et fiches de révision | L’adresse de l’assistant (MCP) | [Assistants](/fr/docs/developers/assistants) |
| Avertir votre serveur dès l’enregistrement d’une note ou d’un favori | Une adresse de webhook | [Webhooks](/fr/docs/developers/webhooks) |

## Données accessibles aux applications externes {#what-an-outside-app-can-reach}

Uniquement les catégories que vous autorisez, et uniquement vos données :

- **Lecture et modification** de vos favoris, notes, collections et vidéos associées, fiches de révision, parcours d’apprentissage et leurs vidéos, liste « À regarder plus tard », transcriptions, réglages et navigateurs associés à l’extension.
- **Lecture et suppression** de votre historique de visionnage. Seule l’extension y ajoute des éléments lorsque l’historique est activé.
- **Lecture** de vos captures d’écran. Leur suppression reste dans l’extension.
- **Suppression**, si vous l’autorisez pour la catégorie concernée. Une clé supprime immédiatement. Une demande de suppression faite par un assistant attend votre confirmation sur le site.
- **Lecture seule** des séances de visionnage que vous organisez ou auxquelles vous participez, des corrections de sites proposées par la communauté, et des demandes de fonctions ainsi que vos votes.
- **Toujours consultables** : votre formule, ses limites et votre utilisation du jour.

### Données et actions toujours exclues {#what-it-never-reaches}

Quels que soient vos choix, aucune clé, aucun assistant ni aucun webhook ne peut :

- accéder à la bibliothèque d’une autre personne ou identifier les autres membres de votre séance de visionnage ;
- organiser ou rejoindre une séance de visionnage, voter, publier une correction de site ou modifier une demande de fonction ;
- voir vos identifiants de connexion, codes de vérification en deux étapes, codes de récupération, clés ou secrets de signature ;
- modifier votre formule, vos paiements ou votre adresse e-mail, ni associer l’extension à un compte ;
- lire vos notes vocales, l’historique de l’IA, vos paiements, vos invitations ou les données d’analyse de l’utilisation ;
- ouvrir une page réservée à l’équipe.

## Adresses {#the-addresses}

| Service | Adresse |
|---|---|
| API REST | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1` |
| Document OpenAPI | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.json` |
| Version Markdown du même document | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/api/v1/openapi.md` |
| Adresse de l’assistant (MCP) | `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp` |

Le document OpenAPI provient de la même liste de catégories et de champs que l’API. Il ne décrit donc pas de route absente de l’API.

## Limites selon la formule {#limits-on-each-plan}

| | Free | Pro | Team (par membre) |
|---|---|---|---|
| Clés d’accès | 5 | 25 | 50 |
| Requêtes API et assistant par jour | 5 000 | 50 000 | 100 000 |
| Adresses de webhook | 3 | 20 | 40 |
| Connexions d’assistant | 3 | 10 | 25 |

Les requêtes de vos clés et assistants sont comptées ensemble chaque jour et le compteur repart à zéro à minuit UTC. Chaque clé ou assistant est aussi limité à 120 requêtes par minute, pour arrêter un script qui s’emballe. **Other apps** montre votre utilisation par rapport aux limites de votre formule. Les formules et tarifs figurent sur la page [Plans](https://vcpeai.aoneahsan.com/plans).

## Clés et secrets protégés jusqu’à une nouvelle connexion {#keys-and-secrets-stay-hidden}

Une clé ou un secret de signature de webhook s’affiche en entier une fois, lors de sa création. Par la suite, vous ne pouvez le revoir que dans les dix minutes suivant une nouvelle connexion et, si la [vérification en deux étapes](/fr/docs/developers/two-step-sign-in) est activée, après saisie du code de votre application d’authentification. Un navigateur resté ouvert ne peut donc pas le révéler. Un e-mail vous prévient à chaque création de clé, association d’assistant ou ajout d’adresse de webhook. L’e-mail ne contient jamais la clé ni le secret.

## Guides de cette section {#in-this-section}

- [Clés d’accès](/fr/docs/developers/access-keys) : créer, afficher, remplacer ou supprimer une clé, et comprendre ses autorisations.
- [API](/fr/docs/developers/api) : requêtes, pagination, erreurs, limites et exemples `curl` pour chaque catégorie.
- [Assistants](/fr/docs/developers/assistants) : associer Claude, ChatGPT, Claude Code ou Cursor.
- [Webhooks](/fr/docs/developers/webhooks) : événements, contenu des messages et vérification de signature.
- [Connexion en deux étapes](/fr/docs/developers/two-step-sign-in) : code après Google, pour le site et l’extension.
- [Journal des changements pour les développeurs](/fr/docs/developers/changelog) : changements les plus récents en premier.

---
title: Associer Claude, ChatGPT, Claude Code ou Cursor
sidebar_label: Assistants
description: Donnez l’adresse Video Controls Plus à un assistant et choisissez sur le site les données de votre bibliothèque auxquelles il peut accéder.
last_update:
  date: 2026-11-21
---

# Assistants

**Associez un assistant pour l’interroger sur votre propre bibliothèque** : « Quelles fiches de révision du cours de la semaine dernière sont à revoir ? », « Résume mes notes sur cette vidéo » ou « Ajoute cette conférence à ma liste À regarder plus tard ». Claude, ChatGPT, Claude Code et Cursor utilisent la même adresse :

```text
https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
```

L’assistant vous dirige vers le site Video Controls Plus. Vous vous y connectez, choisissez les données auxquelles il pourra accéder et confirmez. Vous ne lui remettez ni mot de passe ni clé. L’adresse figure aussi dans **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)**, avec un bouton pour la copier.

## Associer un assistant {#connecting}

### Claude {#claude}

1. Dans Claude, ouvrez **Settings → Connectors**, puis choisissez **Add custom connector**.
2. Nommez-le Video Controls Plus et collez l’adresse ci-dessus.
3. Claude ouvre notre site. Cochez les autorisations voulues et confirmez.

### ChatGPT {#chatgpt}

1. Dans ChatGPT, ouvrez **Settings → Apps and connectors**, puis **Advanced**, et activez le mode développeur.
2. Choisissez **Create**, nommez l’application Video Controls Plus et collez l’adresse ci-dessus.
3. ChatGPT ouvre notre site. Cochez les autorisations voulues et confirmez.

### Claude Code {#claude-code}

1. Dans un terminal, exécutez :

   ```bash
   claude mcp add --transport http video-controls-plus https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp
   ```

2. Dans Claude Code, exécutez `/mcp` et choisissez Video Controls Plus pour vous connecter.
3. Votre navigateur ouvre notre site. Cochez les autorisations voulues et confirmez.

### Cursor {#cursor}

1. Dans Cursor, ouvrez **Settings → Tools & MCP**, puis choisissez **New MCP server**.
2. Ajoutez ces lignes dans le fichier ouvert et enregistrez-le :

   ```json
   { "mcpServers": { "video-controls-plus": { "url": "https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor indique **Needs login**. Cliquez sur ce bouton, choisissez les autorisations sur notre site et confirmez.

## Ce que vous autorisez {#what-you-approve}

La page de confirmation nomme l’assistant et l’adresse vers laquelle il reviendra. Elle propose ensuite les mêmes cases Lire, Modifier et Supprimer que pour une [clé d’accès](/fr/docs/developers/access-keys#what-each-tick-reaches). La suppression est désactivée au départ. Autorisez au moins une catégorie en lecture ou cliquez sur **Deny** ; un assistant refusé reçoit une réponse de refus et n’accède à rien.

Si la [connexion en deux étapes](/fr/docs/developers/two-step-sign-in) est activée, vous saisissez votre code lors de l’autorisation. Un navigateur mémorisé ne saute ce code que si l’assistant reçoit uniquement des droits de lecture. Lui permettre de modifier ou supprimer des données demande aussi une connexion effectuée dans les dix dernières minutes. Nous vous envoyons un e-mail à chaque nouvelle association.

Quel que soit l’accès accordé, l’assistant consulte vos données en votre nom. Il ne voit ni vos identifiants, ni vos clés, ni la bibliothèque d’autrui.

## Une suppression attend votre confirmation {#deleting-waits-for-your-yes}

Même si vous avez coché Supprimer, l’assistant ne supprime jamais une donnée de lui-même. Si vous lui demandez de retirer une note, il vous fournit un lien et la demande attend sur le site :

1. L’assistant vous donne le lien ; **Other apps** affiche aussi la demande sous **Asked to delete, waiting for you**.
2. Ouvrez-la. La page indique ce qui serait supprimé, la vidéo concernée, la date de la demande et le délai de réponse.
3. Cliquez sur **Delete the note** (ou le favori, la fiche, etc.) ou sur **Keep it**.

La demande expire après dix minutes. Ensuite, rien n’est supprimé ; redemandez l’opération à l’assistant si vous la souhaitez toujours. À sa prochaine vérification, l’assistant reçoit la réponse indiquant que la suppression a eu lieu.

## Renommer ou déconnecter {#renaming-and-disconnecting}

Chaque assistant associé apparaît dans **Other apps** avec ses dates d’association et de dernière utilisation. Donnez-lui un nom reconnaissable, ou cliquez sur **Disconnect**, puis confirmez en cliquant une seconde fois. Sa prochaine requête sera refusée.

## Nombre d’assistants autorisés {#how-many-you-can-connect}

Free permet 3 connexions d’assistant, Pro 10 et Team 25 par membre. Associer de nouveau le même assistant remplace son autorisation précédente sans occuper une place supplémentaire. Ses requêtes comptent avec celles de vos clés dans la limite quotidienne de votre formule. Voir [Limites selon la formule](/fr/docs/developers#limits-on-each-plan).

## Vos propres textes sont transmis {#your-own-writing}

Vos notes, libellés et fiches sont transmis à l’assistant comme données, exactement tels que vous les avez écrits. Si vous avez collé des instructions dans une note, l’assistant les voit comme du texte de votre bibliothèque. N’autorisez que les catégories utiles à la conversation.

## Pour les développeurs de clients MCP {#for-mcp-client-developers}

| | |
|---|---|
| Transport | Streamable HTTP, sans état, avec un point d’accès unique |
| Connexion | OAuth 2.1 avec PKCE, via notre serveur d’autorisation Supabase à `https://gjajgvsjhdbtrpvfiuwl.supabase.co/auth/v1` |
| Découverte | Métadonnées de ressource protégée à `https://gjajgvsjhdbtrpvfiuwl.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource` |
| Sans jeton | `401` avec un en-tête `WWW-Authenticate` pointant vers ces métadonnées |
| Clés d’accès | Une clé `vcp_pat_` fonctionne aussi comme jeton Bearer pour un client que vous exploitez vous-même |
| Limites | 120 requêtes par minute et par connexion, plus la limite quotidienne de la formule |

Les outils proviennent des mêmes catégories que [l’API](/fr/docs/developers/api#your-library) : `list_<part>`, `get_<part>`, `create_<part>`, `update_<part>` et `prepare_delete_<part>`, selon les opérations permises pour chaque catégorie. `tools/list` n’affiche que les outils autorisés pour cette connexion. Les catégories partagées et votre formule ne disposent que d’outils de liste et de consultation ; aucun outil ne donne accès aux notes vocales ni à l’historique de l’IA.

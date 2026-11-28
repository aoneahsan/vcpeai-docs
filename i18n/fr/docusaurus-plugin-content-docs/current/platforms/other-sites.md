---
title: Sites compatibles avec Video Controls Plus
sidebar_label: Autres sites
description: Video Controls Plus fonctionne sur les sites qui lisent des vidéos HTML5 standard, y compris dans les lecteurs intégrés.
---

Video Controls Plus fonctionne sur les sites qui lisent une vidéo HTML5 standard. Cela comprend Udemy, Vimeo, Twitch, Coursera, Khan Academy, Prime Video et les autres sites utilisant ce type de vidéo. YouTube, Netflix et LinkedIn disposent en plus d’outils dédiés.

## Commandes disponibles sur tout site {#what-you-get-on-any-site}

Les commandes de base sont les mêmes partout : vitesse avec `]` et `[`, widget et raccourcis personnalisés.

Les outils propres à un site concernent seulement trois sites :

| Site | Outils supplémentaires | Guide |
|---|---|---|
| YouTube | Outils YouTube, chacun avec son interrupteur | [YouTube](/fr/docs/platforms/youtube) |
| Netflix | Outils Netflix, désactivés jusqu’à votre choix | [Netflix](/fr/docs/platforms/netflix) |
| LinkedIn | Outils lancés depuis le menu | [LinkedIn](/fr/docs/platforms/linkedin) |

## Vidéos intégrées {#embedded-videos}

Un lecteur YouTube ou Vimeo intégré dans un article ou une page de cours reçoit lui aussi les commandes flottantes, les raccourcis et les actions du menu contextuel. L’extension ne se charge dans un cadre intégré que lorsqu’il contient une vidéo.

## Vérifier un site dans le panneau {#check-a-site-in-the-popup}

Ouvrez le panneau de l’extension sur le site. Il affiche son nom et l’un de ces trois états :

| État | Signification |
|---|---|
| Supported | Le site figure dans la liste intégrée |
| Enabled | Vous avez activé l’extension sur ce site |
| Not enabled | L’extension ne fonctionne pas sur ce site |

Si l’état indique **Not enabled**, cliquez sur **Enable on this site**. La liste intégrée se trouve dans Paramètres → Site Settings → **Supported Sites**.

## Si les commandes n’apparaissent pas {#when-the-controls-do-not-appear}

- Le site est en pause. Ouvrez le panneau et cliquez sur **Resume**. Voir [Mettre l’extension en pause sur un site](/fr/docs/getting-started/pause-per-site).
- Le panneau indique **Not enabled**. Cliquez sur **Enable on this site**.
- La page ne contient pas de vidéo HTML5 standard : l’extension n’a rien à contrôler.
- Le widget est masqué. Appuyez sur `Esc` ou `Ctrl + Alt + H`.

## Raccourcis associés {#related-keys}

| Touche | Action |
|---|---|
| `]` / `[` | Accélérer ou ralentir de 0.1x |
| `Esc` | Masquer ou afficher le widget |
| `Ctrl + Alt + H` | Masquer ou afficher le widget |

Ces touches sont les mêmes sur tous les sites. Les autres figurent dans [Raccourcis par défaut](/fr/docs/keyboard-shortcuts/defaults), et vous pouvez les changer avec [Modifier un raccourci](/fr/docs/keyboard-shortcuts/rebinding).

Si les commandes restent absentes, consultez le [dépannage](/fr/docs/troubleshooting).

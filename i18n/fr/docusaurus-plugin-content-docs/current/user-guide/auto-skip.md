---
title: Passer automatiquement les introductions et récapitulatifs
sidebar_label: Saut automatique
description: Le saut automatique clique sur les boutons de Netflix, Prime Video et YouTube. Il est désactivé par défaut et demande un compte.
---

Le saut automatique clique à votre place lorsqu’un bouton de saut apparaît sur Netflix, Prime Video ou YouTube. Ses interrupteurs sont désactivés au départ, et la fonction demande un [compte associé](/fr/docs/account-and-sync).

## Boutons utilisés {#what-it-clicks}

| Site | Bouton utilisé |
|---|---|
| Netflix et Prime Video | Sauter l’introduction, passer le récapitulatif ou aller à l’épisode suivant pendant le générique |
| YouTube | « Skip Ad » et vidéo suivante sur l’écran de fin |

L’extension clique sur les boutons affichés par le site. Si aucun bouton n’apparaît, elle n’a rien à utiliser.

## Activer le saut automatique {#turn-it-on}

1. Ouvrez l’onglet « Avancé » des paramètres.
2. Repérez **Playback Features**.
3. Activez les options souhaitées.

| Interrupteur | Réglage initial | Effet |
|---|---|---|
| Auto Skip Intro | Désactivé | Clique sur le bouton de saut de l’introduction |
| Auto Skip Outro/Next Episode | Désactivé | Passe le générique et l’invite « épisode suivant » |
| Auto Skip Recap | Désactivé | Passe le récapitulatif sur Netflix et Prime Video |
| Show Skip Notification | Activé | Affiche un court avis à chaque saut |

## Régler le délai {#set-the-delay}

**Skip Delay** règle l’attente après l’apparition du bouton, jusqu’à 2 secondes.

| Option | Effet |
|---|---|
| Instant (0ms) | Aucun délai |
| Fast (250ms) | Attend 250 ms |
| Normal (500ms) | Attend 500 ms ; réglage par défaut |
| Slow (1s) | Attend une seconde |
| Very slow (2s) | Attend deux secondes |

Choisissez un délai plus long si vous voulez apercevoir le bouton avant le saut.

## Passer manuellement {#skip-by-hand}

Appuyez sur `Ctrl + Alt + S` pour passer vous-même l’introduction, ou cliquez sur **Skip Intro** dans l’onglet « Smart » du widget. Le raccourci ne fonctionne que sur Netflix et Prime Video.

## Autres types de saut {#other-skipping}

| Commande | Partie passée | Emplacement |
|---|---|---|
| Silence Skip | Passages silencieux d’une vidéo | Widget, onglet Smart, **Silence Skip** |
| SponsorBlock | Segments sponsorisés | Paramètres, onglet New Features, qui demande un compte |

Silence Skip fonctionne sans compte.

## Raccourcis associés {#related-keys}

`Ctrl + Alt + S` est le seul raccourci de saut. Il figure dans [Raccourcis par défaut](/fr/docs/keyboard-shortcuts/defaults), et [Modifier un raccourci](/fr/docs/keyboard-shortcuts/rebinding) explique comment le changer.

À suivre : [Affichage et widget](/fr/docs/user-guide/display-and-widget).

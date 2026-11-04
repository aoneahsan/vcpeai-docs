---
title: "Compter, synchroniser, exporter et supprimer"
sidebar_label: "Compte et synchronisation"
description: "Comment connecter Video Controls Plus à votre compte sur le site Web, ce que la connexion ajoute, comment la synchronisation fonctionne, comment acheter Pro, et comment exporter ou supprimer vos données."
unlisted: true
---

Il n'y a pas de connexion dans l'extension. Vous créez votre compte sur [vcpeai.aoneahsan.com](https://vcpeai.aoneahsan.com), où vous vous connectez avec Google, puis vous connectez l'extension à elle. La connexion fonctionne de la même façon sur Chrome, Edge et Firefox.

Un compte qui existait avant que 16.0.0 n'ouvre vide jusqu'à ce que nous terminions le déplacement des anciennes données du cloud, qui suit cette version. Rien enregistré dans votre navigateur n'est affecté.

## Connectez l'extension à votre compte {#connect-the-extension-to-your-account}

1. Appuyez sur **Connexion à votre compte**. Le bouton est dans le popup, sur l'étape du compte de la page d'accueil et sur le **Compte & Sync** onglet dans Paramètres.
2. Un onglet s'ouvre sur vcpeai.aoneahsan.com. Si la page vous demande de vous connecter, appuyez sur **Continuer avec Google**.
3. Vérifiez que la page et l'extension affichent le même code. Si les codes sont différents, appuyez sur **Annuler**.
4. Appuyez sur **Connectez ce navigateur**.

L'extension affiche la connexion en quelques secondes pendant que le popup ou Paramètres reste ouvert, et autrement en 30 secondes.

Le code dure 10 minutes. Si vous avez fermé l'onglet, appuyez sur **Ouvre encore la page** dans l'extension. [Dépannage](/docs/troubleshooting) couvre ce qu'il faut faire lorsque la connexion échoue.

## Ce que la connexion ajoute {#what-connecting-adds}

| Besoin d'un compte connecté aujourd'hui                                                     | Page                                                                                                         |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Boucle A-B                                                                                  | [Boucle A-B](/docs/user-guide/ab-loop)                                                                       |
| Coup de pouce audio                                                                         | [Coup de pouce audio](/docs/user-guide/audio-boost)                                                          |
| Filtres vidéo                                                                               | [Filtres vidéo](/docs/user-guide/video-filters)                                                              |
| Captures d'écran                                                                            | [Captures d'écran](/docs/user-guide/screenshots)                                                             |
| Auto-skip                                                                                   | [Auto-skip](/docs/user-guide/auto-skip)                                                                      |
| Les notes de compte horodatées et le signet connecté économisent                            | [Notes et signets](/docs/user-guide/notes-and-bookmarks)                                                     |
| Synchronisation des nuages                                                                  | Cette page                                                                                                   |
| Les nouvelles fonctionnalités, les onglets YouTube, Netflix et LinkedIn dans les paramètres | [YouTube](/docs/platforms/youtube), [Netflix](/docs/platforms/netflix), [LinkedIn](/docs/platforms/linkedin) |
| L'allocation d'IA partagée                                                                  | [Caractéristiques de l'IA](/docs/ai-features)                                                                |

Sans compte, vous avez la vitesse, presets, frame step, Picture-in-Picture, partage horodatage, mode théâtre, signets enregistrés dans ce navigateur et le widget.

Les extras YouTube et LinkedIn qui sont activés par défaut sans compte, et seulement l'onglet Paramètres où vous les commutez vous demande de vous connecter.

## Quel compte connecté enregistre {#what-a-connected-account-records}

Connecté, l'extension stocke vos données de compte et vos paramètres, et pendant que le commutateur d'analyse d'utilisation est sur elle enregistre quels sites, fonctionnalités et vitesses vous avez utilisé. La liste complète est [Confidentialité et autorisations](/docs/privacy-and-permissions).

## Synchronisation {#sync}

1. Connectez l'extension à votre compte.
2. Ouvrez l'onglet Compte & Sync dans Paramètres et activez **Activer Cloud Sync**.

Vos paramètres sont téléchargés lorsque vous l'allumez. Vos vitesses, vos fixations de clés et les paramètres du site sont synchronisés. L'onglet affiche la dernière heure de synchronisation. Les signets enregistrés lors de la synchronisation connectée à votre compte séparément de ce commutateur de paramètres; les signets faits pendant la dédicace restent dans ce navigateur.

| Bouton                       | Ce qu'il fait                                                        |
| ---------------------------- | -------------------------------------------------------------------- |
| Téléchargement dans le Cloud | Enregistre les paramètres de cet appareil sur votre compte           |
| Charger depuis le nuage      | Remplace les paramètres de cet appareil par la copie de votre compte |

Les nouveaux paramètres gagnent : lorsque deux navigateurs enregistrent sur le même compte, le compte conserve la copie plus récente. Les paramètres que vous avez modifiés sur ce périphérique et que vous n'avez pas téléchargés sont écrasés par **Charger depuis le nuage**.

Un autre appareil prend vos raccourcis clavier la prochaine fois que vous ouvrez Paramètres dessus, mais la liste des sites que vous avez mis en pause ne se synchronise pas. Il reste sur l'appareil où vous les avez interrompus.

## Déconnexion {#sign-out}

**Déconnexion**, dans le popup ou sur l'onglet Compte & Sync, déconnecte ce navigateur seulement. Votre compte reste, et chaque autre navigateur que vous avez connecté. Pour reconnecter ce navigateur, appuyez sur **Connexion à votre compte**.

## Comment puis-je supprimer mes données ? {#how-can-i-delete-my-data}

Ouvrir les paramètres, aller à la **Confidentialité Données &** onglet, et cliquez **Supprimer toutes les données** sur la **Vos données** Carte. Il supprime le compte lui-même, les fichiers stockés sous lui et tout ce qui est enregistré sous lui. Elle ne peut pas être annulée. Le bouton a besoin d'un compte connecté, car il supprime ce qui est stocké avec votre compte.

**Exporter mes données** est sur la même carte. Il télécharge vos données comme un fichier JSON. Il a aussi besoin d'un compte connecté.

Vous pouvez également supprimer votre compte du site [page de suppression de données](https://vcpeai.aoneahsan.com/data-deletion) quand vous êtes signé là-dedans.

## Exporter et importer vos paramètres {#export-and-import-your-settings}

Ouvrez la **Gestion des données** onglet dans Paramètres.

- **Paramètres d' exportation** Téléchargez vos paramètres en tant que fichier JSON. Vous choisissez d'inclure ou non la mémoire vidéo et les préréglages de filtre.
- **Paramètres d' importation** restaure à partir d'un fichier que vous avez exporté : **Tout remplacer** remplace vos paramètres actuels, et **Fusionner** conserve vos valeurs actuelles là où le fichier n'en a pas.

## Plans et paiements {#plans-and-payment}

Chaque fonction fonctionne sur Free. Pro augmente vos courses quotidiennes d'IA et votre niveau d'IA, pour une personne, et Team fait la même chose
pour chaque membre. Les prix sont sur [Plans](https://vcpeai.aoneahsan.com/plans).

Pour obtenir Pro, connectez-vous sur le site, ouvrez Plans et appuyez sur **Mise à niveau vers Pro**, mensuelle ou annuelle. Vous payez sur Polar
Page de paiement, et Pro commence sur votre compte dès que Polar confirme le paiement.

Polar vous envoie un lien vers son portail client, où vous pouvez annuler, modifier votre carte et télécharger des factures. Annuler
À tout moment. Votre plan court jusqu'à la fin de la période pour laquelle vous avez payé.

L'équipe est installée avec nous : presse **Choisir l'équipe** sur les plans, qui ouvre la [page de contact](https://vcpeai.aoneahsan.com/contact).

Les plans sont achetés sur le site seulement, jamais à l'intérieur de l'extension ou l'application Android.

Pour tout ce qui concerne votre compte, utilisez [page de contact](https://vcpeai.aoneahsan.com/contact).

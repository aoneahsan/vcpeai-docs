---
title: "Lorsque Video Controls Plus ne fonctionne pas sur un site"
sidebar_label: "Dépannage"
description: "Que vérifier lorsque Video Controls Plus n'apparaît pas sur un site, qu'une clé ne fait rien, qu'une connexion échoue ou qu'un réglage n'a aucun effet."
unlisted: true
---

Vérifiez que le site n'est pas mis en pause dans le popup, puis rechargez la page. C'est la première chose à vérifier, et les autres sont ci-dessous, chacun comme ce que vous voyez, pourquoi, et que faire.

## Les contrôles n'apparaissent pas sur un site {#the-controls-do-not-appear-on-a-site}

**Pourquoi:** le site est interrompu, l'extension n'est pas activée là, ou le widget est caché.

1. Ouvrez le popup sur ce site.
2. Si elle montre **Paus**, cliquez **Reprendre**.
3. Si elle montre **Non activé**, cliquez **Activer sur ce site**.
4. Rechargez la page.
5. Appuyez sur `Esc` ou `Ctrl + Alt + H` au cas où le widget serait caché.

Si la page n'a pas de vidéo HTML5, il n'y a rien à contrôler pour l'extension, et [Autres sites](/docs/platforms/other-sites) dit sur quels sites il fonctionne.

## Une lettre ou une clé à chiffres ne fait rien {#a-letter-or-digit-key-does-nothing}

**Pourquoi:** besoin de clés à lettres et à chiffres `Ctrl + Alt`. Seulement `[`, `]`, `=`, `\`, `'`, `,`, `.` et `Esc` travailler seul.

1. Appuyez sur la touche `Ctrl + Alt`, par exemple `Ctrl + Alt + P`.
2. Si elle ne fait toujours rien, ouvrez Paramètres, allez dans l'onglet Raccourcis clavier, et vérifiez que le raccourci et sa section sont activés.

La table complète est [Raccourcis par défaut](/docs/keyboard-shortcuts/defaults).

## Loop, boost audio, filtres ou captures d'écran sont indisponibles {#loop-audio-boost-filters-or-screenshots-are-unavailable}

**Pourquoi:** ceux-ci s'ouvrent après avoir connecté l'extension à votre compte. Comme l'auto-skip. La clé du signet, `Ctrl + Alt + O`, fonctionne également sans compte et enregistre localement.

1. Ouvrez les paramètres et allez dans l'onglet Compte & Sync.
2. Appuyez sur **Connexion à votre compte**, et confirmer sur le site.

C'est la même chose pour Chrome, Edge et Firefox. Voir [les étapes et ce que la connexion ajoute](/docs/account-and-sync).

## L'onglet connexion n'a pas ouvert {#the-connect-tab-did-not-open}

**Pourquoi:** le navigateur n'a pas ouvert l'onglet, ou vous l'avez fermé.

1. Retourne à l'extension. Il montre **En attendant que tu te connectes...** et votre code.
2. Appuyez sur **Ouvre encore la page**.

## Le code sur le site est différent {#the-code-on-the-website-is-different}

**Pourquoi:** la page appartient à une autre demande, pas celle que ce navigateur attend.

1. Appuyez sur **Annuler** sur la page.
2. Recommencer depuis l'extension avec **Connexion à votre compte**.

Ne pas appuyer sur **Connectez ce navigateur** alors que les deux codes diffèrent.

## La demande de connexion a manqué de temps {#the-connect-request-ran-out-of-time}

**Pourquoi:** le code dure 10 minutes, et après cela le site affiche **Cette demande n'est plus valide.** et la prolongation dit que la demande a manqué de temps.

1. Retourne à l'extension.
2. Appuyez sur **Essaie encore**, et confirmer sur le site dans les 10 minutes.

## Trop de tentatives {#too-many-attempts}

**Pourquoi:** l'extension a demandé de se connecter trop souvent en peu de temps.

1. Attendez.
2. Appuyez sur **Essaie encore**.

## Connecté, mais vos listes sont vides {#connected-but-your-lists-are-empty}

**Pourquoi:** un compte qui existait avant que 16.0.0 n'ouvre vide jusqu'à ce que nous terminions le déplacement des anciennes données du cloud, qui suit cette version. Rien enregistré dans votre navigateur n'est affecté.

Il n'y a pas de pas pour celui-ci. [Compte et synchronisation](/docs/account-and-sync) dit ce qu'un compte détient.

## Sur Firefox, un téléchargement ou une exécution AI dit que Firefox a besoin de votre permission {#on-firefox-an-upload-or-an-ai-run-says-firefox-needs-your-permission}

**Pourquoi:** sur Firefox, le contenu de la page (une capture d'écran que vous téléchargez, une transcription que vous enregistrez sur le compte, des légendes pour une sortie d'IA) n'est envoyé qu'après avoir autorisé le "contenu du site web". L'add-on demande la première fois que vous en utilisez un.

1. Autoriser quand Firefox le demande.
2. Ou ouvrez les permissions de l'add-on dans Firefox et laissez-le là, puis essayez à nouveau.

## La vitesse s'arrête à 4x {#the-speed-stops-at-4x}

**Pourquoi:** le curseur et `[` et `]` les clés s'arrêtent à 4x.

1. Ouvrez le widget et tapez la vitesse dans l'entrée personnalisée. Il faut des valeurs jusqu'à 16x.
2. Ou ouvrez Paramètres, allez dans l'onglet Général, et utilisez le **Vitesse personnalisée (0.1x - 16x)** Des boîtes.

## Un commutateur Netflix ou LinkedIn n'a rien changé. {#a-netflix-or-linkedin-switch-changed-nothing}

**Pourquoi:** les interrupteurs marche/arrêt s'appliquent après une recharge.

1. Modifier le commutateur dans Paramètres.
2. Rechargez la page sur ce site.

Sur Netflix, chaque extra commence. Voir [Netflix](/docs/platforms/netflix).

## L'onglet YouTube, Netflix ou LinkedIn dans Paramètres vous demande de vous connecter {#the-youtube-netflix-or-linkedin-tab-in-settings-asks-you-to-connect}

**Pourquoi:** ces onglets ont besoin d'un compte connecté, tandis que les extras YouTube et LinkedIn qui sont activés par défaut fonctionnent toujours sans un; seulement l'onglet où vous les changez demande.

1. Connectez-vous sur l'onglet Compte & Sync.
2. Ouvre encore l'onglet.

## Le widget est en anglais et Paramètres n'est pas {#the-widget-is-in-english-and-settings-is-not}

**Pourquoi:** le widget est en anglais aujourd'hui. Les paramètres et le popup sont en anglais, espagnol, français et allemand.

Il n'y a pas de pas pour celui-ci. C'est une limite de la construction actuelle.

## Une nouvelle clé est refusée {#a-new-key-is-refused}

**Pourquoi:** une clé peut appartenir à un seul raccourci.

1. Lisez le message. Il nomme le raccourci qui tient la clé.
2. Suivez son lien vers ce raccourci.
3. Donnez ce raccourci une autre clé, ou choisissez une autre clé pour la vôtre.

Voir [Modifier un raccourci](/docs/keyboard-shortcuts/rebinding).

## Vos raccourcis sont différents sur un autre appareil {#your-shortcuts-are-different-on-another-device}

**Pourquoi:** un appareil prend vos clés la prochaine fois que vous ouvrez Paramètres dessus, pendant qu'il est connecté à votre compte.

1. Connectez l'extension sur cet appareil.
2. Ouvrez les paramètres.

## Toujours coincé {#still-stuck}

Écrivez à l'équipe à travers le [page de contact](https://vcpeai.aoneahsan.com/contact). Dites quel site, quel navigateur et quelle clé.

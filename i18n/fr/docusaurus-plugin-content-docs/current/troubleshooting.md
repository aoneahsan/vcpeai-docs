---
title: Résoudre un problème avec Video Controls Plus sur un site
sidebar_label: Dépannage
description: Que vérifier si les commandes n’apparaissent pas, si un raccourci ne fonctionne pas ou si l’association au compte échoue.
---

Vérifiez d’abord dans le panneau de l’extension que le site n’est pas en pause, puis rechargez la page. Si le problème persiste, trouvez ci-dessous ce que vous observez.

## Les commandes n’apparaissent pas sur un site {#the-controls-do-not-appear-on-a-site}

**Cause possible :** le site est en pause, l’extension n’y est pas activée ou le widget est masqué.

1. Ouvrez le panneau de l’extension sur ce site.
2. Si l’état indique **En pause**, cliquez sur **Reprendre**.
3. S’il indique **Non activé**, cliquez sur **Activer sur ce site**.
4. Rechargez la page.
5. Appuyez sur `Esc` ou `Ctrl + Alt + H` si le widget est masqué.

Si la page ne contient aucune vidéo HTML5 standard, l’extension n’a rien à contrôler. Consultez [Autres sites](/fr/docs/platforms/other-sites) pour connaître les sites compatibles.

## Une touche de lettre ou de chiffre ne fait rien {#a-letter-or-digit-key-does-nothing}

**Cause :** les raccourcis contenant une lettre ou un chiffre nécessitent `Ctrl + Alt`. Seules les touches `[`, `]`, `=`, `\`, `'`, `,`, `.` et `Esc` fonctionnent seules.

1. Appuyez sur `Ctrl + Alt` avec la touche voulue, par exemple `Ctrl + Alt + P`.
2. Si rien ne se passe, ouvrez l’onglet des raccourcis clavier dans les paramètres. Vérifiez que le raccourci et sa catégorie sont activés.

Le tableau complet figure dans [Raccourcis par défaut](/fr/docs/keyboard-shortcuts/defaults).

## La boucle, l’amplification audio, les filtres ou les captures sont indisponibles {#loop-audio-boost-filters-or-screenshots-are-unavailable}

**Cause :** ces fonctions nécessitent un compte associé à l’extension, tout comme le saut automatique. Le raccourci des favoris, `Ctrl + Alt + O`, fonctionne aussi sans compte et les enregistre alors localement.

1. Ouvrez l’onglet **Compte et synchronisation** des paramètres.
2. Cliquez sur **Connecter à votre compte**, puis confirmez l’association sur le site.

La procédure est identique sur Chrome, Edge et Firefox. Consultez [les étapes d’association et les fonctions disponibles](/fr/docs/account-and-sync).

## L’onglet d’association ne s’est pas ouvert {#the-connect-tab-did-not-open}

**Cause possible :** le navigateur n’a pas ouvert l’onglet ou vous l’avez fermé.

1. Revenez à l’extension : elle affiche **Waiting for you to connect...** et votre code.
2. Cliquez sur **Open the page again**.

## Les codes affichés ne correspondent pas {#the-code-on-the-website-is-different}

**Cause :** la page correspond à une autre demande que celle attendue par ce navigateur.

1. Cliquez sur **Cancel** sur la page.
2. Recommencez depuis l’extension avec **Connecter à votre compte**.

Ne cliquez pas sur **Connect this browser** tant que les deux codes diffèrent.

## La demande d’association a expiré {#the-connect-request-ran-out-of-time}

**Cause :** le code est valable 10 minutes. Passé ce délai, le site indique **This request is no longer valid.** et l’extension signale l’expiration.

1. Revenez à l’extension.
2. Cliquez sur **Réessayer**, puis confirmez sur le site dans les 10 minutes.

## Trop de tentatives {#too-many-attempts}

**Cause :** l’extension a demandé à associer le compte trop souvent en peu de temps.

1. Attendez quelques minutes.
2. Cliquez sur **Réessayer**.

## Le compte est associé, mais les listes sont vides {#connected-but-your-lists-are-empty}

**Cause :** vous avez peut-être associé un autre compte Google que celui utilisé avant la version 16.0.0. Les anciennes données dans le cloud ont été transférées le 4 octobre 2026 ; attendre une nouvelle migration ne remplira pas un compte vide. Les données enregistrées uniquement dans votre navigateur y restent.

Vérifiez quel compte Google est connecté sur le site. S’il s’agit du compte utilisé avant la version 16.0.0 et que les listes sont toujours vides, [contactez l’équipe](https://vcpeai.aoneahsan.com/contact). La page [Compte et synchronisation](/fr/docs/account-and-sync) explique ce que contient le compte.

## Firefox demande une autorisation pour un téléversement ou une fonction d’IA {#on-firefox-an-upload-or-an-ai-run-says-firefox-needs-your-permission}

**Cause :** Firefox ne laisse envoyer le contenu d’une page, comme une capture d’écran, une transcription ou des sous-titres pour l’IA, qu’après votre autorisation « website content ». Le module complémentaire la demande lors de la première utilisation.

1. Accordez l’autorisation lorsque Firefox la demande.
2. Vous pouvez aussi l’accorder dans les permissions du module complémentaire dans Firefox, puis réessayer.

## La vitesse s’arrête à 4x {#the-speed-stops-at-4x}

**Cause :** le curseur et les touches `[` et `]` sont limités à 4x.

1. Saisissez une vitesse personnalisée dans le widget. Le champ accepte jusqu’à 16x.
2. Vous pouvez aussi ouvrir l’onglet **Général** des paramètres et utiliser les champs **Custom Speed (0.1x - 16x)**.

## Un réglage Netflix ou LinkedIn ne change rien {#a-netflix-or-linkedin-switch-changed-nothing}

**Cause :** ces réglages s’appliquent après rechargement de la page.

1. Modifiez le réglage dans les paramètres.
2. Rechargez la page du site concerné.

Sur Netflix, toutes les fonctions supplémentaires sont désactivées au départ. Consultez [Netflix](/fr/docs/platforms/netflix).

## L’onglet YouTube, Netflix ou LinkedIn demande un compte {#the-youtube-netflix-or-linkedin-tab-in-settings-asks-you-to-connect}

**Cause :** ces onglets de paramètres nécessitent un compte associé. Les fonctions YouTube et LinkedIn activées par défaut continuent de fonctionner sans compte.

1. Associez votre compte dans l’onglet **Compte et synchronisation**.
2. Ouvrez de nouveau l’onglet concerné.

## Le panneau affiche encore l’ancienne langue {#the-widget-still-shows-the-previous-language}

**Cause :** la page vidéo était déjà ouverte lorsque vous avez changé la langue de l’extension dans les paramètres.

Rechargez la page vidéo. Le panneau utilisera alors la langue enregistrée dans les paramètres. Le guide [Changer la langue](/fr/docs/user-guide/display-and-widget) répertorie les langues prises en charge.

## Un nouveau raccourci est refusé {#a-new-key-is-refused}

**Cause :** une combinaison ne peut servir qu’à un seul raccourci.

1. Lisez le message : il nomme le raccourci qui utilise déjà la combinaison.
2. Suivez le lien vers ce raccourci.
3. Attribuez-lui une autre combinaison ou choisissez-en une autre pour le nouveau raccourci.

Consultez [Modifier un raccourci](/fr/docs/keyboard-shortcuts/rebinding).

## Les raccourcis diffèrent sur un autre appareil {#your-shortcuts-are-different-on-another-device}

**Cause :** un appareil associé au compte récupère vos raccourcis à la prochaine ouverture de ses paramètres.

1. Associez l’extension à votre compte sur cet appareil.
2. Ouvrez ses paramètres.

## Besoin d’aide ? {#still-stuck}

Écrivez-nous depuis la [page de contact](https://vcpeai.aoneahsan.com/contact). Précisez le site, le navigateur et la touche concernés.

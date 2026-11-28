---
title: Confidentialité et autorisations
sidebar_label: Confidentialité et autorisations
description: Données conservées par Video Controls Plus, avec ou sans compte, services utilisés et rôle de chaque autorisation du navigateur.
---

Video Controls Plus conserve vos réglages dans votre navigateur. Tant que l’option **Analyse de l’utilisation** est activée, ce qui est le réglage par défaut, des événements d’utilisation sont envoyés au service de l’équipe, avec ou sans compte. Votre adresse IP est également envoyée à ipapi.co pour déterminer votre région, au plus une fois par jour. Un compte connecté conserve aussi vos données de compte et, si la synchronisation est activée, vos réglages.

Lorsque vous désactivez l’option, aucun de ces enregistrements d’utilisation n’a lieu.

L’extension n’enregistre pas les vidéos que vous regardez, leurs titres ni leurs adresses, sauf si vous activez **Historique de visionnage**, désactivé par défaut. Les éléments que vous choisissez d’enregistrer constituent l’autre exception. Un compte connecté conserve le titre et l’adresse d’une vidéo uniquement avec un élément que vous y enregistrez ou lancez depuis celle-ci : note, signet, entrée de journal, vidéo à regarder plus tard, capture d’écran envoyée dans le cloud, informations vidéo extraites, transcription, carte mémoire créée depuis une vidéo, vidéo d’un parcours d’apprentissage, élément d’une collection ou séance de visionnage partagé.

Cette page explique en langage courant la [politique de confidentialité](https://vcpeai.aoneahsan.com/privacy). La politique constitue le texte juridique et prévaut en cas de différence.

## Ce qui reste dans votre navigateur {#what-stays-in-your-browser}

Vos réglages, raccourcis clavier, vitesse mémorisée pour chaque vidéo, position de lecture, préréglages de filtres et réglages audio sont conservés dans votre navigateur. Ils ne sont transmis à votre compte que lorsque vous connectez l’extension et activez la synchronisation.

Le téléchargement audio est traité sur votre appareil. Une capture d’écran y reste également, sauf si vous choisissez une action cloud qui envoie l’image.

Les limites de visionnage comptent les minutes sur cet appareil uniquement ; leur code PIN est stocké sous forme hachée et n’est jamais synchronisé. Le décompte du minuteur d’étude et les chapitres créés à partir des sous-titres restent dans ce navigateur. Les GIF, extraits, accélérés et planches de contact sont créés sur votre appareil puis enregistrés comme téléchargements.

## Ce qui est enregistré {#what-is-recorded}

| Données | Quand | Contenu |
|---|---|---|
| Événements d’utilisation | Tant que l’analyse de l’utilisation est activée, avec ou sans compte | Nom de l’événement, nom d’hôte du site, navigateur, système d’exploitation, version de l’extension et identifiant de session ; le compte est aussi indiqué si l’extension y est connectée. |
| Recherche de région | Tant que l’analyse de l’utilisation est activée, au plus une fois par jour | Votre adresse IP est envoyée à ipapi.co. Le pays, la ville et le fuseau horaire renvoyés sont enregistrés dans votre profil si un compte est connecté ; la région reste dans le navigateur. L’adresse IP n’est pas conservée. |
| Sites, fonctions et vitesses | Tant que l’analyse de l’utilisation est activée, avec un compte connecté | Sites consultés avec l’extension, fonctions et vitesses utilisées. |
| Compte | Avec un compte connecté | Adresse e-mail, nom affiché, photo de profil et identifiant de votre compte Google. |
| Ce navigateur | Avec un compte connecté | Nom de l’appareil, navigateur, système d’exploitation, version de l’extension et date de dernière activité. |
| Réglages | Avec un compte connecté et la synchronisation activée | Vos réglages synchronisés avec votre compte. |
| Éléments enregistrés dans votre compte | Avec un compte connecté, uniquement lorsque vous enregistrez chaque élément | Notes, signets, vidéos à regarder plus tard, captures d’écran envoyées dans le cloud, informations vidéo extraites par le menu contextuel et transcriptions enregistrées, chacune avec le titre et l’adresse de la vidéo. Un signet conserve aussi son horodatage. Une entrée de journal est un signet auquel s’ajoutent une humeur et votre texte. Il en va de même pour les cartes mémoire créées depuis une vidéo, y compris un passage de quiz ou un mot avec la ligne de sous-titres affichée comme exemple, ainsi que pour les vidéos des parcours d’apprentissage et les éléments des collections. |
| Historique de visionnage | Seulement après l’activation d’**Historique de visionnage** dans **Paramètres → Confidentialité et données**, pendant la lecture d’une vidéo avec un compte connecté. Cette option est désactivée par défaut pour chaque compte connecté dans chaque navigateur. | Pour chaque séance de 15 secondes ou plus : titre et adresse de la vidéo, temps de visionnage, dernière position, passages lus, date, vitesse de lecture et fonctions utilisées. Désactiver l’option empêche l’enregistrement de nouvelles séances. Les séances déjà enregistrées restent dans votre compte jusqu’à leur suppression sur le site ou la suppression du compte. |
| Visionnage partagé | Lorsque vous créez ou rejoignez une séance | Adresse et titre de la vidéo, code de la séance, identité des participants et heure de leur arrivée. Pendant la séance, lecture, pause, déplacement dans la vidéo et vitesse sont transmis aux participants par Supabase Realtime sans être conservés. |
| Rapports d’erreur | Tant que le **Suivi des erreurs par un service tiers** est activé | Rapports de plantage envoyés à Sentry. |
| Texte traité par l’IA | Uniquement lorsque vous lancez une fonction d’IA | Sous-titres de la vidéo ou texte que vous rédigez. Un relevé de chaque utilisation du quota partagé est conservé pendant 13 mois, sans le texte. Voir [Fonctions d’IA](/fr/docs/ai-features). |
| Enregistrements Speak | Uniquement lorsque vous enregistrez avec Speak | Votre voix, pendant deux minutes au maximum, ainsi que ses transcriptions et la note proposée. Ces trois éléments sont supprimés dans les 24 heures, ou immédiatement lorsque vous choisissez **Abandonner** ([politique de confidentialité](https://vcpeai.aoneahsan.com/privacy), section 1.8). |

Dans les événements d’utilisation, un site est désigné par son nom d’hôte, par exemple `youtube.com`. L’adresse complète, le chemin de la page et son titre ne font pas partie de l’événement.

## L’option Analyse de l’utilisation {#the-usage-analytics-switch}

Dans les paramètres, ouvrez **Confidentialité et données**, puis **Analyse de l’utilisation**. Cette option fonctionne avec ou sans compte.

Une fois désactivée, elle arrête trois traitements :

1. Les événements d’utilisation ne sont plus envoyés au service de l’équipe.
2. Le compte connecté ne consigne plus les sites, les fonctions ni les vitesses utilisés.
3. Votre adresse IP n’est plus envoyée à ipapi.co.

Si l’option est désactivée dans ce navigateur ou dans votre compte au moment où vous les connectez, elle sera désactivée aux deux endroits.

## Les autres options {#your-other-switches}

Elles se trouvent dans le même onglet.

| Option | Réglage par défaut | Effet |
|---|---|---|
| Suivi des erreurs par un service tiers | Activé | Envoi des rapports de plantage à Sentry. |
| Communications marketing | Désactivé | Notification occasionnelle du navigateur concernant une nouvelle fonction ou un autre produit de l’équipe. Les e-mails sont distincts : les actualités du produit sont envoyées aux titulaires d’un compte, avec un lien de désabonnement en un clic dans chaque message. |
| Synchronisation des réglages | Activée | Conservation de vos réglages dans votre compte. |

Le suivi des erreurs est indépendant de l’analyse de l’utilisation : désactiver l’un ne désactive pas l’autre. Dans **Vos données**, sur le même onglet, vous pouvez exporter ou supprimer vos données. Le guide [Compte et synchronisation](/fr/docs/account-and-sync) décrit la procédure.

## Où se trouvent vos données {#where-your-data-lives}

| Service | Ce qu’il conserve ou reçoit |
|---|---|
| Supabase | Base de données, connexion à votre compte et synchronisation en direct d’une séance de visionnage partagé. |
| FilesHub | Captures d’écran enregistrées, enregistrements Speak pendant 24 heures au maximum et e-mails envoyés par l’équipe. |
| Sentry | Rapports de plantage, lorsque le suivi des erreurs par un service tiers est activé. |
| ipapi.co | Votre adresse IP pour déterminer votre région, lorsque l’analyse de l’utilisation est activée. |
| Anthropic, OpenAI et Groq | Texte d’une utilisation de l’IA que vous lancez, ainsi que l’audio ou les transcriptions d’un enregistrement Speak. La page [Fonctions d’IA](/fr/docs/ai-features) précise ce que reçoit chaque service. |

Cinq fonctions contactent chacune leur propre service, uniquement lorsque vous les utilisez : SponsorBlock (`sponsor.ajay.app`), la traduction ou les sous-titres bilingues de Netflix (`api.mymemory.translated.net`), les notes de films Netflix avec votre propre clé (`www.omdbapi.com`), un résumé par IA qui doit récupérer les sous-titres de la vidéo (`video.google.com/timedtext`) et **Rechercher** dans l’outil **Enregistrer un mot** du panneau (`en.wiktionary.org`), qui ne reçoit que le mot saisi. La section 5.9 de la politique mentionne un service supplémentaire pour une fonction qui n’est pas encore couverte par cette documentation.

## Ce qui n’est pas collecté {#what-is-not-collected}

Selon la politique, l’extension ne collecte pas les vidéos que vous regardez, sauf si vous activez l’historique de visionnage ; ni le contenu des vidéos ou des fichiers multimédias, hors capture d’écran que vous choisissez d’envoyer ; ni votre navigation sur les pages où l’extension n’agit pas ; ni vos mots de passe ou informations de paiement ; ni le contenu des pages visitées, à l’exception du texte que vous envoyez vous-même à une fonction d’IA et des données envoyées par les cinq fonctions décrites ci-dessus à leurs services respectifs.

Vos données ne sont pas vendues.

## Le microphone {#the-microphone}

Speak est la seule fonction qui envoie votre voix. L’autorisation du microphone est demandée lors de votre première utilisation.

| Où | Ce qui apparaît |
|---|---|
| Dans l’extension | **Dicter une note** affiche « Autoriser le microphone une fois ». Choisissez **Ouvrir la page du microphone** : un onglet intitulé « Autoriser le microphone pour Speak » s’ouvre. Choisissez **Autoriser le microphone**, puis **Autoriser** dans la fenêtre du navigateur. Cette opération ne se fait qu’une fois. |
| Dans l’application Android | L’application demande l’autorisation du microphone lorsque vous lancez un premier enregistrement avec Speak. |
| Dans l’extension Firefox | Firefox demande aussi l’autorisation facultative « Communications personnelles » avant tout enregistrement ou envoi. |

Le microphone n’est actif que pendant l’enregistrement. Si vous le bloquez, la page indique où rétablir l’autorisation. Pour masquer Speak, désactivez-le dans **Paramètres → Fonctions d’IA**.

## À quoi sert chaque autorisation {#what-each-permission-is-for}

L’extension demande sept autorisations et l’accès aux sites. Sur Chrome et Edge, elle en demande une huitième : `offscreen`. Elle ne demande pas l’autorisation `identity`, car la connexion ne se fait pas dans l’extension. L’autorisation du microphone n’est pas demandée lors de l’installation.

| Autorisation | Utilisation |
|---|---|
| `storage` | Conserver dans le navigateur vos réglages, raccourcis, vitesses mémorisées, préréglages de filtres et thème. |
| `activeTab` | Permettre à la fenêtre de l’extension de lire et modifier la vidéo dans l’onglet actif lorsque vous l’ouvrez. |
| `contextMenus` | Ajouter les commandes du menu contextuel. |
| `alarms` | Gérer le minuteur de sommeil ; l’envoi différé des lots de synchronisation et d’utilisation ; la vérification d’une connexion au compte en attente ; l’actualisation des options distantes ; la fin d’une pause sur un site ; et la vérification quotidienne d’une éventuelle annonce. |
| `notifications` | Afficher les changements de vitesse, l’état de la boucle et les alertes du minuteur de sommeil lorsque le panneau est masqué ou que le mode d’affichage est **Notifications uniquement**. |
| `clipboardWrite` | Copier un lien depuis les commandes **Copier l’URL de la page** et **Copier l’URL avec horodatage** du menu contextuel. L’extension ne lit jamais le presse-papiers. |
| `scripting` | Ajouter les commandes à une vidéo intégrée dans une autre page, uniquement dans un cadre qui contient une vidéo. |
| `offscreen` (Chrome et Edge) | Permettre à Speak d’enregistrer dans une page cachée de l’extension et d’y envoyer l’enregistrement, même pendant le téléversement. Firefox enregistre dans sa page d’arrière-plan et n’en a pas besoin. |
| Accès à tous les sites | Détecter et commander les vidéos sur tout site que vous ouvrez. |

L’accès à tous les sites est l’autorisation la plus large : une vidéo peut se trouver sur n’importe quel site. Quand vous [mettez un site en pause](/fr/docs/getting-started/pause-per-site), l’extension n’y agit plus.

## Sur Firefox {#on-firefox}

Firefox demande trois autorisations facultatives pour les données. Chacune limite ce qui peut être envoyé.

| Autorisation Firefox | Ce qu’elle contrôle |
|---|---|
| Données techniques et d’interaction | Les événements d’utilisation ne sont envoyés qu’après autorisation. L’option Analyse de l’utilisation la demande. |
| Contenu des sites Web | Le contenu de la page, comme une capture d’écran envoyée, une transcription enregistrée dans le compte, des sous-titres utilisés par l’IA ou un mot enregistré avec sa ligne de sous-titres, n’est transmis qu’après autorisation. L’extension la demande lors de la première utilisation d’une de ces fonctions. |
| Communications personnelles | Un enregistrement Speak et ses transcriptions ne sont transmis qu’après autorisation. L’extension la demande lors de la première utilisation de Speak. |

## Clés, assistants et webhooks que vous connectez {#keys-assistants-and-webhooks-you-connect}

Aucune application externe n’accède à votre bibliothèque si vous ne la configurez pas vous-même dans **Compte → Autres applications** sur le site. Une clé d’accès, un assistant comme Claude ou ChatGPT, ou une adresse de webhook n’atteint que les catégories que vous cochez. Ils n’accèdent jamais à votre connexion, à vos paiements, à vos notes vocales, à votre historique d’IA ni à vos statistiques d’utilisation. Un webhook contient l’identifiant de l’élément, sa vidéo et son heure ; votre texte n’est inclus que si vous cochez **Inclure le texte saisi** pour cette adresse. Le texte d’une transcription n’est jamais envoyé. Pour connaître et retirer chaque accès, voir [Video Controls Plus pour les développeurs](/fr/docs/developers).

## Autres produits de la même équipe {#other-apps-from-the-same-team}

L’onglet dédié des paramètres présente les autres produits de l’équipe. La liste est incluse dans l’extension : aucun chargement externe n’est nécessaire pour l’afficher. Les annonces voisines sont lues depuis le service de l’équipe. L’extension ne contient ni réseau ni SDK publicitaire.

## Textes juridiques et contact {#legal-text-and-contact}

- [Politique de confidentialité](https://vcpeai.aoneahsan.com/privacy)
- [Conditions d’utilisation](https://vcpeai.aoneahsan.com/terms)
- [Suppression des données](https://vcpeai.aoneahsan.com/data-deletion)
- [Contacter l’équipe](https://vcpeai.aoneahsan.com/contact)

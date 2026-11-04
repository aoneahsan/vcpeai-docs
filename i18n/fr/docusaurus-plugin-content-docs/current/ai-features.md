---
title: "Caractéristiques de l'IA et ce qu'ils envoient"
sidebar_label: "Caractéristiques de l'IA"
description: "Les résumés vidéo et l'aide à l'écriture LinkedIn fonctionnent sur l'allocation partagée, votre propre clé OpenAI ou Anthropic, ou un modèle local. Parler fonctionne sur l'allocation partagée seulement. Voici ce que chacun envoie."
unlisted: true
---

Video Controls Plus dispose de trois fonctionnalités AI : un résumé d'une vidéo YouTube faite à partir de ses légendes, l'aide écrite sur LinkedIn, et Speak, qui transforme ce que vous dites en note. Chaque course n'est que lorsque vous la commencez. Votre propre clé ou un modèle local n'a pas besoin de compte, et l'allocation partagée et parler ont besoin d'un [compte connecté](/docs/account-and-sync).

Ouvrez le popup sur une page de surveillance YouTube et appuyez sur **Résumez cette vidéo**. L'aide à écrire démarre sur LinkedIn ([Page LinkedIn](/docs/platforms/linkedin)). Chaque commande de lecture fonctionne sans AI.

## Trois façons de le faire fonctionner {#three-ways-to-run-it}

Choisissez un sur le **Fournisseur d'IA** carte, dans Paramètres → **Caractéristiques de l'IA**.

| Option sur la carte                             | Ce dont vous avez besoin    | Où va ton texte                                                                                                                                              |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Indemnité partagée**                          | Un compte connecté          | Vers le serveur Video Controls Plus, qui l'envoie à Anthropic. Sur Pro ou Team seulement, lorsque cette route n'est pas disponible, elle va plutôt à OpenAI. |
| **Votre clé OpenAI** ou **Votre clé Anthropic** | Votre clé API, aucun compte | Tout droit de votre navigateur à ce fournisseur                                                                                                              |
| **Local (Ollama)**                              | Ollama sur votre machine    | nulle part. Il reste sur votre appareil.                                                                                                                     |

Un résumé, une réponse d'aide à l'écriture LinkedIn ou une proposition Speak utilise 1 des parcours quotidiens de votre régime sur l'allocation partagée, et la carte d'IA de la popup montre combien vous avez utilisé aujourd'hui. Chaque plan de course quotidienne et son niveau d'IA (Spark, Pulse ou Surge) sont sur [Plans](https://vcpeai.aoneahsan.com/plans).

En libre, l'IA s'arrête parfois. La carte dit "AI se repose jusqu'à ...", vos pistes sont intactes, et tout le reste fonctionne. Sur Pro et Team, la course va plutôt à un second fournisseur, et votre propre clé et un modèle local n'ont aucune limite de l'équipe.

## Parle {#speak}

Dites-le, puis vérifiez ce qui a été écrit avant que quelque chose ne soit sauvé. Parlez en trois endroits :

- **L'extension:** **Parlez un mot** sur le widget **Outils** onglet, sur n'importe quelle vidéo. Il épingle la note à ce moment de la vidéo.
- **Le site web:** Notes, cartes-éclair, demandes de contact et de fonctionnalité.
- **L'application Android :** les mêmes quatre pages.

Un enregistrement est jusqu'à 2 minutes. La première fois, l'extension ouvre une page, "Autoriser le microphone pour parler", pour demander une fois. Un enregistrement où rien n'a été entendu, ou qui n'a pas été téléchargé, n'utilise pas de run. Parlez fonctionne sur l'allocation partagée seulement.

## Ce qui est envoyé {#what-is-sent}

| Fonctionnalité             | Ce qui est envoyé                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Résumé vidéo               | La légende ou la transcription de la vidéo                                                                                                                                                             |
| LinkedIn aide à l'écriture | Le texte que vous rédigez                                                                                                                                                                              |
| Parle                      | Votre enregistrement, sur notre serveur, qui envoie l'audio pour une transcription et ensuite seulement les transcriptions à l'IA (voir [Trois façons de le faire fonctionner](#three-ways-to-run-it)) |

Pendant que vous enregistrez, la reconnaissance de la parole de votre navigateur peut également envoyer votre voix au fabricant de votre navigateur. La vidéo elle-même n'est jamais envoyée.

## Ce qui est conservé {#what-is-kept}

Votre enregistrement, ses transcriptions et la proposition sont supprimés dans les 24 heures, ou à la fois lorsque vous appuyez sur **Éliminer**, et si notre stockage de fichiers ne peut pas être atteint à ce moment, le fichier audio est supprimé à la prochaine vérification horaire. Pour un résumé ou une aide écrite, l'équipe ne stocke pas le texte que vous envoyez ou la réponse. Pour chaque course d'allocation partagée, le serveur conserve un enregistrement d'utilisation pendant 13 mois, sans votre texte, et un compte des courses d'aujourd'hui. Une clé que vous ajoutez reste dans votre navigateur et va seulement à son fournisseur.

Sans IA, un résumé revient au générateur intégré de l'extension, sans modèle. Le micro et tout le reste sont allumés [Confidentialité et autorisations](/docs/privacy-and-permissions).

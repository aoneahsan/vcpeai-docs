---
title: Fonctions d’IA et données envoyées
sidebar_label: Fonctions d’IA
description: "Résumés vidéo, aide à la rédaction et Speak : choix du fournisseur, conditions d’accès et données envoyées par chaque fonction."
---

Video Controls Plus propose trois fonctions d’IA : résumer une vidéo YouTube à partir de ses sous-titres, aider à rédiger sur LinkedIn et transformer votre voix en note avec Speak. Chacune ne démarre que lorsque vous le demandez. Votre propre clé ou un modèle local fonctionne sans compte. L’allocation d’IA partagée et Speak nécessitent un [compte associé](/fr/docs/account-and-sync).

Sur une page vidéo YouTube, ouvrez le panneau de l’extension et cliquez sur **Summarize this video**. L’aide à la rédaction se lance sur LinkedIn ; consultez le [guide LinkedIn](/fr/docs/platforms/linkedin). Toutes les commandes de lecture fonctionnent sans IA.

## Trois façons d’utiliser l’IA {#three-ways-to-run-it}

Choisissez une option sur la carte **AI provider**, dans Paramètres → **AI Features**.

| Option | Ce qu’il faut | Destination de votre texte |
|---|---|---|
| **Shared allowance** | Un compte associé | Le serveur Video Controls Plus, qui transmet le texte à Anthropic. Avec Pro ou Team uniquement, si cette voie est indisponible, le texte est transmis à OpenAI. |
| **Your OpenAI key** ou **Your Anthropic key** | Votre clé API ; aucun compte nécessaire | Directement du navigateur vers le fournisseur choisi |
| **Local (Ollama)** | Ollama sur votre appareil | Nulle part : le texte reste sur votre appareil. |

Un résumé, une réponse d’aide à la rédaction ou une proposition Speak consomme une utilisation quotidienne de votre formule avec l’allocation partagée. La carte IA du panneau indique combien vous en avez utilisé aujourd’hui. Le nombre d’utilisations par jour et le niveau d’IA de chaque formule — Spark, Pulse ou Surge — figurent sur la page [Plans](https://vcpeai.aoneahsan.com/plans).

Avec Free, l’IA peut parfois faire une pause. La carte affiche « AI is resting until … » ; aucune utilisation n’est décomptée et les autres fonctions restent disponibles. Avec Pro et Team, la requête passe alors par un second fournisseur. Votre propre clé et un modèle local ne sont pas soumis à une limite fixée par notre équipe.

## Speak {#speak}

Parlez, puis vérifiez la transcription proposée avant qu’une note soit enregistrée. Speak est disponible à trois endroits :

- **Dans l’extension :** **Speak a note**, dans l’onglet **Tools** du widget, sur toute vidéo. La note est associée au moment où vous parlez.
- **Sur le site :** Notes, Fiches de révision, Contact et Demandes de fonctions.
- **Dans l’application Android :** ces mêmes quatre pages.

Un enregistrement peut durer jusqu’à 2 minutes. Lors de la première utilisation, l’extension ouvre une page « Allow the microphone for Speak » pour demander l’accès au microphone une seule fois. Si aucun son n’est détecté ou si l’envoi échoue, aucune utilisation n’est décomptée. Speak fonctionne uniquement avec l’allocation partagée.

## Données envoyées {#what-is-sent}

| Fonction | Données envoyées |
|---|---|
| Résumé vidéo | Sous-titres ou transcription de la vidéo |
| Aide à la rédaction sur LinkedIn | Texte que vous rédigez |
| Speak | Enregistrement envoyé à notre serveur pour transcription ; seule la transcription est ensuite envoyée à l’IA. Voir [Trois façons d’utiliser l’IA](#three-ways-to-run-it). |

Pendant l’enregistrement, la reconnaissance vocale du navigateur peut aussi envoyer votre voix à l’éditeur de ce navigateur. La vidéo elle-même n’est jamais envoyée.

## Données conservées {#what-is-kept}

Votre enregistrement, ses transcriptions et la proposition sont supprimés sous 24 heures, ou immédiatement si vous cliquez sur **Discard**. Si le stockage de fichiers est indisponible à cet instant, le fichier audio est supprimé lors du prochain contrôle horaire. Pour les résumés et l’aide à la rédaction, notre équipe ne conserve ni le texte envoyé ni la réponse. Pour chaque utilisation de l’allocation partagée, le serveur conserve pendant 13 mois un relevé d’utilisation sans votre texte, ainsi que le compteur du jour. Une clé personnelle reste dans votre navigateur et n’est transmise qu’à son fournisseur.

Sans IA, le résumé utilise le générateur intégré à l’extension, sans modèle. Les informations sur le microphone et les autres autorisations figurent dans [Confidentialité et autorisations](/fr/docs/privacy-and-permissions).

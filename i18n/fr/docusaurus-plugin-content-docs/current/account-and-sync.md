---
title: Compte, synchronisation, exportation et suppression
sidebar_label: Compte et synchronisation
description: Associer l’extension à votre compte, synchroniser les réglages, choisir Pro, exporter vos données ou supprimer le compte.
---

On ne se connecte pas directement dans l’extension. Créez un compte sur [vcpeai.aoneahsan.com](https://vcpeai.aoneahsan.com), connectez-vous avec Google, puis associez l’extension à ce compte. La procédure est la même sur Chrome, Edge et Firefox.

Si votre compte existait avant la version 16.0.0, il restera vide jusqu’à la fin du transfert de ses anciennes données dans le cloud, prévu après cette version. Les données enregistrées dans votre navigateur ne sont pas touchées.

## Associer l’extension à votre compte {#connect-the-extension-to-your-account}

1. Cliquez sur **Connecter à votre compte** dans le panneau de l’extension, à l’étape « Compte » de la page de bienvenue ou dans l’onglet **Compte et synchronisation** des paramètres.
2. Un onglet s’ouvre sur vcpeai.aoneahsan.com. Si nécessaire, cliquez sur **Continue with Google** pour vous connecter.
3. Vérifiez que la page et l’extension affichent le même code. Si les codes diffèrent, cliquez sur **Cancel**.
4. Cliquez sur **Connect this browser**.

L’extension affiche la connexion en quelques secondes si son panneau ou ses paramètres restent ouverts. Sinon, comptez environ 30 secondes.

Le code reste valable 10 minutes. Si vous avez fermé l’onglet, cliquez sur **Open the page again** dans l’extension. Consultez le [dépannage](/fr/docs/troubleshooting) si la connexion échoue.

## Ce que permet un compte associé {#what-connecting-adds}

| Nécessite aujourd’hui un compte associé | Guide |
|---|---|
| Boucle A-B | [Boucle A-B](/fr/docs/user-guide/ab-loop) |
| Image dans l’image | [Image dans l’image](/fr/docs/user-guide/picture-in-picture) |
| Amplification audio | [Amplification audio](/fr/docs/user-guide/audio-boost) |
| Filtres vidéo | [Filtres vidéo](/fr/docs/user-guide/video-filters) |
| Captures d’écran | [Captures d’écran](/fr/docs/user-guide/screenshots) |
| Saut automatique | [Saut automatique](/fr/docs/user-guide/auto-skip) |
| Notes horodatées du compte et enregistrement des favoris connectés | [Notes et favoris](/fr/docs/user-guide/notes-and-bookmarks) |
| Synchronisation dans le cloud | Cette page |
| Onglets « New Features », YouTube, Netflix et LinkedIn des paramètres | [YouTube](/fr/docs/platforms/youtube), [Netflix](/fr/docs/platforms/netflix), [LinkedIn](/fr/docs/platforms/linkedin) |
| Allocation d’IA partagée | [Fonctions d’IA](/fr/docs/ai-features) |

Sans compte, vous pouvez régler la vitesse, utiliser les vitesses prédéfinies, avancer image par image, partager un horodatage, activer le mode cinéma, conserver des favoris dans ce navigateur et utiliser le widget.

Les fonctions YouTube et LinkedIn activées par défaut fonctionnent également sans compte. Seul leur onglet de réglages demande d’associer un compte pour les modifier.

## Données enregistrées avec un compte {#what-a-connected-account-records}

Une fois associé, l’extension enregistre les données de votre compte et vos réglages. Tant que l’option d’analyse de l’utilisation est activée, elle enregistre aussi les sites, fonctions et vitesses utilisés. La liste complète figure dans [Confidentialité et autorisations](/fr/docs/privacy-and-permissions).

## Synchronisation {#sync}

1. Associez l’extension à votre compte.
2. Ouvrez l’onglet **Compte et synchronisation** des paramètres et activez **Activer Cloud Sync**.

Vos réglages sont envoyés dans le cloud dès l’activation. Les vitesses, les raccourcis clavier et les réglages propres aux sites sont synchronisés. L’onglet indique la date de la dernière synchronisation. Les favoris enregistrés lorsque le compte est associé sont synchronisés séparément, même si cette option de synchronisation des réglages est désactivée. Ceux créés sans connexion restent dans ce navigateur.

| Bouton | Effet |
|---|---|
| **Téléchargement dans le Cloud** | Enregistre les réglages de cet appareil dans votre compte. |
| **Charger depuis le nuage** | Remplace les réglages de cet appareil par ceux de votre compte. |

La copie la plus récente l’emporte lorsque deux navigateurs enregistrent des réglages sur le même compte. **Charger depuis le nuage** écrase les changements faits sur cet appareil qui n’ont pas été envoyés dans le cloud.

Un autre appareil récupère vos raccourcis clavier à la prochaine ouverture de ses paramètres. En revanche, la liste des sites mis en pause reste propre à chaque appareil.

## Déconnexion {#sign-out}

**Déconnexion**, dans le panneau ou l’onglet **Compte et synchronisation**, dissocie uniquement ce navigateur. Votre compte et vos autres navigateurs associés restent en place. Pour associer de nouveau ce navigateur, cliquez sur **Connecter à votre compte**.

## Supprimer mes données {#how-can-i-delete-my-data}

Ouvrez les paramètres, puis l’onglet **Confidentialité et données**. Dans la carte **Your Data**, cliquez sur **Delete All Data**. Cette action supprime définitivement votre compte, les fichiers qu’il contient et toutes les données qui y sont enregistrées. Elle est irréversible. Le navigateur doit être associé au compte à supprimer.

Sur la même carte, **Export My Data** télécharge vos données dans un fichier JSON. L’exportation demande elle aussi un compte associé.

Vous pouvez également supprimer votre compte depuis la [page de suppression des données](https://vcpeai.aoneahsan.com/data-deletion) du site, après vous y être connecté.

## Exporter et importer les réglages {#export-and-import-your-settings}

Ouvrez l’onglet **Gestion des données** des paramètres.

- **Export Settings** télécharge un fichier JSON de vos réglages. Vous pouvez choisir d’y inclure la mémoire vidéo et les préréglages de filtres.
- **Import Settings** restaure un fichier précédemment exporté. **Tout remplacer** remplace vos réglages actuels ; **Fusionner** conserve vos valeurs actuelles lorsque le fichier n’en contient pas.

## Connexion en deux étapes et autres applications {#two-step-sign-in-and-other-apps}

Sur le site, **Account → Security** permet d’ajouter un code provenant de votre téléphone après la connexion avec Google. Une fois cette protection activée, l’extension associée reste reconnue pendant 7 jours, puis demande une nouvelle association. Retirer un navigateur depuis cette page déconnecte son extension. Consultez [Connexion en deux étapes](/fr/docs/developers/two-step-sign-in).

Sur le site, **Account → Other apps** permet à vos propres outils d’accéder à votre bibliothèque : des clés d’accès pour vos scripts, Claude ou ChatGPT, et des webhooks pour votre serveur. Consultez [Video Controls Plus pour les développeurs](/fr/docs/developers).

## Formules et paiement {#plans-and-payment}

Toutes les fonctions sont disponibles avec Free. Pro augmente le nombre quotidien d’utilisations de l’IA et le niveau d’IA pour une personne ; Team fait de même pour chaque membre. Les tarifs figurent sur la page [Plans](https://vcpeai.aoneahsan.com/plans).

Pour passer à Pro, connectez-vous sur le site, ouvrez la page Plans et cliquez sur **Upgrade to Pro** pour une formule mensuelle ou annuelle. Le paiement se fait sur la page de Polar. Pro est activé sur votre compte dès que Polar confirme le paiement.

Polar vous envoie un lien vers son portail client. Vous pouvez y résilier votre abonnement, changer de carte et télécharger vos factures. Vous pouvez résilier à tout moment ; votre formule reste active jusqu’à la fin de la période payée.

Pour Team, cliquez sur **Choose Team** dans la page Plans : vous serez dirigé vers le [formulaire de contact](https://vcpeai.aoneahsan.com/contact) pour la mise en place avec notre équipe.

Les formules s’achètent uniquement sur le site, jamais dans l’extension ni dans l’application Android.

Pour toute autre question sur votre compte, utilisez le [formulaire de contact](https://vcpeai.aoneahsan.com/contact).

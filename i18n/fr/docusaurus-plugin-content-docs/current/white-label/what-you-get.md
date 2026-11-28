---
title: Ce que vous recevez avec une licence ou un rachat
sidebar_label: Ce que vous recevez
description: Éléments livrés avec une licence en marque blanche Video Controls Plus et code remis lors d’un rachat du produit.
last_update:
  date: 2026-11-27
---

Avec une licence en marque blanche, votre extension et son site fonctionnent sous votre marque, et nous les maintenons à jour. Avec un rachat, vous recevez le code source.

## Avec une licence en marque blanche {#with-a-white-label-license}

- **L’extension à votre nom.** Votre nom, logo et couleurs dans le panneau de l’extension, le widget sur la page et les paramètres, pour Chrome, Firefox et Edge.
- **Vos fiches en boutique.** Nous publions l’extension dans vos comptes développeur sur le Chrome Web Store, Firefox Add-ons et Microsoft Edge Add-ons. Les comptes et les éventuels frais demandés par les boutiques restent à votre charge.
- **Le site compagnon sur votre domaine.** Nous déployons et hébergeons les pages du compte auquel l’extension s’associe.
- **Les commandes actuelles de Video Controls Plus :** vitesse de 0.1x à 16x, boucle A-B, amplification audio jusqu’à 400 %, filtres, captures d’écran, notes horodatées, raccourcis clavier modifiables et outils supplémentaires sur YouTube, Netflix et LinkedIn.
- **Six mois de mises à jour** à compter de l’achat. Voir [Mises à jour et renouvellements](/fr/docs/white-label/updates).
- **Une clé et un fichier de licence** publiés par votre déploiement, que [chacun peut vérifier](/fr/docs/white-label/verify).

La licence n’inclut pas le code source et n’est pas exclusive : nous pouvons accorder des licences du même produit à d’autres entreprises jusqu’à son rachat intégral.

## Composition de Video Controls Plus {#what-the-video-controls-plus-build-is-made-of}

Voici les éléments exploités sous licence et transmis lors d’un rachat. Ils sont propres à ce produit et vous permettent de connaître précisément le périmètre avant de nous contacter.

| Élément | État actuel |
|---|---|
| Extension | Une seule base de code WXT, React et TypeScript : Manifest V3 pour Chrome et Edge, Manifest V2 pour Firefox. Aucun code distant ; toutes les bibliothèques sont comprises dans le paquet, comme l’exige le Chrome Web Store. |
| Outils propres aux sites | Trois registres de fonctions : 62 outils YouTube, 52 fonctions Netflix (dont 50 avec un interrupteur, toutes désactivées à l’installation) et 48 outils LinkedIn. Chaque entrée pilote l’interrupteur des paramètres, l’onglet du widget et le menu contextuel. |
| Connexion | Aucun mot de passe dans l’extension. L’utilisateur se connecte avec Google sur le site compagnon, puis associe l’extension grâce à un code court affiché sur les deux écrans. Le même processus fonctionne sur Chrome, Edge et Firefox. |
| Site compagnon | Construit avec Vite et React : pages de compte liées à l’extension, notes, favoris, liste « À regarder plus tard », formules et pages pour développeurs. |
| Service d’arrière-plan | Postgres avec sécurité au niveau des lignes, schéma écrit avec Drizzle et fonctions serveur pour l’IA, les fichiers, les e-mails, les paiements, l’API, l’adresse de l’assistant MCP et les webhooks. |

L’application Android ne fait pas partie du groupe « extension de navigateur ».

## Avec un rachat du code source {#with-a-source-buyout}

- **Le code de tous les dépôts nécessaires à l’extension :** l’extension, son site compagnon et le service d’arrière-plan qu’ils utilisent, avec les notes de mise en place.
- **Six mois de mises à jour** à compter de l’achat, livrées sous forme de code, puis des renouvellements facultatifs.
- **L’arrêt des ventes.** Nous cessons de vendre des licences et des rachats de Video Controls Plus. Les entreprises déjà titulaires d’une licence conservent leurs conditions.

Après le rachat, vous exploitez le produit comme vous le souhaitez. L’hébergement, les comptes en boutique et les services payants que vous choisissez sont à votre charge.

Le rachat comporte aussi une redevance : vous nous versez 7 % du chiffre d’affaires brut généré par Video Controls Plus, hors taxe sur les ventes ou TVA perçue. Vous la payez chaque trimestre, avec un relevé de revenus, tant que le produit génère des revenus. Cette obligation demeure si vous revendez le produit. Les [conditions de licence](https://vcpeai.aoneahsan.com/white-label/license-terms) le précisent.

Le texte complet figure dans les [conditions de licence](https://vcpeai.aoneahsan.com/white-label/license-terms) et à la section 14 des [Conditions d’utilisation](https://vcpeai.aoneahsan.com/terms#policy-section-14).

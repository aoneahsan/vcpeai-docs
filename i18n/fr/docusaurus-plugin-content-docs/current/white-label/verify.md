---
title: Vérifier une licence en marque blanche
sidebar_label: Vérifier une licence
description: Vérifiez une licence Video Controls Plus par sa clé ou son domaine et consultez le fichier publié par chaque déploiement en marque blanche.
last_update:
  date: 2026-11-13
---

Chacun peut vérifier une licence sur la [page de vérification](https://vcpeai.aoneahsan.com/verify-license). Notre service de licences effectue cette vérification.

## Par clé de licence {#by-license-key}

Choisissez **License key**, collez la clé et cliquez sur **Check**. La page indique si la licence est active, le titulaire, les domaines couverts, son statut et la date de fin des mises à jour. Elle ne révèle ni adresse e-mail, ni numéro de téléphone, ni tarif.

## Par domaine {#by-domain}

Choisissez **Domain**, saisissez le nom d’hôte, par exemple `videos.example.com`, puis cliquez sur **Check**. Notre service de licences lit le fichier publié par ce domaine et vérifie la clé qu’il contient.

| Réponse | Signification |
|---|---|
| This domain serves a valid license. | Le fichier existe et sa clé couvre ce domaine. |
| This domain serves a license issued for another domain. | La clé est valide, mais elle ne couvre pas ce domaine. |
| This domain serves no license file. | Aucun fichier n’existe à l’adresse ci-dessous. |
| We could not reach that domain. | Le domaine n’a pas répondu en HTTPS. |

## Fichier de licence {#the-license-file}

Chaque déploiement en marque blanche publie un fichier à cette adresse :

```text
/.well-known/vcpeai-white-label-license.json
```

Il indique le produit, le client, le domaine et la clé de licence, avec un lien vers la page de vérification. Un certificat PDF se trouve au même emplacement, avec l’extension `.pdf`. Nous ajoutons les deux fichiers lors du déploiement de votre version ; vous n’avez pas à les écrire.

Si une version utilise une clé révoquée ou un domaine non couvert par sa licence, elle affiche la page « This license is not active » à la place de l’application. Aucune donnée n’est supprimée.

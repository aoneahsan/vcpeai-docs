---
title: Connexion en deux étapes
description: Ajoutez un code à six chiffres après Google, conservez dix codes de récupération et mémorisez un navigateur pendant 7 jours.
last_update:
  date: 2026-11-21
---

# Connexion en deux étapes

**Après votre connexion avec Google, la connexion en deux étapes demande un code à six chiffres provenant d’une application d’authentification.** Une personne qui connaît votre mot de passe Google ne peut pas accéder à votre compte Video Controls Plus sans ce code. Cette protection est facultative pour les utilisateurs et obligatoire pour les comptes de l’équipe. Activez-la sur le site dans **Account → [Security](https://vcpeai.aoneahsan.com/account/security)**. L’extension suit aussi cette protection : voir [L’extension](#the-extension).

## Mise en place {#setting-it-up}

Prévoyez environ deux minutes, votre téléphone et un endroit où conserver dix codes de récupération.

1. Ouvrez **Security** et cliquez sur **Set up two-step**.
2. Scannez le code QR avec Google Authenticator, Microsoft Authenticator, 1Password, Authy ou toute application compatible. Si vous ne pouvez pas le scanner, saisissez la clé de configuration dans l’application comme clé basée sur le temps.
3. Saisissez le code affiché pour Video Controls Plus, puis cliquez sur **Turn on two-step**. Le code change toutes les 30 secondes : utilisez celui qui s’affiche à cet instant.
4. Conservez les dix codes de récupération avec **Copy all** ou **Download .txt**, puis cliquez sur **I've saved them**.

## Codes de récupération {#recovery-codes}

Un code de récupération permet de vous connecter sans votre téléphone. Chaque code est utilisable une seule fois et ressemble à `k7m2p-x9qr4` ; vous pouvez le saisir avec ou sans trait d’union. Nous n’en conservons qu’une version brouillée : l’écran de configuration est le seul endroit où vous les voyez tous.

La page **Security** indique combien de codes restent et vous avertit lorsqu’il n’en reste que trois. **Make new codes** remplace tout le jeu : les dix anciens codes cessent de fonctionner dès que les nouveaux apparaissent. Cette action demande un code de votre application d’authentification et une connexion effectuée dans les dix dernières minutes.

## Se connecter {#signing-in}

Connectez-vous avec Google comme auparavant, puis saisissez le code de votre application d’authentification. Après plusieurs codes incorrects, vous devez attendre dix minutes ou utiliser un code de récupération.

### Mémoriser un navigateur {#remembering-a-browser}

Après la saisie du code, vous pouvez cocher **Remember this browser for 7 days**. La case est décochée par défaut ; ne la cochez que sur votre propre navigateur. Pendant sept jours, ce navigateur ne redemande pas le code à la connexion. Le simple fait de le visiter ne prolonge pas cette période.

Même mémorisé, le navigateur demande un code avant de révéler une clé d’accès ou un secret de signature de webhook. Les pages réservées à l’équipe le demandent à chaque fois. **Security** liste les navigateurs mémorisés avec la fin de leur période. Cliquez sur **Forget** pour l’un d’eux, ou sur **Forget all browsers**, et ils redemanderont un code à la prochaine connexion. Se déconnecter d’un navigateur le retire aussi de la liste.

## Si vous perdez votre téléphone {#losing-your-phone}

1. Sur l’écran du code, choisissez **Lost your phone?**, puis **Use a recovery code instead**.
2. Saisissez un code de récupération. Vous accédez au compte pour cette session, et la connexion en deux étapes reste activée. Nous vous envoyons un e-mail signalant l’utilisation du code.
3. Cliquez aussitôt sur **Add a new phone** et scannez le nouveau code QR. Pour afficher une clé ou un secret, un code d’application d’authentification est nécessaire : ajoutez donc le nouveau téléphone avant d’en avoir besoin.

Si vous avez perdu à la fois le téléphone et tous les codes de récupération, contactez-nous depuis l’adresse e-mail liée au compte via la [page de contact](https://vcpeai.aoneahsan.com/contact). Nous vérifions votre identité à l’aide de questions sur votre propre bibliothèque, puis désactivons la connexion en deux étapes afin que vous puissiez vous connecter avec Google et la configurer de nouveau. Vous recevez un e-mail une fois l’opération terminée. Nous ne la désactivons jamais à la demande d’une autre adresse.

## Nouveau téléphone ou désactivation {#a-new-phone-or-turning-it-off}

- **Nouveau téléphone :** saisissez un code de votre téléphone actuel, puis scannez le nouveau code QR. Les codes de l’ancien téléphone cessent de fonctionner.
- **Désactivation :** saisissez un code de votre application d’authentification et cliquez sur **Turn it off**. Google suffit alors pour se connecter ; les codes de récupération et navigateurs mémorisés sont également supprimés.

La connexion en deux étapes reste obligatoire pour les comptes de l’équipe.

## Connexions récentes {#recent-sign-ins}

**Security** répertorie chaque connexion au site ou association de l’extension sur un navigateur, avec la méthode utilisée : Google, Google et code de vérification, navigateur mémorisé, code de récupération ou association de l’extension. **Sign out everywhere else** termine toutes les autres sessions. L’extension de ces navigateurs est alors dissociée jusqu’à une nouvelle association.

## L’extension {#the-extension}

L’extension n’a ni mot de passe ni connexion interne. Elle s’associe à votre compte du site : elle ouvre le site, où vous vous connectez, comparez le code court affiché sur les deux écrans, puis cliquez sur **Connect this browser**. Voir [comment associer l’extension](/fr/docs/account-and-sync#connect-the-extension-to-your-account). Si la connexion en deux étapes est activée, saisissez le code ou utilisez un navigateur mémorisé avant de confirmer.

- **Sept jours.** Avec cette protection activée, l’extension associée reste reconnue pendant 7 jours à compter de l’association, jamais plus. Elle affiche ensuite **Connect again** ; associez-la de nouveau pour continuer la synchronisation. Entre-temps, la vitesse et les autres fonctions sans compte continuent de fonctionner.
- **Activation ultérieure.** Si vous activez la connexion en deux étapes après avoir associé l’extension, l’association précédente n’est plus reconnue. Associez-la de nouveau.
- **Retrait d’un navigateur.** Retirez-le sous **The extension** dans **Security**, ou via [l’API](/fr/docs/developers/api#devices). L’extension de ce navigateur est alors déconnectée et affiche **Connect again**.

Vous ne saisissez jamais le code de vérification dans l’extension : tous les codes sont saisis sur le site.

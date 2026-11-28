---
title: Webhooks
description: Événements webhook Video Controls Plus, contenu des messages signés, vérification en Node ou Python et fonctionnement des nouvelles tentatives.
last_update:
  date: 2026-11-21
---

# Webhooks

**Un webhook avertit votre serveur dès qu’un élément de votre bibliothèque change.** Lorsque vous enregistrez une note, nous envoyons un court message signé à l’adresse que vous avez indiquée. Par défaut, il précise l’action, l’élément concerné et l’heure. Le texte que vous avez écrit reste dans votre bibliothèque, sauf si vous activez **Include what was written**.

Les changements effectués dans l’extension, sur le site, avec une clé d’accès ou par un assistant produisent tous des messages.

## Ajouter une adresse {#adding-an-address}

1. Sur le site, ouvrez **Account → [Other apps](https://vcpeai.aoneahsan.com/account/apps)** et cliquez sur **Add an address**.
2. Collez une adresse `https://` de votre serveur et, si vous le souhaitez, une description comme « Boîte de réception Obsidian ».
3. Cochez les événements à envoyer. La case **Every … event** d’une catégorie sélectionne tous ses événements en une fois.
4. Laissez **Include what was written** désactivé si d’autres personnes ont accès à cette adresse.
5. Cliquez sur **Add address**, puis copiez le secret de signature. Il commence par `whsec_`.

Pour ajouter une adresse, vous devez vous être connecté au cours des dix dernières minutes et, si la [connexion en deux étapes](/fr/docs/developers/two-step-sign-in) est activée, saisir son code. Nous vous avertissons par e-mail de l’ajout ; l’e-mail ne contient pas le secret.

Nous envoyons les messages uniquement à des adresses accessibles depuis Internet et revérifions ces conditions avant chaque envoi :

- uniquement `https://`, sur le port 443 ou 8443, avec une adresse d’au plus 2 048 caractères sans nom d’utilisateur ni mot de passe ;
- ni adresse de réseau privé ou local, ni adresse appartenant à nos services ;
- un nom d’hôte qui se résout.

## Événements {#events}

- **Favoris :** `bookmark.saved`, `bookmark.updated`, `bookmark.removed`
- **Notes :** `note.saved`, `note.updated`, `note.deleted`
- **Collections :** `collection.created`, `collection.updated`, `collection.deleted`, `collection.video_added`, `collection.video_removed`
- **Fiches de révision :** `flashcard.created`, `flashcard.updated`, `flashcard.reviewed`, `flashcard.deleted`
- **Parcours d’apprentissage :** `learning_path.created`, `learning_path.updated`, `learning_path.deleted`, `learning_path.video_added`, `learning_path.video_completed`, `learning_path.video_removed`
- **Historique de visionnage :** `watch_history.added`, `watch_history.removed`
- **À regarder plus tard :** `watch_later.added`, `watch_later.removed`
- **Transcriptions :** `transcript.saved`, `transcript.deleted`
- **Captures d’écran :** `screenshot.saved`, `screenshot.deleted`
- **Réglages et raccourcis :** `settings.updated`
- **Appareils :** `device.added`, `device.removed`
- **Votre adresse :** `webhook.test`, envoyé avec **Send test**

Un événement `updated` indique qu’un texte que vous avez écrit a changé. La simple activité n’en produit pas : une révision avance le calendrier d’une fiche et envoie `flashcard.reviewed`, pas `flashcard.updated` ; le temps regardé dans un parcours n’envoie rien. L’historique envoie `added` lors du premier visionnage d’une vidéo et `removed` lors de sa suppression, mais jamais quand votre position dans la vidéo change. Les séances de visionnage, corrections de sites et demandes de fonctions ne produisent aucun événement.

## Contenu d’un message {#what-a-message-carries}

Chaque message est un `POST` avec un corps JSON et trois en-têtes :

```http
POST /hooks/vcp HTTP/1.1
Content-Type: application/json
User-Agent: VideoControlsPlus-Webhooks/1.0
webhook-id: msg_3f1c9a7e52b84d0e9a6c41b27d58e0f3
webhook-timestamp: 1795252443
webhook-signature: v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=
```

```json
{"type":"note.saved","timestamp":"2026-11-21T09:14:03.512Z","data":{"id":"0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e","video_id":"dQw4w9WgXcQ","platform":"youtube","occurred_at":"2026-11-21T09:14:03.512418+00:00"}}
```

`data` contient l’`id` de l’élément, ainsi que `video_id` et `platform` lorsqu’il concerne une vidéo, et `occurred_at`. Pour obtenir les autres données, récupérez l’élément avec [l’API](/fr/docs/developers/api).

Si **Include what was written** est activé, `data` contient aussi une courte liste de champs selon la catégorie :

| Catégorie | Champs ajoutés à `data` |
|---|---|
| Favoris | `label`, `note`, `color`, `position_seconds` |
| Notes | `content`, `category`, `tags` |
| Collections | `name`, `description` ; pour les vidéos, `collection_id` et `video_title` |
| Fiches de révision | `front`, `back`, `tags` |
| Parcours d’apprentissage | `title`, `description` ; pour les vidéos, `path_id`, `video_title`, `notes` |
| Historique de visionnage | `video_title`, `channel_name` |
| À regarder plus tard | `video_title`, `priority`, `notes` |
| Transcriptions | `language`, `format` |
| Captures d’écran | `position_seconds`, `width`, `height` |
| Réglages et raccourcis | `changed` : `["settings"]`, `["shortcuts"]` ou les deux |
| Appareils | `device_name`, `browser` |

Le texte d’une transcription n’est jamais envoyé dans un message, que la case soit cochée ou non. Lisez-le à l’aide d’une clé depuis `transcript_texts`.

Voici la même note lorsque la case est cochée :

```json
{
  "type": "note.saved",
  "timestamp": "2026-11-21T09:14:03.512Z",
  "data": {
    "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "video_id": "dQw4w9WgXcQ",
    "platform": "youtube",
    "occurred_at": "2026-11-21T09:14:03.512418+00:00",
    "content": "Chorus comes back at 1:43. Use it for the timing exercise.",
    "category": "action",
    "tags": ["music-theory"]
  }
}
```

Un changement de réglages, puis le message de test :

```json
{"type":"settings.updated","timestamp":"2026-11-21T10:02:41.090Z","data":{"id":"6a1f0c52-3b7d-4e8a-9f21-0c4d5e6b7a89","occurred_at":"2026-11-21T10:02:41.090137+00:00","changed":["shortcuts"]}}
```

```json
{"type":"webhook.test","timestamp":"2026-11-21T10:05:12.334Z","data":{"message":"Test event"}}
```

## Vérifier l’origine d’un message {#checking-a-message}

Les messages suivent la signature <a href="https://www.standardwebhooks.com/" rel="noopener noreferrer nofollow">Standard Webhooks</a>. Toute bibliothèque compatible peut donc utiliser le secret tel quel. Pour effectuer la vérification vous-même :

1. Réunissez `webhook-id`, `webhook-timestamp` et le **corps brut**, exactement tel que reçu, en les séparant par `.`.
2. Retirez `whsec_` du début du secret, décodez le reste en base64 et calculez le HMAC-SHA256 du texte avec ce secret.
3. Encodez le résultat en base64. Il doit correspondre à l’une des valeurs `v1,` de `webhook-signature`, qui peut en contenir plusieurs séparées par des espaces.
4. Refusez un horodatage qui diffère de plus de cinq minutes de votre horloge, pour éviter la réutilisation d’un ancien message.

N’analysez le JSON qu’après la vérification. Un corps analysé puis sérialisé de nouveau ne correspond plus à sa signature.

Les exemples ci-dessous peuvent être vérifiés avec le message précédent et ce secret créé uniquement pour cette page :

```text
whsec_dmNwLWRvY3Mtc2FtcGxlLXNlY3JldC0zMi1ieXRlcyE=
```

Sa signature correcte est `v1,Sf2fD3s8K3tN/GbULA6VRokN3DtARXbma24DDern6WY=`. Votre propre secret est visible dans **Other apps**.

### Node {#node}

```js
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';

/** True when the message was signed with `secret` in the last five minutes. */
export function isFromVideoControlsPlus(secret, headers, rawBody, nowSeconds = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

createServer((req, res) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!isFromVideoControlsPlus(process.env.VCP_WEBHOOK_SECRET, req.headers, rawBody)) {
      res.writeHead(400).end();
      return;
    }
    const message = JSON.parse(rawBody);
    res.writeHead(204).end();
    // Handle message.type after answering, so a slow job never runs past the ten-second wait.
  });
}).listen(8443);
```

### Python {#python}

```python
import base64
import hashlib
import hmac
import time


def is_from_video_controls_plus(secret, headers, raw_body, now_seconds=None):
    """True when the message was signed with `secret` in the last five minutes."""
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now_seconds is None else now_seconds
    if abs(now - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()
    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Transmettez à `raw_body` les octets reçus : `request.get_data()` avec Flask, ou `await request.body()` avec FastAPI.

## Réponses, nouvelles tentatives et désactivation {#answering-retries-and-turning-off}

Répondez avec n’importe quel statut `2xx` dans les dix secondes. Nous ne suivons pas les redirections ; un `3xx` est donc un échec.

En cas d’échec, une nouvelle tentative a lieu après 5 secondes, puis après 5 minutes, 30 minutes, 2 heures, 5 heures, 10 heures et encore 10 heures : huit tentatives sur environ 27 heures. Chaque tentative du même message conserve le même `webhook-id`. Enregistrez les identifiants déjà traités pour ignorer les doublons.

Une adresse est désactivée si elle répond `410 Gone` ou si les messages échouent pendant cinq jours consécutifs. Nous vous en informons par e-mail, avec la dernière réponse obtenue. Dans **Other apps**, cliquez sur **Turn back on** quand votre serveur est prêt.

## Gérer une adresse {#managing-an-address}

Chaque adresse dans **Other apps** affiche les fonctions suivantes à côté des événements qu’elle envoie :

- **Send test** envoie `webhook.test`. Son résultat apparaît dans le journal de livraison lorsque votre serveur répond.
- **Pause** suspend l’envoi. Aucun message ne s’accumule pour plus tard ; seuls les événements survenus après **Turn back on** seront envoyés.
- **Delivery log** affiche les derniers messages, du plus récent au plus ancien, avec leur résultat, leur durée et le nombre de tentatives. **Send again** renvoie un message avec le même `webhook-id`.
- **Remove** arrête tous les envois vers cette adresse.

### Afficher ou remplacer le secret {#replacing-the-secret}

**Show signing secret** fonctionne dans les dix minutes suivant une nouvelle connexion et demande le code de vérification en deux étapes si celle-ci est activée. **Replace secret** crée un nouveau secret. Pendant 24 heures, chaque message porte les deux signatures, la nouvelle en premier. Remplacez le secret sur votre serveur pendant ce délai pour éviter toute interruption.

## Nombre d’adresses autorisées {#how-many-you-can-have}

Free permet 3 adresses de webhook, Pro 20 et Team 40 par membre. Si vous atteignez la limite, supprimez une adresse ou choisissez une formule supérieure sur la page [Plans](https://vcpeai.aoneahsan.com/plans).

---
title: Verify a white-label license
sidebar_label: Verify a license
description: How anyone can check that a white-label copy of Video Controls Plus is licensed, by its key or by its domain, and the license file every deployment serves.
tags: [white-label, verify, license]
last_update:
  date: 2026-11-13
---

Anyone can check a license on the [verify page](https://vcpeai.aoneahsan.com/verify-license). Verification is run by our licensing service.

## By license key

Pick **License key**, paste the key and press **Check**. The page shows whether the license is active, and who it is licensed to, the domains it covers, its status and the date its updates run until. It never shows an email, a phone number or a price.

## By domain

Pick **Domain**, type the host, for example `videos.example.com`, and press **Check**. Our licensing service reads the license file that domain serves and checks the key in it.

| Answer | What it means |
|---|---|
| This domain serves a valid license. | The file is there and its key covers this domain. |
| This domain serves a license issued for another domain. | The key is real, but not for this domain. |
| This domain serves no license file. | There is no file at the address below. |
| We could not reach that domain. | The domain did not answer over HTTPS. |

## The license file

Every white-label deployment serves a file at:

```text
/.well-known/vcpeai-white-label-license.json
```

It names the product, the client, the domain and the license key, with a link to the verify page. A certificate PDF sits beside it at the same path ending in `.pdf`. We add both files when we deploy your copy, so you never write them yourself.

A copy that runs with a key that is revoked, or on a domain its license does not cover, shows a "This license is not active" page in place of the app. Nothing is deleted.

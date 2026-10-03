# Contributing to the Video Controls Plus docs

Thanks for helping improve the Video Controls Plus documentation. This is a public repository, and
contributions arrive as pull requests.

<a id="what-belongs-here"></a>
## 📌 What belongs here&nbsp;[#](#what-belongs-here)

This repository holds the documentation site only. Bugs and requests about the extension itself go
to the Video Controls Plus team through the [contact page](https://vcpeai.aoneahsan.com/contact).

Good contributions here:

- a correction to a page that describes the extension wrongly;
- a clearer explanation of a step a reader got stuck on;
- a fix for a broken link, a typo or a rendering problem;
- an accessibility or layout fix for the site.

<a id="how-to-contribute"></a>
## 🚀 How to contribute&nbsp;[#](#how-to-contribute)

1. Fork the repository and create a branch from `main`.
2. Make the change and run the checks below.
3. Open a pull request that says what changed and why. For a factual correction, say how you
   confirmed the behaviour (browser, extension version, the site you tested on).

A pull request needs a passing build before it is merged.

<a id="local-development"></a>
## 🧪 Local development&nbsp;[#](#local-development)

```bash
corepack enable        # use the pinned Yarn version
yarn install
yarn start             # local dev server on port 5912
yarn typecheck         # must pass
yarn build             # must pass with no warning; it is also the link checker
```

- **Yarn only.** Do not add `package-lock.json` or `pnpm-lock.yaml`.
- **No secrets.** Never commit an `.env` file, a key or a token. The build needs none.

<a id="writing-pages"></a>
## 📝 Writing pages&nbsp;[#](#writing-pages)

- Every page carries front matter with a `title` and a `description` of 155 characters or fewer.
  A page without them does not appear in search.
- A page that is not ready carries `draft: true`. It is left out of the production build and the
  sidebar, so never link to a draft from a published page: the build fails on the broken link.
- Add or move a page and update `sidebars.ts` in the same change.
- When a page moves, add a redirect. Never leave a dead URL.
- Link to other pages with relative file paths (`./speed-control.md`), so the build can check them.
- Use Docusaurus admonitions (`:::note`, `:::tip`, `:::warning`), and name the language on every
  code fence.
- Describe what the extension does today. Every statement about the product must match the shipped
  extension. Leave out comparisons, rankings and anything you cannot confirm.

<a id="commit-style"></a>
## 🧾 Commit style&nbsp;[#](#commit-style)

Use [Conventional Commits](https://www.conventionalcommits.org/), for example
`docs: clarify the install steps` or `fix: correct a broken link`.

<a id="support"></a>
## 💜 Support&nbsp;[#](#support)

To support the work, use
[aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=vcpeai-docs). Please do not add
other donation links to this repository.

<a id="code-of-conduct"></a>
## 🧭 Code of conduct&nbsp;[#](#code-of-conduct)

Be respectful and constructive. Report unacceptable behaviour through the
[contact page](https://vcpeai.aoneahsan.com/contact).

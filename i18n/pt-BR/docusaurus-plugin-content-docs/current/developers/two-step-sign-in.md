---
title: Verificação em duas etapas
description: Adicione um código de seis dígitos após o Google à sua conta, guarde dez códigos de recuperação, lembre um navegador por 7 dias e conecte a extensão.
last_update:
  date: 2026-11-21
---

# Verificação em duas etapas

**Depois de entrar com o Google, a verificação em duas etapas pede um código de seis dígitos de um aplicativo autenticador.** Mesmo alguém com acesso à sua senha Google não entra na sua conta do Video Controls Plus sem esse código. É opcional para usuários e obrigatória para a equipe. Ative em **Conta → [Segurança](https://vcpeai.aoneahsan.com/account/security)** no site. A extensão também segue essa proteção: veja [A extensão](#the-extension).

## Configurar {#setting-it-up}

Leva cerca de dois minutos. Tenha o celular e um lugar para guardar dez códigos de recuperação.

1. Abra **Segurança** e pressione **Configurar duas etapas**.
2. Leia o código QR com Google Authenticator, Microsoft Authenticator, 1Password, Authy ou outro aplicativo compatível. Se não conseguir, digite a chave de configuração como chave baseada em tempo.
3. Digite o código exibido para Video Controls Plus e pressione **Ativar duas etapas**. Ele muda a cada 30 segundos; use o atual.
4. Guarde os dez códigos de recuperação por **Copiar todos** ou **Baixar .txt** e pressione **Já salvei**.

## Códigos de recuperação {#recovery-codes}

Um código permite entrar sem o celular. Cada um funciona uma única vez e se parece com `k7m2p-x9qr4`; você pode digitar com ou sem hífen. Guardamos apenas uma versão embaralhada, então a configuração é a única ocasião em que você os vê.

**Segurança** mostra quantos restam e avisa quando sobram três. **Criar novos códigos** substitui o conjunto inteiro: os dez antigos deixam de funcionar imediatamente. Exige código do autenticador e entrada na conta nos últimos dez minutos.

## Entrar na conta {#signing-in}

Entre com Google e informe o código do autenticador. Após várias tentativas incorretas, aguarde dez minutos ou use um código de recuperação.

### Lembrar um navegador {#remembering-a-browser}

Após informar o código, você pode marcar **Lembrar este navegador por 7 dias**. Começa desmarcado; marque apenas em um navegador seu. A entrada dispensa o código durante sete dias, sem prorrogar o prazo a cada visita.

Um navegador lembrado ainda pede código para revelar chave de acesso ou segredo de webhook. Páginas da equipe pedem sempre. **Segurança** lista os navegadores lembrados e até quando dispensam o código. Use **Esquecer** ou **Esquecer todos os navegadores** para voltar a exigi-lo. Sair da conta também faz o navegador esquecê-lo.

## Se perder o celular {#losing-your-phone}

1. Na tela do código, escolha **Perdeu o celular?** e **Usar código de recuperação**.
2. Digite um dos códigos. Você entra nesta sessão, e as duas etapas continuam ativas. Enviamos email avisando do uso.
3. Pressione **Adicionar novo celular** imediatamente e leia o novo QR. Revelar chave ou segredo exige código de autenticador; faça isso antes de precisar deles.

Perdeu o celular e todos os códigos? Escreva do email da sua conta pela [página de contato](https://vcpeai.aoneahsan.com/contact). Confirmamos sua identidade por perguntas sobre sua própria biblioteca e então desligamos as duas etapas para você entrar com Google e configurá-las novamente. Enviamos email quando terminar. Nunca as desligamos mediante mensagem de outro endereço.

## Novo celular ou desligar a proteção {#a-new-phone-or-turning-it-off}

- **Novo celular:** informe um código do aparelho atual e leia o novo QR. Os códigos do celular antigo deixam de funcionar.
- **Desligar:** informe um código do autenticador e pressione **Desativar**. A entrada volta a exigir apenas Google; códigos de recuperação e navegadores lembrados são removidos.

Contas da equipe mantêm as duas etapas ativas.

## Entradas recentes {#recent-sign-ins}

**Segurança** lista cada entrada no site ou conexão da extensão, com o método: Google, Google e duas etapas, navegador lembrado, código de recuperação ou conexão da extensão. **Sair de todos os outros lugares** encerra as demais sessões e desconecta a extensão nesses navegadores até uma nova conexão.

## A extensão {#the-extension}

A extensão não tem senha nem entrada própria. Ela se conecta à conta do site: abre o site, você entra, compara o código curto e pressiona **Conectar este navegador** ([como conectar](/docs/account-and-sync#connect-the-extension-to-your-account)). Com duas etapas ativas, informe o código ou use um navegador lembrado antes de aprovar.

- **Sete dias.** A conexão da extensão permanece confiável por 7 dias desde a aprovação, nunca mais. Depois mostra **Conectar novamente**; repita o processo para continuar sincronizando. Velocidade e demais recursos sem conta continuam funcionando enquanto isso.
- **Ativação posterior.** Se você ligar as duas etapas depois de conectar a extensão, a conexão anterior não é confiável. Conecte-a novamente.
- **Remover navegador.** Remova-o em **A extensão** na página **Segurança** ou pela [API](./api.md#devices). A extensão nesse navegador sai da conta e mostra **Conectar novamente**.

O código de duas etapas nunca é digitado na extensão, apenas no site.

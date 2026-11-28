---
title: Quando o Video Controls Plus não funciona em um site
sidebar_label: Solução de problemas
description: O que verificar quando os controles não aparecem, uma tecla não responde, a conexão falha ou uma configuração não surte efeito.
---

Primeiro, veja no popup se o site está pausado e recarregue a página. Os demais casos abaixo mostram o que você vê, por que acontece e como resolver.

## Os controles não aparecem em um site

**Por quê:** o site está pausado, a extensão não está ativada ali ou o widget está oculto.

1. Abra o popup nesse site.
2. Se aparecer **Pausado**, clique em **Reativar**.
3. Se aparecer **Não ativada**, clique em **Ativar neste site**.
4. Recarregue a página.
5. Pressione `Esc` ou `Ctrl + Alt + H` caso o widget esteja oculto.

Se a página não tiver vídeo HTML5 padrão, a extensão não terá o que controlar. [Outros sites](/docs/platforms/other-sites) explica onde ela funciona.

## Uma letra ou um número não responde

**Por quê:** letras e números exigem `Ctrl + Alt`. Apenas `[`, `]`, `=`, `\\`, `'`, `,`, `.` e `Esc` funcionam sozinhos.

1. Pressione a tecla junto com `Ctrl + Alt`, por exemplo, `Ctrl + Alt + P`.
2. Se ainda não funcionar, abra as Configurações, entre em Atalhos de teclado e confira se o atalho e sua seção estão ativados.

A tabela completa está em [Atalhos padrão](/docs/keyboard-shortcuts/defaults).

## Repetição, áudio, filtros ou capturas indisponíveis

**Por quê:** esses recursos ficam disponíveis depois que você conecta a extensão à sua conta. O mesmo vale para o avanço automático. O atalho de favoritos, `Ctrl + Alt + O`, também funciona sem conta e salva localmente.

1. Abra as Configurações e a aba Conta e sincronização.
2. Pressione **Conectar à sua conta** e confirme no site.

O procedimento é igual no Chrome, Edge e Firefox. Veja [as etapas e os recursos da conexão](/docs/account-and-sync).

## A aba de conexão não abriu

**Por quê:** o navegador não abriu a aba ou você a fechou.

1. Volte à extensão. Ela mostra **Aguardando sua conexão...** e o código.
2. Pressione **Abrir a página novamente**.

## O código no site é diferente

**Por quê:** a página pertence a outra solicitação, e não àquela que este navegador está aguardando.

1. Pressione **Cancelar** na página.
2. Recomece na extensão com **Conectar à sua conta**.

Não pressione **Conectar este navegador** se os códigos forem diferentes.

## O tempo para conectar acabou

**Por quê:** o código vale por 10 minutos. Depois disso, o site mostra **Esta solicitação não é mais válida.** e a extensão informa que o prazo terminou.

1. Volte à extensão.
2. Pressione **Tentar novamente** e confirme no site em até 10 minutos.

## Muitas tentativas

**Por quê:** a extensão tentou conectar muitas vezes em pouco tempo.

1. Aguarde alguns minutos.
2. Pressione **Tentar novamente**.

## A conta está conectada, mas suas listas estão vazias

**Por quê:** talvez você tenha conectado outra conta Google, diferente da que usava antes da versão 16.0.0. Os dados antigos na nuvem foram migrados em **4 de outubro de 2026**; esperar por outra migração não preencherá uma conta vazia. O que foi salvo apenas no navegador continua lá.

Confira qual conta Google está conectada no site. Se for a mesma usada antes da versão 16.0.0 e as listas ainda estiverem vazias, [fale com a equipe](https://vcpeai.aoneahsan.com/contact). [Conta e sincronização](/docs/account-and-sync) descreve o que a conta guarda.

## No Firefox, um envio ou uso de IA pede sua permissão

**Por quê:** no Firefox, o conteúdo da página (uma imagem que você envia, uma transcrição salva na conta ou legendas usadas por IA) só é enviado depois que você permite “conteúdo do site”. O complemento pede essa permissão no primeiro uso.

1. Permita quando o Firefox perguntar.
2. Ou abra as permissões do complemento no Firefox, permita ali e tente novamente.

## A velocidade para em 4x

**Por quê:** o controle deslizante e as teclas `[` e `]` vão até 4x.

1. Abra o widget e digite a velocidade no campo personalizado. Ele aceita até 16x.
2. Ou abra a aba Geral das Configurações e use os campos **Velocidade personalizada (0.1x - 16x)**.

## Uma opção do Netflix ou LinkedIn não surtiu efeito

**Por quê:** as opções são aplicadas após recarregar a página.

1. Altere a opção nas Configurações.
2. Recarregue a página do site.

No Netflix, todos os recursos adicionais começam desativados. Veja [Netflix](/docs/platforms/netflix).

## Uma aba do YouTube, Netflix ou LinkedIn pede conexão

**Por quê:** essas abas exigem uma conta conectada. Os recursos do YouTube e LinkedIn ativados por padrão continuam funcionando sem conta; apenas a aba em que você os altera pede conexão.

1. Conecte-se na aba Conta e sincronização.
2. Abra a aba do site novamente.

## O widget ainda mostra o idioma anterior

**Por quê:** a página do vídeo já estava aberta quando você alterou o idioma da extensão.

Recarregue a página do vídeo. O widget passa a ler o idioma salvo nas Configurações. [Alterar o idioma](/docs/user-guide/display-and-widget) lista os idiomas disponíveis.

## Uma nova tecla foi recusada

**Por quê:** cada combinação pode pertencer a apenas um atalho.

1. Leia a mensagem: ela informa qual atalho já usa a tecla.
2. Siga o link para esse atalho.
3. Escolha outra tecla para ele ou para o atalho que você está alterando.

Veja [Alterar um atalho](/docs/keyboard-shortcuts/rebinding).

## Seus atalhos são diferentes em outro dispositivo

**Por quê:** o dispositivo recebe os atalhos na próxima vez que você abre as Configurações nele, enquanto está conectado à sua conta.

1. Conecte a extensão nesse dispositivo.
2. Abra as Configurações.

## Ainda precisa de ajuda

Escreva à equipe pela [página de contato](https://vcpeai.aoneahsan.com/contact). Informe o site, o navegador e a tecla.

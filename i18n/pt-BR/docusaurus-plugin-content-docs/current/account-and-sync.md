---
title: Conta, sincronização, exportação e exclusão
sidebar_label: Conta e sincronização
description: Como conectar o Video Controls Plus à sua conta no site, sincronizar configurações, contratar o Pro e exportar ou excluir seus dados.
---

Você não entra na conta dentro da extensão. Crie sua conta em [vcpeai.aoneahsan.com](https://vcpeai.aoneahsan.com), entre com o Google e conecte a extensão. O procedimento é o mesmo no Chrome, Edge e Firefox.

Se você tinha uma conta antes da versão 16.0.0, conecte-se com a mesma conta Google. Seus dados antigos na nuvem foram migrados para o sistema atual em **4 de outubro de 2026**. O que foi salvo apenas no navegador continua lá.

## Conectar a extensão à sua conta {#connect-the-extension-to-your-account}

1. Pressione **Conectar à sua conta** no popup, na etapa de conta da página de boas-vindas ou na aba **Conta e sincronização** das Configurações.
2. Uma aba abre em vcpeai.aoneahsan.com. Se o site pedir que você entre, pressione **Continuar com o Google**.
3. Confira se o site e a extensão mostram o mesmo código. Se forem diferentes, pressione **Cancelar**.
4. Pressione **Conectar este navegador**.

A extensão mostra a conexão em poucos segundos enquanto o popup ou as Configurações permanecem abertos; caso contrário, em cerca de 30 segundos.

O código vale por 10 minutos. Se você fechou a aba, pressione **Abrir a página novamente** na extensão. Veja o que fazer em caso de falha em [Solução de problemas](/docs/troubleshooting).

## O que a conexão oferece

| Exige uma conta conectada hoje | Página |
|---|---|
| Repetição A-B | [Repetição A-B](/docs/user-guide/ab-loop) |
| Picture-in-Picture | [Picture-in-Picture](/docs/user-guide/picture-in-picture) |
| Amplificação de áudio | [Amplificação de áudio](/docs/user-guide/audio-boost) |
| Filtros de vídeo | [Filtros de vídeo](/docs/user-guide/video-filters) |
| Capturas de tela | [Capturas de tela](/docs/user-guide/screenshots) |
| Avanço automático | [Avanço automático](/docs/user-guide/auto-skip) |
| Notas com horário na conta e favoritos salvos com a conta conectada | [Notas e favoritos](/docs/user-guide/notes-and-bookmarks) |
| Sincronização na nuvem | Esta página |
| Abas Novos recursos, YouTube, Netflix e LinkedIn nas Configurações | [YouTube](/docs/platforms/youtube), [Netflix](/docs/platforms/netflix), [LinkedIn](/docs/platforms/linkedin) |
| Franquia compartilhada de IA | [Recursos de IA](/docs/ai-features) |

Sem conta, você tem velocidade, predefinições, avanço quadro a quadro, compartilhamento de horário, modo cinema, favoritos salvos neste navegador e o widget.

Os recursos específicos do YouTube e LinkedIn ativados por padrão funcionam sem conta. Apenas a aba das Configurações onde você os altera exige conexão.

## O que uma conta conectada registra

Com a conexão, a extensão guarda os dados e as configurações da sua conta. Enquanto a opção **Análise de uso** estiver ativa, também registra os sites, recursos e velocidades usados. A lista completa está em [Privacidade e permissões](/docs/privacy-and-permissions).

## Sincronização

1. Conecte a extensão à sua conta.
2. Abra a aba Conta e sincronização nas Configurações e ative **Ativar sincronização na nuvem**.

As configurações são enviadas ao ativar a opção. Velocidades, atalhos e configurações por site são sincronizados. A aba mostra a hora da última sincronização. Favoritos salvos enquanto a conta está conectada são sincronizados separadamente dessa opção; favoritos criados sem conexão permanecem neste navegador.

| Botão | O que faz |
|---|---|
| Enviar para a nuvem | Salva as configurações deste dispositivo na sua conta |
| Carregar da nuvem | Substitui as configurações deste dispositivo pela cópia da conta |

As configurações mais recentes prevalecem: quando dois navegadores salvam na mesma conta, ela mantém a cópia mais nova. As alterações locais não enviadas são substituídas ao pressionar **Carregar da nuvem**.

Outro dispositivo recebe seus atalhos na próxima vez que você abrir as Configurações nele. A lista de sites pausados não é sincronizada; ela fica no dispositivo em que você os pausou.

## Desconectar

**Sair**, no popup ou na aba Conta e sincronização, desconecta apenas este navegador. A conta e os demais navegadores conectados permanecem. Para conectar este navegador novamente, pressione **Conectar à sua conta**.

## Como excluir meus dados?

Abra as Configurações, entre na aba **Privacidade e dados** e clique em **Excluir todos os dados** no cartão **Seus dados**. A ação exclui a própria conta, os arquivos nela armazenados e tudo o que foi salvo nela. **Não é possível desfazê-la.** O botão exige uma conta conectada porque remove o que está armazenado nessa conta.

**Exportar meus dados** fica no mesmo cartão e baixa seus dados em um arquivo JSON. Também exige uma conta conectada.

Você pode excluir sua conta pela [página de exclusão de dados](https://vcpeai.aoneahsan.com/data-deletion) do site depois de entrar nela.

## Exportar e importar configurações

Abra a aba **Gerenciamento de dados** nas Configurações.

- **Exportar configurações** baixa um arquivo JSON. Você escolhe se deseja incluir a memória de vídeos e as predefinições de filtros.
- **Importar configurações** restaura um arquivo exportado: **Substituir tudo** troca as configurações atuais; **Mesclar** mantém seus valores atuais quando não houver um valor no arquivo.

## Verificação em duas etapas e outros aplicativos

No site, **Conta → Segurança** acrescenta um código do seu celular após o Google. Com essa opção ativa, uma extensão conectada é confiável por 7 dias; depois, pede uma nova conexão. Remover um navegador nessa página desconecta a extensão nele. Veja [Verificação em duas etapas](/docs/developers/two-step-sign-in).

**Conta → Outros aplicativos** permite que suas ferramentas acessem a biblioteca: chaves de acesso para scripts, Claude ou ChatGPT e webhooks para seu servidor. Veja [Video Controls Plus para desenvolvedores](/docs/developers).

## Planos e pagamento

Todos os recursos funcionam no plano Free. Pro aumenta o número diário de usos de IA e o nível de IA para uma pessoa. Team faz o mesmo para cada integrante. Os preços estão em [Planos](https://vcpeai.aoneahsan.com/plans).

Para contratar Pro, entre na sua conta no site, abra Planos e pressione **Mudar para Pro**, no período mensal ou anual. Você paga na página de checkout da Polar. O Pro começa na sua conta assim que a Polar confirma o pagamento.

A Polar envia por email um link para o portal do cliente, onde você pode cancelar, trocar o cartão e baixar faturas. Cancele quando quiser. Seu plano continua até o fim do período pago.

Para configurar Team com a equipe, pressione **Escolher Team** em Planos. Isso abre a [página de contato](https://vcpeai.aoneahsan.com/contact).

Os planos são contratados apenas no site, nunca dentro da extensão ou do aplicativo Android.

Para outras dúvidas sobre sua conta, use a [página de contato](https://vcpeai.aoneahsan.com/contact).

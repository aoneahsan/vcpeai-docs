---
title: Privacidade e permissões
sidebar_label: Privacidade e permissões
description: O que o Video Controls Plus armazena e registra com ou sem conta, onde ficam os dados e para que serve cada permissão do navegador.
---

O Video Controls Plus guarda suas configurações no navegador. Enquanto a opção **Análise de uso** estiver ativada, como vem por padrão, eventos de uso são enviados ao servidor da equipe com ou sem conta; seu endereço IP é enviado ao ipapi.co para uma consulta de localização no máximo uma vez por dia. Com uma conta conectada, a extensão também armazena dados da conta e, se a sincronização estiver ativada, suas configurações.

Desative essa opção para interromper todo esse registro de uso.

A extensão não registra os vídeos que você assiste, seus títulos ou endereços, a menos que você ative **Histórico de vídeos**, desativado por padrão. Itens salvos são a outra exceção. Uma conta conectada guarda título e endereço de um vídeo apenas junto a algo que você salva nela ou inicia a partir dele: nota, favorito, registro no diário, item para assistir depois, captura de tela enviada, detalhes extraídos, transcrição, cartão de estudo criado de um vídeo, vídeo de um caminho de aprendizado, item de coleção ou sessão para assistir em grupo.

Esta página explica em linguagem direta a [Política de privacidade](https://vcpeai.aoneahsan.com/privacy). A política é o texto jurídico e prevalece se houver divergência.

## O que fica no navegador

Suas configurações, atalhos, velocidade lembrada para cada vídeo, posição de reprodução, predefinições de filtros e ajustes de áudio ficam no navegador. Eles só vão para a conta quando você conecta a extensão e ativa a sincronização.

O download de áudio é processado no dispositivo. Uma captura de tela permanece nele, a menos que você escolha uma ação de nuvem para enviar a imagem.

Os limites de tempo assistido contam minutos apenas neste dispositivo; o PIN é armazenado como hash e nunca sincronizado. As contagens do cronômetro de estudo e os capítulos gerados das legendas ficam neste navegador. GIFs, clipes, vídeos acelerados e folhas de contato são feitos no dispositivo e salvos como downloads.

## O que é registrado

| Dados | Quando | Conteúdo |
|---|---|---|
| Eventos de uso | Enquanto Análise de uso estiver ativa, com ou sem conta | Nome do evento, domínio do site, navegador, sistema operacional, versão da extensão e identificador da sessão; com a extensão conectada, também sua conta |
| Consulta de localização | Enquanto Análise de uso estiver ativa, no máximo uma vez por dia | Seu IP é enviado ao ipapi.co. Com uma conta conectada, país, cidade e fuso horário retornados são salvos no perfil; a região fica no navegador. O endereço IP não é armazenado. |
| Sites, recursos e velocidades | Enquanto Análise de uso estiver ativa, com conta conectada | Os sites, recursos e velocidades que você usou |
| Conta | Com conta conectada | Endereço de email, nome de exibição, foto de perfil e identificador da conta Google |
| Este navegador | Com conta conectada | Nome do dispositivo, navegador, sistema operacional, versão da extensão e data da última atividade |
| Configurações | Com conta conectada e sincronização ativa | Configurações sincronizadas com a conta |
| Itens que você salva na conta | Com conta conectada, apenas quando você salva cada item | Notas, favoritos, itens para assistir depois, capturas enviadas, detalhes de vídeo extraídos pelo menu de contexto e transcrições salvas, cada um com título e endereço do vídeo. Um favorito também guarda o horário; um registro no diário é um favorito com humor e texto escrito por você. Cartões de estudo criados de vídeos (um momento de questionário ou uma palavra com a linha de legenda como exemplo), vídeos de caminhos de aprendizado e itens de coleções são guardados da mesma forma. |
| Histórico de vídeos | Somente depois que você ativa **Histórico de vídeos** na aba **Privacidade e dados** das Configurações e reproduz um vídeo com a conta conectada. Vem desativado para cada conta conectada em cada navegador. | Para cada sessão de pelo menos 15 segundos: título e endereço do vídeo, tempo assistido, última posição, partes reproduzidas, data, velocidade e recursos usados. Desativar a opção interrompe novas sessões. As anteriores permanecem na conta até você excluí-las no site ou excluir a conta. |
| Sessões para assistir em grupo | Ao criar ou entrar em uma sessão | Endereço e título do vídeo, código da sessão, participantes e horários de entrada. Durante a sessão, reproduzir, pausar, buscar outro ponto e mudar a velocidade são transmitidos aos participantes pelo Supabase Realtime e não são armazenados. |
| Relatórios de erros | Enquanto Rastreamento de erros de terceiros estiver ativo | Relatórios de falha enviados ao Sentry |
| Texto de IA | Apenas quando você inicia um recurso de IA | Legendas do vídeo ou texto que está redigindo. Um registro de cada uso da Franquia compartilhada é guardado por 13 meses, sem o texto. Veja [Recursos de IA](/docs/ai-features). |
| Gravações Speak | Apenas quando você grava com Speak | Sua voz, por até 2 minutos, com transcrições e nota proposta. Os três são excluídos em até 24 horas ou imediatamente quando você pressiona **Descartar** ([Política de privacidade](https://vcpeai.aoneahsan.com/privacy), seção 1.8). |

Nos eventos de uso, um site é apenas o domínio, por exemplo, youtube.com. Endereços completos, caminhos de páginas e títulos não entram no evento.

## Opção Análise de uso

Abra a aba **Privacidade e dados** das Configurações e encontre **Análise de uso**. Ela funciona com e sem conta.

Ao desativá-la, três coisas param:

1. Os eventos de uso deixam de ser enviados ao servidor da equipe.
2. A conta conectada deixa de registrar quais sites, recursos e velocidades você usa.
3. Seu IP deixa de ser enviado ao ipapi.co.

Se a opção estiver desativada neste navegador ou na sua conta no momento da conexão, ela ficará desativada em ambos.

## Outras opções de privacidade

Estão na mesma aba.

| Opção | Padrão | O que controla |
|---|---|---|
| Rastreamento de erros de terceiros | Ativada | Relatórios de falha para o Sentry |
| Comunicações de marketing | Desativada | Apenas notificações ocasionais do navegador sobre novos recursos ou outro produto da equipe. Email é separado: notícias do produto chegam a titulares de conta, sempre com link para cancelar a inscrição em um clique. |
| Sincronização de configurações | Ativada | Guarda suas configurações na conta |

O rastreamento de erros é separado da análise de uso: desligar um não desliga o outro. Em **Seus dados**, na mesma aba, você pode exportar ou excluir dados. [Conta e sincronização](/docs/account-and-sync) explica como.

## Onde seus dados ficam

| Serviço | O que guarda ou recebe |
|---|---|
| Supabase | Banco de dados e entrada na conta; sincronização em tempo real de uma sessão para assistir em grupo |
| FilesHub | Capturas de tela armazenadas, gravações Speak por até 24 horas e emails enviados pela equipe |
| Sentry | Relatórios de falha enquanto Rastreamento de erros de terceiros estiver ativo |
| ipapi.co | Seu IP para a consulta de localização enquanto Análise de uso estiver ativa |
| Anthropic, OpenAI e Groq | Texto de um uso de IA iniciado por você e áudio ou transcrições de Speak. [Recursos de IA](/docs/ai-features) descreve quem recebe o quê. |

Cinco recursos entram em contato com serviços próprios apenas enquanto você os usa: SponsorBlock (`sponsor.ajay.app`), tradução ou legendas duplas no Netflix (`api.mymemory.translated.net`), avaliações do Netflix com sua própria chave (`www.omdbapi.com`), resumo de IA que precisa buscar legendas do vídeo (`video.google.com/timedtext`) e **Consultar** em **Salvar uma palavra** no widget (`en.wiktionary.org`), que recebe apenas a palavra digitada. A seção 5.9 da política lista mais um serviço para um recurso ainda não coberto nesta documentação.

## O que não é coletado

A política enumera como não coletados: os vídeos que você assiste (salvo se ativar Histórico de vídeos); conteúdo do vídeo ou arquivos de mídia, exceto uma captura que você escolhe enviar; sua navegação em páginas nas quais a extensão não faz nada; senhas; informações de pagamento; e conteúdo das páginas visitadas, exceto o texto que você mesmo envia a um recurso de IA e o que os cinco recursos acima enviam aos respectivos serviços.

Seus dados não são vendidos.

## Microfone

Speak é o único recurso que envia sua voz. A permissão para o microfone é pedida na primeira vez que você o usa.

| Onde | O que aparece |
|---|---|
| Extensão | **Speak a note** mostra “Permita o microfone uma vez”. Pressione **Abrir a página do microfone**. Na aba “Permitir o microfone para Speak”, pressione **Permitir microfone** e depois Permitir na caixa do navegador. Você faz isso uma vez. |
| Aplicativo Android | O aplicativo solicita o microfone quando você começa a primeira gravação em Speak. |
| Complemento Firefox | O Firefox também pede sua permissão opcional para “Comunicações pessoais” antes de gravar ou enviar qualquer coisa. |

O microfone fica ativo apenas durante a gravação. Se você bloquear a permissão, a página mostra onde reativá-la. Desative Speak em Configurações → **Recursos de IA** para a extensão deixar de oferecê-lo.

## Para que serve cada permissão

A extensão pede sete permissões e acesso a sites; no Chrome e Edge, pede ainda uma oitava, `offscreen`. Não pede `identity`, porque a entrada na conta acontece no site. O microfone não é solicitado durante a instalação.

| Permissão | Por que é solicitada |
|---|---|
| `storage` | Salva configurações, atalhos, memória de velocidade, predefinições de filtros e tema no navegador |
| `activeTab` | Permite ao popup ler e modificar o vídeo na aba atual quando você o abre |
| `contextMenus` | Acrescenta itens ao menu do botão direito |
| `alarms` | Cronômetro de sono, envio de lotes pendentes de sincronização e uso, verificação de conexão pendente, atualização de opções remotas, término de pausas por site e uma verificação diária de aviso |
| `notifications` | Mostra mudanças de velocidade, estado da repetição e avisos do cronômetro quando o widget está oculto ou o modo de exibição é Apenas notificações |
| `clipboardWrite` | Copia links dos itens “Copiar URL da página” e “Copiar URL com horário” no menu de contexto; a área de transferência nunca é lida |
| `scripting` | Leva os controles a vídeos incorporados em outra página, apenas em um quadro que contém vídeo |
| `offscreen` (Chrome e Edge) | Permite a Speak gravar numa página oculta da extensão e enviar dali, mantendo a gravação durante o envio. O Firefox grava em sua página de segundo plano e dispensa essa permissão. |
| Acesso a todos os sites | Encontra e controla vídeos em qualquer site aberto |

O acesso a todos os sites é a permissão mais ampla, necessária porque um vídeo pode aparecer em qualquer site. Quando um site está [pausado](/docs/getting-started/pause-per-site), a extensão não atua nele.

## No Firefox

O Firefox pede três permissões opcionais de dados. Cada uma controla o que pode ser enviado.

| Permissão do Firefox | O que controla |
|---|---|
| Dados técnicos e de interação | Eventos de uso só são enviados com sua permissão. A opção Análise de uso a solicita. |
| Conteúdo do site | Conteúdo de página (captura enviada, transcrição salva na conta, legendas de um uso de IA ou palavra salva com a linha de legenda) só é enviado com sua permissão. O complemento a pede no primeiro uso. |
| Comunicações pessoais | A gravação Speak e suas transcrições só são enviadas com sua permissão. O complemento a pede no primeiro uso de Speak. |

## Chaves, assistentes e webhooks que você conecta

Nada de fora acessa sua biblioteca até você configurar isso em **Conta → Outros aplicativos** no site. Uma chave de acesso, um assistente como Claude ou ChatGPT, ou um endereço de webhook acessa apenas as partes que você marca. Nenhum deles acessa sua entrada na conta, pagamentos, notas de voz, histórico de IA ou análise de uso. Uma mensagem de webhook contém o identificador do item, o vídeo e o horário; só inclui o que você escreveu se marcar **Incluir o que foi escrito** para aquele endereço. O texto de uma transcrição nunca é enviado por webhook. Veja alcance e revogação em [Video Controls Plus para desenvolvedores](/docs/developers).

## Outros aplicativos da mesma equipe

Uma aba das Configurações lista outros aplicativos da equipe. A lista vem com a extensão; nada é baixado para mostrá-la. Anúncios ao lado dela são lidos do servidor da equipe. A extensão não contém rede nem SDK de anúncios.

## Textos jurídicos e contato

- [Política de privacidade](https://vcpeai.aoneahsan.com/privacy)
- [Termos](https://vcpeai.aoneahsan.com/terms)
- [Exclusão de dados](https://vcpeai.aoneahsan.com/data-deletion)
- [Contato com a equipe](https://vcpeai.aoneahsan.com/contact)

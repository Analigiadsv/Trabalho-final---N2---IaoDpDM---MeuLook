# MeuLook

Aplicação Web responsiva e utilizável offline para organizar o guarda-roupa e receber sugestões de looks por ocasião e clima.
Trabalho N2 — Introdução ao Desenvolvimento para Dispositivos Móveis (Centro Universitário Afya Ji-Paraná). Professor: Romário Vitorino Ferreira.

## Integrantes e responsabilidades

| Integrante | GitHub | Responsabilidade |
|---|---|---|
| Ana Lígia de Souza Vale | @Analigiadsv | `index.html`, `js/navegacao.js`, README |
| Bruna Michelly Dias Martins | @b-diaxs | `css/style.css`, `js/validacao.js`, `js/formulario.js` |
| Camila Brozeguine Dernei | @CamilaBrozeguine | `js/estado.js`, `js/armazenamento.js`, `js/interface.js` |
| Fernanda Santana Leandro | @fernandasl1010-jpg | `js/app.js`, `js/looks.js`, `data/dados.json`, `service-worker.js`, testes |

## Problema e objetivo

Muitas pessoas têm roupas sobrando, mas não sabem o que possuem nem como combiná-las, o que gera perda de tempo e repetição de peças.
**Objetivo:** permitir cadastrar peças e sugerir looks com base em regras de combinação (cores, estação e ocasião), inclusive sem conexão.
**Público:** estudantes e jovens adultos.

## Funcionalidades

- Cadastro de peças (nome, categoria, cor, estação, ocasião) com validação e mensagens de erro e sucesso
- Listagem com filtro por categoria, exclusão com confirmação e alteração de situação (disponível/na lavagem)
- Sugestão de looks por pontuação, com opção de salvar e compartilhar
- Categorias, cores e regras carregadas de `data/dados.json` via `fetch`
- Dados no `localStorage` (recuperados após atualizar a página)
- Recurso do dispositivo: detecção de conexão (online/offline) e compartilhamento (Web Share API, com cópia para a área de transferência ou texto manual como alternativas)
- Funcionamento offline com Service Worker e Cache API (cache versionado)

## Tecnologias

HTML5, CSS3, JavaScript (módulos ES), localStorage, fetch, Web Share API, Clipboard API, Service Worker, Cache API.

## Estrutura de pastas

```
MeuLook/
├── assets/imagens/
├── css/style.css
├── data/dados.json
├── docs/evidencias/
├── docs/roteiro-testes.md
├── js/app.js
├── js/navegacao.js
├── js/estado.js
├── js/armazenamento.js
├── js/interface.js
├── js/validacao.js
├── js/formulario.js
├── js/looks.js
├── index.html
├── service-worker.js
└── README.md
```

## Como executar

1. Clone o repositório: `git clone https://github.com/Analigiadsv/Trabalho-final---N2---IaoDpDM---MeuLook.git`
2. Abra a pasta no VS Code.
3. Inicie com a extensão **Live Server** (botão direito em `index.html` → *Open with Live Server*). O Service Worker exige `localhost` ou HTTPS; abrir o arquivo diretamente (`file://`) não funciona.
4. **Primeiro carregamento online:** abra a página com internet para que o Service Worker armazene os arquivos em cache.
5. Para testar offline: DevTools (F12) → *Network* → *Offline* (ou desligue a rede) e recarregue.

Navegador utilizado nos testes: Google Chrome (versão atual).

## Roteiro de testes

Veja `docs/roteiro-testes.md`. As capturas ficam em `docs/evidencias/`.

## Limitações conhecidas

- Os dados ficam apenas no navegador/dispositivo (sem sincronização entre aparelhos).
- A Web Share API depende do navegador; sem ela, o app copia o texto ou o exibe para cópia manual.
- Ao alterar qualquer arquivo em cache, é preciso aumentar `VERSAO` em `service-worker.js`.
- Sem conexão no primeiro acesso, o app não consegue carregar `dados.json`.

## Cuidados éticos e legais

- Dados fictícios, cadastrados pelo usuário e guardados somente no `localStorage`; nada é enviado a servidores.
- Não são coletados senhas, documentos, endereços, dados financeiros ou médicos, localização, dados de menores ou informações sigilosas.
- Sem imagens de pessoas: as peças usam emojis Unicode. Nenhum ícone ou imagem externa foi utilizado.
- Nenhuma chave de API, token ou credencial no repositório.
- Projeto de finalidade exclusivamente acadêmica.

## Links

- Relatório: _https://1drv.ms/w/c/70ff6192f9510b20/IQAkuRUS-KNQQLrCFUYo1ULYAT-hwFP8aFFQHHONA4Ezu2k?e=HnmyIg_
- Vídeo: _link(ainda vai inserir)_

# MeuLook

Guarda-roupa virtual que permite cadastrar peças de roupa e receber sugestões de looks por regras de combinação.

> Projeto acadêmico (Trabalho N2) da disciplina **Introdução ao Desenvolvimento para Dispositivos Móveis** - Centro Universitário Afya Ji-Paraná. Professor: Romário Vitorino Ferreira. Finalidade exclusivamente acadêmica; os dados são fictícios.

## Integrantes e divisão preliminar

| Integrante              | GitHub       | Responsabilidade                               |
| ----------------------- | ------------ | ---------------------------------------------- |

| Ana Lígia de Souza Vale | @Analigiadsv | Estrutura HTML, navegação entre telas e README |

| Camila Brozeguine Dernei | @CamilaBrozeguine | Formulário, validação e mensagens de feedback

| Bruna Michelly Dias Martins | @b-diaxs | Estado, localStorage, listagem, filtro e exclusão

| Fernanda Santana Leandro | @fernandasl1010-jpg | fetch do JSON, regras de sugestão de looks, Service Worker e testes

## Problema

Muitas pessoas têm roupas de sobra, mas não sabem o que possuem nem como combiná-las. Isso gera perda de tempo ao se vestir, repetição das mesmas peças e esquecimento de roupas que poderiam ser usadas.

## Objetivo

Desenvolver uma aplicação Web responsiva e utilizável offline para cadastrar peças de roupa e sugerir looks com base em regras de combinação.

## Funcionalidades previstas

- Cadastro de peças (nome, categoria, cor, estação, ocasião) com validação
- Listagem com filtro por categoria, exclusão com confirmação e alteração de situação (disponível/na lavagem)
- Sugestão de looks por regras de pontuação, conforme ocasião e clima
- Carregamento de categorias, cores e regras a partir de JSON (`fetch`)
- Persistência no `localStorage`
- Funcionamento offline (Service Worker + Cache API) e indicador de conexão
- Recurso do navegador: detecção de conexão e compartilhamento do look (com cópia para a área de transferência como alternativa)

## Tecnologias

HTML, CSS e JavaScript puro.

## Estrutura de pastas (planejada)

```
meulook/
├── css/style.css
├── data/dados.json
├── js/ (app, navegacao, estado, armazenamento, interface, validacao, looks)
├── docs/evidencias/
├── index.html
├── service-worker.js
└── README.md
```

## Como executar

1. Clone o repositório e abra a pasta no VS Code.
2. Inicie com a extensão Live Server (ou outro servidor local).
3. Faça o primeiro carregamento com internet.

## Cuidados éticos e legais

Dados fictícios; sem senhas, documentos, dados pessoais ou chaves no repositório; sem fotos de pessoas; ícones e imagens externos somente com licença compatível, citados aqui; finalidade exclusivamente acadêmica.

## Relatório e vídeo

[links serão adicionados na entrega final]

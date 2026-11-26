# Roteiro de testes — MeuLook

Use dados fictícios. Registre capturas em `docs/evidencias/` e preencha a coluna "Resultado observado".

| Nº | O que testar | Passos / entrada | Resultado esperado | Resultado observado | Correção |
|---|---|---|---|---|---|
| 1 | Tela inicial | Abrir a página | Início visível, resumo 0/0, indicador Online | | |
| 2 | Navegação | Clicar em cada item do menu | Só a tela da rota aparece; URL (#/rota) e menu ativo sincronizados | | |
| 3 | Botão voltar | Navegar e usar "voltar" do navegador | Tela acompanha a URL | | |
| 4 | Validação: vazio | Salvar sem preencher | Mensagens de erro em nome, categoria e cor; foco no 1º campo | | |
| 5 | Validação: nome inválido | Nome `<b>` ou 1 caractere | Mensagem de erro; dados preservados | | |
| 6 | Cadastro | Nome "Camiseta branca", Camiseta, Branco | Mensagem de sucesso; formulário limpo; contador sobe | | |
| 7 | Listagem | Abrir Guarda-roupa | Peça aparece com situação "Disponível" | | |
| 8 | Filtro | Escolher categoria | Lista mostra só a categoria escolhida | | |
| 9 | Alterar situação | "Marcar na lavagem" | Selo muda para "Na lavagem" | | |
| 10 | Exclusão | "Excluir" → Cancelar / OK | Cancelar mantém; OK remove | | |
| 11 | Persistência | Atualizar a página (F5) | Peças e looks continuam; DevTools → Application → Local Storage | | |
| 12 | localStorage corrompido | Alterar `meulook:pecas` para `abc` e recarregar | App abre sem erro, lista vazia | | |
| 13 | Sugerir look | Cadastrar camiseta, calça, tênis; escolher ocasião e clima | Até 3 opções com pontos | | |
| 14 | Sem peças suficientes | Sugerir sem peças | Mensagem orientando a cadastrar peças | | |
| 15 | Salvar look | "Salvar look" | Look aparece em "Looks salvos"; contador sobe | | |
| 16 | Compartilhar | "Compartilhar" | Web Share, ou texto copiado, ou texto manual | | |
| 17 | fetch com falha | Renomear `dados.json` temporariamente | Mensagem de erro clara; app não quebra | | |
| 18 | Service Worker | DevTools → Application → Service Workers | Status "activated" | | |
| 19 | Cache Storage | Application → Cache Storage | Cache `meulook-v1` com os arquivos | | |
| 20 | Offline | Marcar *Offline* e recarregar | App abre; indicador "Offline"; cadastro funciona | | |
| 21 | Atualização de versão | Mudar `VERSAO` para v2 e recarregar | Cache antigo removido | | |
| 22 | Responsividade | Modo dispositivo (Ctrl+Shift+M): 360 px e desktop | Layout legível, sem rolagem horizontal | | |
| 23 | Acessibilidade | Navegar só com Tab | Foco visível; todos os controles alcançáveis | | |

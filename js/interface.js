// Renderização da interface (listagem, resumo, looks, indicador e mensagens).
const $ = (seletor) => document.querySelector(seletor);

function el(tag, props = {}, ...filhos) {
  const no = document.createElement(tag);
  for (const [chave, valor] of Object.entries(props)) {
    if (chave === "class") no.className = valor;
    else if (chave.startsWith("on")) no.addEventListener(chave.slice(2), valor);
    else no.setAttribute(chave, valor);
  }
  filhos.flat().filter((f) => f !== null && f !== undefined).forEach((f) => no.append(f));
  return no;
}

const nomeDe = (dados, lista, id) => dados?.[lista]?.find((i) => i.id === id)?.nome ?? id;
const emojiDe = (dados, categoria) => dados?.categorias?.find((c) => c.id === categoria)?.emoji ?? "👕";

export function mostrarMensagem(seletor, texto, tipo = "info") {
  const no = $(seletor);
  no.textContent = texto;
  no.className = `msg ${tipo}`;
  no.hidden = !texto;
}

export function atualizarIndicador(online) {
  const no = $("#indicador-conexao");
  no.textContent = online ? "🟢 Online" : "🔴 Offline";
  no.classList.toggle("online", online);
  no.classList.toggle("offline", !online);
}

function preencher(select, itens, textoVazio) {
  select.replaceChildren();
  if (textoVazio !== undefined) select.append(el("option", { value: "" }, textoVazio));
  itens.forEach((i) => select.append(el("option", { value: i.id }, i.emoji ? `${i.emoji} ${i.nome}` : i.nome)));
}

export function preencherOpcoes(dados) {
  preencher($("#categoria"), dados.categorias, "Selecione…");
  preencher($("#cor"), dados.cores, "Selecione…");
  preencher($("#estacao"), dados.estacoes, "Todas");
  preencher($("#ocasiao"), dados.ocasioes, "Qualquer");
  preencher($("#filtro-categoria"), dados.categorias, "Todas as categorias");
  preencher($("#look-ocasiao"), dados.ocasioes, "Selecione…");
  preencher($("#look-clima"), dados.climas, "Selecione…");
}

export function renderResumo(estado) {
  $("#total-pecas").textContent = estado.pecas.length;
  $("#total-looks").textContent = estado.looks.length;
}

export function renderLista(estado, { aoExcluir, aoAlternar }) {
  const ul = $("#lista-pecas");
  const pecas = estado.pecas.filter((p) => !estado.filtro || estado.filtro === "todas" || p.categoria === estado.filtro);
  ul.replaceChildren();
  if (pecas.length === 0) {
    ul.append(el("li", { class: "vazio" }, estado.pecas.length === 0
      ? "Nenhuma peça cadastrada ainda. Use a aba Cadastrar."
      : "Nenhuma peça nessa categoria."));
    return;
  }
  const d = estado.dados;
  pecas.forEach((p) => {
    const lavagem = p.situacao === "lavagem";
    ul.append(el("li", { class: "item" },
      el("div", { class: "item-info" },
        el("strong", {}, `${emojiDe(d, p.categoria)} ${p.nome}`),
        el("small", {}, `${nomeDe(d, "categorias", p.categoria)} • ${nomeDe(d, "cores", p.cor)} • ${nomeDe(d, "estacoes", p.estacao)} • ${nomeDe(d, "ocasioes", p.ocasiao)}`),
        el("span", { class: `selo ${lavagem ? "lavagem" : "disponivel"}` }, lavagem ? "Na lavagem" : "Disponível")),
      el("div", { class: "item-acoes" },
        el("button", { type: "button", class: "botao-sec", onclick: () => aoAlternar(p.id) }, lavagem ? "Marcar disponível" : "Marcar na lavagem"),
        el("button", { type: "button", class: "botao-perigo", "aria-label": `Excluir ${p.nome}`, onclick: () => aoExcluir(p) }, "Excluir"))));
  });
}

export function renderLooksSugeridos(looks, { aoSalvar, aoCompartilhar }) {
  const ul = $("#resultado-looks");
  ul.replaceChildren();
  looks.forEach((look, i) => {
    ul.append(el("li", { class: "item" },
      el("div", { class: "item-info" },
        el("strong", {}, `Opção ${i + 1} (${look.pontos} pontos)`),
        el("small", {}, look.texto)),
      el("div", { class: "item-acoes" },
        el("button", { type: "button", class: "botao-sec", onclick: () => aoSalvar(look) }, "Salvar look"),
        el("button", { type: "button", class: "botao-sec", onclick: () => aoCompartilhar(look.texto) }, "Compartilhar"))));
  });
}

export function renderLooksSalvos(looks, { aoCompartilhar, aoRemover }) {
  const ul = $("#looks-salvos");
  ul.replaceChildren();
  if (looks.length === 0) { ul.append(el("li", { class: "vazio" }, "Nenhum look salvo.")); return; }
  looks.forEach((look) => {
    ul.append(el("li", { class: "item" },
      el("div", { class: "item-info" }, el("small", {}, look.texto)),
      el("div", { class: "item-acoes" },
        el("button", { type: "button", class: "botao-sec", onclick: () => aoCompartilhar(look.texto) }, "Compartilhar"),
        el("button", { type: "button", class: "botao-perigo", onclick: () => aoRemover(look) }, "Remover"))));
  });
}

export function mostrarTextoManual(texto) {
  $("#area-manual").hidden = false;
  const area = $("#texto-manual");
  area.value = texto;
  area.focus();
  area.select();
}

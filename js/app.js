// Ponto de entrada: conecta navegação, estado, formulário, interface, fetch, recurso do dispositivo e offline.
import { iniciarNavegacao } from "./navegacao.js";
import * as estado from "./estado.js";
import * as ui from "./interface.js";
import { iniciarFormulario } from "./formulario.js";
import { gerarLooks } from "./looks.js";

const $ = (seletor) => document.querySelector(seletor);

// ---------- Interface reativa ----------
const acoesLista = {
  aoExcluir(peca) {
    if (!confirm(`Excluir "${peca.nome}"? Essa ação não pode ser desfeita.`)) return;
    const ok = estado.excluirPeca(peca.id);
    ui.mostrarMensagem("#msg-lista", ok ? "Peça excluída." : "Erro ao excluir a peça.", ok ? "ok" : "erro");
  },
  aoAlternar(id) {
    if (!estado.alternarLavagem(id)) ui.mostrarMensagem("#msg-lista", "Não foi possível alterar a situação.", "erro");
  },
};

const acoesLooks = {
  aoCompartilhar: compartilhar,
  aoRemover(look) {
    if (confirm("Remover este look salvo?")) estado.removerLook(look.id);
  },
};

function atualizar(s) {
  ui.renderResumo(s);
  ui.renderLista(s, acoesLista);
  ui.renderLooksSalvos(s.looks, acoesLooks);
  ui.atualizarIndicador(s.online);
}

// ---------- fetch do JSON ----------
async function carregarDados() {
  ui.mostrarMensagem("#status-dados", "Carregando categorias e regras…", "info");
  try {
    const resposta = await fetch("data/dados.json");
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    if (!Array.isArray(dados.categorias) || !Array.isArray(dados.cores) || !dados.regras) {
      throw new Error("Formato de dados inválido");
    }
    estado.definirDados(dados);
    ui.preencherOpcoes(dados);
    ui.mostrarMensagem("#status-dados", "Dados carregados com sucesso.", "ok");
    setTimeout(() => ui.mostrarMensagem("#status-dados", ""), 2500);
  } catch (erro) {
    console.warn("Falha ao carregar dados:", erro);
    ui.mostrarMensagem("#status-dados", "Não foi possível carregar categorias e regras. Conecte-se à internet e recarregue a página.", "erro");
  }
}

// ---------- Recurso do dispositivo: compartilhar com alternativas ----------
async function compartilhar(texto) {
  try {
    if (navigator.share) {
      await navigator.share({ title: "Meu look", text: texto });
      ui.mostrarMensagem("#msg-looks", "Look compartilhado.", "ok");
      return;
    }
  } catch (erro) {
    if (erro.name === "AbortError") return; // usuário cancelou
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(texto);
      ui.mostrarMensagem("#msg-looks", "Compartilhamento indisponível: texto copiado para a área de transferência.", "ok");
      return;
    }
  } catch (erro) {
    console.warn("Área de transferência indisponível:", erro);
  }
  ui.mostrarTextoManual(texto);
  ui.mostrarMensagem("#msg-looks", "Copie o texto manualmente.", "info");
}

// ---------- Sugestão de looks ----------
function sugerirLooks() {
  const s = estado.getEstado();
  const ocasiao = $("#look-ocasiao").value;
  const clima = $("#look-clima").value;
  $("#area-manual").hidden = true;
  if (!s.dados) return ui.mostrarMensagem("#msg-looks", "Os dados ainda não foram carregados.", "erro");
  if (!ocasiao || !clima) return ui.mostrarMensagem("#msg-looks", "Escolha a ocasião e o clima.", "erro");

  const looks = gerarLooks(s.pecas, { ocasiao, clima }, s.dados);
  ui.renderLooksSugeridos(looks, {
    aoSalvar(look) {
      const ok = estado.salvarLook(look);
      ui.mostrarMensagem("#msg-looks", ok ? "Look salvo!" : "Erro ao salvar o look.", ok ? "ok" : "erro");
    },
    aoCompartilhar: compartilhar,
  });
  ui.mostrarMensagem("#msg-looks", looks.length
    ? `${looks.length} sugestão(ões) encontrada(s).`
    : "Não há peças suficientes disponíveis. Cadastre uma parte de cima e uma de baixo (ou um vestido).", looks.length ? "ok" : "info");
}

// ---------- Conexão e Service Worker ----------
function iniciarConexao() {
  const mudar = (online) => {
    estado.definirOnline(online);
    if (online && !estado.getEstado().dados) carregarDados();
  };
  window.addEventListener("online", () => mudar(true));
  window.addEventListener("offline", () => mudar(false));
}

async function registrarServiceWorker() {
  const aviso = $("#status-offline");
  if (!("serviceWorker" in navigator)) {
    aviso.textContent = "Este navegador não suporta uso offline.";
    return;
  }
  try {
    await navigator.serviceWorker.register("service-worker.js");
    await navigator.serviceWorker.ready;
    aviso.textContent = "✅ Pronto para uso offline.";
  } catch (erro) {
    console.warn("Falha ao registrar o Service Worker:", erro);
    aviso.textContent = "Não foi possível ativar o modo offline.";
  }
}

// ---------- Inicialização ----------
iniciarNavegacao();
estado.inscrever(atualizar);
iniciarConexao();

iniciarFormulario({
  form: $("#form-peca"),
  mensagem: $("#msg-form"),
  getDados: () => estado.getEstado().dados,
  aoSalvar: estado.adicionarPeca,
});

$("#filtro-categoria").addEventListener("change", (e) => estado.definirFiltro(e.target.value || "todas"));
$("#btn-sugerir").addEventListener("click", sugerirLooks);

carregarDados();
registrarServiceWorker();

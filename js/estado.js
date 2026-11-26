// Estado central da aplicação. Qualquer alteração notifica os ouvintes,
// que atualizam a interface sem recarregar a página.
import { ler, gravar } from "./armazenamento.js";

const CHAVE_PECAS = "meulook:pecas";
const CHAVE_LOOKS = "meulook:looks";

const ehPeca = (p) =>
  p && typeof p.id === "string" && typeof p.nome === "string" &&
  typeof p.categoria === "string" && typeof p.cor === "string" &&
  (p.situacao === "disponivel" || p.situacao === "lavagem");

const ehLook = (l) =>
  l && typeof l.id === "string" && Array.isArray(l.pecas) && typeof l.texto === "string";

const estado = {
  pecas: ler(CHAVE_PECAS, [], ehPeca),
  looks: ler(CHAVE_LOOKS, [], ehLook),
  filtro: "todas",
  dados: null,
  online: navigator.onLine,
};

const ouvintes = new Set();
const notificar = () => ouvintes.forEach((f) => f(estado));
const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function persistir() {
  const a = gravar(CHAVE_PECAS, estado.pecas);
  const b = gravar(CHAVE_LOOKS, estado.looks);
  return a && b;
}

export const getEstado = () => estado;

export function inscrever(ouvinte) {
  ouvintes.add(ouvinte);
  ouvinte(estado);
  return () => ouvintes.delete(ouvinte);
}

export function adicionarPeca(valores) {
  const peca = { id: novoId(), ...valores, situacao: "disponivel", criadaEm: new Date().toISOString() };
  estado.pecas.push(peca);
  if (!persistir()) { estado.pecas.pop(); return false; }
  notificar();
  return true;
}

export function excluirPeca(id) {
  const anterior = estado.pecas;
  estado.pecas = anterior.filter((p) => p.id !== id);
  if (!persistir()) { estado.pecas = anterior; return false; }
  notificar();
  return true;
}

export function alternarLavagem(id) {
  const peca = estado.pecas.find((p) => p.id === id);
  if (!peca) return false;
  const anterior = peca.situacao;
  peca.situacao = anterior === "disponivel" ? "lavagem" : "disponivel";
  if (!persistir()) { peca.situacao = anterior; return false; }
  notificar();
  return true;
}

export function salvarLook(look) {
  estado.looks.push({ ...look, id: novoId(), salvoEm: new Date().toISOString() });
  if (!persistir()) { estado.looks.pop(); return false; }
  notificar();
  return true;
}

export function removerLook(id) {
  const anterior = estado.looks;
  estado.looks = anterior.filter((l) => l.id !== id);
  if (!persistir()) { estado.looks = anterior; return false; }
  notificar();
  return true;
}

export function definirFiltro(filtro) { estado.filtro = filtro; notificar(); }
export function definirDados(dados) { estado.dados = dados; notificar(); }
export function definirOnline(online) { estado.online = online; notificar(); }

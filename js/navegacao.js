// Navegação por hash: só a tela da rota atual fica visível.
export const ROTAS = {
  "inicio": "Início",
  "cadastrar": "Cadastrar peça",
  "guarda-roupa": "Guarda-roupa e looks",
  "sobre": "Sobre o projeto",
};

function rotaDoHash() {
  const hash = location.hash;
  if (!hash.startsWith("#/")) return null;
  const rota = hash.slice(2);
  return rota in ROTAS ? rota : "inicio";
}

export function mostrarRota(rota) {
  document.querySelectorAll(".tela").forEach((tela) => {
    tela.hidden = tela.dataset.rota !== rota;
  });
  document.querySelectorAll(".menu a").forEach((link) => {
    const ativo = link.dataset.rota === rota;
    link.classList.toggle("ativo", ativo);
    if (ativo) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.title = `MeuLook — ${ROTAS[rota]}`;
  window.scrollTo(0, 0);
}

export function iniciarNavegacao(aoMudar = () => {}) {
  const aplicar = () => {
    const rota = rotaDoHash();
    if (rota === null) return; // ignora âncoras que não são rotas (ex.: "pular para o conteúdo")
    mostrarRota(rota);
    aoMudar(rota);
  };
  window.addEventListener("hashchange", aplicar);
  if (rotaDoHash() === null) history.replaceState(null, "", "#/inicio");
  aplicar();
}

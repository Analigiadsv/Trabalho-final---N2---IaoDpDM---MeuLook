// Navegação por hash: mostra só a seção da rota atual
function mostrarTela() {
  const rota = (location.hash || "#inicio").slice(1);
  const telas = document.querySelectorAll(".tela");
  const existe = [...telas].some((t) => t.id === rota);
  const atual = existe ? rota : "inicio";
  telas.forEach((t) => {
    t.hidden = t.id !== atual;
  });
  document.querySelectorAll(".menu a").forEach((a) => {
    a.classList.toggle("ativo", a.getAttribute("href") === "#" + atual);
  });
}

// Recurso do navegador: detecção de conexão
function atualizarConexao() {
  const el = document.getElementById("status-conexao");
  const online = navigator.onLine;
  el.textContent = online ? "Online" : "Offline";
  el.classList.toggle("offline", !online);
}

window.addEventListener("hashchange", mostrarTela);
window.addEventListener("online", atualizarConexao);
window.addEventListener("offline", atualizarConexao);
mostrarTela();
atualizarConexao();
import { validarPeca } from "./validacao.js";

const CAMPOS = ["nome", "categoria", "cor", "estacao", "ocasiao"];

function mostrarErros(form, erros) {
  let primeiro = null;
  CAMPOS.forEach((campo) => {
    const input = form.elements[campo];
    const span = form.querySelector(`#erro-${campo}`);
    const msg = erros[campo] || "";
    span.textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg && !primeiro) primeiro = input;
  });
  return primeiro;
}

export function iniciarFormulario({ form, mensagem, getDados, aoSalvar }) {
  const msg = (texto, tipo) => {
    mensagem.textContent = texto;
    mensagem.className = `msg ${tipo}`;
    mensagem.hidden = !texto;
  };

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const entrada = Object.fromEntries(new FormData(form));
    const resultado = validarPeca(entrada, getDados());
    const primeiroInvalido = mostrarErros(form, resultado.erros);

    if (!resultado.valido) {
      msg("Corrija os campos destacados.", "erro");
      primeiroInvalido.focus();
      return; // dados já preenchidos são preservados
    }
    if (aoSalvar(resultado.valores)) {
      form.reset();
      msg(`Peça "${resultado.valores.nome}" cadastrada com sucesso!`, "ok");
      form.elements.nome.focus();
    } else {
      msg("Não foi possível salvar no armazenamento do navegador. Seus dados foram mantidos; tente novamente.", "erro");
    }
  });

  form.addEventListener("input", () => msg("", "info"));
}
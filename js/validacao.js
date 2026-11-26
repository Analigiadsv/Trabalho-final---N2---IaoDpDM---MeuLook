const PADRAO_NOME = /^[\p{L}\p{N} .,'\-()\/]+$/u;

export function limparTexto(texto) {
  return String(texto ?? "").trim().replace(/\s+/g, " ");
}

export function validarPeca(entrada, dados) {
  const erros = {};
  const nome = limparTexto(entrada.nome);
  const categoria = limparTexto(entrada.categoria);
  const cor = limparTexto(entrada.cor);
  const estacao = limparTexto(entrada.estacao);
  const ocasiao = limparTexto(entrada.ocasiao);

  const ids = (lista) => (dados && Array.isArray(dados[lista]) ? dados[lista].map((i) => i.id) : []);

  if (!nome) erros.nome = "Informe o nome da peça.";
  else if (nome.length < 2) erros.nome = "O nome deve ter pelo menos 2 caracteres.";
  else if (nome.length > 40) erros.nome = "O nome deve ter no máximo 40 caracteres.";
  else if (!PADRAO_NOME.test(nome)) erros.nome = "Use apenas letras, números e pontuação simples.";

  if (!categoria) erros.categoria = "Selecione a categoria.";
  else if (!ids("categorias").includes(categoria)) erros.categoria = "Categoria inválida ou indisponível.";

  if (!cor) erros.cor = "Selecione a cor.";
  else if (!ids("cores").includes(cor)) erros.cor = "Cor inválida ou indisponível.";

  if (estacao && !ids("estacoes").includes(estacao)) erros.estacao = "Estação inválida.";
  if (ocasiao && !ids("ocasioes").includes(ocasiao)) erros.ocasiao = "Ocasião inválida.";

  return {
    valido: Object.keys(erros).length === 0,
    erros,
    valores: { nome, categoria, cor, estacao: estacao || "todas", ocasiao: ocasiao || "qualquer" },
  };
}
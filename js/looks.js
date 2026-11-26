// Sugestão de looks por regras de combinação com pontuação.
// Pontos: ocasião adequada (+2/-2), estação adequada ao clima (+2/-2),
// pares de cores que combinam (+2), cores neutras (+1) e cores a evitar (-3).

const produto = (listas) => listas.reduce((acc, l) => acc.flatMap((a) => l.map((x) => [...a, x])), [[]]);

function pontuarPeca(peca, ocasiao, clima) {
  let pontos = 0;
  pontos += peca.ocasiao === ocasiao || peca.ocasiao === "qualquer" ? 2 : -2;
  pontos += peca.estacao === "todas" || clima.estacoes.includes(peca.estacao) ? 2 : -2;
  return pontos;
}

function pontuarPar(corA, corB, regras) {
  const par = (lista) => lista.some(([x, y]) => (x === corA && y === corB) || (x === corB && y === corA));
  if (par(regras.evitar)) return -3;
  if (par(regras.combinam)) return 2;
  if (regras.neutras.includes(corA) || regras.neutras.includes(corB)) return 1;
  return corA === corB ? 0 : -1;
}

export function gerarLooks(pecas, { ocasiao, clima: climaId }, dados, limite = 3) {
  const clima = dados.climas.find((c) => c.id === climaId);
  if (!clima) return [];
  const categoria = (id) => dados.categorias.find((c) => c.id === id);
  const disponiveis = pecas.filter((p) => p.situacao === "disponivel");

  const melhores = (grupo) =>
    disponiveis
      .filter((p) => categoria(p.categoria)?.grupo === grupo)
      .map((p) => ({ peca: p, pontos: pontuarPeca(p, ocasiao, clima) }))
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, 5);

  const topos = melhores("topo"), bases = melhores("base"), vestidos = melhores("corpo_inteiro");
  const calcados = melhores("calcado"), agasalhos = melhores("agasalho");

  const estruturas = [];
  if (topos.length && bases.length) estruturas.push(...produto([topos, bases]));
  if (vestidos.length) estruturas.push(...vestidos.map((v) => [v]));
  if (!estruturas.length) return [];

  const extras = [];
  if (calcados.length) extras.push(calcados);
  if (clima.agasalho && agasalhos.length) extras.push(agasalhos);

  const candidatos = (extras.length ? produto([estruturas, ...extras]) : estruturas.map((e) => [e]))
    .map((combo) => (extras.length ? [...combo[0], ...combo.slice(1)] : combo[0]));

  return candidatos
    .map((itens) => {
      let pontos = itens.reduce((soma, i) => soma + i.pontos, 0);
      for (let a = 0; a < itens.length; a++)
        for (let b = a + 1; b < itens.length; b++)
          pontos += pontuarPar(itens[a].peca.cor, itens[b].peca.cor, dados.regras);
      return { itens, pontos };
    })
    .sort((x, y) => y.pontos - x.pontos)
    .slice(0, limite)
    .map(({ itens, pontos }) => {
      const pecasLook = itens.map(({ peca }) => ({
        id: peca.id, nome: peca.nome, categoria: peca.categoria, cor: peca.cor,
      }));
      return { pontos, ocasiao, clima: climaId, pecas: pecasLook, texto: montarTexto(pecasLook, ocasiao, clima, dados) };
    });
}

function montarTexto(pecas, ocasiao, clima, dados) {
  const nomeOcasiao = dados.ocasioes.find((o) => o.id === ocasiao)?.nome ?? ocasiao;
  const lista = pecas
    .map((p) => `${dados.categorias.find((c) => c.id === p.categoria)?.emoji ?? ""} ${p.nome}`.trim())
    .join(" + ");
  return `MeuLook (${nomeOcasiao}, ${clima.nome}): ${lista}`;
}

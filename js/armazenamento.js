// Leitura e gravação no localStorage com tratamento de erros.
// Conteúdo inválido ou corrompido nunca interrompe a aplicação.

export function ler(chave, padrao = [], validar = () => true) {
  try {
    const bruto = localStorage.getItem(chave);
    if (bruto === null) return padrao;
    const valor = JSON.parse(bruto);
    if (!Array.isArray(valor)) return padrao;
    return valor.filter(validar);
  } catch (erro) {
    console.warn(`Não foi possível ler "${chave}":`, erro);
    return padrao;
  }
}

export function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch (erro) {
    console.warn(`Não foi possível gravar "${chave}":`, erro);
    return false;
  }
}

// Estratégia: cache-first para os arquivos essenciais. Para publicar alterações,
// aumente VERSAO: o evento "activate" apaga os caches das versões anteriores.
const VERSAO = "v1";
const CACHE = `meulook-${VERSAO}`;
const ARQUIVOS = [
  "./",
  "index.html",
  "css/style.css",
  "data/dados.json",
  "js/app.js",
  "js/navegacao.js",
  "js/estado.js",
  "js/armazenamento.js",
  "js/interface.js",
  "js/validacao.js",
  "js/formulario.js",
  "js/looks.js",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((c) => c.startsWith("meulook-") && c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (evento) => {
  const pedido = evento.request;
  if (pedido.method !== "GET" || new URL(pedido.url).origin !== self.location.origin) return;
  evento.respondWith(
    caches.match(pedido).then((emCache) =>
      emCache ||
      fetch(pedido)
        .then((resposta) => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(CACHE).then((cache) => cache.put(pedido, copia));
          }
          return resposta;
        })
        .catch(() => (pedido.mode === "navigate" ? caches.match("index.html") : Response.error()))
    )
  );
});

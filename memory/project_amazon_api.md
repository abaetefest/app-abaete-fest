---
name: project_amazon_api
description: Integração Amazon Creators API v3.1 na rota /discounts — status, arquivos, próximos passos
metadata:
  type: project
---

Implementada integração com Amazon Associates Creators API v3.1 usando **busca por keyword** (SearchItems) — sem ASINs fixos. Cada keyword retorna N produtos automaticamente com preços, imagens e links de afiliado ao vivo.

**Why:** Preços e links dos produtos em `/discounts` eram estáticos e ficavam desatualizados. A Creators API traz preços e `DetailPageURL` com tag de afiliado automaticamente.

**How to apply:** Sempre que trabalhar em `/discounts`, lembrar que os dados vêm de `/.netlify/functions/amazon-products` em produção, com fallback estático nos dados do `discounts.js`.

## Arquivos criados

- `netlify/functions/amazon-products.js` — Netlify Function: obtém OAuth token LWA, chama Creators API, retorna produtos com fallback estático
- `netlify/functions/products-data.js` — Config de produtos com ASINs (a preencher)
- `netlify.toml` — Configura pasta de funções + esbuild bundler
- `.env` — Placeholder para variáveis (não commitado, *.env no .gitignore)

## Variáveis de ambiente necessárias (Netlify UI)

- `AMAZON_CLIENT_ID` — Credential ID do painel Associates Central → CreatorsAPI
- `AMAZON_CLIENT_SECRET` — Credential Secret do mesmo painel
- `AMAZON_PARTNER_TAG` = patrickmont04-20

⚠️ Gerar novas credenciais no painel da Amazon e configurar no Netlify antes do primeiro deploy.

## Próximos passos obrigatórios

1. **Preencher ASINs** em `netlify/functions/products-data.js` — pegar o ASIN de cada produto na URL da amazon.com.br (formato: `/dp/{ASIN}`)
2. **Configurar env vars** no Netlify UI com as credenciais acima e depois **rotacioná-las** no painel Amazon Associates
3. **Verificar endpoint** `API_BASE` em `amazon-products.js` — pode precisar de ajuste conforme a documentação da Creators API (requer login em associados.amazon.com.br/creatorsapi/docs)
4. **Testar localmente** com `netlify dev` (roda SSR + functions juntos)

## Fluxo em produção

1. Browser carrega página → SSR renderiza com dados estáticos
2. `created()` hook dispara no cliente → `fetch('/.netlify/functions/amazon-products')`
3. Função obtém token OAuth LWA (cache em memória por ~1h), chama `POST /items/get`
4. Resposta sobrescreve preços/links; se falhar, dados estáticos permanecem
5. `Cache-Control: max-age=3600` no response da função (1h de cache no browser)

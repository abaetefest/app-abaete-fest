# Página de Blog - AbaetéFest

Esta página consome a API do WordPress para exibir artigos do blog, filtrando especificamente pela categoria "Abaetéfest".

## Estrutura de Arquivos

```
src/pages/blog/
├── index.vue              # Template principal da página
├── blog.js                # Lógica e métodos da página
├── blog.css               # Estilos da página
├── README.md              # Este arquivo
└── components/
    ├── BlogCard.vue           # Card individual de post
    ├── BlogCardSkeleton.vue   # Skeleton loader para posts
    └── BlogFilters.vue        # Componente de filtros e busca
```

## Configuração

### 1. Categoria no WordPress

A página está configurada para buscar posts da categoria "Abaetéfest" no WordPress. Para que funcione corretamente:

1. Acesse o painel do WordPress em: `https://viladosilicio.com.br/wp-admin`
2. Vá em **Posts → Categorias**
3. Crie uma categoria chamada **"Abaetéfest"** (se ainda não existir)
4. Ao publicar posts relacionados ao AbaetéFest, marque esta categoria

### 2. Descobrir o ID da Categoria

Se a categoria já existe, você pode descobrir o ID dela de duas formas:

**Opção 1: Via API (automático)**
A página já faz isso automaticamente no método `getCategoryId()` em [blog.js](blog.js:86)

**Opção 2: Manual via API**
Acesse: `https://viladosilicio.com.br/wp-json/wp/v2/categories?search=Abaetéfest`

**Opção 3: Fixar o ID diretamente**
Se você já sabe o ID, pode editar o arquivo [blog.js](blog.js:111) e definir:
```javascript
categoryId: 123 // Substitua 123 pelo ID real
```

E remover ou comentar a linha que chama `getCategoryId()` no `mounted()`.

## Funcionalidades

### ✅ Implementadas

- **Listagem de posts**: Grid responsivo com posts do WordPress
- **Filtro por categoria**: Apenas posts da categoria "Abaetéfest"
- **Busca**: Campo de busca que filtra posts por título e conteúdo
- **Paginação**: Navegação entre páginas de posts
- **Loading states**: Skeleton loaders durante carregamento
- **Error handling**: Tratamento de erros com mensagem amigável
- **Imagens destacadas**: Exibição da featured image de cada post
- **Responsive**: Layout adaptado para mobile, tablet e desktop
- **Dark mode**: Suporte completo ao modo escuro do Quasar
- **SEO**: Meta tags otimizadas para compartilhamento
- **Analytics**: Rastreamento de cliques em posts (Mixpanel)

### 🎨 Design

- Segue o mesmo padrão visual das páginas de Eventos e Turismo
- Cards com hover effects e transições suaves
- Grid responsivo (1 coluna mobile, 2 tablet, 3 desktop)
- Ícones do Material Design Icons (mdi)
- Cores do tema Quasar

## API WordPress

### Endpoint Principal
```
https://viladosilicio.com.br/wp-json/wp/v2/posts
```

### Parâmetros Utilizados

- `page`: Número da página (paginação)
- `per_page`: Posts por página (padrão: 9)
- `categories`: ID da categoria para filtrar
- `_embed`: Inclui featured media na resposta

### Exemplo de Requisição
```
https://viladosilicio.com.br/wp-json/wp/v2/posts?page=1&per_page=9&categories=123&_embed=wp:featuredmedia
```

## Customização

### Alterar URL da API

Edite o arquivo [blog.js](blog.js) e altere as URLs nas funções:
- `getCategoryId()` - linha 86
- `loadPosts()` - linha 106

### Alterar Nome da Categoria

Edite o arquivo [blog.js](blog.js:87) e altere `'Abaetéfest'` para o nome desejado.

### Alterar Posts por Página

Edite [blog.js](blog.js:109):
```javascript
postsPerPage: 9 // Altere para o número desejado
```

### Comportamento ao Clicar no Post

Atualmente, ao clicar em um post, ele abre o link original do WordPress em uma nova aba.

Se quiser criar uma página de detalhes interna, edite o método `openPostDetails()` em [blog.js](blog.js:163).

## Rotas

A página está acessível em:
```
/blog
```

Certifique-se de que a rota está configurada no arquivo de rotas do Quasar.

## Troubleshooting

### Posts não aparecem

1. Verifique se a categoria "Abaetéfest" existe no WordPress
2. Verifique se existem posts publicados nesta categoria
3. Abra o console do navegador e veja se há erros de CORS
4. Teste a API diretamente no navegador

### CORS Error

Se houver erro de CORS, você precisará configurar o WordPress para permitir requisições do domínio do AbaetéFest.

No WordPress, instale o plugin **"WP CORS"** ou adicione ao `.htaccess`:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
```

### Imagens não carregam

Verifique se os posts têm "Featured Image" configurada no WordPress.

## Próximos Passos

Melhorias futuras que podem ser implementadas:

- [ ] Página de detalhes do post (interna ao app)
- [ ] Filtro por múltiplas categorias
- [ ] Ordenação (mais recentes, mais antigos, etc)
- [ ] Compartilhamento social de posts
- [ ] Comentários (integração com API do WordPress)
- [ ] Busca mais avançada (por autor, tags, etc)
- [ ] Cache de posts para melhor performance
- [ ] Infinite scroll ao invés de paginação

## Contato

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

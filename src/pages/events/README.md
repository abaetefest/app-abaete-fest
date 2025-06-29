# Página Events - Estrutura Refatorada

Esta página foi refatorada para uma estrutura modular com componentes separados e arquivos organizados.

## 📁 Estrutura de Arquivos

```
src/pages/events/
├── Events.vue              # Página principal (template apenas)
├── events.js               # Lógica JavaScript (script)
├── events.css              # Estilos CSS
├── README.md               # Documentação
└── components/
    ├── index.js            # Exportações dos componentes
    ├── EventFilters.vue    # Componente de filtros
    ├── EventCard.vue       # Card individual do evento
    ├── EventSkeleton.vue   # Loading skeleton
    └── EmptyState.vue      # Estado vazio
```

## 🔧 Componentes

### EventFilters.vue
- **Descrição**: Componente responsável pelos filtros de categoria e busca
- **Props**:
  - `selectedCategory`: Categoria selecionada
  - `searchFilter`: Texto de busca
  - `options`: Array de opções de categoria
- **Eventos**:
  - `update:selectedCategory`: Mudança de categoria
  - `update:searchFilter`: Mudança no filtro de busca

### EventCard.vue
- **Descrição**: Card individual que representa um evento
- **Props**:
  - `event`: Objeto do evento
  - `categoryOptions`: Opções de categoria para formatação
- **Eventos**:
  - `click`: Clique no card do evento

### EventSkeleton.vue
- **Descrição**: Loading skeleton para o carregamento dos eventos
- **Props**:
  - `skeletonCount`: Número de skeletons a serem exibidos (padrão: 6)

### EmptyState.vue
- **Descrição**: Estado vazio quando não há eventos para exibir
- **Props**: Nenhuma
- **Funcionalidade**: Exibe mensagem e ícone quando a lista está vazia

## 📋 Principais Funcionalidades

### SEO Otimizado
- Meta tags dinâmicas baseadas na categoria selecionada
- Open Graph e Twitter Cards
- URLs canônicas
- Structured data para eventos

### Responsividade
- Grid adaptável para diferentes tamanhos de tela
- Mobile-first design
- Breakpoints otimizados para tablet e desktop

### Performance
- Lazy loading dos componentes
- Debounce na busca
- Skeleton loading durante carregamento
- Otimização de imagens

### Acessibilidade
- Foco visível em elementos interativos
- Alt text em imagens
- Estrutura semântica adequada
- Suporte a teclado

## 🔄 Fluxo de Dados

1. **Inicialização**: Página carrega e verifica parâmetros da URL
2. **Filtros**: Usuário pode filtrar por categoria e buscar por texto
3. **Carregamento**: API é chamada com os filtros aplicados
4. **Exibição**: Eventos são renderizados em cards responsivos
5. **Interação**: Clique no card navega para detalhes do evento

## 🎨 Estilos

### Tema Claro/Escuro
- Suporte completo ao modo escuro do Quasar
- Variáveis CSS customizadas
- Transições suaves entre temas

### Animações
- Hover effects nos cards
- Transições de entrada/saída
- Loading states animados

### Grid System
- CSS Grid para layout principal
- Flexbox para componentes internos
- Responsive breakpoints

## 📱 Responsividade

- **Mobile** (< 768px): 1 coluna, filtros empilhados
- **Tablet** (768px - 1024px): 2 colunas
- **Desktop** (> 1024px): 3-4 colunas baseado no conteúdo

## 🔍 SEO Features

- Título dinâmico baseado na categoria
- Meta description personalizada
- Keywords relevantes
- Structured data (JSON-LD)
- Sitemap integration
- Canonical URLs

## 🚀 Performance

- Lazy loading de componentes
- Debounced search (300ms)
- Optimized images com placeholder
- Minimal re-renders
- Efficient filtering

## 🧪 Testes

Para testar os componentes individualmente:

```javascript
// Importar componentes específicos
import { EventCard, EventFilters } from './components'

// Ou usar lazy loading
const EventCard = () => import('./components/EventCard')
```

## 📝 Notas de Desenvolvimento

- Todos os componentes seguem as convenções do Vue 3
- Props tipadas com validação
- Eventos bem definidos e documentados
- Estilos scoped para evitar vazamentos
- Comentários em código complexo

<template>
  <div class="blog-filters q-mb-lg">
    <!-- Título da página -->
    <h1 class="blog-page-title q-mb-md">
      <q-icon name="mdi-post" class="q-mr-sm" />
      Blog
    </h1>

    <!-- Filtros de busca -->
    <div class="row q-col-gutter-md items-center">
      <!-- Campo de busca -->
      <div class="col-12 col-sm-8 col-md-9">
        <q-input
          :model-value="searchFilter"
          @update:model-value="$emit('update:searchFilter', $event)"
          outlined
          dense
          placeholder="Buscar artigos..."
          :bg-color="$q.dark.isActive ? 'primary' : 'white'"
          class="search-input"
        >
          <template #prepend>
            <q-icon name="mdi-magnify" />
          </template>
          <template #append v-if="searchFilter">
            <q-icon
              name="mdi-close"
              class="cursor-pointer"
              @click="$emit('update:searchFilter', '')"
            />
          </template>
        </q-input>
      </div>

      <!-- Botão limpar filtros -->
      <div class="col-12 col-sm-4 col-md-3">
        <q-btn
          outline
          no-caps
          color="primary"
          icon="mdi-filter-off"
          label="Limpar filtros"
          class="full-width"
          @click="$emit('clear-filters')"
          :disable="!searchFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogFilters',

  props: {
    searchFilter: {
      type: String,
      default: ''
    }
  },

  emits: ['update:searchFilter', 'clear-filters']
}
</script>

<style scoped>
.blog-filters {
  padding: 16px 0;
}

.breadcrumbs {
  font-size: 14px;
  color: #666;
}

.breadcrumb-link {
  color: var(--q-primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-current {
  color: #999;
  font-weight: 500;
}

.blog-page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--q-primary);
  margin: 0;
  display: flex;
  align-items: center;
}

.search-input {
  border-radius: 8px;
}

/* Dark mode adjustments */
.q-dark .breadcrumbs {
  color: #ccc;
}

.q-dark .breadcrumb-current {
  color: #999;
}

.q-dark .blog-page-title {
  color: white;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .blog-page-title {
    font-size: 24px;
  }
}
</style>

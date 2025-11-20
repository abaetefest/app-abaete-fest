<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'" class="min-h-screen full-width overflow-x-hidden q-px-sm">
    <!-- Filtros -->
    <BlogFilters
      :search-filter="searchTerm"
      @update:searchFilter="onFilterChange"
      @clear-filters="clearFilters"
    />

    <!-- Loading skeleton -->
    <div v-if="loading" class="row">
      <BlogCardSkeleton v-for="n in 9" :key="`skeleton-${n}`" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="row justify-center q-py-xl">
      <div class="col-12 col-md-6 text-center">
        <q-icon name="mdi-alert-circle" size="64px" color="negative" class="q-mb-md" />
        <div class="text-h6 q-mb-md">Erro ao carregar artigos</div>
        <div class="text-body2 text-grey-7 q-mb-md">
          Não foi possível carregar os artigos do blog. Por favor, tente novamente mais tarde.
        </div>
        <q-btn
          color="primary"
          label="Tentar novamente"
          @click="loadPosts"
          rounded
          no-caps
        />
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Posts grid -->
      <div class="row q-mb-xl">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
        >
          <BlogCard
            :post="post"
            @click="openPostDetails"
          />
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredPosts.length === 0" class="row justify-center q-py-xl">
        <div class="col-12 col-md-6 text-center">
          <q-icon name="mdi-text-box-search" size="64px" color="grey-5" class="q-mb-md" />
          <div class="text-h6 q-mb-md">Nenhum artigo encontrado</div>
          <div class="text-body2 text-grey-7">
            Tente ajustar seus filtros de busca
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="row justify-center q-mb-xl">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="7"
          direction-links
          boundary-links
          color="primary"
          active-color="accent"
          @update:model-value="loadPage"
        />
      </div>
    </div>
  </q-page>
</template>

<script src="./blog.js"></script>

<style scoped src="./blog.css"></style>

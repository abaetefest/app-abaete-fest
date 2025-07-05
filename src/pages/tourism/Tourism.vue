<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'" class="min-h-screen full-width overflow-x-hidden q-px-sm">
    <!-- Filtros -->
    <tourism-filters
      :search-filter="filter"
      @update:searchFilter="onFilterChange"
      @clear-filters="clearFilters"
    />

    <!-- Loading skeleton -->
    <div v-if="load && viewMode === 'compact'">
      <q-skeleton type="rect" class="q-mb-sm skeleton-card" height="100px" v-for="n in 6" :key="n" />
    </div>

    <div v-if="load && viewMode === 'large'">
      <q-skeleton type="rect" class="q-mb-sm skeleton-card" height="300px" v-for="n in 6" :key="n" />
    </div>

    <!-- Lista de pontos turísticos -->
    <div v-else>
      <!-- Contador de locais e botão de visualização -->
      <div class="row items-center justify-center q-mb-md" v-if="tourism.length > 0">
        <!-- Botão de alternância de visualização -->
        <div class="col-12 q-mb-md">
          <q-btn-toggle
            v-model="viewMode"
            spread
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="grey-3"
            text-color="grey-7"
            :options="[
              { label: 'Compacto', value: 'compact', icon: 'mdi-view-list' },
              { label: 'Grande', value: 'large', icon: 'mdi-view-grid' }
            ]"
            class="view-toggle"
          />
        </div>
      </div>

      <!-- Grid de locais - Visualização Compacta -->
      <div v-if="viewMode === 'compact'" class="row q-mb-xl">
        <div
          v-for="place in filteredTourism"
          :key="place.id"
          class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
        >
          <tourism-card
            :tourism="place"
            @click="openDialogCourse"
          />
        </div>
      </div>

      <!-- Grid de locais - Visualização Grande -->
      <div v-else class="row q-mb-xl">
        <div
          v-for="place in filteredTourism"
          :key="place.id"
          class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
        >
          <tourism-card-large
            :tourism="place"
            @click="openDialogCourse"
          />
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-if="filteredTourism.length === 0" class="empty-state">
        <q-icon name="mdi-map-search" class="empty-state-icon" />
        <div class="empty-state-title">Nenhum local encontrado</div>
        <div class="empty-state-subtitle">Tente ajustar seus filtros de busca</div>
      </div>
    </div>

    <!-- Dialog de detalhes -->
    <dialog-tourism-details
      :modal-tourism="modalTourism"
      :tourism-data="tourismDetails"
      @close="closeModal"
    />

    <!-- Dialog de boas-vindas -->
    <q-dialog
      persistent
      full-height
      :maximized="$q.screen.lt.sm"
      :value="modalWelcomeTourism"
    >
      <q-layout
        view="Lhh lpR fff"
        container
        :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
      >
        <q-page-container>
          <q-page>
            <q-card
              class="full-width no-shadow"
            >
              <q-card-section class="q-pa-none" :class="$q.dark.isActive ? 'bg-primary' : ''">
                <div
                  class="text-body2 text-center"
                  :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
                >
                  <q-img
                    src="/abaetetuba_de_cima.jpg"
                    class="rounded-img"
                  >
                    <template #loading>
                      <q-skeleton class="full-width full-height" square />
                    </template>
                  </q-img>
                </div>
              </q-card-section>

              <q-card-section :class="$q.dark.isActive ? 'bg-primary' : ''">
                <div class="text-h5 text-bold q-mt-lg">
                  Explore locais incríveis pela região de <span class="text-accent">Abaetetuba</span>
                </div>
              </q-card-section>

              <q-card-section :class="$q.dark.isActive ? 'bg-primary' : ''">
                <div class="text-body1">
                  A região do Baixo Tocantins é repleta de balneários, prais e ilhas.
                  Além de muita história na cidade de Abaetetuba.
                </div>
              </q-card-section>
            </q-card>

            <div class="row justify-center absolute-bottom q-mb-xl">
              <div class="col-xs-10 col-sm-8">
                <q-btn
                  label="Vamos nessa!"
                  :color="$q.dark.isActive ? 'secondary' : 'primary'"
                  :text-color="$q.dark.isActive ? 'primary' : 'white'"
                  @click="modalWelcomeTourism = false"
                  class="full-width"
                  rounded
                />
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script src="./tourism.js"></script>

<style scoped src="./tourism.css"></style>

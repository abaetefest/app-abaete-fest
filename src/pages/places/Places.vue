<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">

    <!-- Título -->
    <div class="text-h5 text-bold text-center q-py-md">
      Lista de <span class="text-accent">Locais</span>
    </div>

    <!-- Toggle Lista / Mapa -->
    <div class="row q-pb-md justify-center">
      <q-btn-group rounded push>
        <q-btn
          rounded
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
        />
        <q-btn
          rounded
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map' }"
        />
      </q-btn-group>
    </div>

    <!-- Carrossel de categorias -->
    <div :class="['category-chips', { 'category-chips--collapsed': !showAllCategories }]" class="q-mb-xs">
      <div
        v-for="opt in options"
        :key="opt.value"
        class="category-chip"
        @click="categoria = opt.value"
      >
        <q-chip
          :color="categoria === opt.value ? 'primary' : ($q.dark.isActive ? 'grey-8' : 'grey-2')"
          :text-color="categoria === opt.value ? 'white' : ($q.dark.isActive ? 'white' : 'grey-9')"
          clickable
          dense
          class="text-weight-medium"
          style="font-size: 13px; padding: 6px 10px; height: auto;"
        >
          <img
            :src="opt.icon"
            :alt="opt.label"
            style="width: 22px; height: 22px; object-fit: contain; margin-right: 6px; flex-shrink: 0;"
          />
          {{ opt.label }}
        </q-chip>
      </div>
    </div>

    <!-- Botão expandir categorias -->
    <div class="text-center q-mb-md">
      <q-btn
        outline
        rounded
        no-caps
        size="md"
        :icon-right="showAllCategories ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :label="showAllCategories ? 'Ver menos' : 'Ver todas as categorias'"
        color="primary"
        @click="showAllCategories = !showAllCategories"
      />
    </div>

    <!-- Grid de cards -->
    <div class="row q-col-gutter-sm">
      <div
        v-for="(place, index) in getPlaces"
        :key="index"
        class="col-12 col-sm-6 col-md-6"
      >
        <q-card
          class="place-card"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
          flat
          bordered
          @click="openDialog(place)"
        >
          <div class="row no-wrap items-center q-pa-sm">

            <!-- Ícone do local -->
            <div class="q-mr-sm" style="flex-shrink: 0;">
              <q-avatar size="56px" rounded>
                <img :src="place.icon" :alt="place.title" style="object-fit: cover;" />
              </q-avatar>
            </div>

            <!-- Conteúdo -->
            <div class="col" style="min-width: 0;">
              <div
                class="text-subtitle1 text-weight-bold ellipsis"
                :class="$q.dark.isActive ? 'text-blue-2' : 'text-primary'"
              >
                {{ place.title }}
              </div>

              <div class="q-mt-xs" style="display: flex; align-items: flex-start; gap: 4px;">
                <q-icon name="mdi-map-marker-outline" size="14px" color="grey-7" style="flex-shrink: 0; margin-top: 2px;" />
                <span
                  class="text-caption"
                  :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'"
                >{{ place.address }}</span>
              </div>

              <div v-if="place.phone" class="q-mt-xs" style="display: flex; align-items: center; gap: 4px;">
                <q-icon name="mdi-phone-outline" size="14px" color="grey-7" style="flex-shrink: 0;" />
                <span
                  class="text-caption"
                  :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'"
                >{{ place.phone }}</span>
              </div>

              <div v-if="place.preco" class="row items-center q-mt-xs">
                <q-rating
                  v-model="place.preco"
                  size="14px"
                  icon="mdi-currency-usd"
                  color="green-6"
                  readonly
                />
              </div>
            </div>

          </div>
        </q-card>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-if="getPlaces.length === 0" class="text-center q-pa-xl">
      <q-icon name="mdi-map-search" size="80px" color="grey-4" />
      <div class="text-h6 text-grey-5 q-mt-md">Nenhum local encontrado</div>
      <div class="text-caption text-grey-5">Tente selecionar outra categoria</div>
    </div>

    <dialog-places
      :modal-places="modalPlaces"
      :place-data="placeDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script src="./places.js"></script>
<style src="./places.css"></style>

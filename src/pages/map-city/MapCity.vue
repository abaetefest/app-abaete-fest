<template>
  <q-page :class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-1'">
    <div class="row q-pb-sm q-pt-sm justify-center">
      <q-btn-group rounded push>
        <q-btn rounded
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
        />
        <q-btn rounded
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map' }"
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
        />
      </q-btn-group>
    </div>
    <!-- Carrossel de categorias -->
    <div :class="['category-chips', { 'category-chips--collapsed': !showAllCategories }]" class="q-px-sm q-mb-xs">
      <div
        v-for="opt in options"
        :key="opt.value"
        class="category-chip"
        @click="selectCategory(opt.value)"
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
    <div class="text-center q-mb-sm">
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

    <GmapMap
      class="map-size"
      :center="{ lat: -1.7245469, lng: -48.8729189 }"
      :zoom="zoom"
      map-type-id="terrain"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
      </GmapInfoWindow>
      <GmapMarker
        v-for="(maker, index) in makersMap"
        :key="index"
        :position="{
          lat: parseFloat(maker.latitude),
          lng: parseFloat(maker.longitude),
        }"
        :icon="{
          url: getIcon(maker.icon),
          size: { width: 50, height: 50 },
          scaledSize: { width: 50, height: 50 },
        }"
        :clickable="true"
        :draggable="false"
        :optimized="false"
        @click="showDialog(maker, index)"
      />
    </GmapMap>

    <q-inner-loading :showing="!ready">
      <p>Carregando mapa</p>
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script src="./map-city.js"></script>

<style src="./map-city.css"></style>

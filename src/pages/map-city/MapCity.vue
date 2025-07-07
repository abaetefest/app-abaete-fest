<template>
  <q-page :class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-1'">
    <div class="row q-pb-sm q-pt-sm justify-center">
      <q-btn-group push>
        <q-btn
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
        />
        <q-btn
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map' }"
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
        />
      </q-btn-group>
    </div>
    <div class="row q-pb-md q-px-sm q-pt-sm">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        :bg-color="$q.dark.isActive ? '' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'white' : 'primary'"
        map-options
        emit-value
        @input="setFilterMap"
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory" />
          </q-avatar>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="scope.opt.icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
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

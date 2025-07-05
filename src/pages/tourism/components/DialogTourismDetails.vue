<template>
  <q-dialog persistent full-height :maximized="$q.screen.lt.sm" :value="modalTourism">
    <q-layout
      view="Lhh lpR fFf"
      container
      :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
        class="q-py-sm"
      >
        <div class="row items-center justify-between q-px-md">
          <div class="text-h6">{{ tourismData.name }}</div>
          <q-btn
            rounded
            flat
            dense
            icon="mdi-close"
            :color="$q.dark.isActive ? 'white' : 'white'"
            @click="$emit('close')"
          />
        </div>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-none">
          <q-card
            class="full-width no-shadow"
            :key="tourismData.id"
            flat
            bordered
          >
            <!-- Imagem -->
            <q-card-section class="q-pa-none">
              <div
                v-if="tourismData.image_url"
                class="text-body2"
                :class="$q.dark.isActive ? 'text-white bg-primary' : 'text-primary'"
              >
                <q-img
                  :src="tourismData.image_url"
                  height="300px"
                  class="tourism-image"
                >
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                </q-img>
              </div>
            </q-card-section>

            <!-- Informações -->
            <q-card-section class="q-pt-lg">
              <!-- Endereço -->
              <div
                v-if="tourismData.address"
                class="row items-center q-mb-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
              >
                <q-icon name="mdi-map-marker" size="24px" class="q-mr-sm" />
                <div class="text-body1">{{ tourismData.address }}</div>
              </div>

              <!-- Descrição -->
              <div
                v-if="tourismData.description"
                class="q-mt-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <div class="text-h6 q-mb-sm">Sobre o local</div>
                <div class="text-body1" v-html="tourismData.description"></div>
              </div>

              <!-- Mapa -->
              <div class="q-mt-lg">
                <div class="text-h6 q-mb-md" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">
                  Localização
                </div>
                <div class="map-container">
                  <GmapMap
                    :center="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                    :zoom="15"
                    map-type-id="terrain"
                    style="width: 100%; height: 300px; border-radius: 12px;"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: true,
                      disableDefaultUi: false
                    }"
                  >
                    <gmap-info-window
                      :options="{ pixelOffset: { width: 0, height: -35} }"
                      :position="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                      :opened="true"
                      @closeclick="infoWinOpen=false"
                      class="map-info-window"
                    >
                      <span class="text-dark">{{ tourismData.name }}</span>
                    </gmap-info-window>
                    <GmapMarker
                      :position="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                      :clickable="true"
                      :draggable="false"
                      @click="center=m.position"
                    />
                  </GmapMap>
                </div>
              </div>

              <!-- Botão Fechar -->
              <div class="row justify-center q-mt-xl">
                <q-btn
                  label="Fechar"
                  :color="$q.dark.isActive ? 'secondary' : 'primary'"
                  :text-color="$q.dark.isActive ? 'primary' : 'white'"
                  @click="$emit('close')"
                  class="q-px-xl q-py-sm text-weight-bold"
                  rounded
                  style="min-width: 200px"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTourismDetails',
  props: {
    modalTourism: {
      type: Boolean,
      required: true,
      default: () => false
    },
    tourismData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      infoWinOpen: true
    }
  }
}
</script>

<style scoped>
.tourism-image {
  width: 100%;
  object-fit: cover;
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.map-info-window {
  padding: 8px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Dark mode adjustments */
:deep(.q-dialog__inner--maximized > div) {
  border-radius: 0;
}

:deep(.q-dialog__inner:not(.q-dialog__inner--maximized) > div) {
  border-radius: 12px;
}
</style>

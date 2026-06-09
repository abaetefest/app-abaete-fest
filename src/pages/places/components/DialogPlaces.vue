<template>
  <q-dialog :maximized="$q.screen.lt.sm" :value="modalPlaces" @hide="$emit('close')">
    <q-layout view="Lhh lpR fFf" container :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">

      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title class="text-weight-bold">
            {{ placeData.title }}
          </q-toolbar-title>
          <q-btn icon="close" color="white" round flat dense @click="$emit('close')" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <q-card class="full-width no-shadow" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">

            <!-- Imagem (quando disponível) -->
            <q-card-section v-if="placeData.image_url" class="q-pa-none">
              <q-img :src="placeData.image_url">
                <template #loading>
                  <q-skeleton class="full-width full-height" square />
                </template>
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{ placeData.title }}
                </div>
              </q-img>
            </q-card-section>

            <!-- Descrição (quando disponível) -->
            <q-card-section v-if="placeData.description">
              <div
                class="text-body1"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
                v-html="placeData.description"
              />
            </q-card-section>

            <!-- Informações do local -->
            <q-card-section>

              <!-- Preço -->
              <div v-if="placeData.preco" class="row items-center q-mb-md">
                <q-icon name="mdi-currency-usd" size="20px" color="green-6" class="q-mr-sm" />
                <q-rating
                  :value="placeData.preco"
                  size="18px"
                  icon="mdi-currency-usd"
                  color="green-6"
                  readonly
                />
              </div>

              <!-- Endereço -->
              <div v-if="placeData.address" class="row items-start q-mb-md" style="gap: 8px;">
                <q-icon name="mdi-map-marker-outline" size="20px" color="primary" style="flex-shrink: 0; margin-top: 2px;" />
                <div class="col">
                  <div class="text-caption text-grey-6 text-weight-medium">Endereço</div>
                  <div
                    class="text-body2"
                    :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
                  >{{ placeData.address }}</div>
                  <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeData.address)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration: none;"
                  >
                    <q-btn
                      flat
                      no-caps
                      dense
                      size="sm"
                      color="primary"
                      icon="mdi-directions"
                      label="Abrir no Maps"
                      class="q-mt-xs q-pl-none"
                    />
                  </a>
                </div>
              </div>

              <!-- Telefone -->
              <div v-if="placeData.phone" class="row items-center q-mb-md" style="gap: 8px;">
                <q-icon name="mdi-phone-outline" size="20px" color="primary" style="flex-shrink: 0;" />
                <div class="col">
                  <div class="text-caption text-grey-6 text-weight-medium">Telefone</div>
                  <a
                    :href="`tel:${placeData.phone}`"
                    style="text-decoration: none;"
                  >
                    <div
                      class="text-body2 text-weight-medium"
                      :class="$q.dark.isActive ? 'text-blue-3' : 'text-primary'"
                    >{{ placeData.phone }}</div>
                  </a>
                </div>
                <a :href="`tel:${placeData.phone}`" style="text-decoration: none;">
                  <q-btn
                    unelevated
                    rounded
                    no-caps
                    size="sm"
                    color="primary"
                    icon="mdi-phone"
                    label="Ligar"
                  />
                </a>
              </div>

            </q-card-section>

            <!-- Mapa -->
            <q-card-section class="q-pt-none">
              <div
                class="text-subtitle1 text-weight-bold q-mb-sm"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <q-icon name="mdi-map" class="q-mr-xs" />Localização
              </div>
              <GmapMap
                :center="{ lat: parseFloat(placeData.latitude), lng: parseFloat(placeData.longitude) }"
                :zoom="15"
                map-type-id="terrain"
                style="width: 100%; height: 280px; border-radius: 10px; overflow: hidden;"
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
                <GmapMarker
                  :position="{ lat: parseFloat(placeData.latitude), lng: parseFloat(placeData.longitude) }"
                  :clickable="true"
                  :draggable="false"
                />
              </GmapMap>
            </q-card-section>

          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogPlaces',
  props: {
    modalPlaces: {
      type: Boolean,
      required: true,
      default: () => false
    },
    placeData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<template>
  <q-page padding :class="$q.dark.isActive ? '': 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-py-md">
      Lista de <span class="text-accent">Locais</span>
    </div>
    <div class="row q-pb-md justify-center">
      <q-btn-group push>
        <q-btn
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
        />
        <q-btn
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map' }"
        />
      </q-btn-group>
    </div>
    <div class="row q-pb-md">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        :bg-color="$q.dark.isActive ? 'primary' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        map-options
        emit-value
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory" />
          </q-avatar>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" :class="$q.dark.isActive ? 'bg-primary' : 'white'">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="scope.opt.icon" />
              </q-avatar>
              <!-- <q-icon :name="scope.opt.icon" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="row justify-between">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        v-for="(place, index) in getPlaces"
        :key="index"
      >
        <q-card
          @click="openDialogCourse(place)"
          class="q-ma-xs"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <q-item>
            <q-item-section>
              <q-item-label
                class="text-bold text-primary"
                :class="$q.dark.isActive ? 'text-blue-2' : 'text-primary'"
              >{{
                place.title
              }}</q-item-label>
              <q-item-label class="caption">{{ place.address }}</q-item-label>
              <q-item-label caption v-if="place.preco">
                Preço:
                <q-rating
                  v-model="place.preco"
                  size="1rem"
                  icon="mdi-currency-usd"
                  color="green-5"
                  readonly
                />
              </q-item-label>
              <q-item-label class="text-caption text-weight-medium" v-if="place.phone">
                Telefone:
                {{ place.phone }}
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="place.icon" />
              </q-avatar>
            </q-item-section>
          </q-item>

          <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg"> -->
        </q-card>
      </div>
    </div>
    <dialog-places
      :modal-places="modalPlaces"
      :place-data="placeDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script src="./places.js"></script>

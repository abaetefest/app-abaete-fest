<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md q-pb-sm">
      Sobre a <span class="text-accent">Cidade</span>
    </div>
    <div class="row justify-center q-col-gutter-sm">
      <div
        class="col-sm-12 col-xs-12 col-md-12"
        v-for="(about, index) in aboutCity"
        :key="index"
      >
        <q-expansion-item
          class="shadow-1 overflow-hidden shadow-dark"
          group="services"
          :key="about.name"
          style="border-radius: 10px"
          :label="about.name"
          header-class="bg-primary text-white text-h6"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section
              class="q-pt-sm text-body1"
              v-html="about.text"
            >
            </q-card-section>

            <q-card-section
              class="q-pt-sm text-body1"
            >
              <q-img :src="`/about-city/${about.image}`">
              </q-img>
            </q-card-section>

            <q-card-section class="q-pt-sm text-caption">
              <a :href="about.link" :class="$q.dark.isActive ? 'text-white link-custom' : 'text-primary'">
                Fonte: {{ about.link }}
              </a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script src="./about-city.js"></script>

<style src="./about-city.css"></style>

<template>
  <q-page class="weather-page">
    <!-- Background image with gradient overlay -->
    <div class="fullscreen bg-image">
      <div class="gradient-overlay"></div>
    </div>

    <div class="content-container">

      <!-- Main weather glass card -->
      <div v-if="tempResult" class="glass-card q-pa-md">
        <div class="location-container q-pb-md">
          <div class="text-h5 text-weight-bold">{{ location }}</div>
          <div class="text-caption">{{ getCurrentDate() }}</div>
        </div>

        <!-- Main weather info -->
        <div class="row justify-center items-center q-py-md">
          <div class="col-12 col-sm-6 text-center">
              <img
                v-if="condition_slug"
                :src="`https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`"
                class="weather-icon q-mb-sm"
              >
            <div class="text-h2 text-weight-bold">{{ temp }}°C</div>
            <div class="text-subtitle1 q-mt-sm">{{ description }}</div>
          </div>
        </div>

        <!-- Weather details -->
        <div class="row q-col-gutter-md q-pt-md">
          <!-- Temperature Max -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="thermostat" color="red-5" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Temp. max</div>
                  <div class="text-subtitle1 text-weight-medium">{{ tempMax }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Temperature Min -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="ac_unit" color="blue-5" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Temp. min</div>
                  <div class="text-subtitle1 text-weight-medium">{{ tempMin }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Humidity -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="water_drop" color="blue-8" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Umidade</div>
                  <div class="text-subtitle1 text-weight-medium">{{ humidity }}%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Wind -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="air" color="grey-7" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Vento</div>
                  <div class="text-subtitle1 text-weight-medium">{{ windSpeed }}km/h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Moon phase -->
        <div class="row justify-center q-pt-lg">
          <div class="col-12 text-center">
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Fase da Lua</div>
            <img
              v-if="moon"
              :src="`https://assets.hgbrasil.com/weather/icons/moon/${moon}.png`"
              class="moon-icon"
            >
            <div class="text-caption q-mt-sm">{{ moonPhaseText }}</div>
          </div>
        </div>
      </div>

      <!-- Skeleton loading state -->
      <div v-else class="glass-card q-pa-md">
        <q-skeleton type="text" class="text-h5 q-mb-md" />

        <div class="row justify-center items-center q-py-md">
          <div class="col-12 col-sm-6 text-center">
            <q-skeleton type="QAvatar" size="80px" class="q-mb-md" />
            <q-skeleton type="text" class="text-h2" />
            <q-skeleton type="text" class="q-mt-sm" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-pt-md">
          <div class="col-6 col-sm-3" v-for="i in 4" :key="i">
            <q-skeleton height="60px" square />
          </div>
        </div>

        <div class="row justify-center q-pt-lg">
          <div class="col-12 text-center">
            <q-skeleton type="text" width="30%" class="q-mb-sm" />
            <q-skeleton type="QAvatar" size="60px" class="q-my-md" />
            <q-skeleton type="text" width="40%" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./climate.js"></script>

<style  src="./climate.css"></style>

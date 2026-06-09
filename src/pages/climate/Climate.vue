<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">

    <div class="text-h5 text-bold text-center q-py-md">
      Clima em <span class="text-accent">Abaetetuba</span>
    </div>

    <!-- Conteúdo -->
    <div v-if="tempResult">

      <!-- Card principal -->
      <q-card flat bordered class="q-mb-sm" style="border-radius: 16px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
        <q-card-section>

          <!-- Localização e data -->
          <div class="row items-center q-mb-md">
            <q-icon name="mdi-map-marker" color="primary" size="20px" class="q-mr-xs" />
            <div>
              <div class="text-subtitle1 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">
                {{ location }}
              </div>
              <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">
                {{ getCurrentDate() }}
              </div>
            </div>
          </div>

          <q-separator :class="$q.dark.isActive ? 'bg-grey-8' : 'bg-grey-3'" class="q-mb-md" />

          <!-- Ícone + temperatura + descrição -->
          <div class="text-center q-py-sm">
            <img
              v-if="condition_slug"
              :src="`https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`"
              class="weather-icon q-mb-sm"
            />
            <div class="text-h2 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-10'">
              {{ temp }}°C
            </div>
            <div class="text-subtitle1 q-mt-xs" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'">
              {{ description }}
            </div>
          </div>

        </q-card-section>
      </q-card>

      <!-- Cards de detalhes -->
      <div class="row q-col-gutter-sm q-mb-sm">
        <div class="col-6 col-sm-3">
          <q-card flat bordered style="border-radius: 12px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
            <q-card-section class="q-pa-sm text-center">
              <q-icon name="mdi-thermometer-high" color="red-5" size="28px" />
              <div class="text-caption q-mt-xs" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">Máxima</div>
              <div class="text-subtitle1 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">{{ tempMax }}°C</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered style="border-radius: 12px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
            <q-card-section class="q-pa-sm text-center">
              <q-icon name="mdi-thermometer-low" color="blue-5" size="28px" />
              <div class="text-caption q-mt-xs" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">Mínima</div>
              <div class="text-subtitle1 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">{{ tempMin }}°C</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered style="border-radius: 12px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
            <q-card-section class="q-pa-sm text-center">
              <q-icon name="mdi-water-percent" color="blue-8" size="28px" />
              <div class="text-caption q-mt-xs" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">Umidade</div>
              <div class="text-subtitle1 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">{{ humidity }}%</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered style="border-radius: 12px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
            <q-card-section class="q-pa-sm text-center">
              <q-icon name="mdi-weather-windy" color="grey-6" size="28px" />
              <div class="text-caption q-mt-xs" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">Vento</div>
              <div class="text-subtitle1 text-weight-bold" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">{{ windSpeed }} km/h</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Fase da Lua -->
      <q-card flat bordered style="border-radius: 16px;" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
        <q-card-section class="text-center q-pa-md">
          <div class="text-subtitle1 text-weight-bold q-mb-sm" :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'">
            <q-icon name="mdi-moon-waning-crescent" size="18px" class="q-mr-xs" />
            Fase da Lua
          </div>
          <img
            v-if="moon"
            :src="`https://assets.hgbrasil.com/weather/icons/moon/${moon}.png`"
            class="moon-icon q-my-sm"
          />
          <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'">{{ moonPhaseText }}</div>
        </q-card-section>
      </q-card>

    </div>

    <!-- Estado de erro -->
    <div v-else-if="hasError" class="text-center q-pa-xl">
      <q-icon name="mdi-weather-cloudy-alert" size="80px" color="grey-4" />
      <div class="text-h6 text-grey-5 q-mt-md">Não foi possível carregar o clima</div>
      <q-btn
        outline
        rounded
        no-caps
        color="primary"
        icon="mdi-refresh"
        label="Tentar novamente"
        class="q-mt-md"
        @click="getWeather"
      />
    </div>

    <!-- Skeleton loading -->
    <div v-else>
      <q-card flat bordered class="q-mb-sm" style="border-radius: 16px;">
        <q-card-section>
          <q-skeleton type="text" width="50%" class="q-mb-xs" />
          <q-skeleton type="text" width="30%" class="q-mb-md" />
          <q-separator class="q-mb-md" />
          <div class="text-center q-py-sm">
            <q-skeleton type="QAvatar" size="100px" style="margin: 0 auto 16px;" />
            <q-skeleton type="text" width="40%" style="margin: 0 auto 8px;" />
            <q-skeleton type="text" width="60%" style="margin: 0 auto;" />
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-col-gutter-sm q-mb-sm">
        <div class="col-6 col-sm-3" v-for="i in 4" :key="i">
          <q-skeleton height="88px" style="border-radius: 12px;" />
        </div>
      </div>
      <q-skeleton height="110px" style="border-radius: 16px;" />
    </div>

  </q-page>
</template>

<script src="./climate.js"></script>
<style src="./climate.css"></style>

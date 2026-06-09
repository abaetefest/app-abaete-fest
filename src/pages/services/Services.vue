<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-1'">

    <div class="text-h5 text-bold text-center q-py-md">
      Telefones <span class="text-accent">Úteis</span>
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

    <!-- Cards de serviços -->
    <div v-if="getPlaces.length" class="row q-col-gutter-sm">
      <div
        class="col-12 col-sm-6 col-md-6"
        v-for="(service, index) in getPlaces"
        :key="index"
      >
        <q-card
          flat
          bordered
          class="service-card"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <q-card-section class="q-pa-md">

            <!-- Nome -->
            <div
              class="text-subtitle1 text-weight-bold q-mb-xs"
              :class="$q.dark.isActive ? 'text-blue-2' : 'text-primary'"
            >
              {{ service.name }}
            </div>

            <!-- Serviços oferecidos -->
            <div
              class="text-caption q-mb-md"
              :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'"
            >
              {{ service.TypeServices.join(' • ') }}
            </div>

            <!-- Botões de contato -->
            <div class="row items-center q-gutter-xs">
              <a
                v-if="service.wpp"
                :href="`https://api.whatsapp.com/send?phone=55${service.wpp}&text=Olá, encontrei você pelo app AbaetéFest.`"
                target="_blank"
                rel="noopener noreferrer"
                style="text-decoration: none;"
                @click="trackEventMixpanel(service)"
              >
                <q-btn unelevated rounded no-caps size="sm" color="positive" icon="mdi-whatsapp" label="WhatsApp" class="text-weight-bold" />
              </a>
              <a
                v-if="service.phone"
                :href="`tel:${service.phone}`"
                style="text-decoration: none;"
                @click="trackEventMixpanel(service)"
              >
                <q-btn unelevated rounded no-caps size="sm" color="primary" icon="mdi-phone" label="Ligar" class="text-weight-bold" />
              </a>
              <a
                v-if="service.instagram"
                :href="`https://www.instagram.com/${service.instagram}`"
                target="_blank"
                rel="noopener noreferrer"
                style="text-decoration: none;"
                @click="trackEventMixpanel(service)"
              >
                <q-btn unelevated rounded no-caps size="sm" color="purple-5" icon="mdi-instagram" label="Instagram" class="text-weight-bold" />
              </a>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-else>
      <div class="col-sm-10 col-xs-10 col-md-12 text-center text-h6">
        <q-img src="undraw/not-services.svg" style="max-width: 500px;" />
      </div>
      <div class="col-sm-12 col-xs-12 col-md-12 text-center text-h6 q-mt-md">
        Não há profissionais cadastrados nessa categoria.
      </div>
    </div>

  </q-page>
</template>

<script src="./services.js"></script>
<style src="./services.css"></style>

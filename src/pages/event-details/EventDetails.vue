<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : ''">
    <!-- Loading skeleton -->
    <div v-if="load" class="q-pa-md" style="padding-top: 10px;">
      <div class="bg-white rounded-borders shadow-2 overflow-hidden" :class="$q.dark.isActive ? 'bg-dark' : ''"
        style="max-width: 600px; margin: 0 auto;">
        <q-skeleton height="280px" />
        <div class="q-pa-lg">
          <q-skeleton type="text" class="text-h5" />
          <q-skeleton type="text" width="60%" class="q-mt-sm" />
          <q-skeleton type="text" width="40%" class="q-mt-sm" />
          <div class="q-mt-lg">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" width="80%" />
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do evento -->
    <div v-else style="padding-top: 10px;">
      <div class="bg-white rounded-borders shadow-2 overflow-hidden q-ma-md" :class="$q.dark.isActive ? 'bg-dark' : ''"
        style="max-width: 600px; margin: 0 auto !important;">

        <!-- Imagem principal -->
        <div class="relative-position">
          <q-img :src="event.image_url" :alt="`Imagem do evento ${event.name}`" fit="cover"
            placeholder-src="loadPlaceholder.png" style="border-radius: 10px;">
            <template #loading>
              <q-skeleton class="full-width full-height" />
            </template>
          </q-img>
        </div>

        <!-- Conteúdo principal -->
        <div class="q-pa-lg">
          <!-- Título -->
          <div class="text-h6 text-weight-bold q-mb-md text-grey-9" :class="$q.dark.isActive ? 'text-white' : ''">
            {{ event.name }}
          </div>

          <!-- Data e horário -->
          <div class="row q-gutter-sm q-mb-lg">
            <div class="col-12 col-sm">
              <q-card flat bordered class="q-pa-md bg-grey-1" :class="$q.dark.isActive ? 'bg-grey-9' : ''">
                <div class="row items-center q-gutter-sm">
                  <q-avatar color="primary" text-color="white" icon="mdi-calendar" size="sm" />
                  <div>
                    <div v-if="event.recurring && event.recurring_days && event.recurring_days.trim() !== ''">
                      <div class="text-caption text-grey-6 text-uppercase text-weight-medium">Dias do evento</div>
                      <div class="text-body2 text-weight-bold">{{ event.recurring_days }}</div>
                    </div>
                    <div v-else>
                      <div class="text-caption text-grey-6 text-uppercase text-weight-medium">Data</div>
                      <div class="text-body2 text-weight-bold">{{ formatDateString(event.start_date) }}</div>
                      <div class="text-caption text-grey-6">{{ formatHourString(event.start_date) }}</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>

            <div class="col-12 col-sm" v-if="event.location">
              <q-card flat bordered class="q-pa-md bg-grey-1" :class="$q.dark.isActive ? 'bg-grey-9' : ''">
                <div class="row items-center q-gutter-sm">
                  <q-avatar color="primary" text-color="white" icon="mdi-map-marker" size="sm" />
                  <div>
                    <div class="text-caption text-grey-6 text-uppercase text-weight-medium">Local</div>
                    <div class="text-body2 text-weight-bold">{{ event.location }}</div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>

          <!-- Estatísticas -->
          <div v-if="event.attendees_count || event.interested_count" class="row q-gutter-md items-center q-mb-lg">
            <div v-if="event.attendees_count" class="col-auto">
              <div class="row items-center q-gutter-xs">
                <q-icon name="mdi-account-group" color="primary" size="sm" />
                <span class="text-body2 text-grey-7">{{ event.attendees_count }} participantes</span>
              </div>
            </div>
            <div v-if="event.interested_count" class="col-auto">
              <div class="row items-center q-gutter-xs">
                <q-icon name="mdi-heart" color="red" size="sm" />
                <span class="text-body2 text-grey-7">{{ event.interested_count }} interessados</span>
              </div>
            </div>
          </div>

          <!-- Descrição -->
          <div v-if="event.description" class="q-mb-lg">
            <div class="text-h6 text-primary q-mb-md">Sobre o evento</div>
            <div class="text-body2 line-height-md text-grey-8" :class="$q.dark.isActive ? 'text-grey-3' : ''"
              v-html="event.description"></div>
          </div>

          <!-- Informações adicionais -->
          <div class="q-mb-lg" v-if="event.organizer || event.duration || event.contact">
            <q-separator class="q-mb-md" />

            <div v-if="event.organizer" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-account-supervisor" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Organizador:</span>
              <span class="text-body2 text-weight-medium">{{ event.organizer }}</span>
            </div>

            <div v-if="event.duration" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-timer-outline" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Duração:</span>
              <span class="text-body2 text-weight-medium">{{ event.duration }}</span>
            </div>

            <div v-if="event.contact" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-phone" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Contato:</span>
              <span class="text-body2 text-weight-medium">{{ event.contact }}</span>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="q-gutter-y-sm">
            <div class="row q-gutter-sm">
              <div class="col-12 col-sm">
                <q-btn v-if="canShare" unelevated rounded color="primary" icon-right="mdi-share-variant"
                  label="Compartilhar" class="full-width" @click="shareApp" no-caps />
              </div>

              <div class="col-12 col-sm">
                <q-btn rounded color="grey-7" icon="mdi-calendar-plus" label="Adicionar ao calendário"
                  @click="addToCalendar" no-caps class="full-width" />
              </div>

              <div class="col-12 col-sm">
                <q-btn outline rounded color="primary" icon-right="mdi-arrow-left" label="Voltar" class="full-width"
                  no-caps @click="backToEvents" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./event-details.js"></script>

<style  src="./event-details.css"></style>

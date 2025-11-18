<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'" class="min-h-screen full-width overflow-x-hidden q-px-sm">
    <!-- Filtros -->
    <EventFilters
      :selected-category="categoria"
      :search-filter="filter"
      :selected-event-type="eventTypeFilter"
      :options="options"
      @update:selectedCategory="onCategoryChange"
      @update:searchFilter="onFilterChange"
      @update:selectedEventType="onEventTypeChange"
      @clear-filters="clearFilters"
    />

    <!-- Loading skeleton -->
    <div v-if="load && viewMode === 'compact'">
      <EventSkeleton :skeleton-count="6" />
    </div>

    <div v-if="load && viewMode === 'large'">
      <EventCardSkeleton :skeleton-count="6" />
    </div>

    <!-- Lista de eventos -->
    <div v-else>
      <!-- Contador de eventos e botão de visualização -->
      <div class="row items-center justify-center q-mb-md" v-if="!load && allEvents.length > 0">

        <!-- Botão de alternância de visualização -->
        <div class="col-12 q-mb-md">
          <q-btn-toggle
            v-model="viewMode"
            spread
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="grey-3"
            text-color="grey-7"
            :options="[
              { label: 'Compacto', value: 'compact', icon: 'mdi-view-list' },
              { label: 'Grande', value: 'large', icon: 'mdi-view-grid' }
            ]"
            class="view-toggle"
          />
        </div>

        <div class="col-auto">
          <q-chip
            color="primary"
            text-color="white"
            icon="mdi-calendar-multiple"
            class="text-weight-medium"
          >
            {{ getFilteredTotal() }} de {{ allEvents.length }} eventos
          </q-chip>
        </div>
      </div>

      <!-- Botão Novo Evento (se aplicável) -->
      <div class="text-center q-mb-lg" v-if="!load && canCreateEvent">
        <q-btn
          rounded
          size="lg"
          color="accent"
          icon="mdi-calendar-plus"
          label="NOVO EVENTO"
          class="new-event-btn q-px-xl q-py-sm text-weight-bold text-uppercase"
          style="border-radius: 16px; letter-spacing: 1px; font-size: 14px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transition: all 0.3s ease;"
          @click="createNewEvent"
        />
      </div>

      <!-- Eventos Recorrentes -->
      <div v-if="!load && recurringEvents.length > 0">
        <div
          class="text-h6  q-mb-md text-weight-bold"
          :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
        >
          <q-icon name="mdi-repeat" class="q-mr-sm" />
          Eventos recorrentes
        </div>

        <!-- Grid de eventos recorrentes - Visualização Compacta -->
        <div v-if="viewMode === 'compact'" class="row q-mb-lg">
          <div
            v-for="event in recurringEvents"
            :key="event.id"
            class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
          >
            <EventCard
              :event="event"
              :category-options="options"
              @click="detailsEvent"
            />
          </div>
        </div>

        <!-- Grid de eventos recorrentes - Visualização Grande -->
        <div v-else class="row q-mb-lg">
          <div
            v-for="event in recurringEvents"
            :key="event.id"
            class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
          >
            <EventCardLarge
              :event="event"
              :category-options="options"
              @click="detailsEvent"
            />
          </div>
        </div>
      </div>

      <!-- Eventos Normais -->
      <div v-if="!load && normalEvents.length > 0">
        <div class="text-h6  q-mb-md text-weight-bold"
          :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
        >
          <q-icon name="mdi-calendar" class="q-mr-sm" />
          Eventos únicos
        </div>

        <!-- Grid de eventos normais - Visualização Compacta -->
        <div v-if="viewMode === 'compact'" class="row q-mb-xl">
          <div
            v-for="event in normalEvents"
            :key="event.id"
            class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
          >
            <EventCard
              :event="event"
              :category-options="options"
              @click="detailsEvent"
            />
          </div>
        </div>

        <!-- Grid de eventos normais - Visualização Grande -->
        <div v-else class="row q-mb-xl">
          <div
            v-for="event in normalEvents"
            :key="event.id"
            class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
          >
            <EventCardLarge
              :event="event"
              :category-options="options"
              @click="detailsEvent"
            />
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <EmptyState v-if="!load && filteredEvents.length === 0" />

      <!-- Botão de voltar ao topo
      <q-btn
        v-if="filteredEvents.length > 6"
        fab
        color="primary"
        icon="mdi-chevron-up"
        class="fixed-bottom-right q-mb-xl q-mr-md back-to-top"
        style="border-radius: 50%; width: 56px; height: 56px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; z-index: 1000;"
        @click="scrollToTop"
      />

    -->
    </div>

    <!-- Dialog de detalhes (se necessário) -->
    <dialog-course-details
      :modal-course="modalCourse"
      :course-data="courseDetails"
      @close="closeModal"
    />

    <!-- Tutorial de eventos recorrentes -->
    <TutorialRecurringEvents
      :show="showRecurringTutorial"
      @close="closeRecurringTutorial"
    />
  </q-page>
</template>

<script src="./events.js"></script>

<style  src="./events.css"></style>

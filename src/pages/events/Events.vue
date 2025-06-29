<template>
  <q-page :class="[$q.dark.isActive ? '' : 'bg-grey-1', 'events-page']">
    <!-- Filtros -->
    <EventFilters
      :selected-category="categoria"
      :search-filter="filter"
      :options="options"
      @update:selectedCategory="onCategoryChange"
      @update:searchFilter="onFilterChange"
      @clear-filters="clearFilters"
    />

    <!-- Loading skeleton -->
    <div v-if="load" class="q-pa-md">
      <EventSkeleton :skeleton-count="6" />
    </div>

    <!-- Lista de eventos -->
    <div v-else class="q-px-md">
      <!-- Contador de eventos -->
      <div class="text-center q-mb-md" v-if="allEvents.length > 0">
        <q-chip
          color="primary"
          text-color="white"
          icon="mdi-calendar-multiple"
          class="text-weight-medium"
        >
          {{ filteredEvents.length }} de {{ allEvents.length }} eventos
        </q-chip>
      </div>

      <!-- Botão Novo Evento (se aplicável) -->
      <div class="text-center q-mb-lg" v-if="canCreateEvent">
        <q-btn
          rounded
          size="lg"
          color="accent"
          icon="mdi-calendar-plus"
          label="NOVO EVENTO"
          class="new-event-btn q-px-xl q-py-sm text-weight-bold"
          @click="createNewEvent"
        />
      </div>

      <!-- Grid de eventos -->
      <div class="event-list">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          :category-options="options"
          @click="detailsEvent"
        />
      </div>

      <!-- Estado vazio -->
      <EmptyState v-if="filteredEvents.length === 0" />
    </div>

    <!-- Dialog de detalhes (se necessário) -->
    <dialog-course-details
      :modal-course="modalCourse"
      :course-data="courseDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script src="./events.js"></script>

<style src="./events.css"></style>

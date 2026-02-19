<template>
  <div class="rounded-borders q-pt-md q-mb-lg" :class="$q.dark.isActive ? '' : ''" >
    <div class="col-12 text-h4 text-bold text-center q-mb-md">
      <span class="text-accent">Eventos</span> na cidade
    </div>

    <div class="row q-col-gutter-md items-end justify-center">
      <!-- Filtro de categoria -->
      <div class="col-12 col-sm-4">
        <q-select
          outlined
          rounded
          v-model="categoryModel"
          :options="options"
          label="Selecione uma categoria"
          :bg-color="$q.dark.isActive ? 'primary' : 'white'"
          :label-color="$q.dark.isActive ? 'white' : 'primary'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
          map-options
          emit-value
          dense
        >
          <template v-slot:prepend>
            <q-avatar
              rounded
              :icon="getIconCategory"
              size="40px"
              :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
            />
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              :class="$q.dark.isActive ? 'bg-primary' : 'white'"
              dense
            >
              <q-item-section avatar>
                <q-avatar rounded :icon="scope.opt.icon" size="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold" v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- Filtro de tipo de evento -->
      <div class="col-12 col-sm-4">
        <q-select
          outlined
          rounded
          v-model="eventTypeModel"
          :options="eventTypeOptions"
          label="Tipo de evento"
          :bg-color="$q.dark.isActive ? 'primary' : 'white'"
          :label-color="$q.dark.isActive ? 'white' : 'primary'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
          map-options
          emit-value
          dense
        >
          <template v-slot:prepend>
            <q-avatar
              rounded
              :icon="getIconEventType"
              size="40px"
              :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
            />
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              :class="$q.dark.isActive ? 'bg-primary' : 'white'"
              dense
            >
              <q-item-section avatar>
                <q-avatar rounded :icon="scope.opt.icon" size="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold" v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- Campo de busca -->
      <div class="col-12 col-sm-4">
        <q-input
          outlined
          rounded
          dense
          debounce="300"
          v-model="searchModel"
          label="Pesquisar eventos..."
          :label-color="$q.dark.isActive ? 'blue-3' : 'primary'"
        >
          <template v-slot:append>
            <q-icon
              name="mdi-magnify"
              :color="$q.dark.isActive ? 'blue-3' : 'primary'"
            />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventFilters',

  props: {
    selectedCategory: {
      type: String,
      default: 'all'
    },
    searchFilter: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    selectedEventType: {
      type: String,
      default: 'all'
    }
  },

  emits: ['update:selectedCategory', 'update:searchFilter', 'update:selectedEventType', 'clear-filters'],

  data() {
    return {
      eventTypeOptions: [
        { label: 'Todos os Eventos', value: 'all', icon: 'mdi-calendar-multiple' },
        { label: 'Eventos Recorrentes', value: 'recurring', icon: 'mdi-repeat' },
        { label: 'Eventos Únicos', value: 'normal', icon: 'mdi-calendar' }
      ]
    }
  },

  computed: {
    getIconCategory() {
      const img = this.options.filter(
        (opt) => opt.value === this.selectedCategory
      )
      return img[0] ? img[0].icon : 'mdi-calendar'
    },

    getIconEventType() {
      const img = this.eventTypeOptions.filter(
        (opt) => opt.value === this.selectedEventType
      )
      return img[0] ? img[0].icon : 'mdi-calendar-multiple'
    },

    categoryModel: {
      get() {
        return this.selectedCategory
      },
      set(value) {
        this.$emit('update:selectedCategory', value)
      }
    },

    searchModel: {
      get() {
        return this.searchFilter
      },
      set(value) {
        this.$emit('update:searchFilter', value)
      }
    },

    eventTypeModel: {
      get() {
        return this.selectedEventType
      },
      set(value) {
        this.$emit('update:selectedEventType', value)
      }
    }
  },

  methods: {
    clearFilters() {
      this.$emit('update:selectedCategory', 'all')
      this.$emit('update:searchFilter', '')
      this.$emit('update:selectedEventType', 'all')
      this.$emit('clear-filters')
    }
  }
}
</script>

<style scoped>
/* Removido .custom-font - usando apenas classes Quasar */
</style>

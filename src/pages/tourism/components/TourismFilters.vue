<template>
  <div class="rounded-borders q-pt-md q-mb-lg" :class="$q.dark.isActive ? '' : ''" >
    <div class="col-12 text-h4 text-bold text-center q-mb-md">
      Pontos <span class="text-accent">Turísticos</span>
    </div>

    <div class="row q-col-gutter-md items-end justify-center">
      <!-- Campo de busca -->
      <div class="col-12 col-sm-6">
        <q-input
          outlined
          rounded
          dense
          debounce="300"
          v-model="searchModel"
          label="Pesquisar pontos turísticos..."
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
  name: 'TourismFilters',

  props: {
    searchFilter: {
      type: String,
      default: ''
    }
  },

  emits: ['update:searchFilter', 'clear-filters'],

  computed: {
    searchModel: {
      get() {
        return this.searchFilter
      },
      set(value) {
        this.$emit('update:searchFilter', value)
      }
    }
  },

  methods: {
    clearFilters() {
      this.$emit('update:searchFilter', '')
      this.$emit('clear-filters')
    }
  }
}
</script>

<style scoped>
/* Removido .custom-font - usando apenas classes Quasar */
</style>

<template>
  <div class="q-pt-md row">
    <div class="col-12 text-h4 text-bold text-center custom-font q-mb-md">
      <span class="text-accent">Eventos</span> na cidade
    </div>

    <!-- Filtro de categoria -->
    <q-select
      outlined
      rounded
      v-model="categoryModel"
      :options="options"
      label="Selecione uma categoria"
      class="q-mb-md col-12 col-sm-6"
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

    <!-- Campo de busca -->
    <div class="col-12 col-sm-6">
      <q-input
        outlined
        rounded
        dense
        debounce="300"
        v-model="searchModel"
        label="Pesquisar eventos..."
        class="q-mb-md"

        :label-color="$q.dark.isActive ? 'blue-3' : 'primary'"
      >
        <template v-slot:append>
          <q-icon
            name="mdi-magnify"
            :color="$q.dark.isActive ? 'blue-3' : 'primary'"
          />
        </template>
      </q-input>

      <!-- Botão para limpar filtros
      <q-btn
        v-if="selectedCategory !== 'all' || searchFilter"
        round
        color="grey-5"
        icon="mdi-close"
        size="sm"
        class="q-mb-md"
        @click="clearFilters"
      >
        <q-tooltip>Limpar filtros</q-tooltip>
      </q-btn>
 -->
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
    }
  },

  emits: ['update:selectedCategory', 'update:searchFilter', 'clear-filters'],

  computed: {
    getIconCategory() {
      const img = this.options.filter(
        (opt) => opt.value === this.selectedCategory
      )
      return img[0] ? img[0].icon : 'mdi-calendar'
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
    }
  },

  methods: {
    clearFilters() {
      this.$emit('update:selectedCategory', 'all')
      this.$emit('update:searchFilter', '')
      this.$emit('clear-filters')
    }
  }
}
</script>

<style scoped>
.custom-font {
  font-family: "Roboto", sans-serif;
}
</style>

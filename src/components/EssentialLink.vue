<template>
  <q-item
    clickable
    exact
    :to="{ name: route }"
    :active-class="$q.dark.isActive ? 'text-primary bg-white': 'bg-grey-3 text-primary'"
  >
    <q-item-section
      v-if="icon"
      avatar
      :class="$q.dark.isActive ? ( isActive ? 'text-primary' : 'text-secondary') : 'text-primary'"
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ title }}
        <q-badge v-if="badge" color="orange" :label="badge" class="q-ml-xs" />
      </q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    route: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    badge: {
      type: String,
      default: ''
    },

    footer: {
      type: Boolean,
      default: false
    },

    alert: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    isActive() {
      return this.$route.name === this.route
    }
  }
}
</script>

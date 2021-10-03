<template>
  <div class="row q-col-gutter-sm justify-center q-pb-md">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-img
        class="rounded-borders cursor-pointer"
        src="banner_tecnologia.jpg"
        :ratio="19 / 4"
        @click="goTo('events')"
      />
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-img
        class="rounded-borders"
        src="banner_marketing.jpg"
        :ratio="19 / 4"
        @click="goTo('events')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Publicity',
  data () {
    return {
    }
  },
  methods: {
    goTo (menu) {
      this.$router.push({ name: menu.route, params: { type: menu.type } })
    }
  }
}
</script>

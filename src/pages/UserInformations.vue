<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12">
        <q-list bordered padding>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>
                Email: eng.patrickmonteiro@gmail.com
              </q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Habilitar Notificações</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="positive" v-model="notify" val="battery" @input="enableNotifications" />
            </q-item-section>
          </q-item> -->
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageUserInformations',
  data () {
    return {
      notify: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

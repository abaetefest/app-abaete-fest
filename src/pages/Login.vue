<template>
  <div class="row justify-center" style="height: 100vh">
    <transition name="fade">
      <div class="col-xs-12 col-sm-6 flex container-logo bg-grey-3">
        <div class="column self-center q-mx-auto">
          <img
            src="architecture-and-city.png"
            :width="$q.screen.gt.sm ? '400' : '140'"
          />
          <span
            class="text-center text-bold text-primary"
            :class="$q.screen.gt.sm ? 'text-h3' : 'text-h6'"
          >
            AbaetéFest
          </span>
          <!-- <div style="visibility: hidden;">
            Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
              from <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div> -->
          <!-- <p
            :class="$q.screen.gt.sm ? 'text-h3': 'text-h4'"
            class="text-center text-primary text-bold"
          >
            Capacita-Blu
          </p> -->
          <!-- <p class="text-center text-subtitle1">Ajude o banco de alimentos de Blumenau</p> -->
        </div>
      </div>
    </transition>
    <!-- <div class="column q-gutter-y-xs q-pa-lg self-center q-mx-auto"> -->
    <q-form
      @submit="onSubmit"
      class="column q-gutter-y-xs q-pa-lg self-center q-mx-auto"
      style="min-width: 350px"
    >
      <div
        class="text-center text-weight-bold"
        :class="$q.screen.gt.sm ? 'text-h5' : 'text-body1'"
      >
        <p>Acessar minha conta</p>
      </div>

      <q-input
        filled
        bottom-slots
        v-model="form.email"
        label="Email"
        :rules="[ val => val && val.length > 0 || 'Email obrigatório']"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email" />
        </template>
      </q-input>

      <!-- <q-input filled bottom-slots v-model="password" label="Password">
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
      </q-input> -->

      <q-input
        v-model="form.password"
        bottom-slots
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Senha"
        :rules="[ val => val && val.length > 0 || 'Senha obrigatória']"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn
        id="btn-login"
        rounded
        color="primary"
        size="lg"
        label="Acessar"
        :loading="loading1"
        type="submit"
      >
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>

      <q-separator class="q-my-sm" />
      <!-- <div class="divider"></div> -->
      <div class="row">
        <div class="col-12">
          <div class="row justify-center q-gutter-x-md">
            <div class="col-5">
              <!-- <q-btn
                class="float-right "
                size="12px"
                round
                color="blue-10"
                icon="mdi-facebook"
              />
            </div>

            <div class="col-5">
              <q-btn
                class=""
                size="12px"
                round
                color="red-8"
                icon="mdi-google"
              /> -->
            </div>
            <div class="col-12 text-center q-gutter-y-sm q-pt-md">
              <q-btn class="btn-fixed-width" flat rounded size="sm" label="Cadastre-se" @click="goToRegister" />
              <!-- <q-btn class="btn-fixed-width" flat rounded size="sm" label="Esqueci minha senha" /> -->
            </div>
          </div>
        </div>
      <!-- </div> -->
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      loading1: false,
      form: {
        email: '',
        password: ''
      },
      fade: true,
      isPwd: true
    }
  },
  methods: {
    // onSubmit () {
    //   // this.fade = false
    //   this.loading1 = true
    //   setTimeout(() => {
    //     this.loading1 = false
    //     // this.fade = true
    //     this.$router.push({ name: 'home' })
    //   }, 1000)
    // },
    async onSubmit () {
      this.loading1 = true
      try {
        const response = await this.$services.users().login({
          ...this.form
        })
        await localStorage.setItem('abaete-fest-token', response.data.token)
        this.$notifySuccess('Logado com sucesso!')
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
        this.loading1 = false
        this.$q.notify('Usuário ou senha incorreto.')
      }
    },
    goToRegister () {
      this.$router.push({ name: 'cadastro' })
    }
  }
}
</script>
<style>
div.container-logo {
  background-color: #ee2e5d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.2;
}
@media screen and (min-width: 320px) and (max-width: 737px) {
  div.container-logo {
    height: 183px !important;
    width: 100% !important;
  }
}

.btn-fixed-width {
  width: 200px
}
/* #btn-login {
  font-size: 16px !important ;
  font-weight: bold;
  height: 70px;
} */
.divider {
  border-top: 1px solid #ebecf3;
}
</style>

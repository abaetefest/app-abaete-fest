<template>
  <div class="row justify-center" style="height: 100vh">
    <transition name="fade">
      <div class="col-xs-12 col-sm-6 flex container-logo bg-grey-3">
        <div class="column self-center q-mx-auto">
          <img
            class="q-mx-auto q-pb-md"
            src="../assets/undraw_Profile_re_4a55.svg"
            :width="$q.screen.gt.sm ? '300' : '140'"
          />
          <p
            :class="$q.screen.gt.sm ? 'text-h3': 'text-h4'"
            class="text-center text-primary text-bold"
          >
            Nova Conta
          </p>
          <!-- <p class="text-center text-subtitle1">Ajude o banco de alimentos de Blumenau</p> -->
        </div>
      </div>
    </transition>
    <!-- <div class="column q-gutter-y-xs q-pa-lg self-center q-mx-auto" style="min-width: 350px"> -->
    <q-form
      @submit="onSubmit"
      class="column q-gutter-y-xs q-pa-lg self-center q-mx-auto" style="min-width: 350px"
    >
      <div
        class="text-center text-weight-bold"
        :class="$q.screen.gt.sm ? 'text-h5' : 'text-body1'"
      >
        Cadastrar nova conta
      </div>

      <q-input filled bottom-slots v-model="form.name" label="Nome" :rules="[ val => val && val.length > 0 || 'Nome obrigatório']">
        <template v-slot:prepend>
          <q-icon name="mdi-account" />
        </template>
      </q-input>

      <q-input filled bottom-slots v-model="form.email" label="Email" :rules="[ val => val && val.length > 0 || 'Email obrigatório']">
        <template v-slot:prepend>
          <q-icon name="mdi-email" />
        </template>
      </q-input>

      <q-input filled bottom-slots v-model="form.phone" label="Telefone" mask="(##) #####-####" :rules="[ val => val && val.length >= 15 || 'Telefone obrigatório']">
        <template v-slot:prepend>
          <q-icon name="mdi-phone" />
        </template>
      </q-input>

      <q-input filled bottom-slots v-model="form.birthday" label="Data de Nascimento" mask="##/##/####" :rules="[ val => val && val.length >= 10 || 'Data de nascimento obrigatória']">
        <template v-slot:prepend>
          <q-icon name="mdi-calendar" />
        </template>
      </q-input>

      <q-input v-model="form.password" filled bottom-slots :type="isPwd ? 'password' : 'text'" label="Senha" :rules="[ val => val && val.length > 0 || 'Senha obrigatória']">
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

      <q-input
        v-model="confirmPass"
        filled bottom-slots
        :type="isPwd2 ? 'password' : 'text'"
        label="Confirme a senha"
        :rules="[ val => val && val === form.password || 'Senhas não conferem']"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'mdi-eye-off' : 'mdi-eye'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>

      <q-btn
        id="btn-login"
        rounded
        color="primary"
        size="lg"
        label="Cadastrar"
        :loading="loading1"
        type="submit"
      >
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>

      <q-separator class="q-my-sm" />
      <div class="row">
        <div class="col-12">
          <div class="row justify-center q-gutter-x-md">
            <div class="col-12 text-center q-gutter-y-sm q-pt-md">
              <q-btn class="btn-fixed-width" flat rounded size="sm" label="Voltar" @click="backToLogin" />
              <!-- <q-btn class="btn-fixed-width" flat rounded size="sm" label="Esqueci minha senha" /> -->
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>
<script>
import { date } from 'quasar'
export default {
  name: 'PageRegister',
  data () {
    return {
      loading1: false,
      form: {
        name: '',
        email: '',
        password: '',
        phone: '',
        birth_date: ''
        // birthday: '',
        // type: 'USER',
        // active: true
      },
      confirmPass: '',
      fade: true,
      isPwd: true,
      isPwd2: true
    }
  },
  mounted () {
  },
  methods: {
    async onSubmit () {
      this.loading1 = true
      const birthday = date.extractDate(this.form.birth_date, 'DD/MM/YYYY')
      const formattedString = date.formatDate(birthday, 'YYYY-MM-DD')
      try {
        const response = await this.$services.users().register({
          user: {
            ...this.form,
            birth_date: formattedString
          }
        })
        await localStorage.setItem('abaete-fest-token', response.data.token)
        localStorage.setItem('abaete-manage', response.data.is_admin)
        this.$notifySuccess('Cadastro realizado com Sucesso!')
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
        this.loading1 = false
        this.$q.notify('Usuário ou senha incorreto.')
      }
    },
    backToLogin () {
      this.$router.push({ name: 'login' })
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

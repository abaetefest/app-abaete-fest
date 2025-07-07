<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12">
        <q-list bordered>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label>
                <strong>Email:</strong> {{ email || " Não identificado" }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple>
            <q-item-section>
              <q-item-label>
                <strong>Notificações:</strong> Para habilitar e desabilitar as
                notificações acesse as configurações do aplicativo em seu
                aparelho.
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script src="./user-informations.js"></script>

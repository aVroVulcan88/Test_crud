<template>
  <v-app>
    <v-app-bar app dark flat>
      <h1>Clients CRUD</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <TheTable @open-form="toggleForm"/>
      <v-dialog v-model="modalShown" width="600" v-if="modalShown">
        <UserForm @close="toggleForm" :client="clientToEdit"></UserForm>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import TheTable from './components/Table.vue';
import UserForm from './components/UserForm.vue';

const NEW_CLIENT_EMPTY = () => ({
  _id: '',
  name: '',
  email: '',
  phone: '',
  providers: []
});

export default {
  name: 'App',
  components: {
    TheTable,
    UserForm
  },
  data: () => ({
    modalShown: false,
    clientToEdit: NEW_CLIENT_EMPTY()
  }),
  methods: {
    toggleForm(client) {
      Object.assign(this.clientToEdit, client || NEW_CLIENT_EMPTY());
      this.modalShown = !this.modalShown;
    }
  }
};
</script>

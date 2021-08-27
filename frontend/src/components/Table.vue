<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-toolbar dark flat>
          <span>List of clients</span>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('open-form')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="formattedClients">
          <template v-slot:item.actions="{ item }">
            <v-btn
              class="mx-2" 
              fab 
              dark 
              small 
              color="primary"
              @click="() => $emit('open-form', item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn 
              class="mx-2" 
              fab 
              dark 
              small 
              color="error"
              @click="() => deleteEntity({ entity: 'client', _id: item._id })">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Table',
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Providers', value: 'providersString' },
      { text: '', value: 'actions', align: 'end' },
    ]
  }),
  created() {
    this.retrieveEntity({ entity: 'client' });
    this.retrieveEntity({ entity: 'provider' });
  },
  methods: {
    ...mapActions(['retrieveEntity', 'deleteEntity']),
  },
  computed: {
    ...mapGetters(['clients', 'providers']),

    formattedClients() {
      return this.clients.map(c => ({ 
        ...c, 
        providersString: c.providers.reduce((ac, en) => {
          const provider = this.providers.find(p => p._id === en);
          if (!provider) return ac;
          return ac += ac.length ? `, ${provider.name}` : provider.name;
        }, '') 
      }))
    },
  }
}
</script>
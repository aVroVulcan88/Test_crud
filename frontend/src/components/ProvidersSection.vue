<template>
  <v-container>
    <v-row class="mb-8">
      <v-text-field
        dense
        outlined
        v-model="newProviderName"
      ></v-text-field>
      <v-btn 
        size="sm" 
        class="ml-8"
        @click="addProvider"
        :disabled="addBtnDisabled">Add Provider</v-btn>
    </v-row>
    <provider-row 
      v-for="provider in providers" 
      :key="provider.key" 
      :provider="provider"/>
  </v-container>
</template>

<script>
import ProviderRow from './ProviderRow.vue';
import { mapActions } from 'vuex';

export default {
  name: "ProvidersSection",
  props: {
    providers: {
      type: Array,
      required: true,
    },
  },
  components: { 
    ProviderRow 
  },
  data: () => ({
    newProviderName: ''
  }),
  computed: {
    addBtnDisabled() {
      return this.newProviderName.length < 2;
    }
  },
  methods: {
    ...mapActions(['createEntity']),

    addProvider() {
      const data = { name: this.newProviderName };
      const entity = 'provider';
      this.createEntity({ entity, data })
    }
  }
};
</script>

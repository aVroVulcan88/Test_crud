<template>
  <v-row align="center" class="my-n8 py-0">
    <v-col cols="6" class="py-0">
      <v-text-field v-if="isEditing" v-model="nameModel"/>
      <v-checkbox v-model="provider.isSelected" :label="provider.name" v-else/>
    </v-col>
    <v-col cols="4" class="py-0">
      <v-btn
        v-if="!isEditing"
        class="mx-2"
        fab
        dark
        x-small
        color="primary"
        @click="toggleProviderEdition"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mx-2"
        fab
        dark
        x-small
        color="green"
        @click="updateProvider"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-if="!isEditing"
        class="mx-2"
        fab
        dark
        x-small
        color="error"
        @click="deleteProvider"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mx-2"
        fab
        dark
        x-small
        color="error"
        @click="toggleProviderEdition"
      >
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProviderRow',
  props: {
    provider: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    isEditing: false,
    nameModel: ''
  }),
  methods: {
    ...mapActions(['deleteEntity','updateEntity']),
    ...mapMutations(['deleteProviderFromClients']),

    toggleProviderEdition() {
      this.nameModel = this.isEditing ? '' : this.provider.name;
      this.isEditing = !this.isEditing;
    },
    updateProvider() {
      const payload = {
        _id: this.provider._id,
        data: { name: this.nameModel },
        entity: 'provider'
      };
      this.updateEntity(payload)
        .then(() => this.isEditing = false)
    },
    deleteProvider() {
      this.deleteEntity({ entity: 'provider', _id: this.provider._id })
        .then(() => this.deleteProviderFromClients(this.provider._id))
    }
  }
}
</script>

<template>
  <v-card class="pb-2">
    <v-card-title>{{ formTitle }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field 
          label="Name" 
          type="text"
          dense
          outlined
          v-model="clientData.name"
          :error-messages="nameError"
          @input="$v.clientData.name.$touch()"
          @blur="$v.clientData.name.$touch()">
        </v-text-field>
        <v-text-field 
          label="Email" 
          type="email"
          dense
          outlined
          v-model="clientData.email" 
          :error-messages="emailError"
          @input="$v.clientData.email.$touch()"
          @blur="$v.clientData.email.$touch()"></v-text-field>
        <v-text-field 
          label="Phone"
          type="text"
          dense
          outlined
          v-model="clientData.phone"
          v-mask="'+#-###-###-##-##'"
          :error-messages="phoneError"
          @input="$v.clientData.phone.$touch()"
          @blur="$v.clientData.phone.$touch()"></v-text-field>
      </v-form>
      <ProvidersSection :providers="userProviders"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit" :disabled="$v.$invalid">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProvidersSection from './ProvidersSection.vue';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'UserForm',
  components: { ProvidersSection },
  mixins: [validationMixin],
  props: {
    client: Object,
    required: true
  },
  data: () => ({
    clientData: {
      _id: '',
      name: '',
      email: '',
      phone: '',
      providers: []
    },
    isRequesting: false
  }),
  validations: {
    clientData: {
      name: { required, minLength: minLength(2), maxLength: maxLength(50) },
      email: { required, email },
      phone: { required, minLength: minLength(16) }
    }
  },
  created() {
    _.assign(this.clientData, this.client);
  },
  computed: {
    ...mapGetters(['providers']),

    userProviders() {
      return this.providers.map(p => ({
        ...p,
        isSelected: this.clientData.providers.includes(p._id),
        key: `${p.name} + ${p._id}`
      }))
    },
    isNewClient() {
      return !this.clientData._id;
    },
    formTitle() {
      return this.isNewClient ? 'Create Client' : 'Edit Client';
    },
    sumbitAction() {
      return this.isNewClient ? this.createEntity : this.updateEntity;
    },
    submitArgs() {
      const data = _.pick(this.clientData, ['name', 'email', 'phone'])
      data.providers = this.userProviders.filter(up => up.isSelected).map(up => up._id);
      const args = { entity: 'client', data };
      if (!this.isNewClient) {
        args._id = this.clientData._id;
      }
      return args;
    },
    nameError() {
      if (!this.$v.clientData.name.$dirty) return '';
      if (!this.$v.clientData.name.required) return 'Name is required';
      if (!this.$v.clientData.name.minLength) return 'At least 2 characters required';
      if (!this.$v.clientData.name.maxLength) return 'More than 50 characters are not allowed';
    },
    emailError() {
      if (!this.$v.clientData.email.$dirty) return '';
      if (!this.$v.clientData.email.required) return 'Email is required';
      if (!this.$v.clientData.email.email) return 'Should be a valid email format';
    },
    phoneError() {
      if (!this.$v.clientData.phone.$dirty) return '';
      if (!this.$v.clientData.phone.required) return 'Email is required';
      if (!this.$v.clientData.phone.minLength) return 'Should be a valid phone number';
    }
  },
  methods: {
    ...mapActions(['createEntity', 'updateEntity']),

    submit() {
      this.isRequesting = true;
      this.sumbitAction(this.submitArgs)
        .then(() => this.$emit('close'))
        .finally(() => this.isRequesting = false)
    }
  }
}
</script>
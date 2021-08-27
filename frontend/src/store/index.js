import Vue from 'vue';
import _ from 'lodash';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    client: [],
    provider: []
  },
  getters: {
    clients: state => state.client,
    providers: state => state.provider
  },
  mutations: {
    storeEntity: (state, payload) => state[payload.entity] = payload.data,
    deleteEntity: (state, payload) => state[payload.entity] = state[payload.entity]
      .filter(e => e._id !== payload._id),
    addEntity: (state, payload) => state[payload.entity].unshift(payload.data),
    updateEntity: (state, payload) => {
      const newData = payload.data;
      const entityToUpdate = state[payload.entity].find(e => e._id === newData._id);
      _.assign(entityToUpdate, newData);
    },
    deleteProviderFromClients: (state, providerId) => state.client.forEach(c => {
      c.providers = c.providers.filter(p => p._id !== providerId);
    }),
  },
  actions: {
    retrieveEntity: ({ commit }, payload) => new Promise((resolve, reject) => {
      const { entity, shouldReject } = payload;
      return api.get(entity)
        .then(({ data }) => {
          commit('storeEntity', { entity, data });
          resolve();
        })
        .catch(e => {
          if (shouldReject) return reject();
          const message = _.get(e, 'response.data', '');
          Vue.toasted.error(`Failed to retrieve ${entity}. ${message}`)
        })
    }),

    deleteEntity: ({ commit }, payload) => new Promise((resolve, reject) => {
      const { _id, entity, shouldReject } = payload;
      return api.delete(entity, _id)
        .then(() => {
          commit('deleteEntity', { entity, _id });
          resolve();
        })
        .catch(e => {
          if (shouldReject) return reject();
          const message = _.get(e, 'response.data', '');
          Vue.toasted.error(`Failed to delete ${entity}. ${message}`)
        })
    }),

    createEntity: ({ commit }, payload) => new Promise((resolve, reject) => {
      const { data, entity, shouldReject } = payload;
      return api.create(entity, data)
        .then(({ data }) => {
          commit('addEntity', { entity, data });
          resolve();
        })
        .catch(e => {
          if (shouldReject) return reject();
          const message = _.get(e, 'response.data', '');
          Vue.toasted.error(`Failed to create ${entity}. ${message}`)
        })
    }),

    updateEntity: ({ commit }, payload) => new Promise((resolve, reject) => {
      const { data, _id, entity, shouldReject } = payload;
      return api.update(entity, _id, data)
        .then(({ data }) => {
          commit('updateEntity', { entity, data });
          resolve();
        })
        .catch(e => {
          if (shouldReject) return reject();
          const message = _.get(e, 'response.data', '');
          Vue.toasted.error(`Failed to update ${entity}. ${message}`)
        })
    })
  }
});

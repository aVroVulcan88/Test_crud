import axios from 'axios';

const ENDPOINT = '/api';

export default {
  get: (entity) => axios.get(`${ENDPOINT}/${entity}`),
  create: (entity, data) => axios.post(`${ENDPOINT}/${entity}`, data),
  delete: (entity, id) => axios.delete(`${ENDPOINT}/${entity}/${id}`),
  update: (entity, id, data) => axios.put(`${ENDPOINT}/${entity}/${id}`, data),
}
const mongoose = require('mongoose');
const { pick } = require('lodash');

const { Schema, model, Types } = mongoose;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /[a-z\s\d]{2,50}/i.test(v),
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i.test(v),
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\+[\d-]{15,15}/i.test(v),
    },
  },
  providers: [{ type: Types.ObjectId, ref: 'Provider' }],
}, { timestamps: true });

ClientSchema.statics.GET = async function getClients(payload) {
  const query = {};
  if (payload._id) query._id = payload._id;
  const data = await this.find(query).sort({ createdAt: -1 }).lean();
  return { data };
};

ClientSchema.statics.POST = async function createClient(payload) {
  const newClientData = pick(payload.data, ['name', 'email', 'phone', 'providers']);
  const count = await this.countDocuments({ email: newClientData.email });
  if (count !== 0) {
    throw new Error(`Client with email ${newClientData.email} already exists`);
  }
  const newClient = await this.create(newClientData);
  return { status: 201, data: newClient.toObject() };
};

ClientSchema.statics.PUT = async function updateClient(payload) {
  const { _id } = payload;
  const updateData = pick(payload.data, ['name', 'email', 'phone', 'providers']);
  const existingClient = await this.findOne({ email: updateData.email }).lean();
  if (existingClient && existingClient._id.toString() !== _id) {
    throw new Error(`Client with email ${updateData.email} already exists`);
  }
  const updatedClient = await this.findOneAndUpdate({ _id }, { $set: updateData },
    { new: true, runValidators: true });
  return { data: updatedClient.toObject() };
};

ClientSchema.statics.DELETE = async function deleteClient(payload) {
  const { _id } = payload;
  await this.deleteOne({ _id });
  return { status: 200 };
};

ClientSchema.index({ email: 1 }, { unique: true });

module.exports = model('Client', ClientSchema);

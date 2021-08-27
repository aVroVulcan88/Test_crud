const mongoose = require('mongoose');
const { pick } = require('lodash');
const { models } = require('./index');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /[a-z\s\d]{2,50}/i.test(v),
    },
  },
}, { timestamps: true });

ProviderSchema.statics.GET = async function getProviders(payload) {
  const query = {};
  if (payload._id) query._id = payload._id;
  const data = await this.find(query).lean();
  return { data };
};

ProviderSchema.statics.POST = async function createProvider(payload) {
  const newProviderData = pick(payload.data, ['name']);
  const count = await this.countDocuments({ name: newProviderData.name });
  if (count !== 0) {
    throw new Error(`Provider ${newProviderData.name} already exists`);
  }
  const newProvider = await this.create(newProviderData);
  return { status: 201, data: newProvider.toObject() };
};

ProviderSchema.statics.PUT = async function updateProvider(payload) {
  const { _id } = payload;
  const updateData = pick(payload.data, ['name']);
  const existingProvider = await this.findOne({ name: updateData.name }).lean();
  if (existingProvider && existingProvider._id.toString() !== _id) {
    throw new Error(`Provider ${updateData.name} already exists`);
  }
  const updatedProvider = await this.findOneAndUpdate({ _id }, { $set: updateData },
    { new: true, runValidators: true });
  return { data: updatedProvider.toObject() };
};

ProviderSchema.statics.DELETE = async function deleteProvider(payload) {
  const { _id } = payload;
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await models.client.updateMany({ providers: { $in: [_id] } },
      { $pull: { providers: _id } }, { session });
    await this.deleteOne({ _id }, { session });
  });
  session.endSession();
  return { status: 200 };
};

ProviderSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Provider', ProviderSchema);

const fs = require('fs');
const path = require('path');

const models = {};

exports.loadModels = () => {
  const sources = fs.readdirSync(__dirname)
    .filter((f) => f !== 'index.js');

  sources.forEach((s) => {
    const model = require(path.resolve(__dirname, s));
    models[model.modelName.toLowerCase()] = model;
  });
};

exports.models = models;

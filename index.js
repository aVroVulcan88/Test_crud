const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const logger = require('./logger');
const controller = require('./controller');
const { loadModels } = require('./models');
const swaggerDocs = require('./swagger');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', controller);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(config.MONGO_URL, mongooseOptions)
  .then(() => {
    logger.info('Connected to mongo. Loading models...');
    loadModels();
    app.listen(config.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.PORT}`);
    });
  });

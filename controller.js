const router = require('express').Router();
const { models } = require('./models');

router.use('/:entity/:id*?', async (req, res) => {
  const { entity, id } = req.params;
  const model = models[entity];
  if (!model) {
    return res.status(400).send(`No such entity: ${entity}`);
  }
  const handler = model[req.method];
  if (!handler) {
    return res.status(405).send();
  }
  try {
    const payload = { _id: id, data: req.body };
    const { status = 200, data } = await handler.call(model, payload);
    res.status(status).json(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;

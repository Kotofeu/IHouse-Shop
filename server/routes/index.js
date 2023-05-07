const Router = require('express');
const router = new Router();
const contactRouter = require('./contactRouter');
const workerRouter = require('./workerRouter');
const todosRouter = require('./todosRouter');

router.use('/contact', contactRouter);
router.use('/worker', workerRouter);
router.use('/todos', todosRouter);

module.exports = router;
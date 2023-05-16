const Router = require('express');
const router = new Router();
const workerController = require('../controllers/workerController');

router.post('/', workerController.create);
router.get('/', workerController.getAll);
router.get('/:id', workerController.getById);
module.exports = router;
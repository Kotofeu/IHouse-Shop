const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.post);
router.delete('/', typeController.delete);
router.get('/', typeController.getAll);
router.get('/:id', typeController.getById);
module.exports = router;
const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.post);
router.delete('/', categoryController.delete);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
module.exports = router;
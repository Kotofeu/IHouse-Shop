const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');

router.post('/', brandController.post);
router.delete('/', brandController.delete);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);
module.exports = router;
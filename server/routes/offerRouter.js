const Router = require('express');
const router = new Router();
const contactController = require('../controllers/offerController');

router.post('/', contactController.post);
router.delete('/', contactController.delete);
router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);
module.exports = router;
const Router = require('express');
const router = new Router();
const partnerController = require('../controllers/partnerController');

router.post('/', partnerController.post);
router.delete('/', partnerController.delete);
router.get('/', partnerController.getAll);
router.get('/:id', partnerController.getById);
module.exports = router;
const Router = require('express');
const router = new Router();
const contactController = require('../controllers/offerController');

router.post('/', contactController.postOffer);
router.post('/goods', contactController.postGoodsAtOffer);
router.delete('/', contactController.deleteOffer);
router.delete('/goods', contactController.deleteGoodsAtOffer);
router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);
module.exports = router;
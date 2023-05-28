const Router = require('express');
const router = new Router();
const goodController = require('../controllers/goodController');


router.get('/info', goodController.getAllGoodInfo);
router.delete('/info', goodController.deleteGoodInfo);

router.get('/image', goodController.getAllGoodImage);
router.delete('/image', goodController.deleteGoodImage);
router.get('/image/:id', goodController.getGoodImageById);

router.post('/', goodController.postGood);
router.delete('/', goodController.deleteGood);
router.get('/', goodController.getAllGoods);
router.get('/:id', goodController.getGoodById);
module.exports = router;
const Router = require('express');
const router = new Router();
const goodController = require('../controllers/goodController');

/*router.post('/', goodController.create);
router.post('/update/', goodController.update);
router.delete('/', goodController.delete);*/
router.get('/', goodController.getAll);
router.get('/:id', goodController.getById);
module.exports = router;
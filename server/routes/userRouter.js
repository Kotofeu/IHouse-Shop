const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const basketController = require('../controllers/basketController')
const favouritesController = require('../controllers/favouritesController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/auth', authMiddleware, userController.edit)



router.post('/basket', basketController.postGoogInBasket);
router.get('/basket', basketController.getUserBasket);
router.delete('/basket', basketController.deleteGoodInBasket);
router.get('/basket/find-good', basketController.isGoodInUserBasket);


router.post('/favourites', favouritesController.postGoogInFavourites);
router.get('/favourites', favouritesController.getUserFavourites);
router.delete('/favourites', favouritesController.deleteGoodInFavourites);
router.get('/favourites/find-good', favouritesController.isGoodInUserFavourites);

module.exports = router
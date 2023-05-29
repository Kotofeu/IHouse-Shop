const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.postRating);
router.delete('/', ratingController.deleteRating);
router.get('/good', ratingController.getAllRatingByGood);
router.get('/user', ratingController.getAllRatingByUser);
router.delete('/image', ratingController.deleteRatingImage);

module.exports = router;
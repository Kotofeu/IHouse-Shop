const Router = require('express');
const router = new Router();
const goodRouter = require('./goodRouter');
const offerRouter = require('./offerRouter');
const partnerRouter = require('./partnerRouter');
const brandRouter = require('./brandRouter');

router.use('/good', goodRouter);
router.use('/complex_offer', offerRouter);
router.use('/partner', partnerRouter);
router.use('/brand', brandRouter);

module.exports = router;
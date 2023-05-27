const Router = require('express');
const router = new Router();
const goodRouter = require('./goodRouter');
const offerRouter = require('./offerRouter');
const partnerRouter = require('./partnerRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter');
const typeRouter = require('./typeRouter');

router.use('/good', goodRouter);
router.use('/complex_offer', offerRouter);
router.use('/partner', partnerRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/type', typeRouter);

module.exports = router;
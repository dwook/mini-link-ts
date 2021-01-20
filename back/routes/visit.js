const express = require('express');
const router = express.Router();
const visitController = require('../controller/visit');

router.get('/', visitController.getVisitCount);
router.post('/', visitController.postVisit);

module.exports = router;

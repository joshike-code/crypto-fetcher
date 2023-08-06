const fs = require('fs');
const express = require('express');
const {getAllCrypto, getCrypto, checkCoin} = require('../controllers/dataController');

const router = express.Router();

router.param('coin', checkCoin);

// router.route('/top-5-crypto').get(aliasTopCrypto, getAllCrypto);

router.route('/')
  .get(getAllCrypto);
  
router.route('/:coin')
  .get(getCrypto);

module.exports = router;
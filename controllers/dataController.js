const fs = require('fs');

const cryptoData = JSON.parse(fs.readFileSync(`${__dirname}/../crypto-data/cryptData.json`)) ? JSON.parse(fs.readFileSync(`${__dirname}/../crypto-data/cryptData.json`)) : [];

exports.checkCoin = (req, res ,next, val) => {
  val = val.toUpperCase();
  console.log(`Coin is: ${val}`);
  if (!cryptoData.some(el => el.coincode === val)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Coin not found'
    });
  };
  next();
};

exports.getAllCrypto = (req, res) => {
  console.log(req.requestTime);
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: cryptoData.length,
    data: {
      cryptoData: cryptoData
    }
  })
};


exports.getCrypto = (req, res) => {
  console.log(req.params.coin);
  const coin = String(req.params.coin).toUpperCase();
  const crypto = cryptoData.find(el => el.coincode === coin);

  res.status(200).json({
    status: 'success',
    results: crypto.length,
    data: {
      cryptoData: crypto
    }
  })
};


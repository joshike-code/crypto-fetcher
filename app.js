const express = require('express');
const morgan = require('morgan');

const dataRoutes = require('./routes/dataRoutes');
const userRouter = require('./routes/userRoutes');
const {scrape} = require('./scrapper.js');

const app = express();
// scrape();

// 1) MIDDLEWARE
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};
app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Note That res.json ends the request-response cycle and other middleware fns after it won't execute

// ROUTES
app.use('/api/v1/crypto', dataRoutes);
app.use('/api/v1/users', userRouter);

module.exports = app;















const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// const DB_local = process.env.DATABASE_LOCAL;

// mongoose.connect(DB_local, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(con => {
//   console.log('DB connection successful');
// });

const app = require('./app');
// console.log(process.env.DATABASE);
// console.log(process.env.DATABASE_PASSWORD);
// console.log(process.env.DATABASE_LOCAL);

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
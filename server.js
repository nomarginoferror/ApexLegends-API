const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load config file
dotenv.config({ path: './config.env' });
const app = express();

//Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Profile Routes
app.use('/api/v1/profile', require('./routes/profile'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running in ${process.env.NODE_ENV} Listening on port ${port}`);
});

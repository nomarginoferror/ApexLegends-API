const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

//Load config file
dotenv.config({ path: './config.env' });
const app = express();

//Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Profile Routes
app.use('/api/v1/profile', require('./routes/profile'));

//Serve static assets

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running in ${process.env.NODE_ENV} Listening on port ${port}`);
});

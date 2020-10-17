const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.URL.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to DB'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});

process.on('unhandledRejection', () => {
  console.log('something went wrong');
});

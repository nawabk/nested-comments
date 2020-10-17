const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const globalErroHandler = require('./controllers/errorController');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

app.use(globalErroHandler);

module.exports = app;

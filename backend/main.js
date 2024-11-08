const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const bookRouter = require('./server/BookServer');
const clubRouter = require('./server/ClubServer');
const userRouter = require('./server/UserServer');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', clubRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
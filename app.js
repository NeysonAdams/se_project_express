const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const {errorHandler} = require('./middlewares/error-handler');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { BadRequestError } = require("./utils/errors");

const app = express();
const {PORT = 3001} = process.env

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(()=>{
    console.log("Connected to DB")
  })
  .catch(console.error);

app.use(requestLogger);
app.use("/", mainRouter);


app.use(errorLogger);
app.use((req, res, next) => {
  next(new BadRequestError('Requested resource not found'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
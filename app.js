const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const { NOT_FOUND } = require("./utils/errorConstants");

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

app.use("/", mainRouter);

app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
  next();
});
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
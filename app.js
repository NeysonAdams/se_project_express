const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const {PORT = 3001} = process.env

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(()=>{
    console.log("Connected to DB")
  })
  .catch(console.error);

  app.use((req, res, next) => {
    req.user = {
      _id: '667e809e67253b24075117f7'// paste the _id of the test user created in the previous step
    };
    next();
  });


app.use("/", mainRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Requested resource not found' });
  next();
});
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
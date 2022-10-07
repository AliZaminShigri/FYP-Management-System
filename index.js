const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const route = require('./routes/routes')

app.use('/user', route)
//app.use('/', auth)
mongoose.connect(
  "mongodb://localhost:27017/My_Database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DataBase connected");
  }
);

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.listen(9000, () => {
  console.log("Session Started at port 9000");
});

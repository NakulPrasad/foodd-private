const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")

const morgan = require("morgan")

const port = process.env.port || 80;

const path = require('path')

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());

app.use(morgan(" common "));
app.use(cors());

const mongoDB = require("./db.js")

const connectToMongoDB = async () => {
  try {
    await mongoDB();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToMongoDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
      res.status(500).send(err);
    })
  })
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require("./Routes/CreateUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));


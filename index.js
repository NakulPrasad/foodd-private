const express = require('express')
const app = express()
const port = process.env.port || 5000;

const path = require('path')

//in nodejs we use require than import
const mongoDB = require("./db.js")
// Function to establish MongoDB connection and fetch data
const connectToMongoDB = async () => {
  try {
    await mongoDB();
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Call the connectToMongoDB function
connectToMongoDB();

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
    res.status(500).send(err);
  })
});


//for cors error, hitting api for thunder client
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://crazy-snaps-ray.cyclic.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//connecting our endpoint /api/createuser using mongoose model
app.use(express.json());
app.use('/api', require("./Routes/CreateUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));


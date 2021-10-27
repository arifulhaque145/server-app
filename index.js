require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lbdvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const collection = client.db("json_data").collection("users");
  const postCollection = client.db("json_data").collection("posts");

  app.get("/users", async (req, res) => {
    const users = await collection.find({}).toArray();
    res.json(users);
  });

  app.get("/posts", async (req, res) => {
    const users = await postCollection.find({}).toArray();
    res.json(users);
  });

  //   client.close();
});

app.listen(port, () => {
  console.log("Running server on ports", port);
});

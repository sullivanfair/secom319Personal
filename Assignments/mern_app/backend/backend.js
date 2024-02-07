var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const {MongoClient} = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const db = client.db("reactdata");

app.get("/getAllProducts", async (req, res) => {
    await client.connect();

    const query = {};

    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();

        console.log(results);
        res.status(200);
        res.send(results);
});

app.get("/getProductById/:id", async(req, res) => {
    const id = Number(req.params.id);

    await client.connect();

    const query = {"id": id};

    const results = await db
        .collection("fakestore_catalog")
        .findOne(query);

        console.log(results);
        if(!results)
        {
            res.send("Not Found").status(404);
        }
        else
        {
            res.send(results).status(200);
        }
});

app.post("/addProduct", async(req, res) => {
    await client.connect();

    const values = Object.values(req.body);

    const id = values[0];
    const title = values[1];
    const price = values[2];
    const descripion = values[3];
    const category = values[4];
    const image = values[5];
    const rate = values[6].rate;
    const count = values[6].count;

    const newProduct = 
    {
        "id": id,
        "title": title,
        "price": price,
        "description": descripion,
        "category": category,
        "image": image,
        "rating":
        {
            "rate": rate,
            "count": count
        }
    };

    const results = await db
        .collection("fakestore_catalog")
        .insertOne(newProduct);

    res.status(200);
    res.send(results);
});

app.delete("/deleteProduct/:id", async(req, res) => {
    const id = Number(req.params.id);

    await client.connect();

    const query = {"id": id};

    const results = await db
        .collection("fakestore_catalog")
        .deleteOne(query);

    res.status(200);
    res.send(results);
});

app.put("/updatePrice/:id", async (req, res) => {
    await client.connect();

    const id = Number(req.params.id);
    const newPrice = req.body.price;

    const getQuery = {"id": id};
    const updateQuery = {"price": newPrice};

    const results = await db
        .collection("fakestore_catalog")
        .findOneAndUpdate(
            { id: id }, // Query based on your ID field
            { $set: { price: newPrice } } // Update the price
        );

    res.status(200);
    res.send(results);
});
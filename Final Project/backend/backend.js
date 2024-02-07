const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const {createServer} = require("mysql2");

const app = express();

const PORT = 4000;
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
});

app.post("/addMovie", async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const rating = req.body.rating;
    const genre = req.body.genre;
    const imageName = req.body.imageName;
    const review = req.body.review;

    db.query(
        "INSERT INTO movies (name, description, rating, genre, image, review) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, rating, genre, imageName, review],
        (err, result) => {
            if(err)
            {
                console.log(err);
            }
            res.send(result);
        }
    );
});

app.get("/getAllMovies", async (req, res) => {
    db.query("SELECT * FROM movies", (err, result) => {
        if(err)
        {
            console.log(err);
        }
        res.send(result);
    });
});

app.get("/getByGenre/:genre", async (req, res) => {
    const genre = req.params.genre;

    db.query("SELECT * FROM movies WHERE genre = ?", genre, (err, result) => {
        if(err)
        {
            console.log(err);
        }
        res.send(result);
    });
});

app.put("/updateMovieReview/:id", async (req, res) => {
    const id = req.params.id;
    const newReview = req.body.review;

    db.query("UPDATE movies SET review = ? WHERE id = ?",
        [newReview, id], (err, result) => {
            if(err)
            {
                console.log(err);
            }
            res.send(result);
    });
});

app.put("/updateMovieRating/:id", async (req, res) => {
    const id = req.params.id;
    const newRating = req.body.rating;

    db.query("UPDATE movies SET rating = ? WHERE id = ?",
        [newRating, id], (err, result) => {
            if(err)
            {
                console.log(err);
            }
            res.send(result);
    });
});

app.delete("/deleteMovie/:id", async (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM movies WHERE id = ?",
        id,
        (err, result) => {
            if(err)
            {
                console.log(err);
            }
            res.send(result);
    });
});
const express = require("express");
const app = express();
const pool = require("./db");

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
});

app.use(express.json()) // => req.body

// ROUTES

// USERS

// create a user
app.post("/users", async(req, res) => {
    const { email, username, first_name, last_name, password, image } = req.body;
    
    try {
        const newUser = await pool.query(
            "INSERT INTO users (email, username, first_name, last_name, password, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [email, username, first_name, last_name, password, image]
        );
    
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }    
});

// delete a user
app.delete("/users/:username", async(req, res) => {
    try {
        const { username } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE username = $1", [username]);
        res.json("User was successfully deleted.");
    } catch (err) {
        console.error(err.message);
    }
});

// get all of a user's songs

// SONGS

// get all songs
app.get("/songs", async(req, res) => {
    try {
        const allSongs = await pool.query("SELECT * FROM songs");
        res.json(allSongs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a song
app.get("/songs/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const song = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
        res.json(song.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// create a song
app.post("/songs", async(req, res) => {
    const { artist, title, user_id } = req.body;
    const currentDate = new Date(); 
    
    try {
        const newSong = await pool.query(
            "INSERT INTO songs (artist, title, user_id, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [artist, title, user_id, currentDate]
        );
    
        res.json(newSong.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }    
});

// delete a song
app.delete("/songs/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteSong = await pool.query("DELETE FROM songs WHERE id = $1", [id]);
        res.json("Song was successfully deleted.");
    } catch (err) {
        console.error(err.message);
    }
});
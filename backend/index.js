const bcrypt = require('bcrypt');
const express = require("express");
const app = express();
const pool = require("./db");

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
});

app.use(express.json()) // => req.body

// ROUTES

// USER AUTH

// login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query('SELECT username, password FROM users WHERE username = $1', [username]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = result.rows[0];
  
      bcrypt.compare(String(password), String(user.password), (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (result) {
          res.json({ message: 'Password matches!' });
        } else {
          res.status(401).json({ error: 'Incorrect password.' });
        }
      });
    } catch (error) {
      console.error('Error authenticating:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  

// USERS

// create a user
app.post("/register", async(req, res) => {
    const { email, username, first, last, password } = req.body;
    
    try {
        const existingEmail = await pool.query('SELECT email FROM users WHERE email = $1', [email]);

        if (existingEmail.rows.length > 0) {
          return res.status(400).json({ error: 'Email already exists.' });
        }

        const existingUsername = await pool.query('SELECT username FROM users WHERE username = $1', [username]);

        if (existingUsername.rows.length > 0) {
          return res.status(400).json({ error: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (email, username, first, last, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [email, username, first, last, hashedPassword]
        );
    
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }    
});

// get user by id
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete a user
app.delete("/users/delete/:userId", async(req, res) => {
    try {
        const { userId } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);
        res.json("User was successfully deleted.");
    } catch (err) {
        console.error(err.message);
    }
});

// get all of a user's songs
app.get('/users/songs/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM songs WHERE user_id = $1', [userId]);
      const songs = result.rows;
  
      res.json(songs);
    } catch (error) {
      console.error('Error fetching user posts:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// SONGS

// get all songs
app.get("/songs/all", async(req, res) => {
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
app.delete("/songs/delete/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteSong = await pool.query("DELETE FROM songs WHERE id = $1", [id]);
        res.json("Song was successfully deleted.");
    } catch (err) {
        console.error(err.message);
    }
});
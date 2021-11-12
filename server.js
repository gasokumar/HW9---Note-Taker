
//DEPENDENCIES
const express = require("express");
const path = require("path")
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;

// Allows us to reference files with their relative path
// Example: http://localhost:3001/notes.html
app.use(express.static("public"));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')))
  
//Creating HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//Creating API routes


// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

//Initializing server
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
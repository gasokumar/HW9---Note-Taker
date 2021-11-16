
//DEPENDENCIES
const express = require("express");
const path = require("path")
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;
const notesJSON = require('./db/db.json');
//Constructing the data from the JSON found in db.json

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html')))
  
//Creating HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});




// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

//Creating API routes
app.get("/api/notes", (req, res) => {
  res.json(notesJSON);
});


//What am I doing wrong?
app.post("/api/notes", (req,res) => {
let note = (req.body);
let id = (notesJSON.length).toString(); // Making the id of the note the length of the json object.
note.id = id;
notesData = JSON.parse(fs.readFileSync("./db/db.json"));
notesData.push(note);
fs.writeFile("./db/db.json", JSON.stringify(notesData));
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
//Wildcard HTML route that will send the index file if any path is specified that's not already 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}
);

//Initializing server
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);

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
const notesData = JSON.parse(fs.readFileSync("./db/db.json"));
res.json(notesData)
});



app.post("/api/notes", (req,res) => {
let note = (req.body);
let id = (notesJSON.length).toString(); // Making the id of the note the length of the json object.
note.id = id;
const notesData = JSON.parse(fs.readFileSync("./db/db.json"));
notesData.push(note);
fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
res.json(notesData);
});


//Wildcard HTML route that will send the index file if any path is specified that's not already 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}
);

//Initializing server
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
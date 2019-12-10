const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/quotebook', {
  useNewUrlParser: true
});


// Create a scheme for items in the museum: a title and a path to an image.
const noteSchema = new mongoose.Schema({
  cat: Number,
  row: Number,
  notes:String,
});

// Create a model for items in the museum.
const Note = mongoose.model('Note', noteSchema);


// Create a new note int the book
app.post('/api/notes', async (req, res) => {
  const note = new Note({
    cat: req.body.cat,
    row: req.body.row,
    notes: req.body.notes,
  });
  console.log(note.notes);
  try {
    await note.save();
    res.send(note);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/notes', async (req, res) => {
  try {
    var i = {
      cat:req.body.cat,
      row:req.body.row,
    }
    let note = await Note.findOne(i);
    res.send(note.notes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/*app.put('/api/notes/:id', async(req,res)=>{
  //console.log(req.body.title);
  //console.log(req.params.id);
  var i = {
    _id: req.params.id,
  };
  //console.log(i);
   var item = await Item.findOne(i);
  item.title = req.body.title;
  item.descrip = req.body.descrip;
  item.save();
  
});*/

app.listen(3000, () => console.log('Server listening on port 3000!'));
const express = require("express");
const app = new express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/todolistDB", { useUnifiedTopology: true,  useNewUrlParser: true })
const itemSchema = new mongoose.Schema({
  name: String
})
const Item = mongoose.model ("Item", itemSchema)
const item1 = new Item ({
  name: "Welcome toTo Do List"
})
const item2 = new Item ({
  name: "Hit the first button to add a new item"
})
const item3 = new Item ({
  name: "Hit this to delete an item"
})

const defaultItems = [item1, item2 , item3];
//

app.get("/", function (req, res) {
  var today = new Date();

      var options = {
          weekday: "long",
          day: "numeric",
          month: "long"
      }
      var day = today.toLocaleDateString("en-US", options)

Item.find({}, function(err, items) {
  if(items.length === 0) {
    Item.insertMany(defaultItems, function (err) {
      if(err)
      {
        console.log(err)
      }
      else {
        console.log ("item added successfully")
      }
    });
    res.redirect("/")
  }
  else {
    // mongoose.connection.close()
    res.render("list", {
        kindofday: day, newListItem: items})
  }
})

});

app.post("/", function (req, res) {
    var itemName = req.body.newItem

const item =new Item  ({
  name: itemName
});
item.save();
res.redirect("/")
});
app.post ("/delete", function(req, res) {
  const checkedItemID = req.body.checkbox
  Item.findByIdAndRemove(checkedItemID, function(err) {
    if (err) {
      console.log (err)
    }
    else {
      console.log ("successfully deleted check")
      res.redirect("/")
    }
  })
});


app.listen(3000, function () {
    console.log("Server is running");
})

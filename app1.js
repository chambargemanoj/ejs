const express = require("express");
const app = new express();
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))

var items = []
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options)
  
    res.render("list", {
        kindofday: day, newListItem: items})

});

app.post("/", function (req, res) {
    var item = req.body.newItem
   items.push(item)

   res.redirect("/")
})

app.listen(port, function () {
    console.log("Server is running");
})

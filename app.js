const express = require("express");
const app = new express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.get("/", function (req, res) {

    var today = new Date();
    var day = ""
    var currentDay = today.getDay()
    console.log ("current day "+ currentDay )
    switch (currentDay) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;

        default:
            console.log("Error current date")
    }
    res.render("list", {kindofday: day} )

});

app.listen(3000, function () {
    console.log("Server is running");
})
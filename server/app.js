var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Skicka OK för preflight
    }

    next();

});
// Här har vi så att den request som kommer in skickas till rätt rutt("route")
app.use("/carts", require("./routes/cartsRoute"));
app.use("/users", require("./routes/usersRoute"));
app.use("/products", require("./routes/productsRoute"));
app.use("/categories", require("./routes/categoriesRoute"));
app.use("/ratings", require("./routes/ratingsRoute"));
module.exports = app;

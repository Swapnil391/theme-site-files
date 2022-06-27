'use strict';
var express = require("express");
var http = require('http');
var cors = require('cors');
var apiRoutes = require('./server/routers/filerouter');
var port = parseInt(process.env.PORT, 10) || 5000;
var app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('PORT Connected on: ' + port);
})
app.use(express.static(__dirname+ "/uploads" ));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to theme application." });
});

// RESTful API root
app.use('/file', apiRoutes);
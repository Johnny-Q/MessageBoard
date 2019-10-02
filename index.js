var express = require('express');
var socket = require("socket.io");

//App setup
var app = express();
var server = app.listen(8080, function(){
    console.log("listening to requests on port 8080");
});


//static files
app.use(express.static("public"));

//socket setup for server
var io = socket(server);

io.on("connection", function(socket){
    console.log("socket connected", socket.id);

    socket.on("color", function(data){
        console.log(data);
        console.log("reeee");
        io.sockets.emit("color", data);
    });
});
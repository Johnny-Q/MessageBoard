var express = require('express');
var socket = require("socket.io");
var five = require("johnny-five");

var board = new five.Board({
    repl: false
});
var knex = require("knex")({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './.data/data.sqlite'
    }
});
var currC = "white";
var index = 0;

var signups = 0;
var signupsneeded = 10;
//App setup
var app = express();
var server = app.listen(8080, function () {
    console.log("listening to requests on port 8080");
});


//static files
app.use(express.static("public"));

//socket setup for server
var io = socket(server);

io.on("connection", function (socket) {
    //set the new connected socket to the current color
    io.sockets.emit("color", {
        color: currC
    });

    //when we receive an update for color, push it to all pages
    socket.on("color", function (data) {

        taze();
        currC = data.color;
        io.sockets.emit("color", data);
    });

    //when we receive form data, put it in the sql database
    socket.on("sql", function (data) {
        console.log(data);
        signups += 1;
        console.log(signups);
        //add to database
        knex("signUps").insert(data).then(function (done) { console.log("done adding") });

        //update text
        if (signups % signupsneeded == 0) {
            io.sockets.emit("tazing", {
                num: 0,
                msg: "zzzzzzt!"
            });
            taze();
        }
        else {
            io.sockets.emit("signups", {
                num: signupsneeded - (signups % signupsneeded)
            })
        }

        if (data.message != "") {
            console.log("qwerty");
            io.sockets.emit("addMsg", {
                i: index,
                n: data.name,
                msg: data.message
            });
            index += 1;
            if (index > 7)
                index = 0;
        }
    })
});

function taze() {

    board.on("ready", function () {
        var relay = new five.Relay(12);
        relay.off();
        setTimeout(function () {
            relay.on()
        }, 100);
        setTimeout(function () {
            relay.off()
        }, 3000);
        setTimeout(function () { relay.on() }, 100);
    });
}
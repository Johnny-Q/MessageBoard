//make connection to server socket
//var socket = io.connect(" 10.26.199.204:8080");
var socket = io.connect("192.168.1.41:8080");
var numBtns = 7;
var hexColors = ["#ff6666", "#ffb366", "#ffff66", "#66ff66", "#66ffff", "#6666ff", "#ff66d9"];
//programatically create new buttons
for(var i = 0; i < numBtns; i++){
    var temp = document.createElement("button");
    temp.value = hexColors[i];
    document.getElementById("1").appendChild(temp);
}
//btns is array of all the buttons we have
var btns = document.querySelectorAll("button");
var clicked = false;
console.log(btns[0].value);


//send data
for (var i = 0; i < numBtns; i++) {
    btns[i].addEventListener('click', function () {
        console.log(this.value);
        if (!clicked) {
            socket.emit('color', {
                color: this.value
            });
            clicked = true;
        } //have a cooldown
        setTimeout(function () {
            clicked = false;
        }, 500);
    });
    btns[i].addEventListener('touch', function () {
        console.log(this.value);
        if (!clicked) {
            socket.emit('color', {
                color: this.value
            });
            clicked = true;
        } //have a cooldown
        setTimeout(function () {
            clicked = false;
        }, 500);
    });

    btns[i].style.backgroundColor = btns[i].value;
}
//listen for events
socket.on("color", function (data) {
    //change css
    document.body.style.backgroundColor = data.color;
});
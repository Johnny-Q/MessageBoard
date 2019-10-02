//make connection to server socket
var socket = io.connect("http://localhost:8080");
var numBtns = 4;
var btns = document.querySelectorAll("button");
console.log(btns[0].value);


//send data
for (var i = 0; i < numBtns; i++) {
    btns[i].addEventListener('click', function () {
        console.log(this.value);
        socket.emit('color', {
            color: this.value
        });
    });
    btns[i].style.backgroundColor = btns[i].value;
}

//listen for events
socket.on("color", function (data) {
    //change css
    document.body.style.backgroundColor = data.color;
});
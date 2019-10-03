//var socket = io.connect(" 10.26.199.204:8080");
var socket = io.connect("192.168.1.41:8080");

var submit = document.getElementById("submit");
var n = document.getElementById("name");
var e = document.getElementById("email");
//var radio = document.getElementsByName("monday");
//var m;
//for(var i = 0; i < radio.length; i++) { 
//    if(radio[i].checked) 
//        m=radio[i].value;
//} 
var mess = document.getElementById("message");


submit.addEventListener("click", function () {
    if (e.value == "") {
        alert("Please enter your email");
    }
    else if(n.value ==""){
        alert("Please enter your name");
    }
    else {
        console.log("asdfasdf");
        socket.emit("sql", {
            name: n.value,
            email: e.value,
            message: mess.value
        });
        window.location.assign("/color.html")
    }
});

socket.on("color", function (data) {
    document.getElementById("changeme").style.backgroundColor = data.color;
});
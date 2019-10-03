//var socket = io.connect(" 10.26.199.204:8080");
var socket = io.connect("192.168.1.41:8080");
socket.on("color", function(data){
    console.log("ree");
    document.body.style.backgroundColor = data.color;
});
socket.on("signups", function(data){
    var num = document.getElementById("number");
    num.innerHTML = data.num;
});

socket.on("tazing", function(data){
    var msg = document.getElementById("msg");
    msg.innerHTML = data.msg;
    var num = document.getElementById("number");
    num.innerHTML = data.num;

    setTimeout(function(){
    var msg = document.getElementById("msg");
    msg.innerHTML = "more sign ups to wake Johnny up!";
    var num = document.getElementById("number");
    num.innerHTML = 10;
    }, 7000);
})

socket.on("addMsg", function(data){
    var name = document.getElementById(`n-${data.i}`);
    var msg = document.getElementById(`m-${data.i}`);
    name.innerHTML = data.n;
    msg.innerHTML = data.msg;
    console.log('done adding');
});

function remove(i){
    var name = document.getElementById(`n-${i}`);
    var msg = document.getElementById(`m-${i}`);
    name.innerHTML = "";
    msg.innerHTML = "";
}
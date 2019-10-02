var socket = io.connect("johnny-q.github.io:8080");

socket.on("color", function(data){
    console.log("ree");
    document.body.style.backgroundColor = data.color;
});
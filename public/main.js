var socket = io.connect("localhost:8080");

socket.on("color", function(data){
    console.log("ree");
    document.body.style.backgroundColor = data.color;
});
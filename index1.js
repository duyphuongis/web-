// npm init
// npm install express socket.io ip
//
const PORT = 3000;

var express = require('express');
var app = express();
app.use(express.static('public'));
app.set("view engine","ejs");
app.set("views","./views");

var server = require('http').Server(app);
var io = require('socket.io')(server);
var ip = require ('ip');

server.listen(PORT);

function ParserJson(jsondata){
	try {
		return JSON.parse(jsondata);
	}
	catch (error){
		return null;
	}
}

console.log("server running IP: " + ip.address() + ":" + PORT);

	var gpsData = {
		time: new Date(),
		longitude: '21.736',
		latitude: '99.9999'
	};
app.get("/", function(req,res){
	res.render("main");
	res.send(gpsData);
});


var interval1 = setInterval(function() {
	var cordinate = {
		time: new Date(),
		longitude: '109.1782',
		latitude: '12.2465'
		
	}
		console.log(JSON.stringify(cordinate));
		io.emit('GPS_Data',cordinate);
	}, 3000);

io.on("connection",function(socket){	
	console.log("welcome..................................");
		
	socket.on("client_Send",function(data){
		console.log(".................CLIENT send : "+data);
		socket.emit("data_From_Server","" + data  );
	});
	
	
});
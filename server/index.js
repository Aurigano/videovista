const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server(8000, {
	cors: true,
});

const app = express();

app.use(bodyParser.json());

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", (socket) => {
	console.log("Socket Connected", socket.id);
	socket.on("room:join", ({ email, room }) => {
		console.log({ email, room });
		emailToSocketId.set(email, socket.id);
		socketIdToEmail.set(socket.id, email);
		io.to(room).emit("user:joined", { email, id: socket.id });
		socket.join(room);
		io.to(socket.id).emit("room:join", { email, room });
	});
});

console.log(this);

// app.listen(8000, () => console.log("Http  server runing at port 8000"));
// io.listen(8001);

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("A user connected");

  //room connection
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  //message sending event
  socket.on("chat message", (msg, room) => {
    io.to(room).emit("chat message", msg);
  });

  //disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
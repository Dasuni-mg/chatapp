const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const client = require("./connection");

// create an express app /server
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());

// define a route for getting data from the database
client.connect();
app.get("/", (req, res) => {
  client.query(`Select * from inputmessages`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      de;
    }
  });
  client.end;
});

//post request
app.post("/inputmessage", (req, res) => {
  const inputmessages = req.body;

  let insertQuery = `insert into inputmessages(inputmessage)values('${inputmessages.inputmessage}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Successfully Added");
      console.log("Successfully Added");
      console.log(inputmessages);

      // Emit the new message to all connected clients
      io.emit("message", inputmessages);
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

// create an HTTP server using the express app
const server = http.createServer(app);

// create a Socket.IO server using the HTTP server
const io = socketIo(server);

// listen for new socket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send messages from the database to the client
  client.query(`Select * from inputmessages`, (err, result) => {
    if (!err) {
      socket.emit("message", result.rows);
    }
  });

  // Disconnect the client
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

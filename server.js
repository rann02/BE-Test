const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const {
  refactoreMe1,
  refactoreMe2,
} = require("./app/controllers/exampleController.js");

let retry = false;

const corsOptions = {
  origin: ["http://localhost:8080"],
};

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOptions,
  },
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
// TODO const db = require("./app/models");

// TODO db.sequelize.sync();

// never enable the code below in production
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   // initial();
// });

// simple route
app.get("/task-satu", refactoreMe1);
app.post("/task-dua", refactoreMe2);

// routes
// require("./app/routes/exaole.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

io.on("connect", (socket) => {
  socket.on("from-fe", () => {
    // kalau retry === true
    // di FE axios.get('callmeWebSocket')
    // retry = false
  });

  // setiap 3 menit di FE,
  // socket.emit('from-fe', true)
});

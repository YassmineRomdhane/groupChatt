const express = require("express");
const app = express();



var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const MessagesRouter=require("./routes/MessageRoute")
const GroupRouter=require('./routes/GroupRoute')
const memberRouter=require('./routes/MemberRoute')


const multer = require("multer");
const http = require("http").createServer(app);
const io = require("socket.io")(http ,{cors: {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
} });

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successfully connected to database");
});

app.use("/api/user", userRouter);
app.use("/api/messages", MessagesRouter);
app.use("/api/groups", GroupRouter);
app.use("/api/members",memberRouter)

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/resume-maker" })
);

app.post("/upload", upload.any(0), (req, res) => {
  let image = req.files[0].path;

  try {
    cloudinary.uploader.upload(image, (error, result) => {
      error && res.send({ status: false, msg: error });
      res.send({ status: true, msg: result });
    });
  } catch (err) {
    res.send({ status: false, msg: err });
  }
});


io.on("connection", (socket) => {
  console.log('a user connected')
  socket.on("message", (msg) => {
    console.log(msg);
    // io.emit('message', msg);
    socket.broadcast.emit("message-broadcast", msg);
  });

});



const port= process.env.PORT||3000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// URI=mongodb+srv://jassmine:romdhane@chatting.thnsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
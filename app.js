const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { Server } = require("socket.io");

const userRouter = require("./routes/userRoute");
const resortRouter = require("./routes/resortRoute");
const chattingRouter = require("./routes/chattingRouter");
const socket = require("./socket");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGODB_URI =
  "mongodb+srv://admin:admin@cluster0.lweku.mongodb.net/resortDB?retryWrites=true&w=majority";
// storage configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    console.log(fileName);
    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!whitelist.includes(file.mimetype)) {
    return cb(null, false);
  }
  return cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routers
app.use(userRouter);
app.use(upload.single("image"), resortRouter);
// app.use(chattingRouter);

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then((response) => {
    console.log("Database Connected");
    // initialise servers
    const port = process.env.PORT || 3000;
    const server = app.listen(port);
    const io = socket.init(server);
    io.on("connection", (soc) => {
      soc.on("chat", (message) => {
        console.log(message);
        io.emit("chat", message);
      });
      console.log("user connected");
    });
    if (server) {
      console.log("Server is connected to port 3000");
    }
  })
  .catch((err) => {
    console.log(err);
  });

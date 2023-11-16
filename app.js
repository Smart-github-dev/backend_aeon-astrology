require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const dbConfig = require("./config/db.config");
const otpRouter = require("./routes/otp.routes");
const authRouter = require("./routes/auth.routes");
const notifyRouter = require("./routes/notify.routes");
const userRouter = require("./routes/user.routes");
const friendRouter = require("./routes/friend.routes");
const management = require("./management");
const chatRouter = require("./routes/chat.routes");
const horoscopeRouter = require("./routes/horoscope.routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/uploads/"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avatars/"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    fs.unlinkSync(`./uploads/avatars/${file.originalname}`);
    cb(null, file.originalname); // specify the file name
  },
});

const upload = multer({ storage: storage });

app.use("*", (req, res, next) => {
  console.log(req.url);
  next();
});
app.use("/api/otp", otpRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/friend", friendRouter);
app.use("/api/horoscope", horoscopeRouter);

app.use("/api/notify", notifyRouter);
app.use("/api/chatbot", chatRouter);
app.post("/upload-url", upload.single("image"), async (req, res) => {
  var user = await db.user.findById(req.body.userid);
  user.avatar = `${user._id}`;
  await user.save();
  res.send({ success: true, avatar: user.avatar });
});

app.use("/api/management", management);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}...`));

function initial() {
  const count = Role.estimatedDocumentCount({});
  if (count === 0) {
    new Role({
      name: "user",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'user' to roles collection");
    });

    new Role({
      name: "moderator",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'moderator' to roles collection");
    });

    new Role({
      name: "admin",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'admin' to roles collection");
    });
  }
}

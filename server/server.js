const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3005;
// Routes
const authRoutes = require("./routes/authRoutes/authRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// driver connection is

const dbo = require("./models/mongdbConnect");

// Routes Middleware (v1)
// auto import all files from routes folder
const { readdirSync } = require("fs");
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require(`./routes/${route}/${route}`))
);

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.log(err);
  });
  console.log(`ErorrDoc server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const { sequelize } = require("./db/models");

const app = express();
const port = 5100;

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// sequelize.sync();
sequelize
  .sync()
  .then(() => {
    console.log("초기화완료");
  })
  .catch((err) => {
    console.log(`${err}`);
  });

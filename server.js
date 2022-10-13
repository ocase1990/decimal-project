const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.post("/login", (req, res) => {
  console.log("LOGIN()");
  let userType;
  req.body.credentials.username == "admin"
    ? (userType = "admin")
    : (userType = "user");
  res.send({
    userType: userType,
  });
});

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);

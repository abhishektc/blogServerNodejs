require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { database } = require("./config/config");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./api/auth/auth.router"));
app.use("/api/blogs", require("./api/blogs/blog.router"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server up and running on port:", port);
});

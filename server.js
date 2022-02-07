const express = require("express");
const app = express();
const path = require("path")

app.use("/src", express.static(path.join(__dirname + "/src")))

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/api", (_req, res) => {
    res.sendFile(path.join(__dirname + "/dic.txt"));
});

app.listen("8080", () => {
    console.log("Server rodando localhost:8080");
});
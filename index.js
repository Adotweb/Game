const app = require("localhostjs");
const path = require("path")
const express = app.express;

app.rest.use(express.static(path.join(__dirname, "dist")))

const env = require("./env.json")
app.listen(env)

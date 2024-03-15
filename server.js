const express = require("express");
const jsonServer = require("json-server");

const cors = require('cors');

const app = express();
app.use("/", express.static("dist"));
app.use("/", express.static("assets"));
app.use(cors()); // 使用默认配置允许所有跨域请求


const router = jsonServer.router("data.json");
app.use(jsonServer.bodyParser)
app.use("/api", (req, resp, next) => router(req, resp, next));

const port = process.argv[3] || 4000;
app.listen(port, () => console.log(`Running on port ${port}`));


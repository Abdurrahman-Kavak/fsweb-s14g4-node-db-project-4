const express = require("express");
const tarifRouter = require("./tarifler/tarif-router");

const server = express();

server.use(express.json());

server.use("/api/tarifler", tarifRouter);

module.exports = server;

import express from "express";
import path from "path";
import { swaggerSpec } from "./swagger";
const server = express();
const swaggerUi = require('swagger-ui-express');

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  console.log(
    `[\x1b[36mLOGGER\x1b[0m][${new Date().toISOString()}] \x1b[31m${
      res.statusCode
    }\x1b[0m \x1b[32m${req.method}\x1b[0m \x1b[33m${req.url}\x1b[0m`
  );
  next();
});


server.use(express.static(path.join(__dirname, "public")));

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
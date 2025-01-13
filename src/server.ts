import express from 'express';

const server = express();

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept ,Content-Type, Authorization');
    next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
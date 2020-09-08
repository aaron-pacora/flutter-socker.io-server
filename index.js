const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve( __dirname, 'public');

app.use(express.static(publicPath));

const port = process.env.PORT;

server.listen(port, (error) => {
    if(error) throw new Error(error);

    console.log('Server running in server', port);
});
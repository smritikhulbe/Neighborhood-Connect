// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, (req.url === '/' ? '/index.html' : req.url));
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    const mimeTypes = {
        html: 'text/html',
        js: 'text/javascript',
        css: 'text/css',
        json: 'application/json',
        png: 'image/png',
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, '/404.html'), (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const io = socketIO(server);
const port = process.env.PORT || 5000;

let messageHistory = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg, callback) => {
        messageHistory.push(msg);
        io.emit('chat message', msg);
        callback({ status: 'ok' }); // Send the status back to the client
    });

    socket.on('get messages', (callback) => {
        callback({ status: 'ok', messages: messageHistory });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
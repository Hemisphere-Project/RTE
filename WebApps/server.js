var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const { readdirSync } = require('fs')
const fs = require('fs')
const os = require('os')
const chokidar = require('chokidar');

// NUC name
var hostname = os.hostname();


// EXPRESS Server
//

// BASE PATH for web files (based on hostname)
app.use(express.static(__dirname + '/' + hostname))

// INDEX (default page)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + hostname + '/index.html');
});

// ASSETS path /assets
app.use('/assets', express.static(__dirname + '/assets'))

// MEDIA path /media
app.use('/media', express.static(__dirname + '/media'))


// SOCKETIO
//

io.on('connection', (socket) => {
    console.log('client connected');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});


// GO
http.listen(5000, () => {
    console.log('listening on *:5000');
});
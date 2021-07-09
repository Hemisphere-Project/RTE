var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const { readdirSync } = require('fs')
const fs = require('fs')
const os = require('os')
const chokidar = require('chokidar');
const fetch = require('node-fetch');

// NUC name
var hostname = os.hostname();

// FOLDER
var folder = process.argv[2];

// EXPRESS Server
//

// BASE PATH for web files (based on hostname)
app.use(express.static(__dirname + '/' + folder))

// INDEX (default page)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + folder + '/index.html');
});

// RTE-FRANCE IFRAME
app.get('/rte', (req, res) => {
  var url = 'https://rte-france.com'
  // require('request').get(url).pipe(res);  // res being Express response
  fetch(url).then(actual => {
      actual.headers.forEach((v, n) => res.setHeader(n, v));
      actual.body.pipe(res);
  });
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
    console.log(folder);
});

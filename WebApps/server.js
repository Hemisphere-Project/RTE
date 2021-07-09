var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const { readdirSync } = require('fs')
const fs = require('fs')
const os = require('os')
const chokidar = require('chokidar');
//const fetch = require('node-fetch');

const axios = require('axios');
const mime = require('mime');


// NUC name
var hostname = os.hostname();


// FOLDER
var folder = process.argv[2];
if (folder === undefined) folder = os.hostname();


// MIME
const regex = /\s+(href|src)=['"](.*?)['"]/g;
const getMimeType = url => {
    if(url.indexOf('?') !== -1) { // remove url query so we can have a clean extension
        url = url.split("?")[0];
    }
    //console.log(url)
    mimeExt = mime.lookup(url)
    if (mimeExt == 'application/x-msdownload' || mimeExt == 'application/octet-stream') mimeExt = 'text/html';
    //console.log(mimeExt)
    return mimeExt || 'text/html'; // if there is no extension return as html
};

// EXPRESS Server
//

// BASE PATH for web files (based on hostname)
app.use(express.static(__dirname + '/' + folder))

// INDEX (default page)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + folder + '/index.html');
});

// RTE-FRANCE IFRAME
app.get('/iframe', (req, res) => {
    const { url } = req.query; // get url parameter
    if(!url) {
      res.type('text/html');
      return res.end("You need to specify <code>?url=</code> query parameter");
    }
    
    axios.get(url, { responseType: 'arraybuffer'  }) // set response type array buffer to access raw data
        .then(({ data }) => {
            const urlMime = getMimeType(url); // get mime type of the requested url
            if(urlMime === 'text/html') { // replace links only in html
                data = data.toString().replace(regex, (match, p1, p2)=>{
                    let newUrl = '';
                    if(p2.indexOf('http') !== -1) {
                        newUrl = p2;
                    } else if (p2.substr(0,2) === '//') {
                        newUrl = 'http:' + p2;
                    } else {
                        const searchURL = new URL(url);
                        newUrl = searchURL.protocol + '//' + searchURL.host + p2;
                    }
                    return ` ${p1}="${req.protocol}://${req.hostname}:5000/iframe?url=${newUrl}"`;
                });
            }
            res.type(urlMime);
            res.send(data);
        }).catch(error => {
            //console.log(error);
        });
});
/*app.get('/rte', (req, res) => {
  var url = 'https://rte-france.com'
  // require('request').get(url).pipe(res);  // res being Express response
  fetch(url).then(actual => {
      actual.headers.forEach((v, n) => res.setHeader(n, v));
      actual.body.pipe(res);
  });
});
*/


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

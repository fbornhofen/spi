var express = require('express'),
    cv = require('opencv'),
    fs = require('fs');

var app = express(),
    cam = new cv.VideoCapture(0),
    staticHtml = null;

// Static HTML is static

fs.readFile('static.html', function(err, data) {
		if (err) {
		    console.log('could not open static.html');
		    process.exit(-1);
		}
		staticHtml = data;
	    });

// routes for static page and image

app.get('/', function(req, res) {
	    res.header('content-type', 'text/html');
	    res.send(staticHtml);
	});

app.get('/image.jpg', function(req, res) {
	    cam.read(function(img) {
			 res.header('content-type', 'image/jpeg');
			 res.send(img.toBuffer());
		     });
	});

app.listen(3000);
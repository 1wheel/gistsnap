#!/usr/bin/env node

var express = require('express'),
    serveStatic = require('serve-static'),
    d3 = require('d3'),
    Nightmare = require('nightmare')

var argv = require('minimist')(process.argv.slice(2))

var port = 3870
var gistID = null

d3.queue(1)
  .defer(initServer)
  .defer(snapPreview)
  .defer(resizeThumb)
  .awaitAll(function(err, res){
    console.log(err || 'gist-snap finished')

    process.exit()
  })

//statically serve directory
function initServer(cb){
  var app = express()
  app.use(serveStatic('./', {'index': false}))  
  app.listen(port) 

  cb(null) 
}

//screen shot index.html
function snapPreview(cb){
  new Nightmare({show: true})
    .viewport(960, 500)
    .goto(`http://localhost:${port}/index.html`)
    .evaluate(() => document.querySelector('html').style.overflow = 'hidden' )
    .wait(argv.delay || 3000)
    .screenshot('preview.png')
    .run(cb)
}

//generate thumbnail
function resizeThumb(cb){
  require('lwip').open('preview.png', function(err, image){
    if (err) cb(err)

    image.batch()
      .resize(230, 120)
      .writeFile('thumbnail.png', cb)
  })
}
#!/usr/bin/env node

var express = require('express'),
    serveStatic = require('serve-static'),
    d3 = require('d3'),
    puppeteer = require('puppeteer'),
    sharp = require('sharp');

var argv = require('minimist')(process.argv.slice(2))

var port = 3870

d3.queue(1)
  .defer(initServer)
  .defer(snapPreview)
  .defer(resizeThumb)
  .await(function(err, res){
    console.log(err || 'gistsnap finished')

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
async function snapPreview(cb){
  var browser = await puppeteer.launch({headless: false})
  var page = await browser.newPage()
  await page.setViewport({width: 960, height: 500})
  await page.goto(`http://localhost:${port}/index.html`)
  await page.evaluate(() => document.querySelector('html').style.overflow = 'hidden')
  await sleep(argv.delay || 3000)
  await page.screenshot({path: 'preview.png'})

  browser.close()

  cb()

  function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)) }
}

//generate thumbnail
function resizeThumb(cb){
  sharp('preview.png')
    .resize(230, 120)
    .toFile('thumbnail.png', cb)
}
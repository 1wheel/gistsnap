#!/usr/bin/env node

var glob = require('glob'),
    express = require('express'),
    serveStatic = require('serve-static'),
    d3 = require('d3'),
    child = require('child_process'),
    Nightmare = require('nightmare')

var argv = require('minimist')(process.argv.slice(2))

var port = 3870
var gistID = null

d3.queue(1)
  .defer(fileCheck)
  .defer(gitCheck)
  .defer(initServer)
  .defer(snapPreview)
  .defer(resizeThumb)
  .defer(gitUpload)
  .awaitAll(function(err, res){
    console.log(err || 'gist-snap finished')

    process.exit()
  })


//directory should have index.html and no thumbnail.png or preview.png
function fileCheck(cb){
  glob('*', {}, function(err, files){
    if (!err && !~files.indexOf('index.html'))    err = 'no index.html'

    //don't check for existing images if overwrite is on
    if (argv.overwrite) return cb(err)

    if (!err &&  ~files.indexOf('thumbnail.png'))
      err = 'thumbnail.png present; to modify, run gist-snap --overwrite' 
    if (!err &&  ~files.indexOf('preview.png'))
      err = 'preview.png present; to modify, run gist-snap --overwrite' 
    cb(err)
  })
}


//make sure that working directory is in sync with origin/master
function gitCheck(cb){
  if (argv.nocommit) return cb()

  child.exec('git version && git fetch && git status && git remote -v', function(err, stdout, stderr){
    if (!err && stderr) 
      err = stderr
    if (!err && !~stdout.indexOf('git version 2'))
      err = 'gist-snap requires git version 2'
    if (!err && !~stdout.indexOf('On branch master'))
      err = 'not on branch master'
    if (!err && !~stdout.indexOf("Your branch is up-to-date with 'origin/master'."))
      err = 'not synced with origin/master'
    if (!err && !~stdout.indexOf('nothing to commit, working directory clean'))
      err = 'uncommited local changes'

    if (!stderr) gistID = stdout.split('git@gist.github.com:')[1].split('.git')[0]
    if (err) err = err + '\n' + 'to skip making a new commit, run gist-snap --nocommit'

    cb(err)
  })
}


//statically serve directory
function initServer(cb){
  var app = express()
  app.use(serveStatic('./', {'index': false}))  
  app.listen(port) 

  cb(null) 
}



function snapPreview(cb){
  var url = argv.user ? 
    `http://bl.ocks.org/${argv.user}/raw/${gistID}` : 
    `http://localhost:${port}/index.html`

  new Nightmare()
    .viewport(960, 500)
    .goto(url)
    .screenshot('preview.png')
    .run(cb)
}


function resizeThumb(cb){
  require('lwip').open('preview.png', function(err, image){
    if (err) cb(err)

    image.batch()
      .resize(230, 120)
      .writeFile('thumbnail.png', cb)
  })
}


function gitUpload(cb){
  if (argv.nocommit) return cb()

  child.exec('git add thumbnail.png preview.png && git commit -m "adds preview images with gist-snap" && git push', function(err, stdout, stderr){
    if (!err && stderr) err = stderr
    cb(err)
  })
}

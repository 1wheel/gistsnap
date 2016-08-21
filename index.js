var express = require('express')  
var serveStatic = require('serve-static')

var app = express()
var port = 3870

app.use(serveStatic('./', {'index': false}))  
app.listen(port)  

console.log(port)
var PORT = 8888

var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var mine = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}

function parseQueryString(url) {
  var obj = {}
  var keyvalue = []
  var key = ''
  var value = ''
  var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  for (var i in paraString) {
    keyvalue = paraString[i].split('=')
    key = keyvalue[0]
    value = keyvalue[1]
    obj[key] = value
  }
  return obj
}

var server = http.createServer(function(request, response) {
  // 模拟API请求
  if (request.url.indexOf('api') > -1) {
    var reqUrl = request.url.split('/')
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      date: new Date().getMilliseconds(),
      key: reqUrl[reqUrl.length - 1].split('?')[0],
      params: parseQueryString(reqUrl[reqUrl.length - 1])
    }))
  } else { // 访问HTML
    var pathname = url.parse(request.url).pathname
    var realPath = __dirname + '/examples/' + pathname
    var ext = path.extname(realPath).slice(1)
    fs.exists(realPath, function(exists) {
      if (!exists) {
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        response.write('This request URL ' + realPath + ' was not found on this server.')
        response.end()
      } else {
        fs.readFile(realPath, 'binary', function(err, file) {
          if (err) {
            response.writeHead(500, {
              'Content-Type': 'text/plain'
            })
            response.end(err)
          } else {
            var contentType = mine[ext] || 'text/plain'
            console.log('contentType: ' + contentType)
            response.writeHead(200, {
              'Content-Type': contentType
            })
            response.write(file, 'binary')
            response.end()
          }
        })
      }
    })
  }
})
server.listen(PORT)
console.log('Server runing at port: ' + PORT + '.')

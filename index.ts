import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {

  const {method, url: path, headers} = request
  const {pathname, search} = url.parse(path)
  if(method !== 'GET'){
    response.statusCode = 405
    response.end('这是一个假响应')
    return
  }
  let filename = pathname.substr(1)
  // response.setHeader('Content-Type', 'text/html;charset-utf-8')
  if (filename === '') {
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data)
        })
      } else if (error.errno === -4068) {
        response.statusCode = 403
        response.end('无权查看目录内容')
      } else {
        response.statusCode = 500
        response.end('服务器繁忙，请稍后再试')
      }
    } else {
      response.end(data)
    }
  })

})

server.listen(8888)
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
  const filename = pathname.substr(1)
  // response.setHeader('Content-Type', 'text/html;charset-utf-8')
  fs.readFile(p.resolve(publicDir, 'index.html'), (error,data) => {
    if(error) {
      response.statusCode = 404
      response.end('你要的文件不存在')
    };
    response.end(data.toString())
  })

})

server.listen(8888)
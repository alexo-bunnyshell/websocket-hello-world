import { createServer } from 'http';
import { WebSocketServer } from 'ws';


// read the port from the environment variables
// if the port is not set, use 8080 as default

const webServerPort = process.env.WEB_PORT || 8080;
const socketServerPort = process.env.SOCKET_PORT || 8081;


const webServer = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });
  
  webServer.listen( webServerPort , () => {
    console.log(`HTTP server running at port ${webServerPort}`);
  });

const socketServer = new WebSocketServer({ port: socketServerPort });

socketServer.on('connection', function connection(ws) {
    console.log('Hello world! This is a WebSocket Mirror server');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send(data);
  });

  ws.send('something');
});
const dgram = require('dgram');
const WebSocket = require('ws');

const udpServer = dgram.createSocket('udp4');
const wss = new WebSocket.Server({ port: 9999 });

const PORT = 6969;

udpServer.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udpServer.bind(PORT);

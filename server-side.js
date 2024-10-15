const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = [];

wss.on('connection', function connection(ws) {
    clients.push(ws);
    console.log(`New client connected. Total clients: ${clients.length}`);

    ws.send('Connection established with server');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Client says: ${message}`);
            }
        });
    });

    ws.on('close', function close() {
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        console.log(`Client disconnected. Total clients: ${clients.length}`);
    });
});

console.log('WebSocket server is listening on ws://localhost:8080');

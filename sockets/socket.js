const { io } = require('../index'); 
// Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('message', (payload) => {
        console.log(payload.names);
        client.emit('message', {status: true, message: 'Acceso concedido'});
    });
});
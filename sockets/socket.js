const { io } = require('../index'); 
const Bands = require('../models/bands'); 
const Band = require('../models/band'); 

const bands = new Bands;
bands.addBand(new Band('José Madero'));
bands.addBand(new Band('Pxndx'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Sing with sirens'));

// Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', {"bands": bands.getBands()});

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('message', (payload) => {
        console.log(payload.names);
        client.emit('message', {status: true, message: 'Acceso concedido'});
    });

    client.on('emit-message', (payload) => {
        client.broadcast.emit('new-message', payload);
    });
    client.on('vote-band', (payload) => {
        bands.voteBand(payload['band_id']);
        io.emit('active-bands', {"bands": bands.getBands()});
    });
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload['name']));
        io.emit('active-bands', {"bands": bands.getBands()});
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload['band_id']);
        io.emit('active-bands', {"bands": bands.getBands()});
    });
});
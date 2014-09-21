/**
 * Socket.io configuration
 */

'use strict';

var config = require('./config'),
    socketManager = require('../app/components/socket/socket-manager');

// When the user disconnects.. perform this
function onDisconnect(socket) {
    socketManager.removeSocket(socket);
}

// When the user connects.. perform this
function onConnect(socket) {
    //get userId
    socket.on('notif:userId', function (userId) {
        //join userid room
        socketManager.addSocket(socket, userId);
        socket.join(userId);
    });
}

module.exports = function (socketio) {
    //set server socketio to socket manager
    socketManager.socketio = socketio;

    socketio.on('connection', function (socket) {
        socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port : process.env.DOMAIN;

        socket.connectedAt = new Date();

        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            console.info('[%s] DISCONNECTED', socket.address);
        });

        // Call onConnect.
        onConnect(socket);
        console.info('[%s] CONNECTED', socket.address);
    });
};
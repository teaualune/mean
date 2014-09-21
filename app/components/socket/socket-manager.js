'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Notif = mongoose.model('Notification'),
    notificationConfig = require('./notification-config');

module.exports = {
    socketio: null,

    clients: {
        guests: []
    },

    addSocket: function (socket, userId) {
        if (!userId) {
            userId = 'guests';
        } else {
            if (!this.clients[userId]) {
                this.clients[userId] = [];
            }
        }
        //push socket to clients
        socket.userId = userId;
        this.clients[userId].push(socket);
    },

    removeSocket: function (socket, userId) {
        var index = -1;

        if (!userId) {
            userId = socket.userId || 'guests';
        } 

        //userId not online
        if (!this.clients[userId]) return false;

        //socket not belong to userId
        index = this.clients[userId].indexOf(socket);
        if (index < 0 || socket.userId !== userId) return false;

        //remove socket
        this.clients[userId].splice(index, 1);
        if (userId !== 'guests' && this.clients[userId].length === 0) {
            delete this.clients[userId];
        }

        return true;
    },

    pushNotification: function (data) {
        var _this = this,
            config = notificationConfig(data),
            notif_data = config.notif_data,
            to_users = config.to_users;

        to_users.forEach(function (to_user) {
            notif_data.to = to_user._id;
            _this.socketio.to(to_user.id).emit('notif:msg', notif_data);
        });
    }    
};
'use strict';

var settings = require('./settings.json');

module.exports = {
    index_name: settings.index_name,
    host: settings.host,
    port: settings.port,
    settings: settings.settings,
    getClientOptions: function () {
        return {
            host: this.host + ':' + this.port,
            log: 'trace'
        };
    },
    getPluginOptions: function () {
        return {
            index: this.index_name,
            host: this.host,
            port: this.port
        };
    }
};
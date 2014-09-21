'use strict';

var elasticsearch = require('elasticsearch'),
    es_config = require('./es-config.js'),
    async = require('async'),

    /**
     * Sync data between MongoDB & ES
     * @param {Mongoose Model} Model
     */
    syncMongooData = function (Model) {
        var stream = Model.synchronize(),
            count = 0;

        stream.on('data', function () {
            count += 1;
        });
        stream.on('close', function () {
            console.log(Model.modelName + ': indexed ' + count + ' documents!');
        });
        stream.on('error', function (err) {
            console.log(err);
        });
    },

    /**
     * Create the model mapping & sync
     * @param {Mongoose Model} Model
     */
    initMongooData = function (Model) {
        Model.createMapping(function (err) {
            if (err) console.log(err);
            //start sync data after creatmapping
            syncMongooData(Model);
        });
    },

    /**
     * elasticsearch client
     */
    client = new elasticsearch.Client(es_config.getClientOptions());

module.exports = {
    client: client,
    initialize: function (Models) {
        if (!Array.isArray(Models)) {
                Models = [Models];
        }
        async.waterfall([
            //1. check the index is exists
            function (callback) {
                client.indices.exists({
                    index: es_config.index_name
                }, function (err, exist) {
                    callback(null, exist);
                });
            },
            //2. create the index if unexist
            function (exist, callback) {
                if (exist) {
                    callback(null, exist);
                } else {
                    client.indices.create({
                        index: es_config.index_name,
                        body: es_config.settings
                    }, callback);
                }
            }
        ], function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                Models.forEach(function (Model) {
                    initMongooData(Model);
                });
            }
        });
    }
};
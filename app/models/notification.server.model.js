'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    NotificationSchema = new Schema({
        type: {
            type: String,
            default: ''
        },
        from: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        to: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        unread: {
            type: Boolean,
            default: true
        },
        create_time: {
            type: Date,
            default: Date.now
        },
        updated_time: {
            type: Date,
            default: Date.now
        }
    });
 
/**
 * Ensure index
 */
NotificationSchema.index({to: 1, create_time: -1});

/**
 * pre save middleware
 */
NotificationSchema.pre('save', function (next) {
    this.updated_time = Date.now();
    next();
});

mongoose.model('Notification', NotificationSchema);

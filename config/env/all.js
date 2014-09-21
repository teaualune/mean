'use strict';

module.exports = {
    app: {
        title: 'App',
        description: 'App',
        keywords: 'app'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'jade',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/angular-loading-bar/build/loading-bar.css',
                'public/lib/font-awesome/css/font-awesome.css',
                'public/lib/ngDialog/css/ngDialog.css',
            ],
            js: [
                'public/lib/lodash/dist/lodash.js',
                'public/lib/moment/moment.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-loading-bar/build/loading-bar.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/socket.io-client/socket.io.js',
                'public/lib/angular-socket-io/socket.js',
                'public/lib/restangular/dist/restangular.js',
                'public/lib/angular-dragdrop-ganarajpr/draganddrop.js',
                'public/lib/ng-tags-input/ng-tags-input.js',
                'public/lib/ngDialog/js/ngDialog.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};
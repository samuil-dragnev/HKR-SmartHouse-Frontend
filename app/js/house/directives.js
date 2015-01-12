/**
 * Created by Samuil on 09-01-2015.
 */
(function () {
    'use strict';
    var app = angular.module('house-module-directives', []);
    app.directive('authorizeRoomDevices', function ($timeout) {
        return {
            scope: {
                rooms: '=data'
            },
            restrict: 'E',
            templateUrl: 'partials/admin/authz-rooms-directive.html',
            link: function (scope, element) {
                $timeout(function () {
                    $(element).accordion({ heightStyle: "fill", header: "> div > h3"});
                });
            }
        };
    });

    app.directive('adminPanel', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/admin/admin-panel-directive.html',
            link: function (scope, element) {
                element.addClass('admin-pane');
            }
        };
    });

    app.directive('authorizeUser', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/admin/authz-panel-directive.html',
            link: function(scope, element) {
                element.addClass('auth-pane');
            }
        };
    });

    app.directive('addRoomDevice', function () {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: 'partials/admin/add-room-device-directive.html'
        };
    });

    //login page
    app.directive('houseSelector', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/index/login-house-selector-directive.html',
            link: function (scope, element) {
                element.addClass('house-selector well');
            }
        };
    });
    app.directive('loginPanel', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/index/login-user-authentication-directive.html',
            link: function (scope, element) {
                element.addClass('container well');
            }
        };
    });
    app.directive('imageContainer', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/index/image-container-directive.html',
            link: function (scope, element) {
                element.addClass('img-container');
            }
        };
    });
    app.directive('createAccountPanel', function () {
        return {
            scope: true,
            restrict: 'EA',
            templateUrl: 'partials/index/create-account-directive.html',
            link: function (scope, element) {
                element.addClass('container well');
            }
        };
    });
})();
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

    app.directive('showTab',
        function () {
            return {
                link: function (scope, element) {
                    element.click(function(e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        });

    app.directive('adminPanel', function () {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: 'partials/admin/admin-panel-directive.html',
            link: function(scope, element) {
                element.addClass('admin-pane');
            }
        };
    });

    app.directive('authorizeUser', function () {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: 'partials/admin/authz-panel-directive.html',
            link: function(scope, element) {
                element.addClass('auth-pane well');
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
})();
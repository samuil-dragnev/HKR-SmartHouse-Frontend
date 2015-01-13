/**
 * Created by Samuil on 09-01-2015.
 */
(function () {
    'use strict';
    var app = angular.module('house-module-directives', []);
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
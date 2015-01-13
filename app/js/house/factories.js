/**
 * Created by Samuil on 10-01-2015.
 */
(function () {
    'use strict';
    var app = angular.module('houseServices', []);
    app.factory('restFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:8081/SmartHouse-WebServices/house/';
        var dataFactory = {};

        dataFactory.registerUser = function (user) {
            return $http.post(urlBase, user);
        };

        dataFactory.authorizeUser = function (ssn, devices) {
            return $http.post(urlBase, {ssn: ssn, devices: devices});
        };

        dataFactory.authenticateUser = function (ssn, password) {
            return $http.post(urlBase, {ssn: ssn, password: password});
        };

        dataFactory.getHouseData = function () {
            return $http.get(urlBase + 'rooms');
        };

        dataFactory.getOrders = function (ssn, houseId, deviceId, deviceState) {
            return $http.post(urlBase + '/' + ssn + '/' + '/' + houseId + '/' +deviceId, deviceState);
        };

        return dataFactory;
    }]);
})();
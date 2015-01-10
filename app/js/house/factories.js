/**
 * Created by Samuil on 10-01-2015.
 */
(function () {
    'use strict';
    var app = angular.module('houseServices', []);
    app.service('restFactory', ['$http', function ($http) {

        var urlBase = '';
        var dataFactory = {};

        dataFactory.registerUser = function (user) {
            return $http.post(urlBase, user);
        };

        dataFactory.authorizeUser = function (userId, devices) {
            return $http.post(urlBase, {userId: userId, devices: devices});
        };

        dataFactory.authenticateUser = function (ssn, password) {
            return $http.post(urlBase, {ssn: ssn, password: password});
        };

        dataFactory.getHouseData = function (houseId) {
            return $http.get(urlBase + '/' + houseId);
        };

        dataFactory.deleteCustomer = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        dataFactory.getOrders = function (ssn, houseId, deviceId, deviceState) {
            return $http.post(urlBase + '/' + ssn + '/' + '/' + houseId + '/' +deviceId, deviceState);
        };

        return dataFactory;
    }]);
})();
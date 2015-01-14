/**
 * Created by Samuil on 10-01-2015.
 */
(function () {
    'use strict';
    var app = angular.module('houseServices', []).service('restFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:8081/SmartHouse-WebServices/house/';

        this.registerUsers = function (user) {
            return $http.post(urlBase + "register", user);
        };

        this.authorizeUser = function (ssn, devices) {
            return $http.post(urlBase + "authorize", {ssn: ssn, devices: devices});
        };

        this.authenticateUsers = function (ssn, password) {
            return $http.post(urlBase + "user", {ssn: ssn, password: password});
        };

        this.getHouseData = function () {
            return $http.get(urlBase + 'rooms');
        };

        this.getUnAuthUsers = function () {
            return $http.get(urlBase + 'unauth');
        };

        this.getUserById = function (ssn) {
            return $http.get(urlBase + 'user/' + ssn);
        };

        this.addDevice = function (roomId, deviceName) {
            return $http.post(urlBase + 'rooms/devices/', {roomId: roomId, name: deviceName});
        };

        this.addRoom = function (name, locale) {
            return $http.post(urlBase + 'rooms/add', {name: name, indoors: locale});
        };

        this.toggleDevice = function (deviceId, deviceState) {
            return $http.post(urlBase + "device", {id: deviceId, state: deviceState});
        };
    }]).service('userService', function () {
        var user = {};

        this.setUser = function (newObj) {
            user = newObj;
        }

        this.getUser = function(){
            return user;
        }
    });
})();
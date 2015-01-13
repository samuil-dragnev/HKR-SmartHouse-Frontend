(function () {
    'use strict';
    var app = angular.module('house-module', ['ngRoute', 'routeStyles', 'house-module-directives', 'houseServices', 'ngAnimate']);
    app.config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'LoginController',
                        templateUrl: 'login.html',
                        css: 'css/login.css'
                    }).when('/house/', {
                        controller: 'MainController',
                        templateUrl: 'main.html',
                        css: 'css/main.css'
                    }).otherwise({redirectTo: '/'});
                $locationProvider.html5Mode(true);
            }
        ]
    );

    app.controller('MainController', ['$http', 'restFactory', '$scope', function ($http, restFactory, $scope) {
        $scope.isLoading = true;
        restFactory.getHouseData().success(function (data) {
            $scope.rooms = data;
        });

        /*Used for the transition of the form filling process
        in regard to user authorization*/
        $scope.formAuthUser = true;
        $scope.nextAuthUser = function (condition) {
            $scope.formAuthUser = condition;
        };
        /*Used to show/hide the admin panel*/
        $scope.isSwitched = false;
        $scope.showAdmin = function () {
            if ($scope.isSwitched) {
                $scope.isSwitched = false;
            } else {
                $scope.isSwitched = true;
            }
        };
        /*Used in displaying of the devices in
        particular room according to the tab
        selected, including a record of the
        last room selected, when switching
        between panels*/
        $scope.tab = 0;
        $scope.room = {};
        $scope.lastRoom = {};
        $scope.location = 1;
        $scope.setSelectedLocation = function (selected) {
            $scope.location = selected;
        };
        $scope.isLocationSelected = function (selected) {
            return $scope.location === selected;
        };
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            $scope.isSwitched = false;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        $scope.setRoom = function (room) {
            if (!jQuery.isEmptyObject(room)) {
                $scope.lastRoom = room;
            }
            $scope.room = room;
        };

        $scope.checkForNonAuthUsers = function () {
            var nonAuthUsers = 1;
            if (nonAuthUsers > 0) {
                return true;
            } else {
                return false;
            }
        };
        //Method handling the logging out
        $scope.logout = function () {

        };

        $scope.house = [];
        $http.get("data//house.json").success(function (data) {
            $scope.house = data;
        });

        $scope.isAlarm = true;

        $scope.getActivateAlarm = function () {
            var alarm = {"id": 1, "name": "Fire", "state": true };
            return alarm;
        };

        $scope.closeAlarm = function (id) {
            $scope.isAlarm = false;
        };
        $scope.testAlarm = function () {
            $scope.isAlarm = true;
        };

        $scope.changeDeviceState = function (roomId, deviceId, state) {

        };


    }]);

    app.controller('LoginController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
        $scope.isRegistered = true;
        $scope.isAddingPersonalInfo = true;
        $scope.backToLogin = false;
        $scope.isAuth = false;
        $scope.emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        $scope.numericPattern = /^\d+$/;
        $scope.requested = false;
        $scope.requestedState = true;
        $scope.showHouseSelector = function (condition) {
            $scope.isAuth = condition;
        };
        $scope.showInfoAdding = function (condition) {
            $scope.isAddingPersonalInfo = condition;
        };
        $scope.goBackToLogin = function () {
            $scope.backToLogin = true;
        };
        $scope.showRegister = function (condition) {
            $scope.isRegistered = condition;
        };
        $scope.authenticate = function () {
            //$timeout(function () { $location.path("/house"); }, 3000);
            $scope.showHouseSelector(true);
        };

        $scope.registerUser = function (user) {
            houseServices.registerUser(user).success(function (data) {
                $scope.requested = true;
                $scope.requestedState = data.success;
            });
        };
        $scope.submit = function () {
            $timeout(function () {
                $location.path("/house");
            }, 3000);
        };
    }]);
})();
(function () {
    'use strict';
    var app = angular.module('house-module', ['ngRoute', 'routeStyles']);
    app.config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'LoginController',
                        templateUrl: 'login.html',
                        css: 'css/login.css'
                    }).when('/house/', {
                        controller: 'HouseController',
                        templateUrl: 'main.html',
                        css: 'css/main.css'
                    }).otherwise({redirectTo: '/'});
                $locationProvider.html5Mode(true);
            }
        ]
    );
    app.controller('HouseController', ['$http', '$scope', function ($http, $scope) {
        $scope.isSwitched = false;
        $scope.room = {};
        $scope.lastRoom = {};
        $scope.setRoom = function (room) {
            if (!jQuery.isEmptyObject(room)) {
                $scope.lastRoom = room;
            }
            $scope.room = room;
        };
        $scope.showAdmin = function() {
            $scope.isSwitched = true;
        }
        $scope.house = [];
        $http.get("data//house.json").success(function (data) {
            $scope.house = data;
        });
        $scope.tab = 0;
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            $scope.isSwitched = false;
        };

        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        $scope.getAllRooms = function() {
            //rooms is a object transfer it into an array
            var rooms = $scope.house[3].rooms;
            var roomsArray = [];
            for(var i = 0; i < rooms.length; i ++){
                roomsArray.push(rooms[i]);
            }
            return roomsArray;
        };
    }]);

    app.controller('LoginController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
        $scope.isRegistered = true;
        $scope.isAddingPersonalInfo = true;
        $scope.backToLogin = false;
        $scope.isAuth = false;
        $scope.showHouseSelector = function() {
            $scope.isAuth = true;
        }
        $scope.showInfoAdding = function(condition) {
            $scope.isAddingPersonalInfo = condition;
        }
        $scope.goBackToLogin = function() {
            $scope.backToLogin = true;
        }
        $scope.showRegister = function(condition) {
            $scope.isRegistered = condition;
        }
        $scope.authenticate = function () {
            //$timeout(function () { $location.path("/house"); }, 3000);
            $scope.showHouseSelector();
        };
        $scope.submit = function () {
            $timeout(function () { $location.path("/house"); }, 3000);
            
        };
    }]);
})();
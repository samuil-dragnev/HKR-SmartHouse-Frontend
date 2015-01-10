(function () {
    'use strict';
    var app = angular.module('house-module', ['ngRoute', 'routeStyles', 'house-module-directives', 'houseServices']);
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

    app.controller('MainController', ['$http', '$scope', function ($http, $scope) {
        $scope.isSwitched = false;
        $scope.room = {};
        $scope.lastRoom = {};
        $scope.selectedClass = "list-group-item";
        $scope.adminOption = true;

        $scope.adminPane = function (option) {
            $scope.adminOption = option;
        };
        $scope.changeClass = function () {
            if ($scope.class === "list-group-item") {
                $scope.class = "list-group-item disabled";
            } else {
                $scope.class = "list-group-item";
            }
        };

        $scope.setRoom = function (room) {
            if (!jQuery.isEmptyObject(room)) {
                $scope.lastRoom = room;
            }
            $scope.room = room;
        };
        $scope.showAdmin = function() {
            $scope.isSwitched = true;
        };
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
            return $scope.house[3].rooms;
        };
    }]);

    app.controller('LoginController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
        $scope.isRegistered = true;
        $scope.isAuth = false;
        $scope.showHouseSelector = function () {
            $scope.isAuth = true;
            console.log("testing");
        };
        $scope.showRegister = function(condition) {
            $scope.isRegistered = condition;
        };
        $scope.authenticate = function () {
            //$timeout(function () { $location.path("/house"); }, 3000);
            $scope.showHouseSelector();
        };
        $scope.submit = function () {
            $timeout(function () { $location.path("/house"); }, 3000);
        };
    }]);
})();
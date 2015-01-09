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
//            var arr = [];
//            var arr1 = [];
//            for( var i in rooms ) {
//                if (rooms.hasOwnProperty(i)){
//                    arr.push(rooms[i]);
//                    
//                    //console.log(arr[i]);
//                }
//                
//            }
//            for( var j in arr ) {
//                if (arr[j].hasOwnProperty(j)){
//                    arr1.push(arr[j].devices);
//
//                    console.log(arr1[j].name);
//                }
//
//            }
//            
//            return rooms;
//            var allDevices = [];
//            var rooms = $scope.house[3].rooms;
//            for(var j = 0; j < rooms.length; j ++) {
//                for(var i = 0; i < rooms.devices.length; i ++){
//                    allDevices[i] = rooms.devices[i];
//                    
//                    console.log(room.devices[i]);
//                    
//                }
//            }
//            return allDevices;
        };
    }]);

    app.controller('LoginController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
        $scope.submit = function () {
           angular.element(".circle-container").css("-webkit-animation-duration", "1000ms");
            $timeout(function () { $location.path("/house"); }, 3000);
        };
    }]);
})();
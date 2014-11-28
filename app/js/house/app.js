(function () {
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
                    css: 'css/index.css'
                }).otherwise({redirectTo: '/'});
            $locationProvider.html5Mode(true);
    }]);
    app.controller('HouseController', [ '$http', '$scope', function ($http, $scope) {
        $scope.room = {};
        $scope.lastRoom = {};
        $scope.setRoom = function (room) {
            if (jQuery.isEmptyObject(room)) {
                //Do nothing
            } else {
                $scope.lastRoom = room;
            }
            $scope.room = room;
        };
        
        $scope.house = [];
        $http.get("data//house.json").success(function (data) {
            $scope.house = data;
        });
        
        $scope.tab = 0;
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
        };

        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
    } ]);

    app.controller('LoginController', ['$scope', function ($scope) {

    }]);
})();
(function () {
    var app = angular.module('house-module', ['ngRoute']);
    app.config(['$routeProvider',
        function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HouseController',
                templateUrl: 'login.html'
            }).when('/house/', {
                controller: 'HouseController',
                templateUrl: 'main.html'
            }).otherwise({redirectTo: 'login.html'})
    }]);
    app.controller('HouseController', [ '$http', '$scope', function ($http,$scope){
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
})();
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
    app.controller('MainController', ['$http', 'userService', 'restFactory', '$scope', '$timeout', '$interval', function ($http, userService, restFactory, $scope, $interval) {
        var update = $interval( function () {
            restFactory.getHouseData().success(
                function (data) {
                    $scope.rooms = data;
                }
            );
            restFactory.getUnAuthUsers().success().success(
                function (data) {
                    $scope.unAuthUsers = data;
                }
            );
        }, 3000);
        $scope.isLoading = true;
        $scope.rooms = null;
        $scope.user = userService.getUser();
        restFactory.getHouseData().success(function (data) {
                $scope.rooms = data;
                $scope.isLoading = false;
        });
        /*Used for the transition of the form filling process
        in regard to user authorization*/
        $scope.formAuthUser = true;
        $scope.nextAuthUser = function (condition) {
            $scope.formAuthUser = condition;
        };
        $scope.authorizeUserByAdmin = function (ssn, ids) {
            restFactory.authorizeUser(ssn, ids).success(
                function (data) {
                     console.log(data);
                }
            );
        }
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


        //Method handling the logging out
        $scope.logout = function () {

        };
        //Add room
        $scope.addARoom = function (name, locale) {
            restFactory.addRoom(name, locale).success(
                function (data) {
                    $scope.rooms.push(data);
                }
            );
        };

        $scope.addADevice = function (roomId, name) {
            restFactory.addDevice(roomId, name).success(
                function (data) {
                    $scope.rooms[1].devices.push(data);
                }
            );
        };

        //Alarms
        $scope.getActivateAlarm = function () {
            var alarm = {"id": 1, "name": "Fire", "state": true };
            return alarm;
        };

        //GetAllUnAuthUsers
        $scope.unAuthUsers = [];
        restFactory.getUnAuthUsers().success().success(
            function (data) {
                $scope.unAuthUsers = data;
            }
        );
        $scope.checkForNonAuthUsers = function () {
            return ($scope.unAuthUsers.length > 0);
        };

        $scope.isAlarm = false;
        $scope.closeAlarm = function (id) {
            $scope.isAlarm = false;
        };
        $scope.testAlarm = function () {
            $scope.isAlarm = true;
        };

        /**
         * Method used to change the device state
         * @param roomId => The id of the room
         * @param deviceId => The id of the device
         * @param deviceState => The new state
         */
        $scope.changeDeviceState = function (roomId, deviceId, deviceState) {
            restFactory.toggleDevice(deviceId, deviceState).success(
                function (data) {
                    for ( var i = 0; i < $scope.rooms.length; i++) {
                        if ($scope.rooms[i].id === roomId) {
                            for ( var j = 0; j < $scope.rooms[i].devices.length; j++) {
                                if ($scope.rooms[i].devices[j].id === deviceId) {
                                    $scope.rooms[i].devices[j] = data;
                                }
                                console.log("fsafasf");
                            }
                        }
                    }
                }
            );
        };


    }]);

    app.controller('LoginController', ['$http', 'userService', 'restFactory', '$scope', '$location', function ($http, userService, restFactory, $scope, $location) {
        $scope.isRegistered = true;
        $scope.isAddingPersonalInfo = true;
        $scope.backToLogin = false;
        $scope.isAuth = false;
        $scope.emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        $scope.numericPattern = /^\d+$/;
        $scope.requested = false;
        $scope.requestedState = true;
        $scope.requestedResponseMessage = "";

        $scope.getUserBySSN = function (ssn) {
            restFactory.getUserById(ssn).success(
                function (data) {
                    userService.setUser(data);
                }
            );
        };

        $scope.proceed = function () {
            $location.url("house");
        }

        $scope.changeRequested = function (condition) {
            $scope.requested = false;
            $scope.showHouseSelector(condition);
        };
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
        /**
         * Method used for the authentication of the user
         * @param ssn => The User's SSN
         * @param password => The User's Password
         */
        $scope.login = function (ssn, password) {
            restFactory.authenticateUsers(ssn, password).success(
                function (data) {
                    $scope.requestedState = data.authenticate;
                    $scope.requested = true;
                    if (data.authenticate === true) {
                        $scope.requestedResponseMessage = "You have successfully logged in!";
                        $scope.getUserBySSN(ssn);
                    } else {
                        $scope.requestedResponseMessage = "Your SSN or Password is Incorrect!";
                    }
                }
            );
        };

        $scope.registerUser = function (user) {
            restFactory.registerUsers(user).success(function (data) {
                $scope.requestedState = data.registered;
                $scope.requested = true;
                if (data.registered === true) {
                    $scope.requestedResponseMessage = "Your request for registration has been send," +
                    "\r\n please wait for an approval from the admin!";
                } else {
                    $scope.requestedResponseMessage = "Your registration request was unsuccessful!";
                }
            });
        };
    }]);
})();
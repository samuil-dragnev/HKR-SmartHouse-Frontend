(function () {
    var app = angular.module('house-module', []);
    app.controller('HouseController', [ '$http', '$log', function ($http, $log) {
        var house = this;
        this.room = {};
        this.lastRoom = {};
        this.setRoom = function (room) {
            if (jQuery.isEmptyObject(room)) {
                //Do nothing
            } else {
                this.lastRoom = room;
            }
            this.room = room;
        };
        
        house.info = [];
        $http.get("data\\house.json").success(function (data) {
            house.info = data;
        });
    } ]);
    app.controller('PanelController', function () {
        this.tab = 0;
        this.selectTab = function (setTab) {
            this.tab = setTab;
        };
        
        this.isSelected = function (checkTab) {
            return this.tab === checkTab;
        };
    });
    
})();
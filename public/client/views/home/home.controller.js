(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("HomeController",HomeController);



    function HomeController($rootScope,$location,$http,$scope) {
        var vm = this;

        $scope.countryList = [
            "Adjustable Sit Up Benches", "Bar","Ab Wheel", "Stability Ball", "Roman Chairs", "Hyper Bench", "SEATED CABLE ROW", "BACK EXTENSIONS", "Assisted Pull-up", "Wide-Grip Pull-Up", "Bent-over Row","Barbell", "Bench Press Kit", "Chest Bench Kit", "Dumnble Kit", "Chest Fly Machine", "Chest Press Machine", "Dip Machine", "Biceps Curl", "Triceps Dip", "Fly Machine", "Seated High Row", "Lat Pull-Down,Seated", "Shoulder Press", "Treadmill", "Stair Mill", "Rowing Machine", "Spin Bike", "Jacob's Ladder", "ARC Trainer"
        ];
        $scope.complete = function(string){
            $scope.hidethis = false;
            var output = [];
            angular.forEach($scope.countryList, function(country){
                if(country.toLowerCase().indexOf(string.toLowerCase()) >= 0)
                {
                    output.push(country);
                }
            });
            $scope.filterCountry = output;
        }
        $scope.fillTextbox = function(string){
            $scope.country = string;
            $scope.hidethis = true;
        }



    }
})();
(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("ProfileController",ProfileController);

    var categories=[
        {"name":"Abs"},{"name":"Back"},{"name":"Chest"},{"name":"Arms"},{"name":"Cardio"},{"name":"Legs"}
    ]

    var subCategories=[
        {id:"Abs",name:"Adjustable Sit Up Benches"},{id:"Abs",name:"Bar"},{id:"Abs",name:"Ab Wheel"},{id:"Abs",name:"Stability Ball"},{id:"Abs",name:"Roman Chairs"},{id:"Abs",name:"Hyper Bench"},
        {id:"Back",name:"SEATED CABLE ROW"},{id:"Back",name:"BACK EXTENSIONS"},{id:"Back",name:"Assisted Pull-up"},{id:"Back",name:"Wide-Grip Pull-Up"},{id:"Back",name:"Bent-over Row"},{id:"Back",name:"Barbell"},
        {id:"Chest",name:"Bench Press Kit"},{id:"Chest",name:"Chest Bench Kit"},{id:"Chest",name:"Dumnble Kit"},{id:"Chest",name:"Chest Fly Machine"},{id:"Chest",name:"Chest Press Machine"},{id:"Chest",name:"Dip Machine"},
        {id:"Arms",name:"Biceps Curl"},{id:"Arms",name:"Triceps Dip"},{id:"Arms",name:"Fly Machine"},{id:"Arms",name:"Seated High Row"},{id:"Arms",name:"Lat Pull-Down,Seated"},{id:"Arms",name:"Shoulder Press"},
        {id:"Cardio",name:"Treadmill"},{id:"Cardio",name:"Stair Mill"},{id:"Cardio",name:"Rowing Machine"},{id:"Cardio",name:"Spin Bike"},{id:"Cardio",name:"Jacob's Ladder"},{id:"Cardio",name:"ARC Trainer"},
        {id:"Legs",name:"Leg Press"},{id:"Legs",name:"Leg Extension"},{id:"Legs",name:"Hamstring Curl"},{id:"Legs",name:"Seated Calf Raise"},{id:"Legs",name:"Standing Calf Raise"},{id:"Legs",name:"Leg Abductor"}
    ]


    function ProfileController($rootScope,UserService,$location,$scope) {
        var vm = this;
        vm.updateUser=updateUser;
        vm.logout=logout;

        vm.categories=categories;
        // vm.subcategory=[]

        var id=$rootScope.currentUser._id;
        console.log(id)

        vm.currentUser=id;
        vm.search=search;

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                })

        }init();

        function search(subcat) {
            console.log(subcat)
            for(var i in subCategories)
            {
                if(subcat===subCategories[i].name)
                {
                    $location.url("/category/"+subCategories[i].id+"/instrument/"+subCategories[i].name);
                }
            }

        }

        function updateUser(newUser) {
            console.log(newUser)
            UserService.updateUser(id,newUser)
                .then(function (response) {
                    console.log(response.data);
                    vm.success="Update Successfull";
                })
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home")
                    },function (error) {
                        $location.url("/home")
                    }
                )
        }



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
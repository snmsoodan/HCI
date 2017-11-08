(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($rootScope,UserService,$location) {
        var vm = this;
        vm.updateUser=updateUser;
        vm.logout=logout;

        var id=$rootScope.currentUser._id;
        console.log(id)

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                })

        }init();

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

    }
})();
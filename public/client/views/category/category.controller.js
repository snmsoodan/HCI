(function() {
    angular.module("ServiceLearningApp")
        .controller("CategoryController",CategoryController);

    function CategoryController($rootScope,$location,UserService) {
        var vm = this;
        vm.logout=logout;

        var id=$rootScope.currentUser._id;
        console.log(id)

        function init(){
            console.log("category page")
        }init();

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
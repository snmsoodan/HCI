(function() {
    angular.module("ServiceLearningApp")
        .controller("CategoryController",CategoryController);

    function CategoryController($rootScope,$location,UserService) {
        var vm = this;


        var id=$rootScope.currentUser._id;
        console.log(id)

        function init(){
            console.log("category page")
        }init();



    }


})();
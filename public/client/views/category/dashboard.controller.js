(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("dashboardController",dashboardController);

    var instruments=[

        { "_id": "Adjustable Sit Up Benches","n1":"5:00 PM","n2":"5:30","n3":"6:00","n4":"6:30","n5":"7:00",
            "a1":"t","a2":"t","a3":"t","a4":"t","a5":"t"}
    ]


    function dashboardController($rootScope,$location,$routeParams,UserService) {
        var vm = this;
        vm.logout=logout;


        function init(){
            vm.ins=instruments[0];
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
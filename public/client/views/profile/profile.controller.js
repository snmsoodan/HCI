(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("ProfileController",ProfileController);

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", role:"faculty"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", role:"faculty"  },
        {_id: "345", username: "carl",   password: "carl",   firstName: "Charly", lastName: "Garcia", role:"admin"  },
        {_id: "456", username: "dean", password: "dean", firstName: "Joe",   lastName: "Dean",role:"partner" }
    ]

    function ProfileController($rootScope,$location,$routeParams) {
        var vm = this;
        vm.message = null;
        vm.id = $routeParams.id;

        function init(){

        }init();



    }
})();
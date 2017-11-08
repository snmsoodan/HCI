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



    function ProfileController($rootScope,UserService) {
        var vm = this;
        var id=$rootScope.currentUser._id;
        console.log(id)

        function init(){
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                })

        }init();

    }
})();
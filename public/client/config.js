(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .config(Configure);


    function Configure($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })

            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })


            .when("/category", {
                templateUrl: "client/views/category/category.view.html",
                controller: "CategoryController",
                controllerAs: "model"
            })




            .otherwise({
                redirectTo: "home"
            });


            }

})();
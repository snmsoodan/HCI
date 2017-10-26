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

            .when("/profile", {
                templateUrl: "client/views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/category/:cid", {
                templateUrl: "client/views/category/specificCategory.view.html",
                controller: "specificCategoryController",
                controllerAs: "model"
            })

            .when("/type/:tid/instrument/:id", {
                templateUrl: "client/views/category/bookInstrument.view.html",
                controller: "bookInstrumentController",
                controllerAs: "model"
            })

            .when("/dashboard", {
                templateUrl: "client/views/category/dashboard.view.html",
                controller: "dashboardController",
                controllerAs: "model"
            })


            .otherwise({
                redirectTo: "home"
            });


            }

})();
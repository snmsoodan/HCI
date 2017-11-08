(function () {
        angular
            .module("ServiceLearningApp")
            .factory("UserService", UserService);

        function UserService($http) {
            var api = {
                logout: logout,
                loggedIn: loggedIn,
                findUserById:findUserById,
            };
            return api;

            function findUserById(id) {
                var url="/api/user/"+id;
                return $http.get(url);
            }

            function loggedIn() {
                return $http.get("/api/loggedIn");
            }

            function logout() {
                return $http.post("/api/logout");
            }
        }
    }


)();
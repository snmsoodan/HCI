(function () {
        angular
            .module("ServiceLearningApp")
            .factory("UserService", UserService);

        function UserService($http) {
            var api = {
                logout: logout,
                loggedIn: loggedIn,
                findUserById:findUserById,
                updateUser:updateUser,
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

            function updateUser(id,newUser) {
                var url="/api/user/"+id;
                return $http.put(url,newUser);
            }

        }
    }


)();
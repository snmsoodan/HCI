(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("dashboardController",dashboardController);

    var instruments=[

        { "_id": "Adjustable Sit Up Benches","n1":"5:00 PM","n2":"5:30","n3":"6:00","n4":"6:30","n5":"7:00",
            "a1":"t","a2":"t","a3":"t","a4":"t","a5":"t"}
    ]


    function dashboardController($rootScope,$location,$routeParams) {
        var vm = this;


        function init(){
            // vm.instrumentName=$routeParams.id;
            // vm.type=$routeParams.tid;

            // console.log(vm.instrumentName)
            // for(var i in instruments)
            // {
            //     if(instruments[i]._id===vm.instrumentName)
            //     {
            //         vm.ins=instruments[i];
            //     }
            // }
            vm.ins=instruments[0];

        // console.log(vm.ins);
        }init();



    }
})();
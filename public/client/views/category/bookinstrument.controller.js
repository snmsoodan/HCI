(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("bookInstrumentController",bookInstrumentController);

    var instruments=[

        { "_id": "Adjustable Sit Up Benches", "n1": "1:00 PM", "n2": "1:30 PM", "n3":"2:00 PM", "n4":"2:30 PM", "n5":"3:00 PM", "n6":"3:30 PM","n7":"4:00 PM","n8":"4:30","n9":"5:00 PM","n10":"5:30","n11":"6:00","n12":"6:30","n13":"7:00",
            "a1":"f","a2":"t","a3":"t","a4":"t","a5":"t","a6":"t","a7":"t","a8":"t","a9":"t","a10":"t","a11":"t","a12":"t","a13":"t"}
    ]


    function bookInstrumentController($rootScope,$location,$routeParams) {
        var vm = this;


        function init(){
            vm.instrumentName=$routeParams.id;
            vm.type=$routeParams.tid;

            console.log(vm.instrumentName)
            for(var i in instruments)
            {
                if(instruments[i]._id===vm.instrumentName)
                {
                    vm.ins=instruments[i];
                }
            }

        console.log(vm.ins);
        }init();



    }
})();
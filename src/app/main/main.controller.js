(function () {
    'use strict';

    angular
        .module('cardgame')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($rootScope, $timeout, $log, $interval, SweetAlert) {
        var vm = this;
        SweetAlert.swal({
            title: "Memory Game",
            text: "A difficult memory cards game online for adults with many different cards from a deck of cards ... a free game, so come and play!",
            type: "info",
            confirmButtonText: "Start",
            confirmButtonColor: "#ef5350"
        }, function (isConfirm) {
            if (isConfirm) {
                $rootScope.allowed = true;
                $rootScope.time = $interval(function () {
                    $rootScope.elapsedTime++;
                }, 1000);
            }
        });
        function arrayShuffle() {
            var i = this.length, j, temp;
            if (i === 0) return false;
            while (--i) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this[i];
                this[i] = this[j];
                this[j] = temp;
            }
        }
        Array.prototype.shuffle = arrayShuffle;
        var start = 0;
        var end = 51;
        var numbers = new Array();
        for (var i = start; i <= end; i++) {
            numbers.push(i);
        }
        numbers.shuffle();
        var cards = [];
        var halfStack = 18;
        for (var ii = 0; ii < halfStack; ii++) {
            cards.push(numbers.pop());
        }
        vm.cards = [];
        angular.forEach(cards, function (value) {
            $log.debug(value);
            vm.cards.push({ 'selected': false, 'value': value });
            vm.cards.push({ 'selected': false, 'value': value });
        });
        vm.cards.shuffle();
        $log.debug(vm.cards);
    }
})();

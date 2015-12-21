(function () {
    'use strict';

    angular
        .module('cardgame')
        .directive('card', card);

    /** @ngInject */
    function card($rootScope, $timeout, $interval, $log, SweetAlert) {
        var directive = {
            restrict: 'EA',
            controller: cardController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element) {
                $log.debug(scope.card.selected);
                $log.debug(scope.$parent.main);
                scope.cards = scope.$parent.main.cards; // Get cards
                element.on('click', function (e) {
                    $log.debug(scope.clicked);
                    if ($rootScope.allowed) {
                        if (!scope.card.selected) {
                            e.stopPropagation();
                            $log.debug(e);
                            $log.debug(scope.$index);
                            $rootScope.movementFlag++;
                            if (($rootScope.movementFlag % 2) == 0) {
                                $log.debug('second choice');
                                $rootScope.allowed = false;
                                $rootScope.attempt++;
                                $rootScope.movementFlag = 0;
                                $log.debug($rootScope.firstChoice);
                                $log.debug(scope.card);
                                if ($rootScope.firstChoice.value == scope.card.value) { // If the second choice same as the first choice
                                    $rootScope.score++;
                                    if ($rootScope.score == (scope.cards.length / 2)) { // If user has completed the game
                                        $interval.cancel($rootScope.time);
                                        SweetAlert.swal({
                                            title: "Finish",
                                            text: "Congratulation! You have finished the game",
                                            type: "success",
                                            confirmButtonText: "Reload page",
                                            confirmButtonColor: "#ef5350"
                                        }, function (isConfirm) {
                                            if (isConfirm) {
                                                location.reload();
                                            }
                                        });
                                    }
                                    scope.card.selected = true;
                                    element.removeClass('animated').removeClass($rootScope.animation);
                                    var t = $timeout(function () {
                                        element.addClass('animated').addClass($rootScope.animation);
                                        element.css({
                                            'background-image': 'url(assets/images/cards/image' + scope.card.value + '.jpg)'
                                        });
                                        $rootScope.allowed = true;
                                        $timeout.cancel(t);
                                    });
                                } else { // If the second choice is different from the first choice
                                    $log.debug('different');
                                    scope.cards[$rootScope.firstChoice.index].selected = false;

                                    element.removeClass('animated').removeClass($rootScope.animation);
                                    var t2 = $timeout(function () {
                                        element.addClass('animated').addClass($rootScope.animation);
                                        element.css({
                                            'background-image': 'url(assets/images/cards/image' + scope.card.value + '.jpg)'
                                        });
                                        $timeout.cancel(t2);
                                    }).then(function () {
                                        var target = angular.element('.card-' + $rootScope.firstChoice.index);
                                        var t3 = $timeout(function () {
                                            element.addClass('animated').addClass($rootScope.animation);
                                            element.css({
                                                'background-image': 'url(assets/images/cards/imageDefault.png)'
                                            });
                                            target.css({
                                                'background-image': 'url(assets/images/cards/imageDefault.png)'
                                            });
                                            $rootScope.allowed = true;
                                            $timeout.cancel(t3);
                                        }, 500);
                                        return t3;
                                    });
                                }
                            } else {
                                $log.debug('first choice');
                                $rootScope.firstChoice = scope.card;
                                scope.card.selected = true;
                                $rootScope.firstChoice.index = scope.$index;
                                element.removeClass('animated').removeClass($rootScope.animation);
                                var t4 = $timeout(function () {
                                    element.addClass('animated').addClass($rootScope.animation);
                                    element.css({
                                        'background-image': 'url(assets/images/cards/image' + scope.card.value + '.jpg)'
                                    });
                                    $timeout.cancel(t4);
                                });
                            }
                        }
                    }
                })
            }
        };

        return directive;

        /** @ngInject */
        function cardController() {

        }
    }

})();

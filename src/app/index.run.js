(function () {
    'use strict';

    angular
        .module('cardgame')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $log) {

        $log.debug('runBlock end');
    
        // For main game    
        $rootScope.movementFlag = 0; // For tracking user's movement, only for development purpose
        $rootScope.elapsedTime = 0; // Time counter
        $rootScope.attempt = 0; // User's pairing attempt
        $rootScope.score = 0; // User's final score
        // $rootScope.animation = 'fadeIn'; // Card's animation from animation.css
        $rootScope.animation = ''; // For now, let the card without animation
        $rootScope.allowed = false; // Allow user to pick any card in a certain condition
    }

})();

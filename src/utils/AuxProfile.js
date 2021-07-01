var AuxProfile = (function() {
    var auth_user = {};
    var current_solo_queue = [];

    // Auth0 User profile
    var getAuthUser = function() {
        return auth_user;
    };

    var setAuthUser = function(authUser) {
        auth_user = authUser;
    }

    // Current users personal queue
    var getCurrentSoloQueue = function() {
        return localStorage.getItem("currentSoloQueue") || current_solo_queue;
    };

    var setCurrentSoloQueue = function(currentSoloQueue) {
        current_solo_queue = currentSoloQueue;
        // Also set this in cookie/localStorage
        localStorage.setItem('currentSoloQueue', JSON.stringify(currentSoloQueue));
    }

    return {
        getAuthUser: getAuthUser,
        setAuthUser: setAuthUser,

        getCurrentSoloQueue: getCurrentSoloQueue,
        setCurrentSoloQueue: setCurrentSoloQueue,

    }

})();

export default AuxProfile;
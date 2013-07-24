define(['durandal/plugins/router', 'durandal/app'], function (router, app) {

    

    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.            
        },
        activate: function () {            
            return router.activate('registrar_mobile');
        }
    };
});
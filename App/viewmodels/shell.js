define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Busqueda no implementada...');
        },
        activate: function () {
            router.map([
                 { route: '', title:'Login', moduleId: 'viewmodels/login_usuario', nav: true }                 
            ]).buildNavigationModel();
            

            return router.activate();
        }
    };
});
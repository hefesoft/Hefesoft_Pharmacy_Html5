

define(
[
"jQuery",
"kendo",
'durandal/app',
'durandal/viewLocator',
'durandal/system',
'durandal/plugins/router',
'Promesas/q.min',
'Sammy'
],
    function ($, kendo, app, viewLocator, system, router,Q,Sammy) {

        var _onError = function (error, url, line) {
            utils.showError(error);
        };

        var init = function () {
          
                window.Sammy = Sammy;
                //>>excludeStart("build", true);
                system.debug(true);
                //>>excludeEnd("build");

                app.title = 'Hefesoft Pharmacy';

                //Promises
                system.defer = function (action) {
                  var deferred = Q.defer();
                  action.call(deferred, deferred);
                  var promise = deferred.promise;
                  deferred.promise = function() {
                      return promise;
                  };
                  return deferred;
                };
                //

                app.start().then(function () {
                    //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
                    //Look for partial views in a 'views' folder in the root.
                    viewLocator.useConvention();

                    //configure routing
                    router.useConvention();            

                    var routes = [
                        { url: 'login_usuario', moduleId: 'viewmodels/login_usuario', name: 'login', visible: true, settings: { area: 'Login'} },
                        { url: 'medicos', moduleId: 'viewmodels/medicos', name: 'Medicos', visible: false, settings: { area: 'Medicos'} },
                        { url: 'farmacias', moduleId: 'viewmodels/farmacias', name: 'Farmacias', visible: false, settings: { area: 'Farmacias'} },
                        { url: 'ciclos', moduleId: 'viewmodels/ciclos', name: 'Ciclos', visible: false, settings: { area: 'Ciclos'} },
                        { url: 'panel', moduleId: 'viewmodels/panel', name: 'Panel', visible: false, settings: { area: 'Panel'} },
                        { url: 'editar_medico', moduleId: 'viewmodels/editar_medico', name: 'Editar Medico', visible: false, settings: { area: 'Medicos'} },
                        { url: 'editar_farmacia', moduleId: 'viewmodels/editar_farmacia', name: 'Editar Farmacia', visible: false, settings: { area: 'Farmacia'} },
                        { url: 'editar_usuario', moduleId: 'viewmodels/editar_usuario', name: 'Editar Usuario', visible: false, settings: { area: 'Usuario'} },
                        { url: 'usuario', moduleId: 'viewmodels/usuario', name: 'Usuarios', visible: true, settings: { area: 'Usuario'} },
                        { url: 'planear', moduleId: 'viewmodels/planear', name: 'Planear', visible: false, settings: { area: 'Planear'} }
                    ];

                    router.map(routes);          

                    app.adaptToDevice();

                    //Show the app by setting the root view model for our application with a transition.
                    app.setRoot('viewmodels/shell', 'entrance');
                });

        };

        return {
            init: init          
        };
    });

/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />
/// <reference path="../durandal/plugins/router.js" />


    var client;
    var token;

define(['durandal/system', 'logger', 'durandal/plugins/router','global/vars'], 
    function (system, logger, router, global) {
    var login = function () {
        this.ingresarSistema = ingresarSistema;
        this.displayName = 'Hefesoft Pharmacy';
        this.description = 'Por favor ingrese al sitema con alguna de las siguientes opciones.';
        client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', global.Azure_key);      
    };

    login.prototype.compositionComplete = function (view) {

    };

    function ingresarSistema(item, event) {
        if (event.currentTarget.id === "fb") {
            logger.log('facebook', null, system.getModuleId(login), true);
            client.login("facebook").then(refreshAuthDisplay, function (error) {            
            alert(error);
        });
        }
        else if (event.currentTarget.id === "windows") {
            logger.log('windows', null, system.getModuleId(login), true);            
            client.login("microsoftaccount").then(refreshAuthDisplay, function (error) {
            alert(error);
            });
        }
        else if (event.currentTarget.id === "google") {
            logger.log('google', null, system.getModuleId(login), true);            
            client.login("google").then(refreshAuthDisplay, function (error) {
            alert(error);
            });
        }
         else if (event.currentTarget.id === "twitter") {
            logger.log('twitter', null, system.getModuleId(login), true);            
            client.login("twitter").then(refreshAuthDisplay, function (error) {
            alert(error);
            });
        }
       
    }

    function refreshAuthDisplay() {
        var isLoggedIn = client.currentUser !== null;        

        if (isLoggedIn) {            
            logger.log('Usuario ingreso con identificacion ' + client.currentUser.userId, null, system.getModuleId(login), true);            
            global.token = client.currentUser.mobileServiceAuthenticationToken;                                   
            
            // No funciona
            //for (var i = 0; i < router.allRoutes().length; i++) {
            //     router.allRoutes()[i].visble = true;
            //}

            // Si funciona sobrescribir las urls
            var routes = [              
              { url: 'medicos', moduleId: 'viewmodels/medicos', name: 'Medicos', visible: true, settings: { area: 'Medicos' } },
              { url: 'farmacias', moduleId: 'viewmodels/farmacias', name: 'Farmacias', visible: true, settings: { area: 'Farmacias' } },
              { url: 'ciclos', moduleId: 'viewmodels/ciclos', name: 'Ciclos', visible: true, settings: { area: 'Ciclos' } },
              { url: 'panel', moduleId: 'viewmodels/panel', name: 'Panel', visible: true, settings: { area: 'Panel' } },
              { url: 'planear', moduleId: 'viewmodels/planear', name: 'Planear', visible: true, settings: { area: 'Planear' } }
            ];

            router.map(routes);   
        }
    }

    return login;
});


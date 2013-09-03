define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {  
    system.debug(true);
    app.title = 'Hefesoft Pharmacy';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

   

    app.start().then(function() {        
        viewLocator.useConvention();       
        app.setRoot('viewmodels/shell', 'entrance');
    });
});
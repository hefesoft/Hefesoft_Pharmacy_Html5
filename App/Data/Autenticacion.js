define(
[
'global/vars',
'Promesas/q.min',
'durandal/plugins/router'
], function (global,Q,router) {
    var Autenticacion = {        
        consultarUsuario : consultarUsuario,
        obtenerUsuarios : obtenerUsuarios
    };
    

    function consultarUsuario(usuario, contrasenia) {    
    var deferred = Q.defer();

    var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
    var todoItemTable = client.getTable('TP_Usuario');

    var query = todoItemTable.where({
        Activo: true,
        usuario: usuario,
        contrasenia: contrasenia
    }).read().done(function (results) {
    if (results.length > 0) {

        global.id_Usuario = results[0].id;

        // Aca poner logica de perfiles
        var routes = [
        { url: 'medicos', moduleId: 'viewmodels/medicos', name: 'Medicos', visible: true, settings: { area: 'Medicos'} },
        { url: 'farmacias', moduleId: 'viewmodels/farmacias', name: 'Farmacias', visible: true, settings: { area: 'Farmacias'} },
        { url: 'ciclos', moduleId: 'viewmodels/ciclos', name: 'Ciclos', visible: true, settings: { area: 'Ciclos'} },
        { url: 'panel', moduleId: 'viewmodels/panel', name: 'Panel', visible: true, settings: { area: 'Panel'} },
        { url: 'editar_medico', moduleId: 'viewmodels/editar_medico', name: 'Editar Medico', visible: true, settings: { area: 'Medicos'} },
        { url: 'planear', moduleId: 'viewmodels/planear', name: 'Planear', visible: true, settings: { area: 'Planear'} }];

        router.map(routes);
        deferred.resolve(results);
    }
    else {
        deferred.resolve(results);
    }
    }, function (err) {
        deferred.reject(new Error("Error " + err));
    });

    return deferred.promise;
};    

    function obtenerUsuarios() {    
        var deferred = Q.defer();

        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Usuario');

        var query = todoItemTable.where({
            Activo: true         
        }).read().done(function (results) {
            if (results.length > 0) {
                deferred.resolve(results);
            }
            else {
                deferred.resolve(results);
            }
            }, function (err) {
                deferred.reject(new Error("Error " + err));
         });

        return deferred.promise;
};    

    return Autenticacion;

});


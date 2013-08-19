define(
[
'global/vars',
'Promesas/q.min',
'durandal/plugins/router',
'Data/Ciclos'
], function (global,Q,router,ciclos) {
    var Autenticacion = {        
        consultarUsuario : consultarUsuario,
        obtenerUsuarios : obtenerUsuarios,
        cargarUsuarios_AutoCompletar : cargarUsuarios_AutoCompletar,
        cargarUsuario_Por_Id : cargarUsuario_Por_Id,
        actualizar_Usuario : actualizar_Usuario
    };
    

    function consultarUsuario(usuario, contrasenia) {    
    var deferred = Q.defer();

    var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
    var todoItemTable = client.getTable('TP_Usuario');

    var query = todoItemTable.where({
        Activo: true,
        Correo_Electronico: usuario,
        Clave: contrasenia
    }).read().done(function (results) {
    if (results.length > 0) {

        global.id_Usuario = results[0].id;
        global.id_Usuario_antiguo = results[0].Id_Antiguo;
        
        // Va a el Data y Carga el ciclo actual
        ciclos.cargarCicloActivo();

        // Aca poner logica de perfiles
        var routes = [
        { url: 'medicos', moduleId: 'viewmodels/medicos', name: 'Medicos', visible: true, settings: { area: 'Medicos'} },
        { url: 'farmacias', moduleId: 'viewmodels/farmacias', name: 'Farmacias', visible: true, settings: { area: 'Farmacias'} },
        { url: 'ciclos', moduleId: 'viewmodels/ciclos', name: 'Ciclos', visible: true, settings: { area: 'Ciclos'} },
        { url: 'panel', moduleId: 'viewmodels/panel', name: 'Panel', visible: true, settings: { area: 'Panel'} },
        { url: 'editar_medico', moduleId: 'viewmodels/editar_medico', name: 'Editar Medico', visible: false, settings: { area: 'Medicos'} },
        { url: 'editar_farmacia', moduleId: 'viewmodels/editar_farmacia', name: 'Editar Farmacia', visible: false, settings: { area: 'Farmacia'} },
        { url: 'editar_usuario', moduleId: 'viewmodels/editar_usuario', name: 'Editar Usuario', visible: false, settings: { area: 'Usuario'} },
        { url: 'usuario', moduleId: 'viewmodels/usuario', name: 'Usuarios', visible: true, settings: { area: 'Usuario'} },
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
    function cargarUsuarios_AutoCompletar(Q,Azure_Mobile_Services,nombre){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Usuario');

        var query = todoItemTable
        .read({ esprocedimiento: '1', buscador : '1', nombreBuscar: nombre  })
         .done(function (results) {
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
    function cargarUsuario_Por_Id(Q,Azure_Mobile_Services,id){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Usuario');

        var query = todoItemTable
        .read({ esprocedimiento: '1', idUsuario : id })
         .done(function (results) {
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
    function actualizar_Usuario(Q,Azure_Mobile_Services,usuario){
        // var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Usuario');

        todoItemTable.update(usuario);
         
         /* }).read()
         .done(function (results) {
            if (results.length > 0) {
                deferred.resolve(results);
            }
            else {
                deferred.resolve(results);
            }
            }, function (err) {
                deferred.reject(new Error("Error " + err));
         });

        return deferred.promise;*/
    };

    return Autenticacion;

});


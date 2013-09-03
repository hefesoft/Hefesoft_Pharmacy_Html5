define(
[
'global/vars',
'Promesas/q.min',
'plugins/router',
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

        router.reset();

         router.map([
            { route:'medicos',moduleId: 'viewmodels/medicos', nav: true },
            { route:'farmacias', moduleId: 'viewmodels/farmacias', nav: true },
            { route:'ciclos', moduleId: 'viewmodels/ciclos', nav: true },
            { route:'panel', moduleId: 'viewmodels/panel', nav: true },
            { route:'editar_medico', moduleId: 'viewmodels/editar_medico', nav: false},
            { route:'editar_farmacia', moduleId: 'viewmodels/editar_farmacia', nav: false},
            { route:'editar_usuario', moduleId: 'viewmodels/editar_usuario', nav: false},
            { route:'usuario', moduleId: 'viewmodels/usuario', nav: true },
            { route:'planear', moduleId: 'viewmodels/planear', nav: true }
        ]).buildNavigationModel();

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
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
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


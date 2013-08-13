define(
[
'global/vars',
'Promesas/q.min',
'durandal/plugins/router'
], function (global, Q, router) {
    var Visita = {
        AgregarVisita: AgregarVisita,
        EliminarVisita: EliminarVisita,
        SumarContacto : SumarContacto,      
        cargarVisitas : cargarVisitas
    };

    function AgregarVisita(global, Q, Azure_Mobile_Services, visita) {
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TM_Visita');

        todoItemTable.insert(visita).done(function (item) {
            if (item.length > 0) {
                deferred.resolve(item);
            }
            else {
                deferred.resolve(item);
            }
        }, function (err) {
            deferred.reject(new Error("Error " + err));
        });

        return deferred.promise;
    };

    function EliminarVisita(global, Q, Azure_Mobile_Services, idEliminar) {
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TM_Visita');
        todoItemTable.del({ id: idEliminar });
    }

    function SumarContacto(global, id, numeroContactos) {
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TM_Panel');

        todoItemTable.update({
            id: id,
            ContactosActual: numeroContactos
        });        
    };

    function cargarVisitas(global,Q,Azure_Mobile_Services,id_Usuario){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TM_Visita');

        var query = todoItemTable.where({
            id_Usuario: id_Usuario
        })
        .read()
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
    }

    return Visita;
});


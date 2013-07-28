define(
[
    'global/vars',
    'Promesas/q.min',
    'MobileServices.Web-1.0.0.min',
    ,"kendo"
]
,
function (global, Q, Azure_Mobile_Services, Kendo) {
    var producto = {
        cargarProducto_AutoCompletar : cargarProducto_AutoCompletar
    };
    return producto;
});
  

    function cargarProducto_AutoCompletar(global,Q,Azure_Mobile_Services,nombre){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Producto');

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

define(
[
  'global/vars'
]
,
function (global) {
   
    function cargarDepartamentos(Q,Azure_Mobile_Services){      
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('tp_departamento');

         var query = todoItemTable.take(200).orderBy("Departamento").read()
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

    function cargarCiudades(Q,Azure_Mobile_Services,codigo){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('tp_ciudad');

         var query =  todoItemTable.take(200).orderBy("Ciudad").where({
            Codigo_Departamento : codigo
        }).read()
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
   
    var zonas_geograficas = {       
        cargarDepartamentos : cargarDepartamentos,
        cargarCiudades : cargarCiudades
    };
   
    return zonas_geograficas;
});
    

define(['global/vars'], function (global) {
    
    function cargar_TP_Farmacias(global) {
        this.remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Farmacia",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                create: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Farmacia";                       
                        return url;
                    },
                    dataType: "json",
                    type: "POST",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                update: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Farmacia/" + options.id;
                        delete options.id;
                        return url;
                    },
                    dataType: "json",
                    type: "PATCH",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                destroy: {
                    url: function (options) {
                        return "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Farmacia/" + options.id;
                    },
                    dataType: "json",
                    type: "DELETE",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                }
            },
            parameterMap: function (options, operation) {
                if (operation != "read") {
                    return options;
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false, type: "int" },
                        Nombre: { validation: { required: true }, type: "string" },
                        Telefono: { validation: { required: true }, type: "string" },
                        Telefono2: { validation: { required: false }, type: "string" },
                        Direccion: { validation: { required: false }, type: "string" } 
                    }
                }
            }
        });

        remoteDataSource.read();
        return remoteDataSource;
    };
    function cargarFarmacia_Por_Id(Q,Azure_Mobile_Services,id){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Farmacia');

        var query = todoItemTable
        .read({ esprocedimiento: '1', idFarmacia : id })
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
    function cargarCanales(Q,Azure_Mobile_Services){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Canal');

        var query = todoItemTable
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
    };
    function actualizar_Farmacia(Q,Azure_Mobile_Services,farmacia){
        // var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_farmacia');

        todoItemTable.update(farmacia);
         
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
    function cargarFarmacia_AutoCompletar(Q,Azure_Mobile_Services,nombre){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TP_Farmacia');

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
    
    
    var farmacias = {        
        Listado_Farmacias : cargar_TP_Farmacias(global),
        actualizar_Farmacia : actualizar_Farmacia,
        cargarCanales : cargarCanales,
        cargarFarmacia_Por_Id : cargarFarmacia_Por_Id,
        cargarFarmacia_AutoCompletar : cargarFarmacia_AutoCompletar
    };


    return farmacias;
});
  

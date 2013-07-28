define(
[
    'global/vars',
    'Promesas/q.min',
    'MobileServices.Web-1.0.0.min',
    ,"kendo"
]
,
function (global, Q, Azure_Mobile_Services, Kendo) {
    var medicos = {
        Tp_Tipo_Documento: cargar_Tipos_Documentos(global),
        Listado_Medicos : cargar_Medicos(global),
        cargarEspecialidades : cargarEspecialidades,
        cargarMedico_Por_Id : cargarMedico_Por_Id,
        actualizar_Medico : actualizar_Medico,
        cargarMedico_AutoCompletar : cargarMedico_AutoCompletar
    };
    return medicos;
});
  
    function cargar_Tipos_Documentos(global) {
        this.remoteDataSourceEspecialidades = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/tp_tipo_documento",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false, type: "int" },
                        Descripcion: { validation: { required: true }, type: "string" }
                    }
                }
            }
        });

        remoteDataSourceEspecialidades.read();
        return remoteDataSourceEspecialidades;
    };
    function cargar_Medicos(global) {
        this.remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/tp_medico",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                create: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/tp_medico";
                        var idTipoDocumento = options.IdTipoDocumento.id;
                        delete options.IdTipoDocumento;
                        options.IdTipoDocumento = idTipoDocumento;
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
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/tp_medico/" + options.id;
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
                        return "https://hefesoftpharmacy.azure-mobile.net/tables/tp_medico/" + options.id;
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
                        Apellidos: { validation: { required: true }, type: "string" },
                        Nombres: { validation: { required: true }, type: "string" },
                        NumeroDocumento: { validation: { required: true }, type: "string" },
                        //Si es un propiedad dependiente debe dejarse el valor por defecto si no se totea
                        IdTipoDocumento: { defaultValue: { id: 1, CategoryName: "Cedula"} }
                    }
                }
            }
        });

        remoteDataSource.read();
        return remoteDataSource;
    };      
    function cargarEspecialidades(global,Q,Azure_Mobile_Services){      
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Especialidades');

         var query = todoItemTable.take(200).orderBy("Descripcion").read()
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
    function cargarMedico_Por_Id(global,Q,Azure_Mobile_Services,id){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Medico');

        var query = todoItemTable
        .read({ esprocedimiento: '1', idMedico : id })
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
    function actualizar_Medico(global,Q,Azure_Mobile_Services,medico){
        // var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Medico');

        todoItemTable.update(medico);
         
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
    function cargarMedico_AutoCompletar(global,Q,Azure_Mobile_Services,nombre){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
        var todoItemTable = client.getTable('TP_Medico');

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

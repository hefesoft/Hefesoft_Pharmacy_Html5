

define(['global/vars',"Util/Util","kendo"], 
  function (global, util, kendo) {
 
    function cargar_planear() {
        this.remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Visita",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');                        
                    }
                },
                create: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Visita";
                        delete options.id;
                        return url;
                    },
                    dataType: "json",
                    type: "POST",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');                        
                    }
                },
                update: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Visita/" + options.id;
                        util.eliminarPropiedadesNoDefinidas(options);
                        delete options.id;
                        options.Fecha = moment(options.Fecha).format('MM/DD/YYYY');
                        return url;
                    },
                    dataType: "json",
                    type: "PATCH",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');                        
                    }
                },
                destroy: {
                    url: function (options) {
                        return "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Visita/" + options.id;
                    },
                    dataType: "json",
                    type: "DELETE",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');                        
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
                        IdPanel: { editable: false, type: "int" },
                        Fecha: { editable: true, type: "date" },
                        Hora : { editable: true, type: "int" },
                        Nombre_Mostrar: { validation: { required: true }, type: "string", editable: false },
                        Direccion_Mostrar: { validation: { required: true }, type: "string", editable: false },
                        Tipo: { editable: false, type: "string", defaultValue: '' }
                    }
                }
            }
        });        
        return remoteDataSource;
    };  
    function cargarPlaneacion_Por_Usuario(Q,Azure_Mobile_Services,identificadorUsuario,identificadorCiclo){
        var deferred = Q.defer();
        var MobileServiceClient = WindowsAzure.MobileServiceClient;
        var client = new WindowsAzure.MobileServiceClient(global.Azure_Url, global.Azure_key);
        var todoItemTable = client.getTable('TM_Panel');

        var query = todoItemTable
        .read({ esprocedimiento: '1', planear : 1, idusuario : identificadorUsuario, idciclo: identificadorCiclo  })
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
 
    var planear = {        
        DataSource : cargar_planear(),
        cargarPlaneacion_Por_Usuario : cargarPlaneacion_Por_Usuario
    };
    return planear;
});
  
 
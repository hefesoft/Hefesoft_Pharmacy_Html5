

define(['global/vars',"Util/Util","kendo"], 
    function (global, util, kendo) {
    var planear = {        
        DataSource : cargar_planear(global,util)
    };
    return planear;
});
  
  function cargar_planear(global,util) {
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

        remoteDataSource.read();
        return remoteDataSource;
    };  
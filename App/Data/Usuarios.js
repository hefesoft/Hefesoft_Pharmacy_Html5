define(['global/vars'], function (global) {
    
    function cargar_TP_Usuarios() {
        this.remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Usuario",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                create: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Usuario";                        
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
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Usuario/" + options.id;
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
                        return "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Usuario/" + options.id;
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
                        usuario: { validation: { required: true }, type: "string" }
                    }
                }
            }
        });

        remoteDataSource.read();
        return remoteDataSource;
    };  

    var usuario = {        
        DataSource : cargar_TP_Usuarios()
    };

    return usuario;
});
  
 
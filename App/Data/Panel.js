/// <reference path="../Validaciones/Validaciones.js" />

define(
[
'global/vars',
'Data/Medicos',
"Validaciones/Validaciones",
"Util/Util"
],
function (global, dataContextMedicos, validaciones, util) {
    var panel = {
        DataSource: cargar_TM_Panel(global, validaciones)
    };


    function cargar_TM_Panel(global, Validaciones) {
        this.remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Panel",
                    dataType: "json",
                    type: "GET",
                    beforeSend: function (req) {
                        req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                        req.setRequestHeader('x-zumo-auth', global.token);
                    }
                },
                create: {
                    url: function (options) {
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Panel";
                        formatearEntidadPanel(options);
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
                        var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Panel/" + options.id;
                        delete options.id;
                        options.Fecha = moment().format('MM/DD/YYYY');
                        formatearEntidadPanel(options);
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
                        return "https://hefesoftpharmacy.azure-mobile.net/tables/TM_Panel/" + options.id;
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
                        //Si es un propiedad dependiente debe dejarse el valor por defecto si no se totea
                        Id_Medico:
                     {
                         // Si se setea la propiedad default a un numero funciona si hacer converrsiones a objects ver ejemplo ciclo y id usuario
                         type: "int", defaultValue: { id: -1, 'Nombre': 'Seleccione un nombre' }
                     },
                        Id_Farmacia: { type: "int", defaultValue: { id: -1, 'Nombre': 'Seleccione una farmacia'} },
                        Contactos: {
                            validation: {
                                required: true,
                                validateMayorCero: function (input) { return Validaciones.Mayor_Cero_Numero_Contactos(input); }
                            }
                     , type: "int"
                        },
                        Id_Usuario: { validation: { required: true }, type: "int", defaultValue: -1 },
                        Id_Ciclo: { validation: { required: true }, type: "int", defaultValue: -1 },
                        Nombre_Mostrar: { editable: false, type: "string", defaultValue: '' },
                        Direccion_Mostrar: { editable: false, type: "string", defaultValue: '' },
                        Tipo: { editable: false, type: "string", defaultValue: '' },
                        Id_Unidad_Visita : { editable: false, type: "int"}
                    }
                }
            }
        });

        function formatearEntidadPanel(options) {

            util.eliminarPropiedadesNoDefinidas(options);

            if (util.validarSiEsEntidad(options.Id_Medico)) {
                var Id_Medico = options.Id_Medico.id;

                options.Nombre_Mostrar = options.Id_Medico.Nombres + ' ' + options.Id_Medico.Apellidos;
                options.Direccion_Mostrar = options.Id_Medico.Direccion;
                options.Tipo = "Medico";

                delete options.Id_Medico;
                options.Id_Medico = Id_Medico;
                options.Id_Unidad_Visita = Id_Medico;

                delete options.Id_Farmacia;
            }


            if (util.validarSiEsEntidad(options.Id_Farmacia)) {
                var Id_Farmacia = options.Id_Farmacia.id;

                options.Nombre_Mostrar = options.Id_Farmacia.Nombre;
                options.Direccion_Mostrar = options.Id_Farmacia.Direccion;
                options.Tipo = "Farmacia";

                delete options.Id_Farmacia;
                options.Id_Farmacia = Id_Farmacia;
                options.Id_Unidad_Visita = Id_Farmacia;

                delete options.Id_Medico;
            }

            if (util.validarSiEsEntidad(options.Id_Usuario)) {
                var Id_Usuario = options.Id_Usuario.id;
                delete options.Id_Usuario;
                options.Id_Usuario = Id_Usuario;
            }

            if (util.validarSiEsEntidad(options.Id_Ciclo)) {
                var Id_Ciclo = options.Id_Ciclo.id;
                delete options.Id_Ciclo;
                options.Id_Ciclo = Id_Ciclo;
            }
        }

        remoteDataSource.read();
        return remoteDataSource;
    };



    return panel;
});
  
 

   
   

   
    
    

    
   
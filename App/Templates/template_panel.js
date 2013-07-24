define([
'Data/Medicos',
 'Data/Farmacias', 
 'Data/Usuarios',
 'Data/Ciclos'
],
 function (dataContextMedicos, dataContextFarmacias, dataContextUsuarios, dataContextCiclos) {

     var templates = {
         medicoDropDownEditor: medicoDropDownEditor,
         farmaciaDropDownEditor : farmaciaDropDownEditor,
         usuariosDropDownEditor : usuariosDropDownEditor,
         cicloDropDownEditor : cicloDropDownEditor,
         convertir_A_Medico : convertir_A_Medico,
         convertir_A_Farmacia : convertir_A_Farmacia,
         convertir_A_Usuarios : convertir_A_Usuarios,
         convertir_A_Ciclo : convertir_A_Ciclo
     };


     
     function convertir_A_Medico(idMedico) {
          var NombreMedico = "NA";
                $.each(this.datasource_Medicos._data, function(idx, medico) {
                    if (medico.id == idMedico) {
                        NombreMedico = medico.Nombres;
                    return false;
                    }
                });
                return NombreMedico;
             };
   
     function convertir_A_Farmacia(idFarmacia) {
          var NombreFarmacia = "NA";
                $.each(this.datasource_Farmacias._data, function(idx, farmacia) {
                    if (farmacia.id == idFarmacia) {
                        NombreFarmacia = farmacia.Nombre;
                    return false;
                    }
                });
                return NombreFarmacia;
             };
    
     function convertir_A_Usuarios(idUsuario) {
        var NombreUsuario = "NA";
            $.each(this.datasource_Usuarios._data, function(idx, Usuario) {
                if (Usuario.id == idUsuario) {
                    NombreUsuario = Usuario.usuario;
                return false;
                }
            });
            return NombreUsuario;
            };
     
     function convertir_A_Ciclo(idCiclo) {
        var NombreCiclo = "NA";
            $.each(this.datasource_Ciclos._data, function(idx, Ciclo) {
                if (Ciclo.id == idCiclo) {
                    NombreCiclo = Ciclo.Nombre;
                return false;
                }
            });
            return NombreCiclo;
            };

     function medicoDropDownEditor(container, options) {
         $('<input data-text-field="Nombres" data-value-field="id" data-bind="value:' + options.field + '"/>')
                                .appendTo(container)
                                .kendoDropDownList({
                                    dataTextField: "Nombres",
                                    dataValueField: "id",
                                    autoBind: false,
                                    optionLabel: {
                                    Nombres: "Seleccione un medico",
                                    id: "-1"
                                    },
                                    dataSource: dataContextMedicos.Listado_Medicos
                                });
     };

     function farmaciaDropDownEditor(container, options) {
         $('<input data-text-field="Nombre" data-value-field="id" data-bind="value:' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDropDownList({
                                autoBind: false,
                                optionLabel: {                                
                                Nombre: "Seleccione una farmacia",
                                id: "-1"
                                },
                                dataSource: dataContextFarmacias.Listado_Farmacias
                            });
     };

     function usuariosDropDownEditor(container, options) {
         $('<input required data-text-field="usuario" data-value-field="id" data-bind="value:' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDropDownList({
                                autoBind: false,
                                optionLabel: {                                
                                usuario: "Seleccione un usuario",
                                id: "-1"
                                },
                                dataSource: dataContextUsuarios.DataSource
                            });
     };

     function cicloDropDownEditor(container, options) {
         $('<input required data-text-field="Nombre" data-value-field="id" data-bind="value:' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDropDownList({
                                autoBind: false,
                                optionLabel: {                                
                                Nombre: "Seleccione un Ciclo",
                                id: "-1"
                                },
                                dataSource: dataContextCiclos.DataSource
                            });
     };   

     return templates;
 });


   

    

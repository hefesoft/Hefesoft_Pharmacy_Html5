
+/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'plugins/router',
 'global/vars',
 'Data/Medicos',
 'Data/Farmacias',
 'Data/Panel',
 'Data/Autenticacion',
 'Data/Usuarios',
 'Data/Ciclos',
 'Templates/template_panel'
 ],
 function (system, logger, router, global, dataContextMedicos, dataContextFarmacias, dataContext, autenticacion, dataContextUsuarios, dataContextCiclos,
 templates
 ) {

     var panel = function () {
         this.displayName = 'Panel';        
     };

     panel.prototype.compositionComplete = function (view) {

         var vm = kendo.observable({
             datasource: dataContext.DataSource,
             datasource_Medicos : dataContextMedicos.Listado_Medicos,
             datasource_Farmacias : dataContextFarmacias.Listado_Farmacias,
             datasource_Usuarios : dataContextUsuarios.DataSource,
             datasource_Ciclos : dataContextCiclos.DataSource,            
             convertir_A_Medico : templates.convertir_A_Medico,
             convertir_A_Farmacia : templates.convertir_A_Farmacia,
             convertir_A_Usuarios : templates.convertir_A_Usuarios,
             convertir_A_Ciclo : templates.convertir_A_Ciclo
         });

         kendo.bind($("#Panel"), vm);

         var grid = $("#Grid_Panel").data("kendoGrid");
         
         // A cada columna le setea el template que le corresponde
         $.each(grid.columns, function (idx, column) {
             if (column.field == "Id_Medico") {
                 column.editor = templates.medicoDropDownEditor;
             }
             else if (column.field == "Id_Farmacia") {
                 column.editor = templates.farmaciaDropDownEditor;
             }
             else if (column.field == "Id_Usuario") {
                 column.editor = templates.usuariosDropDownEditor;
             }
             else if (column.field == "Id_Ciclo") {
                 column.editor = templates.cicloDropDownEditor;
             }
         })
     };    

     return panel;
 });


   

    

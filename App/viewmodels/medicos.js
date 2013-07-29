/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars'
 ],
 function (system, logger, router, global) {
     var dataContext;

     var medicos = function () {
         this.displayName = 'Parametrizar Medicos';
     };

     medicos.prototype.viewAttached = function (view) {

         require(['Data/Medicos'], function (data) {
             dataContext = data;
             dataContext.Listado_Medicos.read();

             var vm = kendo.observable({
                 datasource: dataContext.Listado_Medicos,
                 datasource_Tipo_Documento: dataContext.Tp_Tipo_Documento,
                 getRoleName: obtenerTipoDocumento
             });

             kendo.bind($("#Medicos"), vm);

             var grid = $("#Grid_Medico").kendoGrid({
                 dataSource: vm.datasource,
                 pageable: true,
                 height: 430,
                 columns: [
                            { field: "Nombres", title: "Nombres" },
                            { field: "Apellidos", title: "Apellidos" },
                            { field: "NumeroDocumento", title: "Numero Documento" },
                            { field: "IdTipoDocumento", title: "Tipo documento", editor: tipoDocumentoDropDownEditor, "template": "#= parent().parent().getRoleName(IdTipoDocumento) #" },
                            { command: ["edit", "destroy", { text: "Detalles", click: showDetails}]}],
                 editable: "inline"
             }).data("kendoGrid");
         }
         );

     };

     function showDetails(e) {
         e.preventDefault();
         var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
         router.navigateTo('editar_medico?codigomedico='+dataItem.id);
     }

     function obtenerTipoDocumento(roleId) {
         var roleName = "NA";
         $.each(this.datasource_Tipo_Documento._data, function (idx, role) {
             if (role.id == roleId) {
                 roleName = role.Descripcion;
                 return false;
             }
         });
         return roleName;
     };

     function tipoDocumentoDropDownEditor(container, options) {
         $('<input required data-text-field="Descripcion" data-value-field="id" data-bind="value:' + options.field + '"/>')
                                .appendTo(container)
                                .kendoDropDownList({
                                    autoBind: false,
                                    dataSource: dataContext.Tp_Tipo_Documento
                                });
     };

     return medicos;
 });


   

    

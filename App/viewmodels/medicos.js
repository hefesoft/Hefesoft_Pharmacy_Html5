/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars',
 'Data/Medicos'
 ],
 function (system, logger, router, global, dataContext) {

     var medicos = function () {
         this.displayName = 'Parametrizar Medicos';
     };

     medicos.prototype.viewAttached = function (view) {

         var vm = kendo.observable({
             datasource: dataContext.Listado_Medicos,
             datasource_Tipo_Documento : dataContext.Tp_Tipo_Documento,
             getRoleName: obtenerTipoDocumento                       
         });

         kendo.bind($("#Medicos"), vm);


    var grid = $("#Grid_Medico").data("kendoGrid");
            $.each(grid.columns, function(idx, column) {
                if (column.field == "IdTipoDocumento") {
                    column.editor = tipoDocumentoDropDownEditor;
                    return false;
                }
            })

     };     

     function obtenerTipoDocumento (roleId) {
                var roleName = "NA";
                $.each(this.datasource_Tipo_Documento._data, function(idx, role) {
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


   

    

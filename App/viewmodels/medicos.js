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

         require(['Data/Medicos', "Promesas/q.min", "MobileServices.Web-1.0.0.min"], function (dataMedicos, Q, Azure_Mobile_Services) {
             dataContext = dataMedicos;

             $("#buscar").click(function () { 

             var buscarPor = $('#buscador_medicos').val();
             dataMedicos.cargarMedico_AutoCompletar(Q, Azure_Mobile_Services, buscarPor).then(function (result) {
                 if (result.length > 0) {
                     cargarGrilla(result)
                 }
                 else {
                     toastr.warning('Sin resultados');
                 }
             }, function (error) { toastr.warning(error); });

             });

         }
         );

     };

     function showDetails(e) {
         e.preventDefault();
         var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
         router.navigateTo('editar_medico?codigomedico=' + dataItem.id);
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

     function cargarGrilla(dataSourceAutocompletar) {
         var vm = kendo.observable({
             datasource: dataSourceAutocompletar,
             datasource_Tipo_Documento: dataContext.Tp_Tipo_Documento,
             getRoleName: obtenerTipoDocumento
         });

         kendo.bind($("#Medicos"), vm);

         var grid = $("#Grid_Medico").kendoGrid({
             dataSource: {
                            data: dataSourceAutocompletar,
                            schema: {
                                model: {
                                    fields: {
                                        Nombres: { type: "string" },
                                        Apellidos: { type: "string" },
                                        Numero_Documento: { type: "number" }                                        
                                    }
                                }
                            }                            
                        },
             columns: [
                            { field: "Nombres", title: "Nombres" },
                            { field: "Apellidos", title: "Apellidos" },
                            { field: "Numero_Documento", title: "Numero Documento" },
                            //{ field: "IdTipoDocumento", title: "Tipo documento", editor: tipoDocumentoDropDownEditor, "template": "#= parent().parent().getRoleName(IdTipoDocumento) #" },
             //{ command: ["edit", "destroy", { text: "Detalles", click: showDetails}]}],
                            {command: [{ text: "Editar", click: showDetails}]}]
             //, editable: "inline"
         }).data("kendoGrid");
     }

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


   

    

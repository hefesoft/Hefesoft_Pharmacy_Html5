/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars'
 ],
 function (system, logger, router, global, dataContext) {
     var dataContext;

     var farmacias = function () {
         this.displayName = 'Farmacias';
     };

     farmacias.prototype.viewAttached = function (view) {

          require(['Data/Farmacias', "Promesas/q.min", "MobileServices.Web-1.0.0.min"], function (dataFarmacias, Q, Azure_Mobile_Services) {
             dataContext = dataFarmacias;

             $("#buscar").click(function () { 

             var buscarPor = $('#buscador_farmacias').val();
             dataFarmacias.cargarFarmacia_AutoCompletar( Q, Azure_Mobile_Services, buscarPor).then(function (result) {
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


     function cargarGrilla(dataSourceAutocompletar) {
       var grid = $("#Grid_Farmacia").kendoGrid({
             dataSource: {
                            data: dataSourceAutocompletar,
                            schema: {
                                model: {
                                    fields: {
                                        Nombre: { type: "string" },
                                        Telefono: { type: "string" },
                                        Telefono2: { type: "string" },
                                        Direccion : { type: "string" }
                                    }
                                }
                            }                            
                        },
             columns: [
                            { field: "Nombre", title: "Nombre" },
                            { field: "Telefono", title: "Telefono" },
                            { field: "Telefono2", title: "Telefono 2" },
                            { field: "Direccion", title: "Direccion" },
                            //{ field: "IdTipoDocumento", title: "Tipo documento", editor: tipoDocumentoDropDownEditor, "template": "#= parent().parent().getRoleName(IdTipoDocumento) #" },
             //{ command: ["edit", "destroy", { text: "Detalles", click: showDetails}]}],
                            {command: [{ text: "Editar", click: showDetails}]}]
             //, editable: "inline"
         }).data("kendoGrid");
     }

     function showDetails(e) {
             e.preventDefault();
             var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
             router.navigateTo('editar_farmacia?codigofarmacia=' + dataItem.id);
         }


     return farmacias;
 });

   


   

    

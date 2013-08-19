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

     var usuarios = function () {
         this.displayName = 'usuarios';
     };

     usuarios.prototype.viewAttached = function (view) {

          require(['Data/Autenticacion', "Promesas/q.min", "MobileServices.Web-1.0.0.min"], function (datausuarios, Q, Azure_Mobile_Services) {
             dataContext = datausuarios;

             $("#buscar").click(function () { 

             var buscarPor = $('#buscador_usuarios').val();
             datausuarios.cargarUsuarios_AutoCompletar( Q, Azure_Mobile_Services, buscarPor).then(function (result) {
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
       var grid = $("#Grid_Usuarios").kendoGrid({
             dataSource: {
                            data: dataSourceAutocompletar,
                            schema: {
                                model: {
                                    fields: {
                                        Nombres: { type: "string" },
                                        Apellidos: { type: "string" },
                                        Numero_Documento: { type: "string" },
                                        Direccion : { type: "string" }
                                    }
                                }
                            }                            
                        },
             columns: [
                            { field: "Nombres", title: "Nombres" },
                            { field: "Apellidos", title: "Apellidos" },
                            { field: "Numero_Documento", title: "Numero Documento" },
                            { field: "Direccion", title: "Direccion" },                            
                            {command: [{ text: "Editar", click: showDetails}]}]             
         }).data("kendoGrid");
     }

     function showDetails(e) {
             e.preventDefault();
             var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
             router.navigateTo('editar_usuario?codigousuario=' + dataItem.id);
         }


     return usuarios;
 });

   


   

    

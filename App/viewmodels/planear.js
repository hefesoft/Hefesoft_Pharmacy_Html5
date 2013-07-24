/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />



define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars', 
 'Data/Panel',
 'Data/Planear'
 ],
 function (system, logger, router, global,dataContextPanel, dataContext) {

     var planear = function () {
         this.displayName = 'Planeacion';
     };

     planear.prototype.viewAttached = function (view) {

         var vm = kendo.observable({
             displayName : 'Planeacion',
             datasourcePanel : dataContextPanel.DataSource,
             datasourcePlaneacion: dataContext.DataSource,
             change: function(eventArgs) { 
                var dataItem = eventArgs.sender.dataItem(eventArgs.sender.select());                         
                dataContext.DataSource.add({
                  IdPanel: dataItem.id,                  
                  Nombre_Mostrar : dataItem.Nombre_Mostrar,                  
                  Direccion_Mostrar : dataItem.Direccion_Mostrar,
                  Tipo : dataItem.Tipo,
                  Id_Unidad_Visita : dataItem.Id_Unidad_Visita
               });

               dataContext.DataSource.sync();
               toastr.success('Agregado ' + dataItem.NombreMostrar);
            }
             
         });

         kendo.bind($("#Contenedor"), vm);
     }; 

     return planear;
 });
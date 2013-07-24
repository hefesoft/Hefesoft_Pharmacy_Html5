/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars',
 'Data/Farmacias'
 ],
 function (system, logger, router, global, dataContext) {

     var farmacias = function () {
         this.displayName = 'Parametrizar Farmacias';
     };

     farmacias.prototype.viewAttached = function (view) {

         var vm = kendo.observable({
             datasource: dataContext.Listado_Farmacias
         });

         kendo.bind($("#Farmacias"), vm);
     };     

     return farmacias;
 });


   

    

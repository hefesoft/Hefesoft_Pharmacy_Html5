/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />
/// <reference path="../../Scripts/kendo/2013.1.319/kendo.all.min.js" />

define([
'durandal/system',
 'logger',
 'plugins/router' 
 ],
 function (system, logger, router) {

     var registrar = function () {
         this.displayName = 'Registrar';
     };

     registrar.prototype.compositionComplete = function (view) {         
        
         var app = new kendo.mobile.Application($("#mobileContainer"));
        
     };     

     return registrar;
 });


   

    

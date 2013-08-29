define([
'plugins/router',
'durandal/app',
'global/vars',
'Data/Medicos',
'Data/Autenticacion'

], function (router, app, global, dataContext, autenticacion) {
    
     var login_usuario = function () {
         this.displayName = 'Digite su usuario y contraseña';
     };

    login_usuario.prototype.compositionComplete  = function (view) {
                 var validator = $("#Contenedor").kendoValidator().data("kendoValidator"),
                        status = $(".status");

         var vm = kendo.observable({
             usuario: '',
             password: ''
         });

         kendo.bind($("#Contenedor"), vm);

         $("button").click(function () {
             
             // Were
             //tables/todoitem?$filter=(complete+eq+false)

             if (validator.validate()) {
                 status.text("Datos correctos").removeClass("invalid").addClass("valid");
                 autenticacion.consultarUsuario(vm.usuario, vm.password)
                    .then(function (result) {
                        if (result.length > 0) {                            
                             toastr.success('Usuario valido');
                        }
                        else {
                         toastr.warning('Usuario invalido');
                        }
                    }, function (error) {
                        toastr.warning(error);
                    });              

             } else {
                 status.text("Hay datos incorrectos en el formulario.").removeClass("valid").addClass("invalid");
             }
         });
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return login_usuario;
});


/*
define([
'plugins/router',
'durandal/app',
'global/vars',
'Data/Medicos',
'Data/Autenticacion'
 ],
 function (router, app, global, dataContext, autenticacion) {
     var login_usuario = function () {
         this.displayName = 'Digite su usuario y contraseña';
     };

     login_usuario.prototype.viewAttached = function (view) {


     };

     return login_usuario;
 });
 */


   

/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />
/// <reference path="../Data/Autenticacion.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars',
 'Data/Medicos',
 'Data/Autenticacion'
 ],
 function (system, logger, router, global, dataContext, autenticacion) {
     var login_usuario = function () {
         this.displayName = 'Digite su usuario y contraseña';
     };

     login_usuario.prototype.viewAttached = function (view) {

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

     return login_usuario;
 });


   

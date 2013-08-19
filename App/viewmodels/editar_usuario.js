define([
 "jQuery",
 "durandal/system",
 "logger",
 "durandal/plugins/router",
 "Promesas/q.min",
 "MobileServices.Web-1.0.0.min",
 "Util/Util"
 ],
 function ($, system, logger, router, Q, Azure_Mobile_Services, util) {
     var vm;
     var codigoUsuario;
     var dataContext;
     var viewModel;

     var editar_Usuario = function () {
         this.displayName = 'Editar Usuario';
         this.activate = activate
     };

     function activate(context) {
         codigoUsuario = context.codigousuario;
         require(['Data/Autenticacion'], function (data) {

             dataContext = data;
             dataContext.cargarUsuario_Por_Id( Q, Azure_Mobile_Services, codigoUsuario).then(function (result) {
                 if (result.length > 0) {
                     uiCargarDatosUsuario(result[0]);
                 }
                 else {
                     toastr.warning('Usuario no cargada');
                 }
             }, function (error) { toastr.warning(error); });       
         })

     }

     editar_Usuario.prototype.viewAttached = function (view) {

             $('#Actualizar').click(function () {
                 var Usuario = viewModel.Usuario_Entidad;                 
                 util.eliminarPropiedadesNoDefinidas(Usuario);
                 dataContext.actualizar_Usuario( Q, Azure_Mobile_Services, Usuario);
             });     
     }

     function uiCargarDatosUsuario(Usuario) {

         viewModel = {
             Usuario_Entidad: kendo.observable({
                 id: Usuario.id,
                 Nombres: Usuario.Nombres,
                 Apellidos: Usuario.Apellidos,
                 Numero_Documento: Usuario.Numero_Documento,
                 Telefono : Usuario.Telefono,
                 Celular : Usuario.Celular,
                 Correo_Electronico : Usuario.Correo_Electronico,
                 Clave : Usuario.Clave,
                 Activo : Usuario.Activo
             })
         };

         kendo.bind($("#editarUsuario"), viewModel);

     };
       
     return editar_Usuario;
 });
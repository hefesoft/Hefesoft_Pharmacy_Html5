define([
"jQuery",
"Mobile/utils",
 "kendo",
 'Data/Autenticacion',
 "Toastr",
 "Mobile/util_mobile_hefesoft"
 ],
 function ($, utils, kendo, autenticacion, toastr, hefesoft) {
     return {
         viewModel: {
             loaded: function loaded() {
                 kendo.mobile.ui.Drawer.current = null;
             },
             login: function login() {
                 autenticacion.consultarUsuario(app.login_view.viewModel.Usuario_Entidad.usuario, app.login_view.viewModel.Usuario_Entidad.password)
                    .then(function (result) {
                        if (result.length > 0) {
                            toastr.success('Usuario valido');
                            hefesoft.menuIzquierda("../mobile/registrar_visita.html", "../mobile/drawer.html");
                        }
                        else {
                            toastr.warning('Usuario invalido');
                        }
                    }, function (error) {
                        toastr.warning(error);
                    });
             },
             Usuario_Entidad: kendo.observable({
                 usuario: '',
                 password: ''
             })
         }
     };
 });
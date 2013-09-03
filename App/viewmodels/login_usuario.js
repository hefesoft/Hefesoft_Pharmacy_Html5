define([
'plugins/router',
'durandal/app',
'global/vars',
'Data/Medicos',
'Data/Autenticacion',
"Util/Busy"

], function (router, app, global, dataContext, autenticacion, busy) {

    var login_usuario = function () {
        this.displayName = 'Digite su usuario y contraseña';
    };


    login_usuario.prototype.activate = function () {

    }

    login_usuario.prototype.compositionComplete = function (view) {
        var validator = $("#Contenedor").kendoValidator().data("kendoValidator"),
                        status = $(".status");

        var vm = kendo.observable({
            usuario: '',
            password: ''
        });

        kendo.bind($("#Contenedor"), vm);

        $("button").click(function () {
            if (validator.validate()) {
                status.text("Datos correctos").removeClass("invalid").addClass("valid");
                busy.mostrar();
                autenticacion.consultarUsuario(vm.usuario, vm.password)
                    .then(function (result) {
                        busy.ocultar();
                        if (result.length > 0) {
                            toastr.success('Usuario valido');
                        }
                        else {
                            toastr.warning('Usuario invalido');
                        }
                    }, function (error) {
                        toastr.warning(error);
                        busy.ocultar();
                    });

            } else {
                status.text("Hay datos incorrectos en el formulario.").removeClass("valid").addClass("invalid");
            }
        });
    };

    return login_usuario;
});
define(
[
"jQuery",
"kendo",
"Mobile/utils",
"Mobile/login",
"Mobile/registrar",
"Mobile/medicos",
"Mobile/splash",
"Mobile/editar_medico",
"Mobile/editar_farmacia",
"Mobile/pedido",
"Mobile/Vars",
],
    function ($, kendo, utils, login_view, registrar_view, medicos_view, splash_view, editar_medico_view, editar_farmacia_view, pedido_view, vars) {

        var _onError = function (error, url, line) {
            utils.showError(error);
        };

        var init = function () {
            window.onerror = _onError;

            var kendoApp = new kendo.mobile.Application(document.body, {
                transition: "fade",
                initial: "splash-view",
                loading: '<h1 class="loading-message">Cargando...</h1>'
            });

            utils.init(kendoApp);
        };

        return {
            init: init,
            login_view: login_view,
            registrar_view: registrar_view,        
            medicos_view: medicos_view,
            splash_view: splash_view,
            editar_medico_view: editar_medico_view,
            editar_farmacia_view : editar_farmacia_view,
            pedido_view : pedido_view,
            vars : vars            
        };
    });
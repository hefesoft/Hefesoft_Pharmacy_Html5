define([],
function () {

    function validarDia() {
        var dia = moment().format('d');
        if (dia == 6 || dia == 7) {
            alert('Dia no habilitado para planear');
            return false;
        }
        else {
            return true;
        }
    };

    var UtilDias = {
        validarDia: validarDia
    };

    return UtilDias;
});
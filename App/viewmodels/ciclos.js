/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />



define(
[
'durandal/system',
 'logger',
 'plugins/router', 
 'global/vars',
 'Data/Ciclos'
 ], 
 function (system, logger, router, global, dataContextCiclos) {
    
    var ciclos = function () {
        //Knockout curso de john Papa
        this.displayName = 'Parametrizar ciclos';
        var p1 = new Person('Douglas');
        var p2 = new Person('Douglas 2');
        this.people = ko.observableArray([p1, p2]);
        //-------------------------------------
    };

    ciclos.prototype.compositionComplete = function (view) {
        cargarDatos(view)
    };

    function cargarDatos(view) {

        $('#grid').kendoGrid({
            dataSource: dataContextCiclos.DataSource,
            height: 500,
            toolbar: [{ name: "create", text: "Crear nuevo elemento"}],
            editable: "inline",
            columns: [
                {
                    field: "Activo",
                    title: "Activo"                    
                },
                {
                    field: "Fecha_Inicio",
                    title: "Fecha inicio",
                    format: "{0:MM/dd/yyyy}"
                },
                {
                    field: "Fecha_Fin",
                    title: "Fecha final",
                    format: "{0:MM/dd/yyyy}"
                },
                {
                    command: ["edit", "destroy"]
                }
            ]
        });       
    }

    var Person = function (name) {
        this.name = ko.observable(name);
    };

    ciclos.cargar = cargarDatos();
    return ciclos;
});


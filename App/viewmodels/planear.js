/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />



define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars'
 ],
 function (system, logger, router) {

     var planear = function () {
         this.displayName = 'Planear';
     };

     planear.prototype.viewAttached = function (view) {

         require(['Data/Planear', "Promesas/q.min", "MobileServices.Web-1.0.0.min"], function (dataPlaneacion, Q, Azure_Mobile_Services) {
             dataContext = dataPlaneacion;

             dataPlaneacion.cargarPlaneacion_Por_Usuario('', Q, Azure_Mobile_Services, '3CC9A845-92FA-40DA-BCBE-038ECCF7C4D4', '08E8BACD-169D-4CB0-AD87-9923CE2CF9C2').then(function (result) {
                 if (result.length > 0) {
                     cargarGrilla(result)
                 }
                 else {
                     toastr.warning('Sin resultados');
                 }
             }, function (error) { toastr.warning(error); });

         }
         );

     };

     function cargarGrilla(dataSource) {

         var vm = kendo.observable({

         });

         kendo.bind($("#Planear"), vm);

         var dataSourceMedicos = new kendo.data.DataSource({
             data: dataSource
         });

         $("#List_View_Planear").kendoListView({
             dataSource: dataSourceMedicos,
             selectable: "single",
             template: kendo.template($("#template").html()),
             change: function (e) {
                 e.preventDefault();
                 var index = this.select().index(),
                 dataItem = dataSourceMedicos.view()[index];

                 var dia = moment().format('d');


                 if (dia == 6 || dia == 7) {
                     alert('Dia no habilitado para planear');
                     toastr.warning('Dia no permitido para planear');
                 }
                 else {
                     var scheduler = $("#scheduler").data("kendoScheduler");
                     scheduler.addEvent({ title: dataItem.Nombres + ' ' + dataItem.Apellidos });
                 }
             }
         });

         $('#buscador_medicos').keyup(function () {
             var buscarPor = $('#buscador_medicos').val();
             dataSourceMedicos.filter({ field: "Buscador", operator: "contains", value: buscarPor });
         });

         $("#scheduler").kendoScheduler({
             date: new Date(moment().format('YYYY/MM/DD')),
             timezone: "America/Bogota",
             views: [
            { type: "agenda", selected: true },
            "day"
          ],
             dataSource: [],
             resources: [
            {
                field: "tipoId",
                title: "Tipo planeacion",
                dataSource: [
                { text: "No planeada", value: 1 },
                { text: "Actividad justificada", value: 2 }
              ]
            }
          ]
         });
     }
     return planear;
 });


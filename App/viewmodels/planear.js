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
     var VisitaDataContext;
     var elementoSeleccionado;
     var Global_Q;
     var Global_Azure_Mobile_Services;
     var dataSourceSheduler = new kendo.data.SchedulerDataSource({
         data: []
     });

     var dataSourceExtensions = {
         updateField: function (e) {
             var ds = this;
             $.each(ds._data, function (idx, record) {
                 if (record[e.keyField] == e.keyValue) {
                     var elemento = ds.at(idx);
                     elemento.set(e.updateField, e.updateValue);
                     //ds._data[idx][e.updateField] = e.updateValue;
                     ds.sync();
                     return false;
                 }
             });
         }
     };

     $.extend(true, kendo.data.DataSource.prototype, dataSourceExtensions);

     var planear = function () {
         this.displayName = 'Planear';
     };

     planear.prototype.viewAttached = function (view) {

         require(["Data/Planear", "Promesas/q.min", "MobileServices.Web-1.0.0.min", "Data/Visita"],
         function (dataPlaneacion, Q, Azure_Mobile_Services, dataVisita) {
             Global_Q = Q;
             Global_Azure_Mobile_Services = this.Azure_Mobile_Services;

             dataContext = dataPlaneacion;
             VisitaDataContext = dataVisita;

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
                 elementoSeleccionado = dataItem;

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
             date: new Date(moment().add('days', 1).format('YYYY/MM/DD')),
             startTime: new Date(moment().add('days', 1).format('YYYY/MM/DD')),
             endTime: new Date(moment().add('days', 30).format('YYYY/MM/DD')),
             editable: {
                 template: $("#editor").html(),
                 destroy: true,
                 create: true,
                 update: false,
                 resize: false
             },
             /*timezone: "America/Bogota",*/
             views: [{
                        /*{ type: "agenda", selected: true },*/
                        type: "agenda",
                        startTime: new Date(moment().add('days', 1).format('YYYY/MM/DD'))
            
            /* Si se deja day cuando hacen reorder en el day salva tambien es mejor crear otro de solo lectura mientras mejoran el control
            ,"day"*/
          }],
             dataSource: dataSourceSheduler,
             /*resources: [
             {
             field: "tipoId",
             title: "Tipo planeacion",
             dataSource: [
             { text: "No planeada", value: 1 },
             { text: "Actividad justificada", value: 2 }
             ]
             }
             ],*/
             save: function (e) {
                 var visita = {
                     Nombre_Mostrar: elementoSeleccionado.Nombres + ' ' + elementoSeleccionado.Apellidos,
                     IdPanel: elementoSeleccionado.id,
                     IdPanelAntiguo: elementoSeleccionado.idAntiguo,
                     Planeado: true,
                     Direccion_Mostrar: elementoSeleccionado.Direccion,
                     Tipo: elementoSeleccionado.Tipo,
                     Fecha: moment(e.model.start).format('YYYY/MM/DD'),
                     Hora: moment(e.model.start).format('HH:mm')
                 };

                 VisitaDataContext.AgregarVisita('', Global_Q, Global_Azure_Mobile_Services, visita).then(function (result) {
                     dataSourceSheduler.updateField({ keyField: 'title', keyValue: e.model.title, updateField: 'identificadorHefesoftPharmacy', updateValue: result.id });
                     console.log('Elemento agendado');
                 }, function (error) { toastr.warning(error); });
             },
             remove: function (e) {
                 console.log("Removing", e.event.identificadorHefesoftPharmacy);
                 VisitaDataContext.EliminarVisita('', Global_Q, Global_Azure_Mobile_Services, e.event.identificadorHefesoftPharmacy);
             }
         });
     }
     return planear;
 });
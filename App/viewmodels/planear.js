/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
'durandal/system',
 'logger',
 'durandal/plugins/router',
 'global/vars',
 'Toastr',
 'Util/Kendo_Extencion',
 'Util/Dias'
 ],
 function (system, logger, router, global, toastr, kendo_extencion, dias) {
     var toastr = toastr;
     var VisitaDataContext;
     var elementoSeleccionado;
     var Global_Q;
     var Global_Azure_Mobile_Services;
     var Global_Vars = global;
     var Global_dias = dias;

     var dataSourceSheduler = new kendo.data.SchedulerDataSource({
         data: []
     });

     // Cargar extencion para actualizar datasource
     $.extend(true, kendo.data.DataSource.prototype, kendo_extencion.dataSourceExtensions);

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

             dataPlaneacion.cargarPlaneacion_Por_Usuario('', Q, Azure_Mobile_Services, Global_Vars.id_Usuario_antiguo, Global_Vars.ciclo_Antiguo).then(function (result) {
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

                 if (elementoSeleccionado.Tipo == 'Actividad Justificada') {
                     if(Global_dias.validarDia())
                     {
                         var scheduler = $("#scheduler").data("kendoScheduler");
                         scheduler.addEvent({ title: dataItem.Nombres });
                     }
                 }
                 else {

                     if (elementoSeleccionado.ContactosOriginal <= elementoSeleccionado.ContactosActual) {
                         toastr.error('Numero de contactos', 'Numero de contactos superados');
                         elementoSeleccionado = undefined;
                     }

                     else {
                         if(Global_dias.validarDia())
                         {
                             var scheduler = $("#scheduler").data("kendoScheduler");
                             scheduler.addEvent({ title: dataItem.Nombres });
                         }
                     }
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
             views: [
               "day",
                    { type: "agenda", selected: true },
                    "month",
                    "week",
                    { startTime: new Date(moment().add('days', 1).format('YYYY/MM/DD')) }
               ],



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
                     Hora: moment(e.model.start).format('HH:mm'),
                     Anio_Entero: moment(e.model.start).format('YYYY'),
                     Mes_Entero: moment(e.model.start).format('MM'),
                     Dia_Entero: moment(e.model.start).format('DD'),
                     Hora_Entero: moment(e.model.start).format('HH'),
                     Minuto_Entero: moment(e.model.start).format('mm'),
                     id_Usuario: 2 /* Para pruebas */
                 };

                 if (elementoSeleccionado.Tipo == 'Actividad Justificada') {
                     visita.Actividad_Justificada = true;
                 }

                 VisitaDataContext.AgregarVisita('', Global_Q, Global_Azure_Mobile_Services, visita).then(function (result) {
                     dataSourceSheduler.actualizar({ keyField: 'title', keyValue: e.model.title, updateField: 'identificadorHefesoftPharmacy', updateValue: result.id });
                     dataSourceSheduler.actualizar({ keyField: 'title', keyValue: e.model.title, updateField: 'IdPanel', updateValue: elementoSeleccionado.id });

                     // Sumar un contacto                     
                     VisitaDataContext.SumarContacto('', elementoSeleccionado.id, elementoSeleccionado.ContactosActual + 1);

                     //Actualizar el listView
                     dataSourceMedicos.updateField({ keyField: 'id', keyValue: elementoSeleccionado.id, updateField: 'ContactosActual', updateValue: elementoSeleccionado.ContactosActual + 1 });

                     console.log('Elemento agendado');
                 }, function (error) { toastr.warning(error); });
             },
             remove: function (e) {
                 console.log("Removing", e.event.identificadorHefesoftPharmacy);
                 VisitaDataContext.EliminarVisita('', Global_Q, Global_Azure_Mobile_Services, e.event.identificadorHefesoftPharmacy);

                 elementoSeleccionado = dataSourceMedicos.getByField({ keyField: 'id', keyValue: e.event.IdPanel });

                 VisitaDataContext.SumarContacto('', e.event.IdPanel, elementoSeleccionado.ContactosActual - 1);
                 dataSourceMedicos.updateField({ keyField: 'id', keyValue: e.event.IdPanel, updateField: 'ContactosActual', updateValue: elementoSeleccionado.ContactosActual - 1 });

             }
         });

         VisitaDataContext.cargarVisitas('', Global_Q, Global_Azure_Mobile_Services, 2).then(function (result) {
             if (result.length > 0) {

                 $.each(result, function (idx, record) {

                     var evento = {
                         id: 1,
                         start: new Date(record.Anio_Entero + "/" + record.Mes_Entero + "/" + record.Dia_Entero + " " + record.Hora_Entero + ":" + "00"),
                         end: new Date(record.Anio_Entero + "/" + record.Mes_Entero + "/" + record.Dia_Entero + " " + parseInt(record.Hora_Entero + 1) + ":" + "00"),
                         isAllDay: false,
                         title: record.Nombre_Mostrar,
                         identificadorHefesoftPharmacy: record.id,
                         IdPanel: record.IdPanel
                     };

                     dataSourceSheduler.add(evento);
                 });

             }
             else {
                 console.log('Sin resultados');
             }
         }, function (error) { toastr.warning(error); });
     }
     return planear;
 });
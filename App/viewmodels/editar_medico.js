/// <reference path="../../Scripts/knockout-2.2.1.debug.js" />
/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/jquery-1.9.1.intellisense.js" />

define([
 'jQuery',
 'durandal/system',
 'logger',
 'plugins/router',
 'global/vars',
 'Data/Medicos',
 'Promesas/q.min',
 'MobileServices.Web-1.0.0.min',
 'Data/Zonas_Geograficas',
 'Util/Util'
 ],
 function ($, system, logger, router, global, dataContext, Q, Azure_Mobile_Services, zonas_Geograficas, util) {

     var vm;
     var codigoMedico;

     var editar_medico = function () {
         this.displayName = 'Editar medico';
         this.activate = activate
     };

     function activate(context) {
         codigoMedico = context.codigomedico;

         require(['Promesas/q.min'], function (q) {
             dataContext.cargarMedico_Por_Id(q,codigoMedico).then(function (result) {
                 if (result.length > 0) {
                     uiCargarDatosMedicos(result[0]);
                 }
                 else {
                     toastr.warning('Usuario no cargado');
                 }
             }, function (error) { toastr.warning(error); });
         });
     }

     editar_medico.prototype.compositionComplete = function (view) {

         //$("#nav").css('display', 'none');

         $("#guardar_cambios").click(function () {
             vm.FechaNacimiento = moment(vm.FechaNacimiento).format('MM/DD/YYYY');
             util.eliminarPropiedadesNoDefinidas(vm);
             dataContext.actualizar_Medico(global, Q, Azure_Mobile_Services, vm);
         });

         $("#fecha_nacimiento").kendoDatePicker();

         dataContext.cargarEspecialidades(global, Q, Azure_Mobile_Services).then(function (result) {
             if (result.length > 0) {
                 ui_Cargar_Especialidades(result);
             }
             else {
                 toastr.warning('Especialidades no cargadas');
             }
         }, function (error) { toastr.warning(error); });
         zonas_Geograficas.cargarDepartamentos(global, Q, Azure_Mobile_Services).then(function (result) {
             if (result.length > 0) {
                 ui_Cargar_Departamentos(result);
             }
             else {
                 toastr.warning('Error cargando departamentos');
             }
         }, function (error) { toastr.warning(error); });
     }


     function onSelectDepartamento(e) {
         var dataItem = this.dataItem(e.item.index());
         var codigo = dataItem.Codigo;

         zonas_Geograficas.cargarCiudades(global, Q, Azure_Mobile_Services, codigo).then(function (result) {
             if (result.length > 0) {
                 ui_Cargar_Ciudad(result);
             }
             else {
                 toastr.warning('Error cargando departamentos');
             }
         }, function (error) { toastr.warning(error); });
     };
     function onSelectEspecialidad(e) {
         var dataItem = this.dataItem(e.item.index());
         var id = dataItem.id;

         vm.IdEspecialidad = id;
     };
     function onSelectCiudad(e) {
         var dataItem = this.dataItem(e.item.index());
         var id = dataItem.id;

         vm.IdCiudad = id;
     };

     function ui_Cargar_Especialidades(data) {
         $("#Especialidad").kendoComboBox({
             dataTextField: "Descripcion",
             dataValueField: "id",
             select: onSelectEspecialidad,
             dataSource: data,
             filter: "contains",
             suggest: true,
             index: -1
         });
     };

     function ui_Cargar_Departamentos(data) {
         $("#Departamento").kendoComboBox({
             dataTextField: "Departamento",
             dataValueField: "id",
             placeholder: "Seleccione un departamento",
             select: onSelectDepartamento,
             dataSource: data,
             filter: "contains",
             suggest: true,
             index: -1
         });
     };

     function ui_Cargar_Ciudad(data) {

         $('#contenedorCiudad').css('visibility', 'visible')

         $("#Ciudad").kendoComboBox({
             dataTextField: "Ciudad",
             placeholder: "Seleccione una ciudad",
             autoBind: false,
             dataValueField: "id",
             select: onSelectCiudad,
             dataSource: data,
             filter: "contains",
             suggest: true,
             index: -1
         });
     };

     function uiCargarDatosMedicos(medico) {

         vm = kendo.observable({
             id: medico.id,
             Apellidos: medico.Apellidos,
             Nombres: medico.Nombres,
             Numero_Documento: medico.NumeroDocumento,
             Celular: medico.Celular,
             Celular2: medico.Celular2,
             FechaNacimiento: medico.FechaNacimiento,
             CorreoCorporativo: medico.CorreoCorporativo,
             CorreoPersonal: medico.CorreoPersonal,
             Recepcionista: medico.Recepcionista,
             Cargo: medico.Cargo,
             Barrio: medico.Barrio,
             Direccion: medico.Direccion
         });

         kendo.bind($("#editarMedico"), vm);

     };


     return editar_medico;
 }); 


   

    

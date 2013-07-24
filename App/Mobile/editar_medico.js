define([
"jQuery",
"Mobile/utils",
 "kendo",
 'Data/Medicos',
 'Promesas/q.min',
 'MobileServices.Web-1.0.0.min',
 'Data/Zonas_Geograficas',
 'Util/Util'
 ],
 function ($, utils, kendo, dataContext, Q, Azure_Mobile_Services, zonas_Geograficas, util) {

     var viewModel = {
         loaded: function loaded() {

             dataContext.cargarEspecialidades('', Q, Azure_Mobile_Services).then(function (result) {
                 if (result.length > 0) {
                     ui_Cargar_Especialidades(result);
                 }
                 else {
                     toastr.warning('Especialidades no cargadas');
                 }
             }, function (error) { toastr.warning(error); });
             zonas_Geograficas.cargarDepartamentos('', Q, Azure_Mobile_Services).then(function (result) {
                 if (result.length > 0) {
                     ui_Cargar_Departamentos(result);
                 }
                 else {
                     toastr.warning('Error cargando departamentos');
                 }
             }, function (error) { toastr.warning(error); });
             dataContext.cargarMedico_Por_Id('', Q, Azure_Mobile_Services, app.vars.temp.idMedico).then(function (result) {
                 if (result.length > 0) {
                     uiCargarDatosMedicos(result[0]);
                 }
                 else {
                     toastr.warning('Usuario no cargado');
                 }
             }, function (error) { toastr.warning(error); });

             $('#Actualizar').click(function () {
                 var medico = viewModel.Medico_Entidad;
                 medico.FechaNacimiento = moment(medico.FechaNacimiento).format('MM/DD/YYYY');
                 util.eliminarPropiedadesNoDefinidas(medico);
                 dataContext.actualizar_Medico('', Q, Azure_Mobile_Services, medico);                 

                 viewModel.Layout.set("Read", "inherit");
                 viewModel.Layout.set("Edit", "none");

                 $('#Modificar').css('display', 'inherit');  
                 $(this).css('display', 'none');  

             });

            $("#Modificar").click(function () {             
               viewModel.Layout.set("Read", "none");
               viewModel.Layout.set("Edit", "inherit");
               $('#Actualizar').css('display', 'inherit');  
               $(this).css('display', 'none');  
             });
         },
         Medico_Entidad: kendo.observable({
             id: -1,
             Apellidos: '',
             Nombres: '',
             Numero_Documento: '',
             Celular: '',
             Celular2: '',
             FechaNacimiento: '',
             CorreoCorporativo: '',
             CorreoPersonal: '',
             Recepcionista: '',
             Cargo: '',
             Barrio: '',
             Direccion: '',
             IdEspecialidad : -1,
             IdCiudad : - 1
         }),
         ReadOnlyProperties : kendo.observable({
             Especialidad : "",
             Departamento : "",
             Ciudad : ""
         })
         ,
         Layout : kendo.observable({
             Read : "inherit",
             Edit : "none"
         })
     };

     function uiCargarDatosMedicos(medico) {
         viewModel.Medico_Entidad.set("id", medico.id);
         viewModel.Medico_Entidad.set("Apellidos", medico.Apellidos);
         viewModel.Medico_Entidad.set("Nombres", medico.Nombres);
         viewModel.Medico_Entidad.set("Numero_Documento", medico.NumeroDocumento);
         viewModel.Medico_Entidad.set("Celular", medico.Celular);
         viewModel.Medico_Entidad.set("Celular2", medico.Celular2);
         viewModel.Medico_Entidad.set("FechaNacimiento", medico.FechaNacimiento);
         viewModel.Medico_Entidad.set("CorreoCorporativo", medico.CorreoCorporativo);
         viewModel.Medico_Entidad.set("CorreoPersonal", medico.CorreoPersonal);
     };

     function ui_Cargar_Especialidades(data) {
         $("#dropdown").kendoDropDownList({
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
         $("#Departamento").kendoDropDownList({
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
         $("#Ciudad").kendoDropDownList({
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

     function onSelectEspecialidad(e) {
         var dataItem = this.dataItem(e.item.index());
         var id = dataItem.id;

         viewModel.Medico_Entidad.set("IdEspecialidad", id);         
     };

     function onSelectDepartamento(e) {
         var dataItem = this.dataItem(e.item.index());
         var codigo = dataItem.Codigo;
         zonas_Geograficas.cargarCiudades('', Q, Azure_Mobile_Services, codigo).then(function (result) {
             if (result.length > 0) {
                 ui_Cargar_Ciudad(result);
             }
             else {
                 toastr.warning('Error cargando departamentos');
             }
         }, function (error) { toastr.warning(error); });

     };

     function onSelectCiudad(e) {
         var dataItem = this.dataItem(e.item.index());
         var id = dataItem.id;

         viewModel.Medico_Entidad.set("IdCiudad", id);         
     };

     return {
         viewModel: viewModel
     };
 });
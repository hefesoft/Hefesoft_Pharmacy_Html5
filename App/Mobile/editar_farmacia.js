define([
"jQuery",
"Mobile/utils",
 "kendo",
 'Data/Farmacias',
 'Promesas/q.min',
 'MobileServices.Web-1.0.0.min',
 'Data/Zonas_Geograficas',
 'Util/Util'
 ],
 function ($, utils, kendo, dataContext, Q, Azure_Mobile_Services, zonas_Geograficas, util) {

     var viewModel = {
         loaded: function loaded() {

             dataContext.cargarCanales('', Q, Azure_Mobile_Services).then(function (result) {
                 if (result.length > 0) {
                     ui_Cargar_Canales(result);
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
             dataContext.cargarFarmacia_Por_Id('', Q, Azure_Mobile_Services, app.vars.temp.idFarmacia).then(function (result) {
                 if (result.length > 0) {
                     uiCargarDatosFarmacia(result[0]);
                 }
                 else {
                     toastr.warning('Usuario no cargado');
                 }
             }, function (error) { toastr.warning(error); });

             $('#Actualizar').click(function () {
                 var farmacia = viewModel.Farmacia_Entidad;
                 if (farmacia.FechaNacimientoAdministrador != null) {
                     farmacia.FechaNacimientoAdministrador = moment(farmacia.FechaNacimientoAdministrador).format('MM/DD/YYYY');
                 }
                 util.eliminarPropiedadesNoDefinidas(farmacia);
                 dataContext.actualizar_Farmacia('', Q, Azure_Mobile_Services, farmacia);

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
         Farmacia_Entidad: kendo.observable({
             id: -1,
             Nombre: '',
             Telefono: '',
             Telefono2: '',
             Direccion: '',
             NumeroRegistro: -1,
             IdCanal: -1,
             Barrio: '',
             IdCiudad: -1,
             NoDependientes: 0,
             NoDistribuidores: 0,
             IdBrick: -1,
             IdHorarioAtencion: '',
             DespachoDomicilio: '',
             IdUbicacion: '',
             ApellidosAdministrador: '',
             NombresAdministrador: '',
             IdTipoDocumentoAdministrador: '',
             DocumentoAdministrador: '',
             CelularAdministrador: '',
             EmailAdministrador: '',
             FechaNacimientoAdministrador: ''
         }),
         ReadOnlyProperties: kendo.observable({
             Canal_Descripcion: "",
             Brick_Descripcion: "",
             Departamento: "",
             Ciudad: ""
         })
         ,
         Layout: kendo.observable({
             Read: "inherit",
             Edit: "none"
         })
     };

     function uiCargarDatosFarmacia(farmacia) {
         viewModel.Farmacia_Entidad.set("id", farmacia.id);
         viewModel.Farmacia_Entidad.set("Nombre", farmacia.Nombre);
         viewModel.Farmacia_Entidad.set("Telefono", farmacia.Telefono);
         viewModel.Farmacia_Entidad.set("Telefono2", farmacia.Telefono2);
         viewModel.Farmacia_Entidad.set("Direccion", farmacia.Direccion);
         viewModel.Farmacia_Entidad.set("NumeroRegistro", farmacia.NumeroRegistro);
         viewModel.Farmacia_Entidad.set("Barrio", farmacia.Barrio);
         viewModel.Farmacia_Entidad.set("NoDependientes", farmacia.NoDependientes);
         viewModel.Farmacia_Entidad.set("NoDistribuidores", farmacia.NoDistribuidores);
         viewModel.Farmacia_Entidad.set("DespachoDomicilio", farmacia.DespachoDomicilio);
         viewModel.Farmacia_Entidad.set("ApellidosAdministrador", farmacia.ApellidosAdministrador);
         viewModel.Farmacia_Entidad.set("NombresAdministrador", farmacia.NombresAdministrador);
         viewModel.Farmacia_Entidad.set("DocumentoAdministrador", farmacia.DocumentoAdministrador);
         viewModel.Farmacia_Entidad.set("CelularAdministrador", farmacia.CelularAdministrador);
         viewModel.Farmacia_Entidad.set("EmailAdministrador", farmacia.EmailAdministrador);
         viewModel.Farmacia_Entidad.set("FechaNacimientoAdministrador", farmacia.FechaNacimientoAdministrador);

         viewModel.ReadOnlyProperties.set("Canal_Descripcion", farmacia.Canal_Descripcion);
         viewModel.ReadOnlyProperties.set("Brick_Descripcion", farmacia.Brick_Descripcion);
         viewModel.ReadOnlyProperties.set("Departamento", farmacia.Departamento);
         viewModel.ReadOnlyProperties.set("Ciudad", farmacia.Ciudad);
     };

     function ui_Cargar_Canales(data) {
         $("#dropdown").kendoDropDownList({
             dataTextField: "Descripcion",
             dataValueField: "id",
             select: onSelectCanal,
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

     function onSelectCanal(e) {
         var dataItem = this.dataItem(e.item.index());
         var id = dataItem.id;

         viewModel.Farmacia_Entidad.set("IdCanal", id);
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

         viewModel.Farmacia_Entidad.set("IdCiudad", id);
     };

     return {
         viewModel: viewModel
     };
 });
define([
 "jQuery",
 "durandal/system",
 "logger",
 "plugins/router",
 "Promesas/q.min",
 "MobileServices.Web-1.0.0.min",
 "Data/Zonas_Geograficas",
 "Util/Util"
 ],
 function ($, system, logger, router, Q, Azure_Mobile_Services, zonas_Geograficas, util) {
     var vm;
     var codigoFarmacia;
     var dataContext;
     var viewModel;

     var editar_farmacia = function () {
         this.displayName = 'Editar farmacia';
         this.activate = activate
     };

     function activate(context) {
         codigoFarmacia = context.codigofarmacia;
         require(['Data/Farmacias',"Promesas/q.min"], function (data,Q) {
             dataContext = data;
             dataContext.cargarCanales(Q, Azure_Mobile_Services).then(function (result) {
                 if (result.length > 0) {
                     ui_Cargar_Canales(result);
                 }
                 else {
                     toastr.warning('Especialidades no cargadas');
                 }
             }, function (error) { toastr.warning(error); });
             zonas_Geograficas.cargarDepartamentos(Q, Azure_Mobile_Services).then(function (result) {
                 if (result.length > 0) {
                     ui_Cargar_Departamentos(result);
                 }
                 else {
                     toastr.warning('Error cargando departamentos');
                 }
             }, function (error) { toastr.warning(error); });

             dataContext.cargarFarmacia_Por_Id(Q, Azure_Mobile_Services, codigoFarmacia).then(function (result) {
                 if (result.length > 0) {
                     uiCargarDatosFarmacia(result[0]);
                 }
                 else {
                     toastr.warning('Farmacia no cargada');
                 }
             }, function (error) { toastr.warning(error); });       
         })

     }

     editar_farmacia.prototype.compositionComplete = function (view) {

             $('#Actualizar').click(function () {
                 var farmacia = viewModel.Farmacia_Entidad;
                 if (farmacia.FechaNacimientoAdministrador != null) {
                     farmacia.FechaNacimientoAdministrador = moment(farmacia.FechaNacimientoAdministrador).format('MM/DD/YYYY');
                 }
                 util.eliminarPropiedadesNoDefinidas(farmacia);
                 dataContext.actualizar_Farmacia( Q, Azure_Mobile_Services, farmacia);
             });     
     }

     function uiCargarDatosFarmacia(farmacia) {

         viewModel = {
             Farmacia_Entidad: kendo.observable({
                 id: farmacia.id,
                 Nombre: farmacia.Nombre,
                 Telefono: farmacia.Telefono,
                 Telefono2: farmacia.Telefono2,
                 Direccion: farmacia.Direccion,
                 NumeroRegistro: farmacia.NumeroRegistro,
                 Barrio: farmacia.Barrio,
                 IdCanal: -1,
                 IdCiudad: -1,
                 NoDependientes: farmacia.NoDependientes,
                 NoDistribuidores: farmacia.NoDistribuidores,
                 IdBrick: -1,
                 IdHorarioAtencion: '',
                 DespachoDomicilio: farmacia.DespachoDomicilio,
                 IdUbicacion: '',
                 ApellidosAdministrador: farmacia.ApellidosAdministrador,
                 NombresAdministrador: farmacia.NombresAdministrador,
                 IdTipoDocumentoAdministrador: '',
                 DocumentoAdministrador: farmacia.DocumentoAdministrador,
                 CelularAdministrador: farmacia.CelularAdministrador,
                 EmailAdministrador: farmacia.EmailAdministrador,
                 FechaNacimientoAdministrador: farmacia.FechaNacimientoAdministrador,
                 Canal_Descripcion : farmacia.Canal_Descripcion,
                 Brick_Descripcion : farmacia.Brick_Descripcion,
                 Departamento : farmacia.Departamento,
                 Ciudad : farmacia.Ciudad
             })
         };

         kendo.bind($("#editarFarmacia"), viewModel);

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
         zonas_Geograficas.cargarCiudades( Q, Azure_Mobile_Services, codigo).then(function (result) {
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

     return editar_farmacia;
 });
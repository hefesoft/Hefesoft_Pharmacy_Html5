define([
"jQuery",
"Mobile/utils",
 "kendo",
 "Promesas/q.min",
 "MobileServices.Web-1.0.0.min",
 "Util/Util"
 ],
 function ($, utils, kendo, Q, Azure_Mobile_Services, util) {

     var viewModel = {
         loaded: function loaded() {

             $("#closeModalViewDetalleProducto").click(function () {
                 $("#modalview-detalle-producto").kendoMobileModalView("close");
             });


             $('#buscador_producto').keyup(function () {
                 var myLength = $("#buscador_producto").val().length;

                 if (myLength >= 2) {
                     require(['Data/Producto'], function (dataProductos) {
                         var buscarPor = $('#buscador_producto').val();
                         dataProductos.cargarProducto_AutoCompletar('', Q, Azure_Mobile_Services, buscarPor).then(function (result) {
                             if (result.length > 0) {
                                 $('#listado_productos').kendoMobileListView(
                                 {
                                     dataSource: result,
                                     template: $("#adicionarTemplate").html(),
                                     click: function (e) {
                                         var item = e.dataItem;
                                         viewModel.producto_detalle.set("alias", item.alias);
                                         viewModel.producto_detalle.set("precio", kendo.toString(item.precio, "n"));
                                         viewModel.producto_detalle.set("iva", kendo.toString(item.iva, "p"));
                                         viewModel.producto_detalle.set("forma_farmaceutica", item.forma_farmaceutica);
                                         viewModel.producto_detalle.set("marca", item.marca);
                                         viewModel.producto_detalle.set("unidad", item.unidad);
                                         viewModel.producto_detalle.set("principio", item.principio);
                                         viewModel.producto_detalle.set("Campo", item.Campo);
                                         viewModel.producto_detalle.set("presentacion_comercial", item.presentacion_comercial);
                                         viewModel.producto_detalle.set("informacion_adicional", item.informacion_adicional);
                                         $("#modalview-detalle-producto").kendoMobileModalView("open");
                                     }
                                 });

                                 kendo.ui.progress('#listado_productos', false);
                             }
                             else {
                                 toastr.warning('Productos no cargados');
                             }
                         }, function (error) { toastr.warning(error); });
                     });
                 }
             });

         },
         producto_detalle: kendo.observable({
             alias : '',
             precio : 0,
             iva : 0.0,
             forma_farmaceutica : '',
             marca : '',
             unidad : '',
             principio : '',
             Campo : '',
             presentacion_comercial : '',
             informacion_adicional : '',
             numero_elementos : 1
         }),
         pedido_Entidad: kendo.observable({

         }),
         ReadOnlyProperties: kendo.observable({

         })
         ,
         Layout: kendo.observable({
             Read: "inherit",
             Edit: "none"
         })         
     };

     return {
         viewModel: viewModel
     };
 });
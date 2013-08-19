
var util_hefesoft;

define(
["jquery",
 "Mobile/utils",
 'Data/Planear',
 "Mobile/util_mobile_hefesoft",
 "kendo",
 "Toastr",
 "Mobile/Vars",
 "Promesas/q.min",
 "MobileServices.Web-1.0.0.min",
 ],
 function ($, utils, dataContext, util_hefesoft, kendo, toastr, vars, Q, Azure_Mobile_Services) {  

     return {
         viewModel: {
             mobileListViewDataBindInitFlat: function mobileListViewDataBindInitFlat() {

                 $('#buscar').keyup(function () {
                     var buscarPor = $('#buscar').val();
                     dataContext.DataSource.filter({ field: "Nombre_Mostrar", operator: "startswith", value: buscarPor });
                     dataContext.DataSource.view();
                 });

                 $("#flat-listview").kendoMobileListView({
                     dataSource: dataContext.DataSource,
                     template: $("#customListViewTemplate").html(),
                     headerTemplate: "<h2>Letter ${value}</h2>"
                 });

                 $("#closeModalViewMedico").click(function () {
                     $("#modalview-login").kendoMobileModalView("close");
                 });




                 $('#buscador_medicos').keyup(function () {
                     var myLength = $("#buscador_medicos").val().length;

                     if (myLength >= 1) {
                         require(['Data/Medicos'], function (dataMedicos) {
                             var buscarPor = $('#buscador_medicos').val();
                             dataMedicos.cargarMedico_AutoCompletar( Q, Azure_Mobile_Services, buscarPor).then(function (result) {
                                 if (result.length > 0) {
                                     $('#listado_Medicos').kendoMobileListView({
                                         dataSource: result,
                                         template: "${Nombres}" + " " + "${Apellidos}",
                                         fixedHeaders: true
                                     });
                                 }
                                 else {
                                     toastr.warning('Usuario no cargado');
                                 }
                             }, function (error) { toastr.warning(error); });
                         })
                     }
                 });


             },
             registrar: function (id) {
                 dataContext.DataSource.updateField({ keyField: 'id', keyValue: id, updateField: 'Visitado', updateValue: true });
             },
             informacion: informacion,
             pedido: pedido,
             util_hefesoft: util_hefesoft
         }
     };
 });

 function informacion(e) {
     var n = e.context.split("@");
     var tipo = n[1];
     var id_Visita = n[0];
     var id_Unidad_Visita = n[2];
         if(tipo == 'Medico')
         {              
              app.vars.temp["idMedico"] = id_Unidad_Visita;
              app.registrar_view.viewModel.util_hefesoft.menuIzquierda("../mobile/editar_medico.html", "../mobile/drawer.html");
         }
         else if(tipo == 'Farmacia')
         {              
              app.vars.temp["idFarmacia"] = id_Unidad_Visita;
              app.registrar_view.viewModel.util_hefesoft.menuIzquierda("../mobile/editar_farmacia.html", "../mobile/drawer.html");
         }
    }

 function pedido(e) {
     var n = e.context.split("@");
     var tipo = n[1];
     var id_Visita = n[0];
     var id_Unidad_Visita = n[2];
         if(tipo == 'Medico')
         {              
              app.vars.temp["idMedico"] = id_Unidad_Visita;
              app.registrar_view.viewModel.util_hefesoft.menuIzquierda("../mobile/pedido.html", "../mobile/drawer.html");
         }
         else if(tipo == 'Farmacia')
         {              
              app.vars.temp["idFarmacia"] = id_Unidad_Visita;
              app.registrar_view.viewModel.util_hefesoft.menuIzquierda("../mobile/pedido.html", "../mobile/drawer.html");
         }
    }

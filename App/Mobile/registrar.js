
var util_hefesoft;

define(
["jquery",
 "Mobile/utils",
 'Data/Planear',
 "Mobile/util_mobile_hefesoft",
 "kendo",
 "Toastr",
 "Mobile/Vars",
 ],
 function ($, utils, dataContext, util_hefesoft, kendo, toastr, vars) {
     util_hefesoft = util_hefesoft;
     // Como se crea un evento en javascript ver tambien util mobile
     $(document).bind("TEMPLATE_LOADED", function (e) {

         var dataSourceExtensions = {
             updateField: function (e) {
                 var ds = this;
                 $.each(ds._data, function (idx, record) {
                     if (record[e.keyField] == e.keyValue) {
                         ds.data()[idx].set(e.updateField, e.updateValue);
                         ds.sync();
                         return true;
                     }
                 });
             }
         };

         $.extend(true, kendo.data.DataSource.prototype, dataSourceExtensions);
     });

     util_hefesoft.templateLoader.loadExtTemplate("../templates/registrar_visita.html");

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


             },
             registrar: function (id) {
                 dataContext.DataSource.updateField({ keyField: 'id', keyValue: id, updateField: 'Visitado', updateValue: true });
             },
             informacion: informacion,
             util_hefesoft : util_hefesoft
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

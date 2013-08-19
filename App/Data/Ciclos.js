define(
[
'global/vars',
'Promesas/q.min',
'durandal/plugins/router'
], function (global,Q,router) 
{
    var ciclos = {        
        DataSource : cargar_TP_Ciclos(global),
        cargarCicloActivo : cargarCicloActivo
    };

    function cargar_TP_Ciclos(global) {
     var remoteDataSource = new kendo.data.DataSource({
         transport: {
             read: {
                 url: "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Ciclo",
                 dataType: "json",
                 type: "GET",
                 beforeSend: function (req) {
                     req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                     req.setRequestHeader('x-zumo-auth', global.token);
                 }
             },
             create: {
                 url: function (options) {
                     var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Ciclo";
                     options.Fecha_Inicio = moment(options.Fecha_Inicio).format('MM/DD/YYYY');
                     options.Fecha_Fin = moment(options.Fecha_Fin).format('MM/DD/YYYY');
                     options.Nombre = options.Fecha_Inicio.toString() + ' a ' + options.Fecha_Fin.toString();
                     return url;
                 },
                 dataType: "json",
                 type: "POST",
                 beforeSend: function (req) {
                     req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                     req.setRequestHeader('x-zumo-auth', global.token);
                 }
             },
             update: {
                 url: function (options) {
                     var url = "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Ciclo/" + options.id;
                     options.Fecha_Inicio = moment(options.Fecha_Inicio).format('MM/DD/YYYY');
                     options.Fecha_Fin = moment(options.Fecha_Fin).format('MM/DD/YYYY');
                     options.Nombre = options.Fecha_Inicio.toString() + ' a ' + options.Fecha_Fin.toString();
                     delete options.id;
                     return url;
                 },
                 dataType: "json",
                 type: "PATCH",
                 beforeSend: function (req) {
                     req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                     req.setRequestHeader('x-zumo-auth', global.token);
                 }
             },
             destroy: {
                 url: function (options) {
                     return "https://hefesoftpharmacy.azure-mobile.net/tables/TP_Ciclo/" + options.id;
                 },
                 dataType: "json",
                 type: "DELETE",
                 beforeSend: function (req) {
                     req.setRequestHeader('x-zumo-application', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
                     req.setRequestHeader('x-zumo-auth', global.token);
                 }
             }
         },
         parameterMap: function (options, operation) {
             if (operation != "read") {
                 options.Fecha_Inicio = moment(options.Fecha_Inicio).format('MM/DD/YYYY');
                 options.Fecha_Fin = moment(options.Fecha_Fin).format('MM/DD/YYYY');
                 return options;
             }
         },
         schema: {
             model: {
                 id: "id",
                 fields: {
                     id: { editable: false, type: "int" },
                     Activo: { type: "boolean", template: '<input type="checkbox" checked="#= Activo #" disabled="disabled" /> ' },
                     Fecha_Inicio: { validation: { required: true }, type: "date" },
                     Fecha_Fin: { validation: { required: true }, type: "date" }
                 }
             }
         }
     });        
        return remoteDataSource;
    };  
    function cargarCicloActivo() {    
    var deferred = Q.defer();

    var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new WindowsAzure.MobileServiceClient('https://hefesoftpharmacy.azure-mobile.net/', 'kkSCbZkUqmJXuzhstBCOGgQVoWLLkr57');
    var todoItemTable = client.getTable('TP_Ciclo');

    var query = todoItemTable.where({
        Activo: true
    }).read().done(function (results) {
    if (results.length > 0) {

        global.ciclo = results[0].id;
        global.ciclo_Antiguo = results[0].Id_antiguo;       
    }
    else {
        deferred.resolve(results);
    }
    }, function (err) {
        deferred.reject(new Error("Error " + err));
    });

    return deferred.promise;
};    


    return ciclos;
});
  
 
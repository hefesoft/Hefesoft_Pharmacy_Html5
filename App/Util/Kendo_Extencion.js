define([],
function () {   

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
         },
         getByField: function (e) {
             var ds = this;

             for (x in ds._data) {
                 var item = ds._data[x];
                 if (item[e.keyField] == e.keyValue) {
                     var elemento = ds._data[x];
                     return elemento;
                 }
             }
         },
         actualizar: function (e) {
             var ds = this;

             for (x in ds._data) {
                 var item = ds._data[x];
                 if (item[e.keyField] == e.keyValue) {
                     var elemento = ds._data[x];
                     elemento.set(e.updateField, e.updateValue);
                     ds.sync();
                     return true;
                 }
             }
         }

     };

    var kendoExtencion = {
        dataSourceExtensions : dataSourceExtensions
    };

    return kendoExtencion;
});
// Lo que va en la vista
/*
      <input id="Medicos" />
     <input id="Farmacias" />
*/

         $("#Medicos").kendoAutoComplete({
             minLength: 3,
             dataTextField: "Nombres",
             dataSource: dataContextMedicos.Listado_Medicos,
             filter: "startswith",
             placeholder: "Seleccione un medico",
             select: onSelect_Medico
         });

         $("#Farmacias").kendoAutoComplete({
             minLength: 3,
             dataTextField: "Nombre",
             dataSource: dataContextFarmacias.Listado_Farmacias,
             filter: "startswith",
             placeholder: "Seleccione una farmacia",
             select: onSelect_Farmacia
         });

         $("#numeric").kendoNumericTextBox();


         function onSelect_Medico(e) {
             var dataItem = this.dataItem(e.item.index());
             //toastr.info('Agregado ' + dataItem.Nombres + ' ' + dataItem.Apellidos);

             dataContext.DataSource.add({
                 IdUsuario: -1,
                 IdMedico: dataItem.id,
                 NombreMostrar: dataItem.Nombres + ' ' + dataItem.Apellidos,
                 Contactos: 0,
                 DireccionMostrar: 'Direccion de prueba',
                 Celular: '31252800000'
             });

             dataContext.DataSource.sync();
             toastr.success('Agregado ' + dataItem.Nombres + ' ' + dataItem.Apellidos);
         }

         function onSelect_Farmacia(e) {
             var dataItem = this.dataItem(e.item.index());
             //toastr.info('Agregado ' + dataItem.Nombres + ' ' + dataItem.Apellidos);                       
             dataContext.DataSource.add({
                 IdUsuario: -1,
                 IdFarmacia: dataItem.id,
                 NombreMostrar: dataItem.Nombre,
                 Contactos: 0,
                 DireccionMostrar: 'Direccion de prueba',
                 Celular: '31252800000'
             });

             dataContext.DataSource.sync();
             toastr.success('Agregado ' + dataItem.Nombres + ' ' + dataItem.Apellidos);
         }
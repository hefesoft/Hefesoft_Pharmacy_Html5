define([],
 function () {

     var Busy = {
         mostrar: mostrar,
         ocultar : ocultar
     };

     function mostrar(){        
       $('#cargando').show("fast");
       $('#contenedor').hide();
     };

     function ocultar(){
       $('#cargando').hide();
       $('#contenedor').show("fast"); 
     }

     return Busy;
 });

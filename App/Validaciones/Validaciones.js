define([],
 function () {

     var validacion = {
         Mayor_Cero_Numero_Contactos: Mayor_Cero_Numero_Contactos
     };


     function Mayor_Cero_Numero_Contactos(input) {         
         var valido = true;
         if (input.is("[name=Contactos]")) {
             if (input[0].value > 0) {
                 valido = true;
                  input.removeClass("invalid")
                 .addClass("valid");               
             }
             else {                  
                 input.removeClass("valid")
                 .addClass("invalid");
                 valido = false;
             }
         }
         return valido;
     };

     return validacion;
 });


   

    

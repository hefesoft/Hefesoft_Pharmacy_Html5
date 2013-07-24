define([],
 function () {

     var util = {
         eliminarPropiedadesNoDefinidas: eliminarPropiedadesNoDefinidas,
         validarSiEsEntidad : validarSiEsEntidad
     };

     function validarSiEsEntidad(propiedad){        
        try
        {
            if(propiedad.id === undefined || propiedad.id === -1)
            {
                return false;
            }
            else
            {
                return true;
            }        
        }
        catch(e)
        {
            return false;
        }
    };
     function eliminarPropiedadesNoDefinidas(propiedad){
        for (i in propiedad) {
          if (propiedad[i] === null || propiedad[i] === undefined) {
              // test[i] === undefined is probably not very useful here
            delete propiedad[i];
          }
        }
    }

     return util;
 });


   

    

var app;

require.config({
	paths: {
        jquery: '../jquery-1.9.1.min',	    
        jQuery: '../jquery-1.9.1.min',	    
   		kendo: "../kendo/2013.1.319/kendo.all.min",        
        Toastr : "../toastr.min",        
        Azure_mobile_services : "../MobileServices.Web-1.0.0.min"
	},
    shim: {
        Azure_mobile_services: {            
            exports: "Azure_mobile_services"
        },
        jquery: {            
            exports: "jquery"
        },
        jQuery: {
            exports: "jQuery"
        },        
        Toastr : 
        {
            deps: ["jquery"],
            exports: "Toastr"
        },
        kendo: {
            deps: ["jquery"],
            exports: "kendo"
        }      
       
       
    }
});

require(["jQuery", "Mobile/app", "kendo", "Toastr", "Azure_mobile_services"],
function ($, application, kendo, Toastr, ko, Azure_mobile_services) {

    $(function () {      
        app = application        
        application.init();

    });
});
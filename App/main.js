var app;

require.config({
	paths: {
        jquery: '../jquery-1.9.1.min',	    
        jQuery: '../jquery-1.9.1.min',	    
   		kendo: "../kendo/2013.1.319/kendo.web.min",        
        Toastr : "../toastr.min",
        Moment : "../moment.min",
        Azure_mobile_services : "../MobileServices.Web-1.0.0.min",
        bootstrap : "../bootstrap",
        Sammy : "../sammy-0.7.4"      
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
        kendo: {
            deps: ["jquery"],
            exports: "kendo"
        },       
        Moment : 
        {
            deps: ["jquery"],
            exports: "Moment"
        },
        bootstrap:
        {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        Sammy:
        {
            deps: ["jquery"],
            exports: "Sammy"
        }       
    }
});

require(["jQuery", "viewmodels/app","kendo",,"Azure_mobile_services","bootstrap","Sammy"], 
function($, application, kendo, ko,Azure_mobile_services,bootstrap, Sammy) {

    $(function() {
        window.Sammy = Sammy;
        app = application
        //Removido migracion durandal 2
        //application.init();
    });
});

requirejs.config({
    paths: {
        'text': 'durandal/amd/text',
        'durandal': '../durandal',
        'plugins': '../durandal/plugins',
        'transitions': '../durandal/transitions'      
    }
});

define('jquery', function() { return jQuery; });
define('knockout', ko);
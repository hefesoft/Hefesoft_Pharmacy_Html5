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
        Toastr : 
        {
            deps: ["jquery"],
            exports: "Toastr"
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

require(["jQuery", "viewmodels/app","kendo", "Toastr","Azure_mobile_services","bootstrap","Sammy"], 
function($, application, kendo, Toastr, ko,Azure_mobile_services,bootstrap, Sammy) {

    $(function() {
        window.Sammy = Sammy;
        app = application
        application.init();
    });
});

requirejs.config({
    paths: {
        'text': 'durandal/amd/text'         
    }
});
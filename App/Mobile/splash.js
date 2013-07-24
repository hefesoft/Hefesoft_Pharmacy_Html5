define([
"jQuery",
"Mobile/utils",
 "kendo"
 ],
 function ($, utils, kendo) {

     return {
         viewModel: {
             loaded: function loaded() {                 
                var timer = setInterval(function(){
                      clearInterval(timer);
                      var app = new kendo.mobile.Application();
                      app.navigate("../mobile/login.html");
                },1000);
                 
             }
         }
     };
 });
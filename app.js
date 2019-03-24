(function (){
	'use strict';

	var app = angular.module("ngTask", ["ui.router", "kendo.directives"]);

	//common components html reference
	app
		.component("footer",{
      		templateUrl: "common/footer.tpl.html"
  		})
  		.component("header",{
      		templateUrl: "common/header.tpl.html"
  		})
  		.component("sidebar",{
      		templateUrl: "common/sidebar.tpl.html"
  		})
  		.component("addemployee",{
      		templateUrl: "employee/addemployee.tpl.html"
  		})
  		.component("searchemployee",{
      		templateUrl: "employee/searchemployee.tpl.html"
  		});

  	//route to pages 
  	app.config(function($stateProvider) {

  		$stateProvider.state('default', {
				url: '',
				templateUrl : 'dashboard/dashboard.tpl.html'
			})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl : 'dashboard/dashboard.tpl.html'
		})
		.state('employee', {
			url: '/employee',
			templateUrl : 'employee/employee.tpl.html'
		})
		.state('dummylink', {
			url: '/dummylink',
			templateUrl : 'dummylink/dummylink.tpl.html'
		})
	});
})();


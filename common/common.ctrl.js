var app = angular.module("ngTask");

app.controller("headerCtrl", function($scope) {
    $scope.dateOut = new Date();
    $scope.name = "Jane Doe";

    //collapsing sidebar
	$(document).ready(function() {
		$('.navbar-toggle').click(function() {
			$('.row-offcanvas').toggleClass('active');
		});
	});
});
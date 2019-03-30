var app = angular.module("ngTask");

app
.factory('dataFactory', function($http) { //get data from json file 
    return {
        getEmpolyees: function() {
            return $http.get('data/data.json').then(function(result) {
               return result.data;
            });
        }
    }
})
.controller("gridCtrl", function($scope, $http) { 
    //inject employee data from json file and display in kendo grid 
    $scope.mainGridOptions = {
      	pageable: false,
        dataSource: {
            type: "jsonp",
            transport: {
                read: "data/data.json"
            }
        },
        columns: [
        {
            title: 'Select All',
            headerTemplate: "<input type='checkbox' id='chkSelectAll' onclick='checkAll(this)'/>", // main select all checkbox
            template: '<input type="checkbox"></input>',
            width: 30
        },
        {
            field: "code"
        },
        {
	        field: "name"
        },
        {
	        field: "department"
        },
        {
	        field: "birthday"
        },
        {
	        field: "gender"
        }
        ]
    };
})
.controller("searchCtrl", function($scope, dataFactory, $http) { 
    //search 
    dataFactory.getEmpolyees().then(function(data) { //fetch data from factory
        $scope.data = data;
    });

    $scope.searchRes = []; //array to hold returned results
    $scope.geValues = function(name, department){
        if(department == null){
            $scope.searchRes = []; //avoid dubplicate keys error
            this.isRequired = true;
            this.hasResult = false;
        } 
        else{
            angular.forEach($scope.data, function(item){  //loop through json ata              
                if(item.name.toLowerCase().indexOf(name) != -1 || item.department.indexOf(department) != -1){
                    $scope.searchRes.push(item);
                }
            });
            this.hasResult = true;
            this.isRequired = false;
        }
    } 
    $scope.resetValues = function (name, department){
        $scope.searchRes = []; //avoid dubplicate keys error
        //reset form
        $scope.name = "";
        $scope.department = "";
        this.hasResult = false;
    }
})
.controller("addCtrl", function($scope, dataFactory, $http) {

    dataFactory.getEmpolyees().then(function(data) { //fetch data from factory
       $scope.data = data;
    });

    //set default birthay date
    $scope.dateOut = new Date();

    //get data from add form and prepare post function
    $scope.code = null;
    $scope.name = null;
    $scope.department = null;
    $scope.birthday = null;
    $scope.gender = "-";

    $scope.postdata = function (code, name, department, birthday, gender) {
        $scope.alertClass = "alert-success"; //change alert color according to status
        //check mandatory field
        if(code == null || name == null || department == null || birthday == null){
            $scope.msg = "Error! Check missing fields. ";
            $scope.alertClass = "alert-warning";
            this.isFailed = true;
        }
        //if valid print success message
        else{

            //print saved employee to screen
            this.savedEm = true;
            console.log(code, name, department, birthday, gender);

            this.isFailed = true;
            //Call the services
            $http.post('data/data.json', JSON).then(function (response) {
                if (response.data)
                    $scope.msg = "Data Submitted Successfully!";
            }, 
            function (response) {
                $scope.msg = "Service does not exist";
            	$scope.alertClass = "alert-danger";
                this.isFailed = true;
                this.savedEm = false;
            });
        }
    }

});

//select all checkbox toggle
function checkAll(ele) { 
    var state = $(ele).is(':checked');
    $("tbody input[type='checkbox']").each(function(){
        if ($(this).prop("checked") != state) 
            $(this).prop('checked', state);
    });
}

//resize calendar
$(".k-select").click(function(){
    $(".k-animation-container").css({
        'width' : '300px'
    });
});

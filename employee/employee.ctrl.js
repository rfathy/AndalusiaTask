var app = angular.module("ngTask");

app
.factory('dataFactory', function($http) { //get data from json file 
    return {
        getEmpolyees: function() {
            return $http.get('http://localhost/AndalusiaTask/data/data.json').then(function(result) {
               return result.data;
            });
        }
    }
})
.factory('Result', ['$resource',
    function($resource){
        return $resource('http://localhost/AndalusiaTask/data/data.json');
}])
.controller("gridCtrl", function($scope, $http) { 
    //inject employee data from json file and display in kendo grid 
    $scope.mainGridOptions = {
      	pageable: false,
        dataSource: {
            type: "jsonp",
            transport: {
                read: "data/data"
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
        if(department == null || department == ""){
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
    $scope.birthday;
    $scope.gender;

    $scope.postdata = function (code, name, department, birthday, gender) {
        //check mandatory field
        if(code == null || name == null || department == null){
            $scope.msg = "Error! Check missing fields. ";
            this.isLoadingContent = true;
        }
        //if valid print success message
        else{
            var data = {
                code: code,
                name: name,
                department: department,
                birthday: birthday,
                gender: gender
            };
            console.log(code, name, department, birthday, gender);

            //Call the services
            $http.post('http://localhost/AndalusiaTask/data/data', JSON).then(function (response) {
                if (response.data)
                    $scope.msg = "Data Submitted Successfully!";
                    this.isLoadingContent = true;
            }, 
            function (response) {
                $scope.msg = "Service not Exists";
                this.isLoadingContent = true;
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
'use strict';
 angular.module('LoginPage',['ngCookies']).controller('LoginController',
    ['$scope','$location','$http', '$cookies',
    function ($scope,$location,$http,$cookies) {
 
        $scope.login = function () {
        	debugger;
            $scope.dataLoading = true;
            var data={
            		"loginId" : $scope.userName,
					"password" : $scope.pwd,
					"latitude" : $scope.latitude.toString(),
					"longitude" :$scope.longitude.toString()
					}
            $http({
                url: 'secure/Authentication/authenticate',
                method: "POST",
                data : data,
                contentType: 'application/json;',
                headers: {'Content-Type': 'application/json'}
              }).success(function (data, status, headers, config) {
            	  	debugger;
            	  	if(data.response.success==true){
            	  		//alert("UserName and Password is correct");
            	  		var userData=JSON.parse(data.response.userinfo);
            	  		var userName= userData.firstName + " "+userData.middleName + " "+userData.lastName;
            	  		$cookies.put('userInfo', userName);
            	  		location.href = location.origin + location.pathname + "webindex.html"
            	  	}else{
            	  		$scope.error=data.response.message;
            	  	}
                }).error(function (data, status, headers, config) {
                	debugger;
                	//Show error msg in div tag
                	if(status!=200){
                		$scope.error='Username or password is incorrect';
                	}
            });
        };
        //Method call on init of html page to get location
        $scope.getLocation = function() {
        	debugger;
    		if (navigator.geolocation) {
    			var options = {
    				timeout : 180000
    			};
    			navigator.geolocation.getCurrentPosition(function(position) {
    				$scope.latitude = position.coords.latitude;
    				$scope.longitude = position.coords.longitude;
    			}, this.errorHandler, options);
    		} else {
    			 console.log("Sorry, browser does not support geolocation!");
    		}
    	};
}]);

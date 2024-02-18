gulf.factory("MechValidationListService",function($http,AppService,$rootScope){
	
	//var token = JSON.parse(localStorage.getItem("token"));
	//var token= $rootScope.token;
return {

	getMechPendingList:function(userId,searchByARea,MechIdOrNumber){
		var token= $rootScope.token;
		return $http({

				method:"GET",
				url:AppService.url+"api_r3/public/mechanicsList?userId="+userId+
				"&status=3&area="+searchByARea+"&mobile="+MechIdOrNumber+"&token="+token,
				 timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

		}).then(function(result){
			console.log(result);
			return result.data;

		}, function (data) {
                return "";
            });

	},
	soPendingList:function(soId,search){
		var token= $rootScope.token;
		return $http({

				method:"GET",
				url:AppService.url+"api_r3/public/soPendingList?soId="+soId+"&search="+search+"&token="+token,
				 timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

		}).then(function(result){
			console.log(result);
			return result.data;

		}, function (data) {
                return "";
            });

	},
	getUserId:function(soId,search){
		var token= $rootScope.token;
		return $http({

				method:"GET",
				url:AppService.url+"api_r3/public/getUserId?soId="+soId+"&search="+search+"&token="+token,
				 timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

		}).then(function(result){
			console.log(result);
			return result.data;

		}, function (data) {
                return "";
            });

	},
}

});
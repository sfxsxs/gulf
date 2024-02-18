gulf.factory('ChatBootPreLoginService',function($http,AppService,$rootScope){
    //var token = JSON.parse(localStorage.getItem("token"));
   // var token= $rootScope.token;
	return{
		 getMCOColor: function (segmentName) {
		 	console.log("segmentname from ctrl to service"+segmentName);
             var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/getSegmentColor", /// "http://10.10.10.55/GulfMech_V1/api/public/getSegmentColor",
                data:'segmentName='+segmentName+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

            	console.log("inside chatboot service");
                // console.log(result);
                return result.data;
                
            })
        

	}
}
    
});
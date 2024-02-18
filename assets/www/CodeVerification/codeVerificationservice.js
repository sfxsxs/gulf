gulf.factory('CodeVerificationservice', function ($http, AppService,$rootScope) {

    //var token = JSON.parse(localStorage.getItem("token"));
   // var token= $rootScope.token;
    return {
          codeVerification : function(codes){
            var token= $rootScope.token;
             return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/codeVerification",
                data: 'codes='+codes+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Access-Control-Allow-Origin':"*"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            });
        }
           
    }
});
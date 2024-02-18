gulf.factory('HeaderService', function ($http, AppService,$rootScope) {

    //var token = JSON.parse(localStorage.getItem("token"));
   // var token= $rootScope.token;
    return {

        logout: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/logout",
                data: 'userId=' + userId +"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
              
                return result.data;
            }, function (data) {
                return "";
            })
        }  ,  
        doAppUserSubscription: function (projectId,data,regId,visitId,browser) {

            return $http({
                method: 'POST',
                url: AppService.pushUrl+"engage/mobile/doAppUserSubscription",
                data: 'projectId=' + projectId + "&data="+ data+"&regId="+regId+"&visitId="+visitId+"&browser="+ browser,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
              
                return result.data;
            }, function (data) {
                return "";
            })
        }
        
        
    
    }



});
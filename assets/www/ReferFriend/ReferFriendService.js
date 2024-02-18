gulf.factory('ReferFriendService', function ($http, AppService,$rootScope) {
    
    //var token = JSON.parse(localStorage.getItem("token"));
   // var token= $rootScope.token;
    return {

        checkStatus: function (userId, mobileNo,name) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/chkReffStatusByMech",
                timeout: AppService.timeoutValue,
                data: 'userId=' + encodeURIComponent(userId) + "&mobile=" + mobileNo +
                "&name="+name+"&token="+token,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })
        }

    }
});
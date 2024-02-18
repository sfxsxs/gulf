gulf.factory('DreamIncomeService', function ($http, AppService,$rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));
   // var token= $rootScope.token;
    return {
        getPotentialTarget: function (userId, date, roleId, soId) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getPotentialTarget?userId=" + userId + 
                "&date=" + date + "&roleId=" + roleId + "&soId=" + soId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        mechanictype: function () {

            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/mechanictype",
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        addDreamIncome: function (userId, dreamdesc, date, createdby, targetamount, potentialamount) {
            var token= $rootScope.token;
            return $http({

                method: "POST",
                url: AppService.url + "api_r3/public/addDreamIncome",
                data: "userId=" + userId + "&dreamdesc=" + dreamdesc + "&date=" + date +
                 "&createdby=" + createdby + "&targetamount=" + targetamount + 
                 "&potentialamount=" + potentialamount+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        updateDreamIncome: function (dreamid, userId, dreamdesc, date, createdby, targetamount, potentialamount) {
            var token= $rootScope.token;
            return $http({

                method: "POST",
                url: AppService.url + "api_r3/public/updateDreamIncome",
                data: "dreamid="+dreamid+"&userId=" + userId + "&dreamdesc=" + dreamdesc + 
                "&date=" + date + "&createdby=" + createdby +
                 "&targetamount=" + targetamount + "&potentialamount=" + potentialamount+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        
        setDreamIncome: function (dreamid,userId) {
            var token= $rootScope.token;
            return $http({

                method: "POST",
                url: AppService.url + "api_r3/public/setDreamIncome",
                data: "dreamid="+dreamid+"&userId=" + userId +"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        dreamincomePerformance: function (userId) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/dreamincomePerformance?userid=" + userId +"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        checkDreamIncome: function (userId) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/checkDreamIncome?userid=" + userId+"&token="+token ,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },
        updateMechanicType (userId,mechanicType) {
            var token= $rootScope.token;
            return $http({

                method: "POST",
                url: AppService.url + "api_r3/public/updateMechanicType",
                data:"userId=" + userId +"&mechanicType="+mechanicType+"&token="+token ,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        }
    }
})

gulf.filter('monthname',['$filter',function($filter){
    return function(month) {
      return $filter("date")(new Date(0,month),'MMMM');
    }
}]);
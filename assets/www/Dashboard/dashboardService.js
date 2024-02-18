gulf.factory('DashboardService', function ($http, AppService,$rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));
    //alert(token);
    //var token= $rootScope.token;
   // console.log("token"+token);
    return {
        dashboardDetails: function (userId, fromDate, toDate) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/dashboard",
                data: 'userId=' + userId + "&fromDate=" + fromDate + "&toDate=" + toDate+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result.data);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        appData: function (type, role) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/appData",
                data: 'type=' + type + '&role=' + role+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        getHomeBanner: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getHomeBanner?userId=" + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        gettcData: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/gettcData?userId=" + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },

        usermandatoryDetails: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/usermandatoryDetails?userId=" + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        nonmlpUsertype: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/nonmlpUsertype?userId=" + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },

        notificationCount: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/notificationCount",
                data: 'userId=' + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        tcupdate: function (userId,tc) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/tcupdate",
                data: 'userId=' + userId+"&token="+token+"&tc="+tc,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                return result.data;
            }, function (data) {
                return "";
            });
        },
        notificationReport: function (userId,roleid) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/notificationReport?userId=" + userId+
                "&roleid="+roleid+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        updateNotification: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/updateNotification",
                data: 'userId=' + userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        getMemberDashboard:function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getMemberDashboard?userId="+userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        getMemberTier:function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getMemberTier?userId="+userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        getTierList:function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getTierList?userId="+userId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },
        appMultiData: function (language) {
           
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/appMultiData?language=" + language,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;
            }, function (data) {
                return "";
            });
        },


    }
});
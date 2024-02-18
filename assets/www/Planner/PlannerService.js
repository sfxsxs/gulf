gulf.factory('PlannerService', function ($http, AppService,$rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));
    //var token= $rootScope.token;
    return {

        addPlanner: function (userId, name, mobileNo, servicingDue,soId,roleId,vehicleType,brand,model) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/addPlanner",
                data: 'mechId=' + userId + '&clientName=' + name + '&mobileNo=' + mobileNo + 
                '&serviceDue=' + servicingDue+"&soId="+soId+
                "&roleId="+roleId+"&vehicleType="+vehicleType+
                "&brand="+brand+"&model="+model+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })
        },

        editPlanner: function (userId, plannerId, dueDate) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/updatePlanner",
                data: 'mechId=' + userId + '&plannerId=' + plannerId + 
                '&serviceDue=' + dueDate+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })

        },
        vehicalType: function () {

            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/getVechicleType",
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })

        },
        getBrand: function (vehicalType) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/getVechicleBrand",
                data: "vechicleType=" + vehicalType+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })

        },
           getVechicleModel: function (vehicalType,vechicleBrand) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/getVechicleModel",
                data: "vechicleType=" + vehicalType+"&vechicleBrand="+vechicleBrand+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })

        },
        addBeatPlan: function (logId, date, soId, logRoleId,areaName) {
            var token= $rootScope.token;
           return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/addBeatPlan",
                data: 'logId=' + logId + "&date="+date+"&soId="+soId+
                "&logRoleId="+logRoleId+"&areaName="+areaName+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result.data;

            }, function (data) {
                return "";
            })
        },
        
          
        
       EditAreaForBeatPlan: function (soId, Date) {
        var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/EditAreaForBeatPlan?soId=" + soId +
                 "&Date="+Date+"&areaName="+"&token="+token,
                timeout: AppService.timeoutValue,
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

})
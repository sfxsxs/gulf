gulf.factory('UpdateMechanicProfileService', function ($http, AppService, $rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));
    //var token= $rootScope.token;

    return {

        checkDOB: function (usrCode) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/checkdateofbirth",
                data: 'usrCode=' + usrCode + "&token=" + token,
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
        updateMobileNumber: function (userId, oldNumber, newNumber) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/updateMobileNumber",
                data: 'userId=' + userId + '&oldNumber=' + oldNumber + "&newNumber=" + newNumber + "&token=" + token,
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
        updateUserDetails: function (empname, mobile, dob, address1, address2, address3, pincode, state, city, area, preferedLang, mechUserId, soUserId) {
            var token = $rootScope.token;
            console.log('empname=' + empname + '&mobile=' + mobile + '&dob=' + dob + "&address1=" + address1 + "&address2=" + address2 + "&address3=" + address3 + '&pincode=' + pincode + '&state=' + state + '&city=' + city + '&area=' + area + '&preferedLang=' + preferedLang + '&mechUserId=' + mechUserId + '&soUserId=' + soUserId + "&token=" + token);
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/updateUserDetails",
                data: 'empname=' + empname + '&mobile=' + mobile + '&dob=' + dob + "&address1=" + address1 + "&address2=" + address2 + "&address3=" + address3 + '&pincode=' + pincode + '&state=' + state + '&city=' + city + '&area=' + area + '&preferedLang=' + preferedLang + '&mechUserId=' + mechUserId + '&soUserId=' + soUserId + "&token=" + token,
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
        }
    }

});
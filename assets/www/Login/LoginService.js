gulf.factory('LoginService', function ($http, AppService, $rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));

    return {

        checkLogin: function (email, password, deviceId) {

            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/login",
                data: 'username=' + email + '&password=' + password + '&deviceId=' + deviceId,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            })
        },

        userLogin: function (email, password) {

            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/userLogin",
                data: 'username=' + email + '&password=' + password,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            })
        },

        forgotPassword: function (mobileNumber) {
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/forgotpassword",
                data: 'usermobile=' + mobileNumber,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                return result.data;
            }, function (data) {
                return "";
            })
        },
        changePassword: function (userId, oldpassword, newpassword, confirmpassword, type) {
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/changePassword",
                data: 'userId=' + userId + '&oldpassword=' + oldpassword + '&newpassword=' + newpassword + '&confirmpassword=' + confirmpassword + '&type=' + type,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            })
        },

        myProfileData: function (userId) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/myProfile",
                data: 'userId=' + userId + "&token=" + token,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },
        userStatus: function (userId) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/userStatus",
                data: 'userId=' + userId + "&token=" + token,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },
        newlogin: function (username) {
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/newlogin",
                data: 'username=' + username,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },
        userMobileLogin: function (username) {
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/userMobileLogin",
                data: 'username=' + username,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },
        getAppVersion: function () {
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getAppVersion",
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },

        appLanguagesData: function (language) {
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/appLanguagesData?language=" + language,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {

                return result.data;
            }, function (data) {
                return "";
            })
        },

        modeChangeApi: function (mode) {
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/modeChange?mode=" + mode,
                timeout: 80000,
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
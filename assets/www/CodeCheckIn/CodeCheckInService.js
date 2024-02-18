gulf.factory('CodeCheckInService', function ($http, AppService, $rootScope, $cordovaInAppBrowser) {

    //var token = JSON.parse(localStorage.getItem("token"));
    //var token= $rootScope.token;

    return {
        sendOTP: function (mobile) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/sendOTP",
                data: 'mobile=' + mobile + "&soId=" + $rootScope.userID +
                    "&type=redeemRequest&loggedRole=" + $rootScope.userData.role_fk_id + "&token=" + token,
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
        callOTP: function (userMobile) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/callOTP",
                data: 'userMobile=' + userMobile + "&token=" + token,
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
        checkOTP: function (otp, mobile) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/verifyOTP",
                data: 'otp=' + otp + '&mobile=' + mobile + "&token=" + token,
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
        sendQrCode: function (codes, userId, codecheckby, promocode, amazoncode) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/codeCheckingGulf",
                data: 'codes=' + codes + '&userId=' + userId + '&codecheckby=' + codecheckby + "&promocode=" + promocode 
                    + "&token=" + token,
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
        codeCheckingforNONMLP: function (codes, userid, promocode, amazoncode) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/codeCheckingforNONMLP",
                data: 'codes=' + codes + '&userid=' + userid +
                    '&promocode=' + promocode + '&amazoncode=' + amazoncode + "&token=" + token,
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
        sendOTPToValidateMobile: function (mobile, newMobile) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/sendOTP",
                data: 'mobile=' + mobile + "&soId=" + $rootScope.userID +
                    "&newMobile=" + newMobile + "t&loggedRole=" + $rootScope.userData.role_fk_id + "&token=" + token,
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
        sendOTPForCodeCheckin: function (mobile) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/sendOTP",
                data: 'mobile=' + mobile + "&soId=" + $rootScope.userID +
                    "&type=codeChecking&loggedRole=" + $rootScope.userData.role_fk_id + "&token=" + token,
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
        promocodeCheckin: function (codes, userid) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/promocodeCheckin",
                data: 'codes=' + codes + "&userid=" + userid + "&token=" + token,
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
        checkRedemptionBlockedOrNot: function (userId, soId) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                //url: AppService.url + "api_r3/public/blockredemptionCheck?userId=" + userId + "&soId=" + soId + "&token=" + token,
                url: AppService.url +'api_r3/public/createWorldSwipeURL?userId='+userId,
                // url: 'https://www.gulfmastermechanic.in/api_r3/public/createWorldSwipeURL?userId=OTUyMzUx',
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result.data);  
                console.log(result.data.url);
                //console.log(atob(result.data.url));
                const target = '_blank'; // '_blank' opens in the InAppBrowser, '_system' opens in the system browser
                const options = {
                //method: 'post',
                location: 'yes', // Show the location bar
                toolbar: 'yes', // Show the toolbar
                };
                var redirectURL=AppService.placeOrderUrl+'/redirect.php?source=' + result.data.url;
                console.log(redirectURL);
                // const browser = this.inAppBrowser.create(redirectURL, target, options);

                // // Optionally, you can listen for events
                // browser.on('loadstop').subscribe(event => {
                // console.log('Browser loaded:', event);
                // });

                $cordovaInAppBrowser.open(redirectURL, '_blank', options)
                .then(function (event) {
                    // success
                    //return result.data;
                })
                .catch(function (event) {
                    // error
                });
                return result.data;

            }, function (data) {
                return "";
            })
            // return Promise.resolve({'Status':true,'blockstatus':'No'});
        },
        codeCheckinSoilNew: function (codes, userId, codecheckby, promocode) {
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/codeCheckingSoils",
                data: 'codes=' + codes + '&userId=' + userId + '&codecheckby=' + codecheckby + "&token=" + token + 
                "&promocode=" + promocode,
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
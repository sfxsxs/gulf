gulf.factory('ChannelPartnersServices', function ($http, AppService,$rootScope) {
   // var token = JSON.parse(localStorage.getItem("token"));
    return {

        updateChannelPartnerProfile: function (mobile, first_name, last_name,state,pincode,city,address,area,lat,long,userType) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/promoUserRegistration",
                data: 'mobile=' + mobile + '&userFName=' + first_name + 
                '&userLName=' + last_name +'&state='+state+'&pincode='+pincode+
                '&city='+city+'&address='+address+'&area='+area+
                '&latitude='+lat+'&longitude='+long+'&userType='+userType+"&token="+token,
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

        promocodeCheckin: function (orderId,customerId, cashbackType) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/customerPromocode",
                data: 'orderId=' + orderId + "&custId="+customerId + 
                "&cashbackType="+cashbackType+"&token="+token,
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

        codeCheckingforCP: function (code, customerId,promocode,amazoncode) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/customerCodeCheckin",
                data: 'code=' + code + '&custId=' + customerId +'&promocode=' + promocode+
                '&amazoncode='+amazoncode+"&token="+token,
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

        getNearByMechanic:function (lat, long,category) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/getNearbyMechanic?lat="+lat+"&long="+long+
                "&category="+category+"&token="+token,
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

        getPendingPromocodes:function (custId) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/pendingPromocodes?custId="+custId+"&token="+token,
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

        profileDetailsNONMLP:function (user_id) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/profileDetailsNONMLP?userId="+user_id+"&token="+token,
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
        bankListNONMLP:function (user_id) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/bankListNONMLP?userId="+user_id+"&token="+token,
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
        bankDetailsNONMLP:function (userId,beneficiaryname,beneficiaryaccountno,beneficiarybankname,beneficiaryifsccode) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/bankDetailsNONMLP",
                data:"userId="+userId+"&beneficiaryname="+beneficiaryname+"&beneficiaryaccountno="+beneficiaryaccountno+
                "&beneficiarybankname="+beneficiarybankname+"&beneficiaryifsccode="+beneficiaryifsccode+"&token="+token,
                timeout: 120000,
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
        editbankDetailsNONMLP:function (userId,bankdetailId,beneficiaryname,beneficiaryaccountno,beneficiarybankname,beneficiaryifsccode) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/editbankDetailsNONMLP",
                data:"userId="+userId+"&bankdetailId="+bankdetailId+
                "&beneficiaryname="+beneficiaryname+
                "&beneficiaryaccountno="+beneficiaryaccountno+
                "&beneficiarybankname="+beneficiarybankname+
                "&beneficiaryifsccode="+beneficiaryifsccode+"&token="+token,
                timeout: 120000,
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
        
        NonMlptoMlpConversion:function (mobileno,soid) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/NonMlptoMlpConversion",
                data:"mobileno="+mobileno+"&soid="+soid+"&token="+token,
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
         NonMlpuserUpdate:function (nonmlp_userid,nonmlp_name,nonmlp_email,nonmlp_mobileno,nonmlp_address,nonmlp_state,nonmlp_city,nonmlp_pincode,nonmlp_area,soid,nonmlp_dob,nonmlp_language) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/NonMlpuserUpdate",
                data:"nonmlp_userid="+nonmlp_userid+"&nonmlp_name="+nonmlp_name+"&nonmlp_email="+nonmlp_email+"&nonmlp_mobileno="+nonmlp_mobileno+"&nonmlp_address="+nonmlp_address+
                "&nonmlp_state="+nonmlp_state+"&nonmlp_city="+nonmlp_city+"&nonmlp_pincode="+nonmlp_pincode+
                "&nonmlp_area="+nonmlp_area+"&soid="+soid+"&nonmlp_dob="+nonmlp_dob+"&nonmlp_language="+nonmlp_language+"&token="+token,
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

        pointSummeryNONMLP:function(userId){
            var token= $rootScope.token;  
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/pointSummary?userId="+userId+"&token="+token,
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
        setPassword:function(userId,newpassword,confirmpassword){
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/setPasswordCustomer",
                data:"userId="+userId+"&newpassword="+newpassword+
                "&confirmpassword="+confirmpassword+"&token="+token,
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
        customerOrderPlacing:function(custId,cashbackType,beneficiaryname,
                                      beneficiaryaccountno,beneficiarybankname,
                                      beneficiaryifsccode,amount)
        {
            var token= $rootScope.token;
                return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/customerOrderPlacing",
                data:"custId="+custId+"&cashbackType="+cashbackType+
                     "&beneficiaryname="+beneficiaryname+"&beneficiaryaccountno="+beneficiaryaccountno+
                     "&beneficiarybankname="+beneficiarybankname+
                      "&beneficiaryifsccode="+beneficiaryifsccode+
                      "&amount="+amount+"&token="+token
                     ,
                timeout: 120000,
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
        updateNMLPUserType:function(userType,userId){
           
                return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/updateNMLPUserType",
                data:"userType="+userType+"&userId="+userId,
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
        
        appLanguages:function(){
            return $http({
            method: 'GET',
            url: AppService.url + "api_r3/public/appLanguages",
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
    nonmlplanguageupdate:function(language,userId){
        var token= $rootScope.token;
        return $http({
        method: 'POST',
        url: AppService.url + "api_r3/public/nonmlplanguageupdate",
        data:"language="+language+"&userId="+userId+"&token="+token,
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
    getUserByCode:function(usercode,userId){
        var token= $rootScope.token;
        return $http({
        method: 'POST',
        url: AppService.url + "api_r3/public/getUserByCode",
        data:"usercode="+usercode+"&userId="+userId+"&token="+token,
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
    bankListNONMLP:function(userId){
        var token= $rootScope.token;
        return $http({
        method: 'GET',
        url: AppService.url + "api_r3/public/bankListNONMLP?userId="+userId+"&token="+token,
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
    contestReportNONMLP:function(userId,fromdate,todate,name){
        var token= $rootScope.token;
        return $http({
        method: 'GET',
        url: AppService.url + "api_r3/public/contestReportNONMLP?userId="+userId+
        "&fromdate=" + fromdate + "&todate=" +todate + "&search=" +name+"&token="+token ,
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
    setDefaultBankDetails:function(bankid,userId){
        var token= $rootScope.token;
        return $http({
        method: 'POST',
        url: AppService.url + "api_r3/public/setDefaultBankDetails",
        data:"bankid="+bankid+"&userId="+userId+"&token="+token,
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
     loginpromocode:function(username,promocode){
        //var token= $rootScope.token;
        return $http({
        method: 'POST',
        url: AppService.url + "api_r3/public/loginpromocode",
        data:"username="+username+"&promocode="+promocode,
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
    }



    }
});
gulf.factory("AddMechanicService", function($http, AppService, $rootScope) {
  //var token = JSON.parse(localStorage.getItem("token"));

  return {
    directAddMechanic: function(
      type,
      empname,
      mobile,
      dob,
      address1,
      address2,
      address3,
      pincode,
      state,
      city,
      area,
      preferedLang,
      referedBy,
      createdBy
    ) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/addMechanic",
        data:
          "type=" +
          type +
          "&empname=" +
          empname +
          "&mobile=" +
          mobile +
          "&dob=" +
          dob +
          "&address1=" +
          address1 +
          "&address2=" +
          address2 +
          "&address3=" +
          address3 +
          "&pincode=" +
          pincode +
          "&state=" +
          state +
          "&city=" +
          city +
          "&area=" +
          area +
          "&preferedLang=" +
          preferedLang +
          "&referedBy=" +
          referedBy +
          "&createdBy=" +
          createdBy +
          "&loggedRoleId=" +
          $rootScope.userData.role_fk_id +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    checkPinCode: function(pincode, userId) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getStateCityByPincode",
        data: "pincode=" + pincode + "&userId=" + userId + "&token=" + token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    soapproveupdate: function(soCode,userCode, refernceId,selectionType) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/soapproveupdate",
        data: "soCode=" + soCode + "&userCode=" + userCode + "&refernceId=" + refernceId + "&selectionType=" + selectionType,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    retailerUpdate:function(soCode,soMobile, usdname,mobileno,dob,pLanguage,adress
      ,line2,pincode,city,State,area,dss_area,mechanicType,userCode,userId) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/retailerUpdate",
        data: "soCode=" + soCode + "&soMobile=" + soMobile + "&usdname=" + usdname + 
        "&mobileno=" + mobileno + "&dob=" + dob + "&pLanguage=" + pLanguage + 
        "&adress=" + adress +"&line2=" + line2 + "&pincode=" + pincode + 
        "&city=" + city + "&State=" + State + "&area=" + area + "&dss_area=" + dss_area + "&mechanicType=" + mechanicType + 
        "&userCode=" + userCode + "&userId=" + userId ,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getReasonType:function() {
      return $http({
        method: "GET",
        url: AppService.url + "api_r3/public/getReasonType",
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    rejectUser:function(soCode,userId) {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/rejectUser",
        data: "soCode=" + soCode + "&userId=" + userId ,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    updateRejectreason:function(soCode,userId,reason,msg) {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/updateRejectreason",
        data: "soCode=" + soCode + "&userId=" + userId + "&reason=" + reason + "&msg=" + msg,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    rejectMechBySo: function(userId, soId) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/rejectMechBySo?userId=" +
          userId +
          "&soId=" +
          soId +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getStateCityByPincodeNew: function(pincode) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/getStateCityByPincodeNew?pincode=" +
          pincode,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    getAreaListNew: function(pincode) {
      return $http({
        method: "GET",
        url: AppService.url + "api_r3/public/getAreaListNew?pincode=" + pincode,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    checkReferral: function(moduleType, refferalCode, type) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/chkReffCode?moduleType=" +
          moduleType +
          "&refferalCode=" +
          refferalCode +
          "&type=" +
          type +
          "&soId=" +
          $rootScope.userID +
          "&logRoleId=" +
          $rootScope.userData.role_fk_id +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    checkMapping: function(searchterm) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/checkMapping?&searchterm=" +
          searchterm +
          "&soId=" +
          $rootScope.userID +
          "&logRoleId=" +
          $rootScope.userData.role_fk_id +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    getState: function() {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getStateList",
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    getCity: function(stateName) {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getCityList",
        timeout: AppService.timeoutValue,
        data: "stateName=" + encodeURIComponent(stateName),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    getArea: function(stateName, cityName, pincode) {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getAreaList",
        timeout: AppService.timeoutValue,
        data:
          "stateName=" +
          encodeURIComponent(stateName) +
          "&cityName=" +
          encodeURIComponent(cityName) +
          "&pincode=" +
          pincode,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    distributorList: function(code,roleId) {
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/distributorList?code=" +
          code +
          "&roleId=" +
          roleId,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    dssList: function(distributorCode) {
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/dssList?distributorCode=" +
          distributorCode,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getPincodeFromAddressData: function(stateName, cityName, areaName, userId) {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getPincode",
        timeout: AppService.timeoutValue,
        data:
          "stateName=" +
          encodeURIComponent(stateName) +
          "&cityName=" +
          encodeURIComponent(cityName) +
          "&areaName=" +
          encodeURIComponent(areaName) +
          "&userId=" +
          userId,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getLanguages: function() {
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getLanguage",
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    userSubcategory:function(userId) {
      return $http({
        method: "GET",
        url: AppService.url + "api_r3/public/userSubcategory?userId="+userId,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },

    updateGeoAndProfile: function(
      userId,
      profilePic,
      longitude,
      latitude,
      geoAddress
    ) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/updateGeoAndProfile",
        timeout: AppService.timeoutValue,
        data:
          "userId=" +
          userId +
          "&profilePic=" +
          profilePic +
          "&longitude=" +
          longitude +
          "&latitude=" +
          latitude +
          "&geoAddress=" +
          geoAddress +
          "&token=" +
          token,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getAreaForSO: function(stateName, cityName, pincode, soId) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getAreaList",
        timeout: AppService.timeoutValue,
        data:
          "stateName=" +
          encodeURIComponent(stateName) +
          "&cityName=" +
          encodeURIComponent(cityName) +
          "&pincode=" +
          pincode +
          "&soId=" +
          soId +
          "&loggedRole=" +
          $rootScope.userData.role_fk_id +
          "&token=" +
          token,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getBeatPlanSoAreaList: function(stateName, cityName, pincode, soId) {
      var token = $rootScope.token;
      return $http({
        method: "POST",
        url: AppService.url + "api_r3/public/getBeatPlanSoAreaList",
        timeout: AppService.timeoutValue,
        data:
          "stateName=" +
          encodeURIComponent(stateName) +
          "&cityName=" +
          encodeURIComponent(cityName) +
          "&pincode=" +
          pincode +
          "&soId=" +
          soId +
          "&token=" +
          token,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getAreaForBetaPlan: function(date, area) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/getareaforbeatplandata?soId=" +
          $rootScope.userID +
          "&Date=" +
          date +
          "&areaName=" +
          area +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    updateBetaPlan: function(planid, statusData, latitude, longitude) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/updatebeatplan?soId=" +
          $rootScope.userID +
          "&comment=hjdsgf&planid=" +
          planid +
          "&status=" +
          statusData +
          "&lat=" +
          latitude +
          "&long=" +
          longitude +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    getUsers: function(roleId, userId, rerRoleId) {
      var token = $rootScope.token;
      return $http({
        method: "GET",
        url:
          AppService.url +
          "api_r3/public/getUsers?logRoleId=" +
          roleId +
          "&logUserId=" +
          userId +
          "&rerRoleId=" +
          rerRoleId +
          "&token=" +
          token,
        timeout: AppService.timeoutValue,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    AddMLPDealerAppointment: function(localdata) {
      return $http({
        method: "POST",
        url: AppService.thirdparty_AddMLPDealer,
        data: JSON.stringify(localdata),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic R0tfVjIuMDpJbnRlbGxlY3QkMTAwNjIwMTk="
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    InsertMechanicData: function(lcaldata) {
      return $http({
        method: "POST",
        url: AppService.thirdparty_InsertMechanicData,
        data: JSON.stringify(lcaldata),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic R0tfVjIuMDpJbnRlbGxlY3QkMTAwNjIwMTk="
        }
      }).then(
        function(result) {
          // console.log(result.data.userId);
          return result.data;
        },
        function(data) {
          return "";
        }
      );
    },
    Referfriend: function (userid, usernumber,name,referedby) {

      return $http({
          method: 'POST',
          url: AppService.url + "api_r3/public/referfriend",
          data: 'userid=' + userid + '&usdMobile=' + usernumber + '&usdName=' + name+'&referedby='+referedby,
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
  checklogicDataExist: function(state,city,area,usertype,mechtype) {
    var token = $rootScope.token;
    return $http({
      method: "GET",
      url:
        AppService.url +
        "api_r3/public/checklogicDataExist?state="+ state +"&city=" + city +"&area=" +area +"&usertype=" + usertype + "&mechtype=" + mechtype,
      timeout: AppService.timeoutValue,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(
      function(result) {
        // console.log(result.data.userId);
        return result.data;
      },
      function(data) {
        return "";
      }
    );
  },

  };
});

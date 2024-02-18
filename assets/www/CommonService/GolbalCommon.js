gulf.factory('LoaderService', function($ionicLoading) {

   return {
      showLoading: function() {
        return  $ionicLoading.show({
                template: 'Loading...'
            });
      },
       hideLoading: function () {
            return $ionicLoading.hide();
        }
   }
});
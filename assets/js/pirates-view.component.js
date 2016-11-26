angular.module('piratesView', ['ngAnimate']).component('piratesView', {
    templateUrl: '/templates/pirates-view.html',
    controller: function PirateAppController($scope, $http) {
        // var self = this;
        $http.get('/api/pirates').
            then(function(response) {
                $scope.pirates = response.data;
            });

        $scope.deletePirate = function(index, pid) {
            $http.delete('/api/pirates/' + pid)
                .then(function() {
                    $scope.pirates.splice(index, 1);
                })
        };

        $scope.addPirate = function(data) {
            $http.post('/api/pirates/', data)
                .then(function() {
                    $scope.message = data.name;
                    $scope.pirates.push(data);
                    $scope.pirate = {}
                    $scope.addform.$setPristine();
                    $scope.addform.$setUntouched();
                })
        };

    }
});
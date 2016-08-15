var app = angular.module('ContactApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'/home.html',
            controller:'AppCtrl',
            resolve: {
                postPromise: ['contactlist', function(contactlist) {
                    return contactlist.getAll();
                }]
            }
        });
    $urlRouterProvider.otherwise('home');
}]);

app.factory('contactlist', ['$http', function($http) {
    var l = {
        list: []
    };
    l.getAll = function() {
        return $http.get('/contactlist').success(function(data) {
            angular.copy(data, l.list);
        });
    };
    l.create = function(post) {
        return $http.post('/contactlist', post).success(function(data){
            l.list.push(data);
        });
    };
    l.deleteList = function() {
        l.getAll();
    };
    return l;
}]);

app.controller('AppCtrl', ['$scope','contactlist','$http', function($scope, contactlist, $http) {
    $scope.contactlist = contactlist.list;
    $scope.addContact = function() {
        if(!$scope.name || $scope.name === '') {
            return;
        }
        contactlist.create({
            name: $scope.name,
            email: $scope.email,
            number: $scope.number
        });
        $scope.name = '';
        $scope.email = '';
        $scope.number = '';
    };
    $scope.removeList = function(id) {
        $http.delete('/contactlist/' + id).success(function(){
            console.log(id);
            contactlist.deleteList();
        });
    };
    $scope.edit = function(id) {
        $http.get('/contactlist/' + id).success(function(response) {
            console.log(id);
            $scope.contactlist = response;
        });
    };
}]);

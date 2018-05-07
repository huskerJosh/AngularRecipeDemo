var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'views/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'views/partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller
                'columnTwo@about': {
                    templateUrl: 'views/table-data.html',
                    controller: 'recipeController'
                }
            }
        })
        .state('contact', {

            url: '/contact',
            views: {
                '': {templateUrl: 'views/partial-contact.html'}
            }

        });

});

// app.controller('recipeController'['$scope', '$http', function($scope, $http){
//     $http.get('http://localhost:8080/api/v1/recipes/')
//         .success(function(result){
//             $scope.recipes = result;
//         })
//         .error(function(data, status){
//             console.log(data);
//         });
// }]);

app.controller('recipeController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $http.get('http://localhost:8080/api/v1/recipes/')
        .success(function(result){
            $scope.recipes = result;
        })
        .error(function(data, status){
            console.log(data);
        });
}]);


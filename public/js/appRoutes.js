// App Routes
var router = angular.module('appRoutes', ['ui.router']);

router.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .state('todo', {
            url: '/todo',
            templateUrl: 'views/todo.html',
            controller: 'TodoController'      
        });

    $urlRouterProvider.otherwise('/home');
});
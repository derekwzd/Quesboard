angular.module('techNodeApp').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/room', {
        templateUrl: '/pages/room.html',
        controller: 'RoomCtrl'
    }).
    when('/', {
        templateUrl: '/pages/login.html',
        controller: 'LoginCtrl'
    }).
    when('/section', {
        templateUrl: '/pages/section.html',
        controller : 'SectionCtrl'
    }).
    when('/lecture',{
        templateUrl: '/pages/lecture.html',
        controller : 'LectureCtrl'
    }).
    otherwise({
        redirecTo: '/login'
    })
})
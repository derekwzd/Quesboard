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
    when('/lecture/:_lecId/section/:_secId/room/:_roomId', {
        templateUrl: '/pages/room.html',
        controller: 'RoomCtrl'
    }).
    when('/lecture',{
        templateUrl: '/pages/lecture.html',
        controller : 'LectureCtrl'
    }).
    when('/lecture/:_lecId',{
        templateUrl: '/pages/lecture.html',
        controller : 'LectureCtrl'
    }).
    // when('/lecture/:_lecId/section', {
    //     templateUrl: '/pages/section.html',
    //     controller : 'SectionCtrl'
    // }).
    when('/lecture/:_lecId/section/:_secId',{
        templateUrl: '/pages/section.html',
        controller : 'SectionCtrl'
    }).
    otherwise({
        redirecTo: '/login'
    })
})
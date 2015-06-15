// TODO
// angular.module('techNodeApp', ['ngRoute']).
// run(function ($window, $rootScope, $http, $location){
//  $http({
//      url:'/api/validate',
//      method: 'GET'
//  }).success(function(user){
//      $rootScope.me = user
//      $location.path('/')
//      console.log('login success')
//  }).error(function(data){
//      console.log("not login in")
//      $location.path('/login')
//  })
//  $rootScope.logout = function(){
//      $http({
//          url : '/ajax/logout',
//          method:'GET'
//      }).success(function(){
//          $rootScope.me = null
//          $location.path('/login')
//      })
//  }
//  $rootScope.$on('login', function(evt, me){
//      $rootScope.me = me
//  })
// })
angular.module('techNodeApp', ['ngRoute'])

angular.module('techNodeApp').factory('socket', function($rootScope) {
    var socket = io.connect('/')
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                })
            })
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback)
                        callback.apply(socket, args);
                })
            })
        }
    }
});

angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
    $scope.newMessage = '';
    $scope.createMessage = function() {
        if ($scope.newMessage === '') {
            return
        }
        var askername = $(".username").text();
        var askerimgsrc = $(".userimg").attr("src");
        socket.emit('createMessage', {
            content: $scope.newMessage,
            img: askerimgsrc,
            name: askername,
            votenum: 0
        })
        $scope.newMessage = ''
        $(".ask-popout").fadeOut(200);
    }
})

angular.module('techNodeApp').controller('VoteControl', function($scope, socket) {
    $scope.voteIt = function(quesid) {
        socket.emit('vote', quesid);
    }
    $scope.unVoteIt = function(quesid){
        socket.emit('unvote', quesid)
    }
})

angular.module('techNodeApp').controller('RoomCtrl', function($scope, socket) {
    $scope.messages = [];
    socket.emit('getAllMessages')
    socket.on('allMessages', function(messages) {
        $scope.messages = messages;
    })
    socket.on('messageAdded', function(message) {
        $scope.messages.push(message);
    })
    socket.on('orignMessages', function(messages) {
        $scope.messages = messages;
    })
    socket.on('triggervote', function(messages) {
        $scope.messages = messages;
    })
})

angular.module('techNodeApp').directive('autoScrollToBottom', function() {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(
                function() {
                    return element.children().length;
                },
                function() {
                    element.animate({
                        scrollTop: element.prop('scrollHeight')
                    }, 1000);
                }
            );
        }
    };
});

angular.module('techNodeApp').directive('ctrlEnterBreakLine', function() {
    return function(scope, element, attrs) {
        var ctrlDown = false;
        element.bind("keydown", function(evt) {
            if (evt.which === 17) {
                ctrlDown = true;
                setTimeout(function() {
                    ctrlDown = false;
                }, 1000)
            }
            if (evt.which === 13) {
                if (ctrlDown) {
                    element.val(element.val() + '\n')
                } else {
                    scope.$apply(function() {
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    evt.preventDefault();
                }
            }
        });
    };
});

angular.module('techNodeApp').directive('vote', function(socket) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            $(this).toggleClass("uni-greenpressed")
            if ($(this).text() === "Vote") {
                scope.$apply(function() {
                    scope.$eval(attrs.vote);
                })
                $(this).text("Undo");
            } else {
                console.log('teseing')
                scope.$apply(function() {
                    scope.$eval(attrs.unvote);
                })
                $(this).text("Vote");
            };
        })
    };
});

angular.module('techNodeApp').directive('postClick', function(socket) {
    return function(scope, element, attrs) {
        element.bind("click", function(evt) {
            var asktext = $(".inputbox").val();
            if (asktext === '') {
                return
            }
            if (asktext === 'reset') {
                socket.emit('resetMessages')
                $(".inputbox").val("");
                $(".ask-popout").fadeOut(200);
                return
            }
            var askername = $(".username").text();
            var askerimgsrc = $(".userimg").attr("src");
            socket.emit('createMessage', {
                content: asktext,
                img: askerimgsrc,
                name: askername,
                votenum: 0
            })
            $(".inputbox").val("");
            $(".ask-popout").fadeOut(200);
        })
    }
})

angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location) {
    $scope.login = function() {
        $http({
            url: '/api/login',
            method: 'POST',
            data: {
                email: $scope.email
            }
        }).success(function(user) {
            $scope.$emit('login', user)
            $location.path('/')
        }).error(function(data) {
            $location.path('/login')
        })
    }
})

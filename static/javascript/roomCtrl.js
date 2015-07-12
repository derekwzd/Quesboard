//socket message
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
        $(document.body).animate({
            scrollTop: $(".questionframe").last().offset().top
        }, 600);
        $(".ask-popout").fadeOut(200);
    }
})

angular.module('techNodeApp').controller('VoteControl', function($scope, socket) {
    $scope.voteIt = function(quesid) {
        socket.emit('vote', quesid);
    }
    $scope.unVoteIt = function(quesid) {
        socket.emit('unvote', quesid)
    }
})


angular.module('techNodeApp').controller('RoomCtrl', function($scope, $routeParams, $scope, socket) {
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
    console.log('lectureId:' + $routeParams._lecId + " sectionId: " + $routeParams._secId)

    $('.backbtn').attr({
        href: "/lecture/"+$routeParams._lecId
    });

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
                $(this).text("Undo");
                // var addcount = parseInt($(this).prev().text()) + 1;
                // $(this).prev().text(addcount.toString());
                scope.$apply(function() {
                    scope.$eval(attrs.vote);
                })
            } else {
                $(this).text("Vote");
                // var cutcount = parseInt($(this).prev().text()) - 1;
                // $(this).prev().text(cutcount.toString());
                scope.$apply(function() {
                    scope.$eval(attrs.unvote);
                })
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
            $(document.body).animate({
                scrollTop: $(".questionframe").last().offset().top
            }, 600);
            $(".ask-popout").fadeOut(200);
        })
    }
})


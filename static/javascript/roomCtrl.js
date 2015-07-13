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

angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, $routeParams, socket) {
    $scope.newMessage = '';
    $scope.createMessage = function() {
        var asktext = $(".inputbox").val();
        if (asktext === '') {
            return
        }
        var askername = $(".username").text();
        var askerimgsrc = $(".userimg").attr("src");
        socket.emit('createMessage', {
            content: $scope.newMessage,
            votenum: 0,
            name: $scope.me.name,
            avatarUrl: $scope.me.avatarUrl,
            user_Id: $scope.me._id,
            section_Id: $routeParams._secId,
            lecture_Id: $routeParams._lecId,
        })
        $scope.newMessage = ''
        $(".inputbox").val("");
        $(document.body).animate({
            scrollTop: $(".questionframe").last().offset().top
        }, 600);
        $(".ask-popout").fadeOut(200);
    }
})

angular.module('techNodeApp').directive('onoff', function(socket) {
    return function(scope, element, attrs) {
        // if (scope.$parent.message.qStatus.toString() === '0') {
        //     $(this).children("#ques-opencheckInput").attr("checked", true);
        //     $(this).css({
        //         "background-color": "#979797"
        //     });
        //     $(this).children("label").css({
        //         "left": "32px"
        //     });
        //     $(this).children(".checkOn").animate({
        //         "opacity": "0"
        //     }, 100)
        //     $(this).children(".checkOff").animate({
        //         "opacity": "100"
        //     }, 100)
        //     $(this).children('.checkOff')
        // }
        element.unbind('click')
        element.bind('click', function() {
            if ($(this).children("#ques-opencheckInput").attr("checked") === 'checked') {
                $(this).children("#ques-opencheckInput").attr("checked", false);
                $(this).css({
                    "background-color": "#6ecf68"
                });
                $(this).children("label").css({
                    "left": "2px"
                });
                $(this).children(".checkOn").animate({
                    "opacity": "100"
                }, 100)
                $(this).children(".checkOff").animate({
                    "opacity": "0"
                }, 100)

                scope.$apply(function() {
                    scope.onFunc(scope.$parent.message._id)
                })
            } else {
                $(this).children("#ques-opencheckInput").attr("checked", true);
                $(this).css({
                    "background-color": "#979797"
                });
                $(this).children("label").css({
                    "left": "32px"
                });
                $(this).children(".checkOn").animate({
                    "opacity": "0"
                }, 100)
                $(this).children(".checkOff").animate({
                    "opacity": "100"
                }, 100)
                scope.$apply(function() {
                    scope.offFunc(scope.$parent.message._id)
                })
            }
        });
    }
})
angular.module('techNodeApp').controller('OnoffControl', function($scope, $routeParams, socket) {
    $scope.offFunc = function(quesid) {
        socket.emit('off', {
            ques_Id: quesid,
        });
    }
    $scope.onFunc = function(quesid) {
        socket.emit('on', {
            ques_Id: quesid,
        })
    }
})


angular.module('techNodeApp').directive('vote', function(socket) {
    return function(scope, element, attrs) {
        element.unbind('click')
        element.bind("click", function() {
            $(this).toggleClass("uni-greenpressed")
            if ($(this).text() === "Vote") {
                $(this).text("Undo");
                scope.$apply(function() {
                    scope.voteIt(scope.$parent.message._id)
                })
            } else {
                $(this).text("Vote");
                scope.$apply(function() {
                    scope.unVoteIt(scope.$parent.message._id)
                })
            };
        })
    };
});

angular.module('techNodeApp').controller('VoteControl', function($scope, $routeParams, socket) {
    $scope.voteIt = function(quesid) {
        socket.emit('vote', {
            lecture_Id: $routeParams._lecId,
            ques_Id: quesid,
            user_Id: $scope.me._id
        });
    }
    $scope.unVoteIt = function(quesid) {
        socket.emit('unvote', {
            lecture_Id: $routeParams._lecId,
            ques_Id: quesid,
            user_Id: $scope.me._id,
        })
    }
})


angular.module('techNodeApp').controller('RoomCtrl', function($scope, $routeParams, $scope, socket) {
    $scope.messages = [];
    socket.emit('joinRoom', {
        section_Id: $routeParams._secId
    })
    socket.on('joinRoom', function(msg) {
        // console.log(msg)
    })

    socket.emit('getAllMessages', {
        user_Id: $scope.me._id,
        section_Id: $routeParams._secId,
        lecture_Id: $routeParams._lecId
    })

    socket.on('allMessages', function(messages) {
        $scope.messages = messages[0];
        $scope.typeId = messages[1];
        console.log($scope.typeId)
            // $scope.messages = messages;
    })

    socket.on('messageAdded', function(message) {
        $scope.messages.push(message);
    })
    socket.on('orignMessages', function(messages) {
        $scope.messages = messages;
    })
    socket.on('triggervote', function(addedquesid) {
        for (var i = 0; i < $scope.messages.length; i++) {
            if ($scope.messages[i]._id === addedquesid) {
                $scope.messages[i].vote += 1;
                break;
            }
        }
    })
    socket.on('triggerunvote', function(decedquesid) {
        for (var i = 0; i < $scope.messages.length; i++) {
            if ($scope.messages[i]._id === decedquesid) {
                $scope.messages[i].vote -= 1;
                break;
            }
        }
    })

    console.log('lectureId:' + $routeParams._lecId + " sectionId: " + $routeParams._secId)

    $('.backbtn').attr({
        href: "/lecture/" + $routeParams._lecId
    });



    console.log($('.haha'))
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


angular.module('techNodeApp').directive('postClick', function($routeParams, socket) {
    return function($scope, element, attrs) {
        element.unbind('click')
        element.bind("click", function(evt) {
            var asktext = $(".inputbox").val();
            if (asktext === '') {
                return
            }
            var askername = $(".username").text();
            var askerimgsrc = $(".userimg").attr("src");
            socket.emit('createMessage', {
                content: $scope.newMessage,
                votenum: 0,
                name: $scope.me.name,
                avatarUrl: $scope.me.avatarUrl,
                user_Id: $scope.me._id,
                section_Id: $routeParams._secId,
                lecture_Id: $routeParams._lecId,
            })
            $scope.newMessage = ''
            $(".inputbox").val("");
            $(document.body).animate({
                scrollTop: $(".questionframe").last().offset().top
            }, 600);
            $(".ask-popout").fadeOut(200);
        })
    }
})

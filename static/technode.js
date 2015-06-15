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
        $(document.body).animate({scrollTop:$(".questionframe").last().offset().top}, 600 );
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

angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location) {
    //random picture and name
    $(".randomimg").click(function() {
        $(".head-popout").fadeIn(400);
    })

    $(".chooseclosebtn").click(function() {
        $(".head-popout").fadeOut(400);
    })
    $(".blackbg").click(function() {
        $(".head-popout").fadeOut(400);
    })

    //src generator function
    var gensrc = function(cate) {
        var srcarray = new Array();
        for (var i = cate[1] - 1; i >= 0; i--) {

            srcarray[i] = "img/profile100px/" + cate[0] + (i + 1) + ".png";
        };
        return srcarray;
    }

    //pic control. first is category name, second is num of pic
    var sciencecate = ["science", 17];
    var artcate = ["art", 7];
    var comiccate = ["comic", 8];

    //add up all the pic src array
    var allcate = new Array();
    allcate = allcate.concat(gensrc(sciencecate), gensrc(artcate), gensrc(comiccate));
    console.log("allcate.length is " + allcate.length);

    //load all the pic into head selection page
    for (i = 0; i < allcate.length; i++) {
        var newimg = $("<img>").attr("src", allcate[i]);
        $(".imgcontainer").append(newimg);
    }
    // $(".imgcontainer img").click(chooseevent);
    $(".imgcontainer img").bind('click', function(event) {
        $(".randomimg").attr("src", $(this).attr("src"));
        $(".head-popout").fadeOut(400);
    });

    //generate initial random pic
    var ranpicnum = Math.ceil(Math.random() * 31);
    // console.log("ranpicnum is " + ranpicnum);
    var ranpicsrc = allcate[ranpicnum];
    $(".randomimg").attr("src", ranpicsrc);

    //name array
    var sciencename = new Array("Albert", "Alan", "Ampere", "Watt", "Edison", "Isaac", "Leonardo", "Maxwell", "Newton", "Pascal", "Ohm", "Hertz", "Joule", "Henry", "Faraday", "Planck", "Gauss", "Orsted", "Coulomb", "Thomson", "Bell", "Marconi", "Candela", "Mol");
    var artname = new Array("Michelangelo", "Leonardo", "Raffaello", "Cézanne", "Dante", "Petrarca", "Boccaccio", "Monet", "Van Gogh", "Acacia", "Amaryllis", "Aster", "Azalea", "Blossom", "Bluebell", "Bryony", "Calla", "Camellia", "Clover", "Daffodil", "Dahlia", "Daisy", "Delphine", "Fleur", "Flora", "Gardenia", "Garland", "Heather", "Hyacinth", "Ianthe", "Iris", "Ivy", "Jacinta", "Jasmine", "Jonquil", "Lavender", "Leilani", "Lilac", "Lily", "Linnea", "Lotus", "Magnolia", "Marguerite", "Marigold", "Orchid", "Pansy", "Peony", "Petal", "Petunia", "Poppy", "Posey", "Primrose", "Rose", "Senna", "Tulip", "Violet", "Xochitl", "Zahara", "Zinnia");
    var comicname = new Array("Shalanda", "Macie", "Shirely", "Jeannine", "Divina", "Darryl", "Alla", "Crista", "Ollie", "Muoi", "Jolene", "Helga", "Francoise", "Josefina", "Myrtis", "Jo", "Sixta", "Laurie", "Tiara", "Johana", "Dania", "Trisha", "Kerry", "Remedios", "Martha", "Emmanuel", "Caitlin", "Rema", "Bettye", "Palma", "Kristina", "Lawanda", "Elodia", "Hank", "Deonna", "Scot", "Dion", "Arminda", "Tayna", "Paulita", "Magnolia", "Mittie", "Jude", "Maximina", "Thaddeus", "Bernardine", "Lovetta", "Tracey", "Jewel", "Amie");

    //pick name and change name according to the pic category
    var randomname = function(namearray) {
        var randomnum = Math.floor(Math.random() * namearray.length);
        return namearray[randomnum];
    }

    var pickname = "";
    if (allcate[ranpicnum].toString().indexOf("science") > 0) {
        pickname = randomname(sciencename);
    } else if (allcate[ranpicnum].toString().indexOf("art") > 0) {
        pickname = randomname(artname);
    } else if (allcate[ranpicnum].toString().indexOf("comic") > 0) {
        pickname = randomname(comicname);
    }

    // $("#randomname").val("Visitor " + pickname);
    //buttun hover effect function
    $scope.username = "Visitor " + pickname
    
    var signup = function() {
        $('.choosebtn').css('color', '#fff')
        $('.choosebtn').css('background-color', '#aaa')
        $('.choosebtn').css('opacity', '0.5')
        $('#signup-tab').css('color', '#000')
        $('#signup-tab').css('background-color', '#fff')
        $('#signup-tab').css('opacity', '1.0')
        $('.lowerbox').css('display', 'none')
        $('#signupbox').css('display', 'block')
    }

    var login = function() {
        $('.choosebtn').css('color', '#fff')
        $('.choosebtn').css('background-color', '#aaa')
        $('.choosebtn').css('opacity', '0.5')
        $('#login-tab').css('color', '#000')
        $('#login-tab').css('background-color', '#fff')
        $('#login-tab').css('opacity', '1.0')
        $('.lowerbox').css('display', 'none')
        $('#loginbox').css('display', 'block')
    }

    var audit = function() {
        $('.choosebtn').css('color', '#fff')
        $('.choosebtn').css('background-color', '#aaa')
        $('.choosebtn').css('opacity', '0.5')
        $('#audit-tab').css('color', '#000')
        $('#audit-tab').css('background-color', '#fff')
        $('#audit-tab').css('opacity', '1.0')
        $('.lowerbox').css('display', 'none')
        $('#auditbox').css('display', 'block')
    }

    $('#signup-tab').hover(function() {
        signup();
    })
    $('#signup-tab').click(function() {
        signup();
    })
    $('#login-tab').hover(function() {
        login();
    })
    $('#login-tab').click(function() {
        login();
    })
    $('#audit-tab').hover(function() {
        audit();
    })
    $('#audit-tab').click(function() {
        audit();
    })

    $scope.login = function() {
        console.log($('#chooseimg').attr('src'))
        console.log($scope.username)
        $http({
            url:'/api/login',
            method:'POST',
            data:{
                username:$scope.username
            }
        }).success(function(user){
            console.log(user)
            console.log('test')
        }).error(function(data){
            console.log('error')
        })

        $scope.$emit('login', $scope.username, $('#chooseimg').attr('src'))
        $location.path('/room', $scope.username)
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
            $(document.body).animate({scrollTop:$(".questionframe").last().offset().top}, 600 );
            $(".ask-popout").fadeOut(200);
        })
    }
})




// angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location) {
//     $scope.login = function() {
//         $http({
//             url: '/api/login',
//             method: 'POST',
//             data: {
//                 email: $scope.email
//             }
//         }).success(function(user) {
//             $scope.$emit('login', user)
//             $location.path('/')
//         }).error(function(data) {
//             $location.path('/login')
//         })
//     }

//     $scope.onFormSubmit = function() {
//         console.log("test")
//         $state.href('/room');
//     }

// })

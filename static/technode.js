//TODO: login and authentication

angular.module('techNodeApp', ['ngRoute']).
run(function($window, $rootScope, $http, $location) {
    // $http({
    //         url: '/api/validate',
    //         method: 'GET'
    //     }).success(function(user) {
    //         console.log(user)
    //         $rootScope.me = user
    //         $location.path('/section')
    //         console.log('login success')
    //     }).error(function(data) {
    //         console.log("not login in")
    //         $location.path('/')
    //     })
    //     //method 
    $rootScope.logout = function() {
            $http({
                url: '/ajax/logout',
                method: 'GET'
            }).success(function() {
                //clear the user info
                $rootScope.me = null
                $location.path('/')
            })
        }
        //listen the login event from LoginCtrl
    $rootScope.$on('login', function(evt, me) {
        $rootScope.me = me
    })
    $rootScope.$on('reg', function(evt, me) {
        $rootScope.me = me
    })
})

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


angular.module('techNodeApp').controller('LectureCtrl', function($scope, $routeParams, $scope) {
    //dropdown menu control
    $(document).on('click', ".user", function() {
        $(".user-dropdown").slideToggle(200);
    });

    //show hide control
    $(".showhidecontrol").bind("click", function() {
        $(".header").slideToggle(400);
        $(".nav").slideToggle(400);
        $(".lec-toolbox").slideToggle(400);
    })

    //QR Open Control
    $(".lec-lecqr").bind("click", function() {
        $(".qr-popout").fadeIn(400);
    })

    $(".qrclosebtn").bind("click", function() {
        $(".qr-popout").fadeOut(200);
    })

    //Btn Mouseover Effect
    $(document).on('mouseover', ".lec-editbtn", function() {
        $(this).children().attr('src', 'img/editimg3-black.png');
    })

    $(document).on('mouseout', ".lec-editbtn", function() {
        $(this).children().attr('src', 'img/editimg3.png');
    })

    $(document).on('mouseover', ".lec-deletebtn", function() {
        $(this).children().attr('src', 'img/deleteimg-black.png');
    })

    $(document).on('mouseout', ".lec-deletebtn", function() {
        $(this).children().attr('src', 'img/deleteimg.png');
    })
    $(document).on('mouseover', ".lec-starbtn", function() {
        if ($(this).hasClass("lec-starbtn-clicked") == false) {
            $(this).children().attr('src', 'img/starimg-empty-black.png');
        } else {
            $(this).children().attr('src', 'img/starimg-yellow-black.png');
        }
    })

    $(document).on('mouseout', ".lec-starbtn", function() {
        if ($(this).hasClass("lec-starbtn-clicked") == false) {
            $(this).children().attr('src', 'img/starimg-empty.png');
        } else {
            $(this).children().attr('src', 'img/starimg-yellow.png');
        }
    })

    //star clicked event
    $(document).on('click', ".lec-starbtn", function() {
        if ($(this).hasClass("lec-starbtn-clicked") == false) {
            $(this).addClass("lec-starbtn-clicked");
            $(this).children().attr('src', 'img/starimg-yellow-black.png');
        } else {
            $(this).removeClass("lec-starbtn-clicked");
            $(this).children().attr('src', 'img/starimg-empty-black.png');
        };
    });

    //On/Off label transition
    $(document).on('click', ".lec-opencheck", function() {
        console.log('show here the result: '+$(this).children("#lec-opencheckInput").attr("checked"))
        if($(this).children("#lec-opencheckInput").attr("checked") === "checked"){
            $(this).children("#lec-opencheckInput").removeAttr("checked");
            console.log("2: "+$(this).children("#lec-opencheckInput").attr("checked"))
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
        }else{
            $(this).children("#lec-opencheckInput").attr("checked", true);
            console.log("1: "+$(this).children("#lec-opencheckInput").attr("checked"))
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
        }
        return false
    });

    // delete section btn click
    // delete lecture btn click
    $(document).on('click', ".lec-deletebtn", function(e) {

        if ($("body").children(".bubblecontainer").is(".bubblecontainer") == false) {
            console.log("bubble=false");
            var newbubble = $("#defaultbubble").clone().removeAttr("id");
            var selectlecture = $(e.target).parents(".boardcontainer");

            $("body").prepend(newbubble);
            var bubblex = $(e.target).closest(".lec-deletebtn").offset().left - 203;
            var bubbley = $(e.target).closest(".lec-deletebtn").offset().top - 23;
            newbubble.css({
                "display": "block",
                "opacity": "0",
                "left": bubblex,
                "top": bubbley
            }).animate({
                opacity: "1",
                "top": (bubbley - 20)
            }, 200);

            //bind delete-confirm event
            newbubble.find(".delete-confirm").bind('click', function() {
                console.log("delete confirmed");
                selectlecture.children().andSelf().animate({
                    minHeight: "0",
                    height: "0",
                    opacity: "0"
                }, function() {
                    $(this).remove();
                })

            });

            //bind one-time fullscreen fadeout event to clear the btnwithbubble
            $(document).one('click', function(e) {
                newbubble.animate({
                    "top": bubbley,
                    opacity: "0"
                }, 100, function() {
                    $(this).remove();
                    console.log("bubble removed");
                });
            });
        }
    })


    // common Close btn click
    $(".newlecclosebtn").click(function() {
        $(".lec-popout").fadeOut(200);
        $(".newlecname").val("");
        $(".newlecdescrip").val("");
        $(".confirmbtn").removeClass("newlec-confirm editlec-confirm");

        //remove editing-class (if possible)
        $(".editing-lecname").removeClass("editing-lecname");
        $(".editing-lecdescrip").removeClass("editing-lecdescrip");

    })


    // common input text length control(using common comfirm class)
    var characterleftcheck = function() {
        var lecnameLength = $('.newlecname').val().length;
        var namecharactersLeft = 100 - lecnameLength;

        var lecdescripLength = $('.newlecdescrip').val().length;
        var descripcharactersLeft = 300 - lecdescripLength;

        if (namecharactersLeft < 0 || descripcharactersLeft < 0) {
            $('.confirmbtn').addClass('uni-disabled');
            $('.confirmbtn').attr("disabled", "disabled");
        } else if (namecharactersLeft == 100 || descripcharactersLeft == 300) {
            $('.confirmbtn').addClass('uni-disabled');
            $('.confirmbtn').attr("disabled", "disabled");
        } else {
            $('.confirmbtn').removeClass('uni-disabled');
            $('.confirmbtn').removeAttr("disabled");
        }
    };

    $('.newlecname').keyup(characterleftcheck);
    $('.newlecdescrip').keyup(characterleftcheck);


    //Lecture edit control
    $(document).on('click', ".lec-editbtn", function() {
        $(".lec-popout").fadeIn(400);
        //add confirm type
        $(".confirmbtn").addClass("editlec-confirm");
        $(this).parent().siblings().find(".lec-lecname").addClass("editing-lecname");
        $(this).parent().siblings(".lec-lecdescrip").addClass("editing-lecdescrip");
        $('.newlecname').val($(".editing-lecname").text());
        $('.newlecdescrip').val($(".editing-lecdescrip").text());
        console.log("lec-editbtn clicked");
    })

    // Lecture edit confirmbtn click
    $(document).on('click', ".editlec-confirm", function() {
        console.log("editlec-confirm clicked");

        //customize lecture frame
        var lecnametext = $(".newlecname").val();
        var lecdescriptext = $(".newlecdescrip").val();
        $(".editing-lecname").text(lecnametext);
        $(".editing-lecdescrip").text(lecdescriptext);

        //remove editing-class
        $(".editing-lecname").removeClass("editing-lecname");
        $(".editing-lecdescrip").removeClass("editing-lecdescrip");

        //clear newlec-confirm class
        $(".confirmbtn").removeClass("newlec-confirm editlec-confirm");

        $(".lec-popout").fadeOut(200);

    })


    //New Board control
    $(document).on('click', ".newboard-btn", function() {
        $(".lec-popout").fadeIn(400);
        //add confirm type
        $(".confirmbtn").addClass("newlec-confirm")
            //set up default text
        $('.newlecname').val("Lecture " + ($('.lec-board').children().size() + 1) + " - New Lecture");
        $('.newlecdescrip').val("Description: This is a new lecture");
        console.log("newboard-btn clicked");
    })

    // newlec confirm click
    $(document).on('click', ".newlec-confirm", function() {
        console.log("newlec-confirm clicked");


        var newlec = $("#defaultlecture").clone().removeAttr("id");

        //customize lecture frame
        var lecnametext = $(".newlecname").val();
        var lecdescriptext = $(".newlecdescrip").val();
        newlec.last().find(".lec-lecname").text(lecnametext);
        newlec.last().find(".lec-lecdescrip").text(lecdescriptext);


        $(".lec-board").append(newlec);

        //clear newlec-confirm class
        $(".confirmbtn").removeClass("newlec-confirm editlec-confirm");

        //scroll to the new lecture part
        $(document.body).animate({
            scrollTop: $(".lec-board").children(".boardcontainer").last().offset().top
        }, 600);
        $(".lec-popout").fadeOut(200);
    })


    console.log("test: " + $routeParams._lecId)

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
    // console.log("allcate.length is " + allcate.length);

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

    //AUDIT
    $scope.auditlogin = function() {
        $http({
            url: '/api/auditlogin',
            method: 'POST',
            data: {
                auditname: $scope.auditname,
            }
        }).success(function(audituser) {
            $scope.$emit('auditlogin', audituser)
            $location.path('/lecture', $scope.auditname)
        }).error(function(data) {
            $location.path('/')
        })
    }

    //login 
    $scope.login = function() {
        $http({
            url: '/api/login',
            method: 'POST',
            data: {
                email: $scope.loginEmail,
                password: $scope.loginPassword
            }
        }).success(function(user) {
            $scope.$emit('login', user)
            $location.path('/lecture', $scope.loginEmail)
        }).error(function(data) {
            $location.path('/')
        })

    }

    //6.30reg
    $scope.reg = function() {
        // console.log($('#chooseimg').attr('src'))
        // console.log($scope.signupEmail)
        $http({
            url: '/api/reg',
            method: 'POST',
            data: {
                email: $scope.signupEmail,
                password: $scope.signupPassword
            }
        }).success(function(user) {
            // console.log(user)
            // console.log('reg')
            $scope.$emit('reg', user)
            $location.path('/lecture', $scope.signupEmail)
        }).error(function(data) {
            // console.log(data)
            // console.log('error_reg')
            $location.path('/')
        })

        // $scope.$emit('reg', $scope.email, $('#chooseimg').attr('src'))
        // $location.path('/section', $scope.username)
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
   console.log('lectureId:'+ $routeParams._lecId+ " sectionId: " + $routeParams._secId +" roomID: "+ $routeParams._roomId)
 
})

angular.module('techNodeApp').controller('SectionCtrl', function($scope, $routeParams, $scope, socket) {

    //dropdown menu control
    $(document).on('click', ".user", function() {
        console.log("user clicked");
        $(".user-dropdown").slideToggle(200);
    });

    //show hide control
    $(".showhidecontrol").bind("click", function() {
        $(".header").slideToggle(400);
        $(".nav").slideToggle(400);
        $(".sec-editbtn").slideToggle(400);
        $(".sec-opencheck").slideToggle(400);
        $(".sec-deletebtn").slideToggle(400);
    })

    //QR Open Control
    $(".sec-lecqr").bind("click", function() {
        $(".qr-popout").fadeIn(400);
    })

    $(".qrclosebtn").bind("click", function() {
        $(".qr-popout").fadeOut(200);
    })

    //Btn Mouseover Effect
    $(document).on('mouseover', ".sec-editbtn", function() {
        $(this).children().attr('src', 'img/editimg3-black.png');
    })

    $(document).on('mouseout', ".sec-editbtn", function() {
        $(this).children().attr('src', 'img/editimg3.png');
    })

    $(document).on('mouseover', ".sec-deletebtn", function() {
        $(this).children().attr('src', 'img/deleteimg-black.png');
    })

    $(document).on('mouseout', ".sec-deletebtn", function() {
            $(this).children().attr('src', 'img/deleteimg.png');
        })
        //On/Off transition
    $(document).on('click', ".sec-opencheck", function() {
        if ($(this).children("#sec-opencheckInput").attr("checked") === 'checked') {
            $(this).children("#sec-opencheckInput").attr("checked", false);
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
        } else {
             $(this).children("#sec-opencheckInput").attr("checked", true);
            console.log("check=true");
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
        }
    });

    // delete section btn click
    $(document).on('click', ".sec-deletebtn", function(e) {
        if (event && event.stopPropagation) { //非IE浏览器 
            event.stopPropagation();
        } else { //IE浏览器 
            window.event.cancelBubble = true;
        }
        if ($("body").children(".bubblecontainer").is(".bubblecontainer") == false) {
            console.log("bubble=false");
            var newbubble = $("#defaultbubble").clone().removeAttr("id");
            var selectsection = $(e.target).parents(".sectionframe");

            $("body").prepend(newbubble);
            var bubblex = $(e.target).closest(".sec-deletebtn").offset().left - 203;
            var bubbley = $(e.target).closest(".sec-deletebtn").offset().top - 23;
            newbubble.css({
                "display": "block",
                "opacity": "0",
                "left": bubblex,
                "top": bubbley
            }).animate({
                opacity: "1",
                "top": (bubbley - 20)
            }, 200);

            //bind delete-confirm event
            newbubble.find(".delete-confirm").bind('click', function() {
                console.log("delete confirmed");
                selectsection.children().andSelf().animate({
                    minHeight: "0",
                    height: "0",
                    opacity: "0"
                }, function() {
                    $(this).remove();
                })

            });

            //bind one-time fullscreen fadeout event to clear the btnwithbubble
            $(document).one('click', function(e) {
                newbubble.animate({
                    "top": bubbley,
                    opacity: "0"
                }, 100, function() {
                    $(this).remove();
                    console.log("bubble removed");
                });
            });
        }
        return false;
    })


    // $(document).on('click', '.sectionframe', function() {
    //     window.location = "/room"
    // })

    // common Close btn click
    $(".newsecclosebtn").click(function(){
        $(".sec-popout").fadeOut(200);
        $(".newsecname").val("");
        $(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

        //remove editing-class (if possible)
        $(".editing-secname").removeClass("editing-secname");

    })


    // common input text length control(using common comfirm class)
    $('.newsecname').keyup(function() {
        var secnameLength = $(this).val().length;
        var charactersLeft = 155 - secnameLength;
       //   $('.counter').text(charactersLeft); 
  
        if(charactersLeft < 0) {
          $('.confirmbtn').addClass('uni-disabled'); 
          $('.confirmbtn').attr("disabled","disabled");
        }
        else if(charactersLeft == 155) {
          $('.confirmbtn').addClass('uni-disabled');
          $('.confirmbtn').attr("disabled","disabled");
        }
        else {
          $('.confirmbtn').removeClass('uni-disabled');
          $('.confirmbtn').removeAttr("disabled");
        }
    }); 

     //section edit control
    $(document).on('click',".sec-editbtn",function(){
        $(".sec-popout").fadeIn(400);
        $(".newsectitle").text("Edit Section")
        //add confirm type
        $(".confirmbtn").addClass("editsec-confirm");
        $(this).siblings(".sectionname").addClass("editing-secname");
        $('.newsecname').val($(".editing-secname").text());
        console.log("sec-editbtn clicked");
    })

    // Section edit confirmbtn click
    $(document).on('click',".editsec-confirm",function(){
        console.log("editsec-confirm clicked");

        //customize section frame
        var sectext = $(".newsecname").val();
        $(".editing-secname").text(sectext);

        //remove editing-class
        $(".editing-secname").removeClass("editing-secname");

        //clear newsec-confirm class
        $(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

        $(".sec-popout").fadeOut(200);

    })


    //New Section control
    $(document).on('click',".newsec-btn",function(){
        $(".sec-popout").fadeIn(400);
        $(".newsectitle").text("New Section")
        //add confirm type
        $(".confirmbtn").addClass("newsec-confirm")
        //set up default text
        $('.newsecname').val("Section "+($('.sectionlist').children().size()+1)+". Q&A Section");
        console.log("newsec-btn clicked");
    })

    // newsec confirm click
    $(document).on('click',".newsec-confirm",function(){
        console.log("newsec-confirm clicked");
        
    
        var newsec = $("#defaultsection").clone().removeAttr("id");
        $(".sectionlist").append(newsec);

        //customize section frame
        var sectext = $(".newsecname").val();
        $(".sectionlist").children(".sectionframe").last().find(".sectionname").text(sectext);

        //clear newsec-confirm class
        $(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

        //scroll to the new section part
        $(document.body).animate({scrollTop:$(".sectionlist").children(".sectionframe").last().offset().top}, 600 );
        $(".sec-popout").fadeOut(200);
    })
    console.log('lectureId:'+ $routeParams._lecId+ " sectionId: " + $routeParams._secId)

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

angular.module('techNodeApp').controller('LectureCtrl', function($scope, $routeParams, $scope) {
    
    var global = {
        user_Id: "55928482df38c17a66c67f2a"
    }

    //dropdown menu control
    $(document).on('click', ".user", function(event) {
        $(".user-dropdown").show(150);
        $(document).one('click', function() {
            $(".user-dropdown").hide(100);
        });
        event.stopPropagation();
        // $(document).on('click',".user",function(event){
        //  event.stopPropagation();
        // });
    });
    // sort dropdown control
    $(document).on('click', ".lec-sorttype", function(event) {
        $(".lec-sortdropdown").show(150);
        $(document).one('click', function() {
            $(".lec-sortdropdown").hide(100);
        });
        event.stopPropagation();
    });

    $(document).on('click', ".sorttype-choice", function() {
        var sortchose = $(this).attr("title");
        $(".sorttype-text").html(sortchose);
    })

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
        console.log('show here the result: ' + $(this).children("#lec-opencheckInput").attr("checked"))
        var clickedlec = $(this).parents(".boardcontainer");
        //console.log($(this).parents(".boardcontainer"));
        var boardid = clickedlec.last().find(".lec-idnumber").attr("title");
        console.log("boardid is " + boardid);
        if ($(this).children("#lec-opencheckInput").attr("checked") === "checked") {
            $(this).children("#lec-opencheckInput").removeAttr("checked");
            console.log("2: " + $(this).children("#lec-opencheckInput").attr("checked"))
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
                //open Lec
        
            var openLecture = function() {
                var boardId;
                $.ajax({
                        url: '/api/openLecture',
                        type: 'POST',
                        dataType: '',
                        data: {
                            user_Id: global.user_Id,
                            lecture_Id: boardid
                        },
                    })
                    .done(function(data) {
                        //console.log(data)
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                        alert(failure);
                    })
                    .always(function() {
                        console.log("complete");
                    })
            }
            openLecture();



        } else {
            $(this).children("#lec-opencheckInput").attr("checked", true);
            console.log("1: " + $(this).children("#lec-opencheckInput").attr("checked"))
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

            //close lec
             var closeLecture = function() {
            $.ajax({
                    url: '/api/closeLecture',
                    type: 'POST',
                    dataType: '',
                    data: {
                        user_Id: global.user_Id,
                        lecture_Id: boardid
                    },
                })
                .done(function(data) {
                    //console.log(data)
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                })
        }
        closeLecture();
        }
        return false
    });

    // delete section btn click
    $(document).on('click', ".lec-deletebtn", function(e) {
        var clickedlec = $(this).parents(".boardcontainer");
        //console.log($(this).parents(".boardcontainer"));
        var deletingboardid = clickedlec.last().find(".lec-idnumber").attr("title")
        console.log(deletingboardid);


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
                //console.log(deleltingboardid);

                var deleteLecture = function() {
                    $.ajax({
                            url: '/api/deleteLecture',
                            type: 'POST',
                            dataType: '',
                            data: {
                                // creator : "55a09acdf2290647ded227a1",
                                user_Id: global.user_Id,
                                lecture_Id: deletingboardid
                            },
                        })
                        .done(function(data) {
                            console.log(data)
                            console.log("success");
                        })
                        .fail(function() {
                            console.log("error");
                        })
                        .always(function() {
                            console.log("complete");
                        })
                }
                deleteLecture();


                //delete animation
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


    $(document).on('click', ".lec-editbtn", function() {
        $(".lec-popout").fadeIn(400);
        //add confirm type
        $(".confirmbtn").addClass("editlec-confirm");
        $(this).parent().siblings().find(".lec-lecname").addClass("editing-lecname");
        $(this).parent().siblings(".lec-lecdescrip").addClass("editing-lecdescrip");
        $('.newlecname').val($(".editing-lecname").text());
        $('.newlecdescrip').val($(".editing-lecdescrip").text());
        var clickedlec = $(this).parents(".boardcontainer");
        //console.log(clickedlec);
        var editingboardid = clickedlec.last().find(".lec-idnumber").attr("title")
        $('.newlecname').attr("title", editingboardid);

        console.log("lec-editbtn clicked");
    })

// Lecture edit confirmbtn click
    $(document).on('click', ".editlec-confirm", function() {
        console.log("editlec-confirm clicked");
        //console.log($('.newlecname').attr("title"));

        var editLecture = function() {
            var lecnametext;
            var lecdescriptext;
            console.log("newlecname.val is " + $(".newlecname").val());
            console.log("content" + $(".newlecdescrip").val());
            $.ajax({
                url: '/api/editLecture',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: global.user_Id,
                    lecture_Id: $('.newlecname').attr("title"),
                    name: $(".newlecname").val(),
                    content: $(".newlecdescrip").val()
                },
            })

            .done(function(data) {

                })
                .fail(function() {
                    console.log("error");
                    alert("network failure");
                })
                .always(function() {
                    console.log("complete");
                })

            // clear newlecname attr
            $('.newlecname').attr("title", "")

        }

        editLecture();


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
        //var lecnametext = $(".newlecname").val();
        //var lecdescriptext = $(".newlecdescrip").val();

        var createLecture = function() {
            var lecnametext;
            var lecdescriptext;
            var boardId;
            console.log($(".newlecname").val())
                        console.log($(".newlecdescrip").val())
            $.ajax({
                    url: '/api/creatLecture',
                    type: 'POST',
                    dataType: '',
                    data: {
                        creator: global.user_Id,
                        name: $(".newlecname").val(),
                        content: $(".newlecdescrip").val()
                    },
                })
                .done(function(data) {
                    console.log(data)
                    lecnametext = data.name;
                    lecdescriptext = data.content;
                    boardId = data._id
                    console.log("success");
                    newlec.last().find(".lec-lecname").text(lecnametext);
                    newlec.last().find(".lec-lecdescrip").text(lecdescriptext);
                    newlec.last().find(".lec-idnumber").attr("title", boardId);
                    $(".lec-board").append(newlec);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                })
        }
        createLecture();



        //clear newlec-confirm class
        $(".confirmbtn").removeClass("newlec-confirm editlec-confirm");

        //scroll to the new lecture part
        $(document.body).animate({
            scrollTop: $(".lec-board").children(".boardcontainer").last().offset().top
        }, 600);
        $(".lec-popout").fadeOut(200);
    })


    var getAllLecture = function() {
        var lecnametext;
        var lecdescriptext;
        var newlec;
        var boardId;
        var totalVote, totalQuestion, totalSection;
        var qrUrl;
        var lecState;
        $.ajax({
                url: '/api/getAllLectures',
                type: 'POST',
                dataType: '',
                data: {
                    //me._Id
                    user_Id: global.user_Id
                },
            })
            .done(function(data) {
                console.log(data)
                console.log("success");
                for (var i in data) {
                    newlec = $("#defaultlecture").clone().removeAttr("id");
                    lecnametext = data[i].name;
                    lecdescriptext = data[i].content;
                    boardId = data[i]._id;
                    totalVote = data[i].totalVote;
                    totalQuestion = data[i].totalQuestion;
                    totalSection = data[i].totalSection;
                    qrUrl = data[i].qrUrl
                    lecState = data[i].lStatus
                    newlec.last().find(".lec-lecname").text(lecnametext);
                    newlec.last().find(".lec-lecdescrip").text(lecdescriptext);
                    newlec.last().find(".lec-idnumber").attr("title", boardId);
                    //newlec.last().find(".sec-count").text();
                    $(".lec-board").append(newlec);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }
    getAllLecture();







    console.log($scope.me._id)

})

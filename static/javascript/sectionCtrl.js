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
    $(".newsecclosebtn").click(function() {
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

        if (charactersLeft < 0) {
            $('.confirmbtn').addClass('uni-disabled');
            $('.confirmbtn').attr("disabled", "disabled");
        } else if (charactersLeft == 155) {
            $('.confirmbtn').addClass('uni-disabled');
            $('.confirmbtn').attr("disabled", "disabled");
        } else {
            $('.confirmbtn').removeClass('uni-disabled');
            $('.confirmbtn').removeAttr("disabled");
        }
    });

    //section edit control
    $(document).on('click', ".sec-editbtn", function() {
        $(".sec-popout").fadeIn(400);
        $(".newsectitle").text("Edit Section")
            //add confirm type
        $(".confirmbtn").addClass("editsec-confirm");
        $(this).siblings(".sectionname").addClass("editing-secname");
        $('.newsecname').val($(".editing-secname").text());
        console.log("sec-editbtn clicked");
    })

    // Section edit confirmbtn click
    $(document).on('click', ".editsec-confirm", function() {
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
    $(document).on('click', ".newsec-btn", function() {
        $(".sec-popout").fadeIn(400);
        $(".newsectitle").text("New Section")
            //add confirm type
        $(".confirmbtn").addClass("newsec-confirm")
            //set up default text
        $('.newsecname').val("Section " + ($('.sectionlist').children().size() + 1) + ". Q&A Section");
        console.log("newsec-btn clicked");
    })

    // newsec confirm click
    $(document).on('click', ".newsec-confirm", function() {
        console.log("newsec-confirm clicked");


        var newsec = $("#defaultsection").clone().removeAttr("id");
        $(".sectionlist").append(newsec);

        //customize section frame
        var sectext = $(".newsecname").val();
        $(".sectionlist").children(".sectionframe").last().find(".sectionname").text(sectext);

        //clear newsec-confirm class
        $(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

        //scroll to the new section part
        $(document.body).animate({
            scrollTop: $(".sectionlist").children(".sectionframe").last().offset().top
        }, 600);
        $(".sec-popout").fadeOut(200);
    })

    //xiaoxiao
    console.log('lectureId:' + $routeParams._lecId)

    var createSection = function() {
            $.ajax({
                    url: '/api/createSection',
                    type: 'POST',
                    dataType: '',
                    data: {
                        user_Id: "55928482df38c17a66c67f2a",
                        lecture_Id: "55a2228ffed9f4cd232a823d",
                        content: "second section for user2 lec4",
                    },
                })
                .done(function(msg) {
                    console.log(msg)
                    console.log("success");
                })
                .fail(function(data) {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        }
        //createSection();

    var getAllSection = function() {
        $.ajax({
                url: '/api/getAllSectionsByID',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: '55928482df38c17a66c67f2a',
                    lecture_Id: '55a2228ffed9f4cd232a823d',
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
            });

    }
    //getAllSection();
    var deleteSection = function(){
        $.ajax({
                url: '/api/deleteSection',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: '55928482df38c17a66c67f2a',
                    lecture_Id: '55a2228ffed9f4cd232a823d',
                    section_Id:'55a274d18b0cdfe82609e8aa'
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
            });
    }
    //deleteSection();

    var closeSection = function(){
        $.ajax({
                url: '/api/closeSection',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: '55928482df38c17a66c67f2a',
                    lecture_Id: '55a2228ffed9f4cd232a823d',
                    section_Id:'55a274d18b0cdfe82609e8aa'
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
            });
    }
    //closeSection();

    var OpenSection = function(){
        $.ajax({
                url: '/api/openSection',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: '55928482df38c17a66c67f2a',
                    lecture_Id: '55a2228ffed9f4cd232a823d',
                    section_Id:'55a274d18b0cdfe82609e8aa'
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
            });
    }
    //OpenSection();

    var editSection = function(){
        $.ajax({
                url: '/api/editSection',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: '55928482df38c17a66c67f2a',
                    lecture_Id: '55a2228ffed9f4cd232a823d',
                    section_Id:'55a274d18b0cdfe82609e8aa',
                    content:'12345'
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
            });
    } 


})

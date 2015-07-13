angular.module('techNodeApp').controller('SectionCtrl', function($scope, $routeParams, $scope, socket, $http) {
    var global = {
        //lec: 55a41dff54e9b972372e133b
        user_Id: $scope.me._id
        //$scope.me._id
    }

    //jump to section page
    $(document).on("click",".sectionframe",function(event){

        var boardid = $(".sec-lecname").attr("title")
        var secid = $(this).attr("title")
        console.log("boardid is "+boardid+" secid is "+secid);

        var mayedit = $(event.target).parents(".sec-editbtn").andSelf();
        var mayopencheck = $(event.target).parents(".sec-opencheck").andSelf();
        var maydelete =$(event.target).parents(".sec-deletebtn").andSelf();

        var editjudge = $(mayedit).hasClass("sec-editbtn");
        var opencheckjudge  = $(mayopencheck).hasClass("sec-opencheck");
        var deletejudge  = $(maydelete).hasClass("sec-deletebtn");
        console.log(editjudge+opencheckjudge+deletejudge)

        if (editjudge === false && opencheckjudge === false && deletejudge === false){
         window.location.href= "/lecture/" + boardid + "/section/" + secid;
        }
    });




    //getAll
    var getAllSection = function() {

        // getLecture first
        var lecnametext;
        var lecdescriptext;
        var totalVote, totalQuestion, totalSection;
        var qrUrl;
        var time;

        $.ajax({
                url: '/api/getLecture',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: global.user_Id,
                    lecture_Id: $routeParams._lecId,
                },
            })
            .done(function(data) {
                //section
                console.log("11111" + data)
                lecnametext = data.name;
                lecdescriptext = data.content;
                totalVote = data.totalVote;
                totalSection = data.totalSection;
                totalQuestion = data.totalQuestion;
                qrUrl = data.qrUrl
                secCreator = data.creator._id
                lectureId=data._id
                //console.log("lectureId is "+lectureId)
                $(".sec-lecname").attr("title",lectureId)
                time = data.time.substring(0, 4) + "/" + data.time.substring(5, 7) + "/" + data.time.substring(8, 10);
                
                // newsec.last().find(".sec-secname").text(lecnametext);
                $(".sec-lecname").html(lecnametext);
                $(".sec-lecdescription").html(lecdescriptext);
                $(".sec-count").html(totalSection);
                $(".question-count").html(totalQuestion);
                $(".vote-count").html(totalVote);
                $(".sec-time").html(time);
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });


        var seccontent;
        var sectionId;
        var secState;
        var newsec;
        $.ajax({
                url: '/api/getAllSectionsByID',
                type: 'POST',
                dataType: '',
                data: {
                    user_Id: global.user_Id,
                    lecture_Id: $routeParams._lecId,
                },
            })
            .done(function(data) {
                console.log(data)
                console.log("success");
                for (var i in data) {
                    newsec = $("#defaultsection").clone().removeAttr("id");
                    seccontent = data[i].content;
                    secState = data[i].sStatus;
                    sectionId = data[i]._id;

                    newsec.attr("title", sectionId);
                    newsec.last().find(".sectionname").text(seccontent);
                    var newsecopencheck = newsec.last().find(".sec-opencheck");
                    //JUEDE ISCREATOR
                    if(secCreator !== $scope.me._id){
                        newlec.last().find(".sec-editbtn").css("display","none");
                        newlec.last().find(".sec-opencheck").css("display","none");
                        newlec.last().find(".sec-deletebtn").css("display","none");
                        console.log("toolbtn blocked");
                    }else{

                    }




                    if (secState === 1) {
                        $(newsecopencheck).children("#sec-opencheckInput").removeAttr("checked");
                        $(newsecopencheck).css({
                            "background-color": "#6ecf68"
                        });
                        $(newsecopencheck).children("label").css({
                            "left": "2px"
                        });
                        $(newsecopencheck).children(".checkOn").animate({
                            "opacity": "100"
                        }, 100)
                        $(newsecopencheck).children(".checkOff").animate({
                            "opacity": "0"
                        }, 100)

                    } else {
                        $(newsecopencheck).children("#sec-opencheckInput").attr("checked", true);
                        $(newsecopencheck).css({
                            "background-color": "#979797"
                        });
                        $(newsecopencheck).children("label").css({
                            "left": "32px"
                        });
                        $(newsecopencheck).children(".checkOn").animate({
                            "opacity": "0"
                        }, 100)
                        $(newsecopencheck).children(".checkOff").animate({
                            "opacity": "100"
                        }, 100)

                    }
                    $(".sectionlist").append(newsec);

                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    }
    getAllSection();


   //dropdown menu control
    $(document).on('click',".user",function(event){
        $(".user-dropdown").show(150);
        $(document).one('click',function(){
            $(".user-dropdown").hide(100);
        });
        event.stopPropagation();
        // $(document).on('click',".user",function(event){
        //  event.stopPropagation();
        // });
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

        var boardid = $(".sec-lecname").attr("title")
    
        console.log("11111" + boardid)
        $http({
            url: '/api/showqr',
            method: 'POST',
            data: {
                lectureUrl: "http://www.quesboard.com/lecture/" + boardid,
            }
        }).success(function(data) {
            console.log(data)
            $(".qrimg").html(data);
        }).error(function() {
            console.log('error_showqr')
        })



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
        var clickedsec = $(this).parents(".sectionframe");
        //console.log($(this).parents(".boardcontainer"));
        var sectionid = clickedsec.attr("title");
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
                //open sec

            var OpenSection = function() {
                $.ajax({
                        url: '/api/openSection',
                        type: 'POST',
                        dataType: '',
                        data: {
                            user_Id: global.user_Id,
                            lecture_Id: $routeParams._lecId,
                            section_Id: sectionid
                        },
                    })
                    .done(function(data) {
                        //console.log(data)
                        console.log("open success");
                    })
                    .fail(function() {
                        console.log("error");
                        alert("failure");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            }
            OpenSection();

        } else {
            $(this).children("#sec-opencheckInput").attr("checked", true);
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
            var closeSection = function() {
                $.ajax({
                        url: '/api/closeSection',
                        type: 'POST',
                        dataType: '',
                        data: {
                            user_Id: global.user_Id,
                            lecture_Id: $routeParams._lecId,
                            section_Id: sectionid
                        },
                    })
                    .done(function(data) {
                        //console.log(data)
                        console.log("close success");
                    })
                    .fail(function() {
                        console.log("error");
                        alert("failure");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            }
            closeSection();

        }
    });

    // delete section btn click
    $(document).on('click', ".sec-deletebtn", function(e) {
        var clickedsec = $(this).parents(".sectionframe");
        //console.log($(this).parents(".boardcontainer"));
        var deletingsectionId = clickedsec.attr("title");
        //console.log("deletingsectionId is" + deletingsectionId);

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
                //console.log("delete confirmed");


                var deleteSection = function() {
                    $.ajax({
                            url: '/api/deleteSection',
                            type: 'POST',
                            dataType: '',
                            data: {
                                user_Id: global.user_Id,
                                lecture_Id: $routeParams._lecId,
                                section_Id: deletingsectionId
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
                deleteSection();


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

        //clear possible ids
        $('.newsecname').attr("title", "")
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

        var clickedsec = $(this).parents(".sectionframe");
        //transmit id to new window
        var editingsecid = clickedsec.attr("title")
        $('.newsecname').attr("title", editingsecid);
    })

    // Section edit confirmbtn click
    $(document).on('click', ".editsec-confirm", function() {
        console.log("editsec-confirm clicked");

        var editSection = function() {
            $.ajax({
                    url: '/api/editSection',
                    type: 'POST',
                    dataType: '',
                    data: {
                        user_Id: global.user_Id,
                        lecture_Id: $routeParams._lecId,
                        section_Id: $('.newsecname').attr("title"),
                        content: $(".newsecname").val(),
                    },
                })
                .done(function(data) {
                    console.log("edit success");
                })
                .fail(function() {
                    console.log("error");
                    alert("network failure");
                })
                .always(function() {
                    console.log("complete");
                });

            // clear newlecname attr
            $('.newsecname').attr("title", "")

        }
        editSection();


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
        //new lec
        var createSection = function() {
            var seccontent
            var sectionId;
            $.ajax({
                    url: '/api/createSection',
                    type: 'POST',
                    dataType: '',
                    data: {
                        user_Id: global.user_Id,
                        lecture_Id: $routeParams._lecId,
                        content: $(".newsecname").val()
                    },
                })
                .done(function(data) {
                    console.log("data is" + data)
                    console.log("success");
                    seccontent = data.content;
                    sectionId = data._id;

                    console.log(seccontent);
                    console.log(sectionId);

                    newsec.find(".sectionname").html(seccontent);
                    newsec.attr("title", sectionId);
                    $(".sectionlist").append(newsec);


                })
                .fail(function(data) {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        }
        createSection();



        //customize section frame
        var sectext = $(".newsecname").val();


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


})

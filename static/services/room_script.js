var foldheight = 80;

var main = function() {

    //dropdown menu control
    $(document).on('click', ".user", function(event) {
        $(".user-dropdown").show(150);
        $(document).one('click', function() {
            $(".user-dropdown").hide(100);
        });
        event.stopPropagation();
    });

    // sort dropdown control
    $(document).on('click', ".ques-sorttype", function(event) {
        $(".ques-sortdropdown").show(150);
        $(document).one('click', function() {
            $(".ques-sortdropdown").hide(100);
        });
        event.stopPropagation();
    });

    $(document).on('click', ".sorttype-choice", function() {
        var sortchose = $(this).attr("title");
        $(".sorttype-text").html(sortchose);
    })

    //show hide control
    $(".showhidecontrol").bind("click", function() {
        var allopencheck = $(".questionlist").find(".ques-opencheck")
        for (var i = 0; i < allopencheck.length; i++) {
            var opencheckstat = $(allopencheck[i]).find("#ques-opencheckInput").attr("checked");
            var checkquesframe = $(allopencheck[i]).parents(".questionframe");
            if (opencheckstat === "checked") {
                checkquesframe.slideToggle(400)
            } else {}
        }
        $(".header").slideToggle(400);
        $(".nav").slideToggle(400);
        $(".ques-toolbox").slideToggle(400);
    })


    //QR Open Control
    $(".ques-lecqr").bind("click", function() {
        $(".qr-popout").fadeIn(400);
    })

    $(".qrclosebtn").bind("click", function() {
        $(".qr-popout").fadeOut(200);
    })

    //Btn Mouseover Effect
    $(document).on('mouseover', ".ques-flagbtn", function() {
        if ($(this).hasClass("ques-flagbtn-clicked") == false) {
            $(this).children().attr('src', 'img/flagimg-empty-black.png');
        } else {
            $(this).children().attr('src', 'img/flagimg-red-black.png');
        }
    })

    $(document).on('mouseout', ".ques-flagbtn", function() {
        if ($(this).hasClass("ques-flagbtn-clicked") == false) {
            $(this).children().attr('src', 'img/flagimg-empty.png');
        } else {
            $(this).children().attr('src', 'img/flagimg-red.png');
        }
    })


    //flag clicked event
    $(document).on('click', ".ques-flagbtn", function() {
        if ($(this).hasClass("ques-flagbtn-clicked") == false) {
            $(this).addClass("ques-flagbtn-clicked");
            $(this).children().attr('src', 'img/flagimg-red-black.png');
        } else {
            $(this).removeClass("ques-flagbtn-clicked");
            $(this).children().attr('src', 'img/flagimg-empty-black.png');
        };
    });

    // //On/Off label transition
    // $(document).on('click',".ques-opencheck",function(){
    //     if($(this).children("#ques-opencheckInput").attr("checked") === 'checked'){
    //         $(this).children("#ques-opencheckInput").attr("checked",false);
    //         $(this).css({"background-color":"#6ecf68"});
    //         $(this).children("label").css({"left":"2px"});
    //         $(this).children(".checkOn").animate({"opacity":"100"},100)
    //         $(this).children(".checkOff").animate({"opacity":"0"},100)
    //     }
    //     else{
    //         $(this).children("#ques-opencheckInput").attr("checked",true);
    //         $(this).css({"background-color":"#979797"});
    //         $(this).children("label").css({"left":"32px"});
    //         $(this).children(".checkOn").animate({"opacity":"0"},100)
    //         $(this).children(".checkOff").animate({"opacity":"100"},100)
    //     }
    // });

    //post frame control

    $(".newquest-btn").click(function() {
        $(".ask-popout").fadeIn(400);

    })

    $(".askclosebtn").click(function() {
        $(".ask-popout").fadeOut(200);
        $(".inputbox").val("");
        $('.postbtn').addClass('uni-disabled');
        $('.postbtn').attr("disabled", "disabled");
    })

    var askername = $(".username").text();
    var askerimgsrc = $(".userimg").attr("src");


    $(".askername").text(askername);
    $(".askerimg").attr("src", askerimgsrc);
    $(".askerimg-mobile").attr("src", askerimgsrc);

    // input text control

    $('.inputbox').keyup(function() {
        var postLength = $(this).val().length;
        var charactersLeft = 400 - postLength;
        //   $('.counter').text(charactersLeft); 

        if (charactersLeft < 0) {
            $('.postbtn').addClass('uni-disabled');
            $('.postbtn').attr("disabled", "disabled");
        } else if (charactersLeft == 400) {
            $('.postbtn').addClass('uni-disabled');
            $('.postbtn').attr("disabled", "disabled");
        } else {
            $('.postbtn').removeClass('uni-disabled');
            $('.postbtn').removeAttr("disabled");
        }
    });
    $(document).on('click', ".questiontext", unfoldevent);
};

var unfoldevent = function() {
    foldheight = $(".questiontext").innerHeight();

    console.log("the foldheight is " + foldheight);
    console.log($(this));
    console.log("foldheight is " + foldheight);
    console.log("offsetHeight is " + this.offsetHeight);
    console.log("scrollHeight is " + this.scrollHeight);

    if (this.offsetHeight > foldheight) {
        console.log("fold");
        $(this).innerHeight(foldheight);
    } else if (this.scrollHeight > foldheight) {
        console.log("unfold");
        $(this).innerHeight(this.scrollHeight);
    }
}

$(document).ready(main);

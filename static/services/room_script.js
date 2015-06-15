var foldheight = 80;

var main = function() {
    //show hide control
    $(".showhidecontrol").bind("click",function () {
        $(".header").toggle();
        $(".nav").toggle();
    })

    //QR Open Control
    $(".lec-qr").bind("click",function(){
        $(".qr-popout").fadeIn(400);
    })

    $(".qrclosebtn").bind("click",function(){
        $(".qr-popout").fadeOut(200);
    })


    
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

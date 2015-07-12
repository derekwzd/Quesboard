$(document).ready(function(){


    //Tips generate
    var gentip = function(tiptarget,tipcontent){
        var newbubble = $("#defaultinfobubble").clone().removeAttr("id");
        newbubble.find(".bubble-info").html(tipcontent);
        $("body").append(newbubble);
        var tipaxisX= $("body").width() - tiptarget.offset().left - tiptarget.width()/2 - newbubble.width()/2;
        var tipaxisY= tiptarget.offset().top-20;
        newbubble.css({"top":tipaxisY + "px", "right":tipaxisX + "px"});
        newbubble.animate({opacity:"0.9","top":tipaxisY-10+"px"},200);
        setTimeout(function(){newbubble.animate({opacity:"0","top":tipaxisY+"px"},200,function(){$(this).remove();})},1500); 
    }

    $(document).on('click',"input",function(){
        gentip($(this),"Tpye in here!");
    });


    //random picture and name
    $(".randomimg").click(function(){
        $(".head-popout").fadeIn(400);
    })

    $(".chooseclosebtn").click(function(){
        $(".head-popout").fadeOut(400);
    })
    $(".blackbg").click(function(){
        $(".head-popout").fadeOut(400);
    })

    //src generator function
    var gensrc = function(cate){
        var srcarray = new Array();
        for (var i = cate[1] - 1; i >= 0; i--) {
        
        srcarray[i]= "img/profile100px/"+cate[0]+(i+1)+".png";
        };
        return srcarray;
    }

    //pic control. first is category name, second is num of pic
    var sciencecate = ["science",17];
    var artcate = ["art",7];
    var comiccate = ["comic",8];
    
    //add up all the pic src array
    var allcate = new Array();
    allcate = allcate.concat(gensrc(sciencecate),gensrc(artcate),gensrc(comiccate));
    console.log("allcate.length is "+allcate.length);

    //load all the pic into head selection page
    for(i=0; i<allcate.length; i++){
        var newimg = $("<img>").attr("src",allcate[i]);
        $(".imgcontainer").append(newimg);
    }
    $(".imgcontainer img").click(chooseevent);

    //generate initial random pic
    var ranpicnum= Math.ceil(Math.random()*31);
    console.log("ranpicnum is "+ranpicnum);
    var ranpicsrc = allcate[ranpicnum];
    $(".randomimg").attr("src",ranpicsrc);


    //name array
    var sciencename = new Array("Albert","Alan","Ampere","Watt","Edison","Isaac","Leonardo","Maxwell","Newton","Pascal","Ohm","Hertz","Joule","Henry","Faraday","Planck","Gauss","Orsted","Coulomb","Thomson","Bell","Marconi","Candela","Mol");
    var artname = new Array("Michelangelo","Leonardo","Raffaello","Cézanne","Dante","Petrarca","Boccaccio","Monet","Van Gogh","Acacia","Amaryllis","Aster","Azalea","Blossom","Bluebell","Bryony","Calla","Camellia","Clover","Daffodil","Dahlia","Daisy","Delphine","Fleur","Flora","Gardenia","Garland","Heather","Hyacinth","Ianthe","Iris","Ivy","Jacinta","Jasmine","Jonquil","Lavender","Leilani","Lilac","Lily","Linnea","Lotus","Magnolia","Marguerite","Marigold","Orchid","Pansy","Peony","Petal","Petunia","Poppy","Posey","Primrose","Rose","Senna","Tulip","Violet","Xochitl","Zahara","Zinnia");
    var comicname = new Array("Shalanda","Macie","Shirely","Jeannine","Divina","Darryl","Alla","Crista","Ollie","Muoi","Jolene","Helga","Francoise","Josefina","Myrtis","Jo","Sixta","Laurie","Tiara","Johana","Dania","Trisha","Kerry","Remedios","Martha","Emmanuel","Caitlin","Rema","Bettye","Palma","Kristina","Lawanda","Elodia","Hank","Deonna","Scot","Dion","Arminda","Tayna","Paulita","Magnolia","Mittie","Jude","Maximina","Thaddeus","Bernardine","Lovetta","Tracey","Jewel","Amie");

    //pick name and change name according to the pic category
    var randomname = function(namearray){
        var randomnum = Math.floor(Math.random()*namearray.length);
        return namearray[randomnum];
    }

    var pickname = "";
    if(allcate[ranpicnum].toString().indexOf("science")>0){
        pickname = randomname(sciencename);
    }
    else if(allcate[ranpicnum].toString().indexOf("art")>0){
        pickname = randomname(artname);
    }
    else if(allcate[ranpicnum].toString().indexOf("comic")>0){
        pickname = randomname(comicname);
    }

    $(".shortinput").val("Visitor "+pickname);


    //buttun hover effect function

    var signup = function(){
            $('.choosebtn').css('color','#fff')
            $('.choosebtn').css('background-color','#aaa')
            $('.choosebtn').css('opacity','0.5')
            $('#signup-tab').css('color','#000')
            $('#signup-tab').css('background-color','#fff')
            $('#signup-tab').css('opacity','1.0')
            $('.lowerbox').css('display','none')
            $('#signupbox').css('display','block')
        }

    var login = function(){
            $('.choosebtn').css('color','#fff')
            $('.choosebtn').css('background-color','#aaa')
            $('.choosebtn').css('opacity','0.5')
            $('#login-tab').css('color','#000')
            $('#login-tab').css('background-color','#fff')
            $('#login-tab').css('opacity','1.0')
            $('.lowerbox').css('display','none')
            $('#loginbox').css('display','block')
        }

    var audit = function(){
            $('.choosebtn').css('color','#fff')
            $('.choosebtn').css('background-color','#aaa')
            $('.choosebtn').css('opacity','0.5')
            $('#audit-tab').css('color','#000')
            $('#audit-tab').css('background-color','#fff')
            $('#audit-tab').css('opacity','1.0')
            $('.lowerbox').css('display','none')
            $('#auditbox').css('display','block')
        }


    $('#signup-tab').hover(function(){
        signup();
    })
    $('#signup-tab').click(function(){
        signup();
    })
    $('#login-tab').hover(function(){
        login();
    })
    $('#login-tab').click(function(){
        login();
    })
    $('#audit-tab').hover(function(){
        audit();
    })
    $('#audit-tab').click(function(){
        audit();
    })
    
})

var chooseevent = function(){
    $(".randomimg").attr("src",$(this).attr("src"));
    $(".head-popout").fadeOut(400);
}
var foldheight = 80;

var main = function(){

	//dropdown menu control
	$(document).on('click',".user",function(event){
		$(".user-dropdown").show(150);
		$(document).one('click',function(){
			$(".user-dropdown").hide(100);
		});
		event.stopPropagation();
		// $(document).on('click',".user",function(event){
		// 	event.stopPropagation();
		// });
	});

	// sort dropdown control
	$(document).on('click',".ques-sorttype",function(event){
		$(".ques-sortdropdown").show(150);
		$(document).one('click',function(){
			$(".ques-sortdropdown").hide(100);
		});
		event.stopPropagation();
	});

	$(document).on('click',".sorttype-choice",function(){
		var sortchose= $(this).attr("title");
		$(".sorttype-text").html(sortchose);
	})

	//show hide control
	$(".showhidecontrol").bind("click",function () {
			$(".header").slideToggle(400);
		    $(".nav").slideToggle(400);
		    $(".ques-toolbox").slideToggle(400);
	})


	//QR Open Control
	$(".ques-lecqr").bind("click",function(){
		$(".qr-popout").fadeIn(400);
	})

	$(".qrclosebtn").bind("click",function(){
		$(".qr-popout").fadeOut(200);
	})

	var data = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27"><path d="M1 1h7v7h-7zM10 1h1v1h-1zM12 1h1v2h-1v2h-1v-1h-1v2h2v2h-1v-1h-1v2h-1v-6h2v-1h1zM17 1h1v1h-1zM19 1h7v7h-7zM2 2v5h5v-5zM14 2h1v1h-1zM16 2h1v1h-1zM20 2v5h5v-5zM3 3h3v3h-3zM13 3h1v1h1v-1h1v2h-1v1h3v4h1v1h1v-1h-1v-1h5v1h-3v1h2v1h-2v1h1v1h-1v1h1v-1h1v3h-1v-1h-1v1h1v1h1v-1h1v2h2v7h-6v-1h-1v-1h1v-1h-2v-1h-2v-1h1v-2h-1v-1h1v-1h3v-3h-1v-1h1v-1h-1v1h-2v1h-1v-1h-1v-2h2v1h1v-1h-1v-1h-2v1h-1v-2h1v-2h-1v2h-2v-1h1v-2h1v-1h-1zM17 3h1v1h-1zM21 3h3v3h-3zM16 7v1h1v-1zM1 9h1v1h-1zM3 9h5v1h-1v1h-1v-1h-3zM11 9h1v1h-1zM8 10h1v1h-1zM10 10h1v1h-1zM12 10h1v1h-1zM24 10h1v1h1v3h-1v1h1v2h-1v-1h-1v-2h-1v-1h2v-1h-1zM1 11h1v1h-1zM7 11h1v1h-1zM5 12h1v1h-1zM8 12h1v1h-1zM10 12h1v1h-1zM12 12h1v1h-1zM1 13h3v1h3v1h-1v2h-1v-1h-1v-1h-1v-1h-1v4h-1zM7 13h1v1h-1zM9 13h1v2h-2v-1h1zM11 13h1v2h-1zM13 14h2v1h2v-1h1v1h1v1h-2v1h-1v-1h-1v1h-1v1h-1v-2h1v-1h-1zM7 15h1v1h-1zM10 15h1v1h1v2h-1v-1h-1zM3 16h1v1h-1zM7 17h1v1h-1zM15 17h1v1h-1zM9 18h1v1h-1zM18 18v3h3v-3zM1 19h7v7h-7zM10 19h1v1h-1zM12 19h2v1h-1v2h-1v4h-3v-1h2v-2h-1v1h-1v-4h1v2h1v-1h1zM19 19h1v1h-1zM2 20v5h5v-5zM15 20h1v1h-1zM23 20v1h2v-1zM3 21h3v3h-3zM13 22h3v1h1v1h1v1h-2v-1h-1v1h-1v1h-1v-2h1v-1h-1zM22 22v1h-1v1h2v1h2v-2h-1v1h-1v-2zM15 25h1v1h-1z"/></svg>'
	$(".qrimg").append(data);
	$(".username").html("Wan Yilun");

	//Btn Mouseover Effect
	$(document).on('mouseover',".ques-flagbtn",function(){
		if($(this).hasClass("ques-flagbtn-clicked")==false){
		   $(this).children().attr('src','img/flagimg-empty-black.png');
	    }
	    else{
			$(this).children().attr('src','img/flagimg-red-black.png');
	    }
	})

	$(document).on('mouseout',".ques-flagbtn",function(){
		if($(this).hasClass("ques-flagbtn-clicked")==false){
		  $(this).children().attr('src','img/flagimg-empty.png');
	    }
	    else{
	      $(this).children().attr('src','img/flagimg-red.png');
	    }
	})

	//flag clicked event
	$(document).on('click',".ques-flagbtn",function(){
		if($(this).hasClass("ques-flagbtn-clicked")==false){
		   $(this).addClass("ques-flagbtn-clicked");
		   $(this).children().attr('src','img/flagimg-red-black.png');
		}
		else{
		   $(this).removeClass("ques-flagbtn-clicked");
		   $(this).children().attr('src','img/flagimg-empty-black.png');
		};
	});

		//On/Off label transition
	$(document).on('click',".ques-opencheck",function(){
		if($(this).children("#ques-opencheckInput").is(":checked") == false){
			$(this).children("#ques-opencheckInput").attr("checked",true);
			console.log("checked was true, now is " + $(this).children("#ques-opencheckInput").attr("checked"));
			$(this).css({"background-color":"#979797"});
			$(this).children("label").css({"left":"32px"});
			$(this).children(".checkOn").animate({"opacity":"0"},100);
			$(this).children(".checkOff").animate({"opacity":"100"},100);
		}
		else{
			$(this).children("#ques-opencheckInput").attr("checked",false);
			console.log("checked not true, now is " + $(this).children("#ques-opencheckInput").attr("checked"));
			$(this).css({"background-color":"#6ecf68"});
			$(this).children("label").css({"left":"2px"});
			$(this).children(".checkOn").animate({"opacity":"100"},100);
			$(this).children(".checkOff").animate({"opacity":"0"},100);
		}
	});

	//post frame control

	$(".newquest-btn").click(function(){
		$(".ask-popout").fadeIn(400);

	})

	$(".askclosebtn").click(function(){
		$(".ask-popout").fadeOut(200);
		$(".inputbox").val("");
		$('.postbtn').addClass('uni-disabled');
	    $('.postbtn').attr("disabled","disabled");
	})

	var askername = $(".username").text();
	var askerimgsrc = $(".userimg").attr("src");


	$(".askername").text(askername);
	$(".askerimg").attr("src",askerimgsrc);
	$(".askerimg-mobile").attr("src",askerimgsrc);

	// input text control
	$('.inputbox').keyup(function() {
	    var postLength = $(this).val().length;
	    var charactersLeft = 400 - postLength;
	   //   $('.counter').text(charactersLeft); 
  
	    if(charactersLeft < 0) {
	      $('.postbtn').addClass('uni-disabled'); 
	      $('.postbtn').attr("disabled","disabled");
	    }
	    else if(charactersLeft == 400) {
	      $('.postbtn').addClass('uni-disabled');
	      $('.postbtn').attr("disabled","disabled");
	    }
	    else {
	      $('.postbtn').removeClass('uni-disabled');
	      $('.postbtn').removeAttr("disabled");
	    }
    });    

// post click
	$(".postbtn").click(function(){
		console.log("postbtn clicked");
		
		var newquestioncontent= $(".questionframe").html();
		var newquestion = $("<div>").html(newquestioncontent);
		newquestion.addClass("questionframe");
		$(".questionlist").append(newquestion);

		console.log(askername);

		//customize question frame
		var asktext = $(".inputbox").val();
		$(".questionframe").last().find(".ques-userimg").attr("src",askerimgsrc);
		$(".questionframe").last().find(".questiontext").text(asktext).prepend('<span class="ques-username">Host: </span>');
		$(".questionframe").last().find(".ques-username").text(askername+": ");
		$(".questionframe").last().find(".votenum").text("0");


	    //clear input box
		$(".inputbox").val("");
		$('.postbtn').addClass('uni-disabled');
	    $('.postbtn').attr("disabled","disabled");

	    $(document.body).animate({scrollTop:$(".questionframe").last().offset().top}, 600 );
		$(".ask-popout").fadeOut(200);

	})

	$(document).on('click', ".votebtn",voteevent);
	$(document).on('click', ".questiontext",unfoldevent);
	//question unfold control
	


};

// vote event control

var voteevent = function(){
		$(this).toggleClass("uni-greenpressed")

		if ($(this).text() === "Vote"){
		   $(this).text("Undo");
		   var addcount =parseInt($(this).prev().text())+1;
		   $(this).prev().text(addcount.toString());
		}
		else{
		   $(this).text("Vote");
		   var cutcount =parseInt($(this).prev().text())-1;
		   $(this).prev().text(cutcount.toString());
		};
}

// fold unfold function
var unfoldevent= function(){
	foldheight = $(".questiontext").innerHeight();

	console.log("the foldheight is "+foldheight);
	console.log($(this));
	console.log("foldheight is "+foldheight);
	console.log("offsetHeight is "+this.offsetHeight);
	console.log("scrollHeight is "+this.scrollHeight);


	if(this.offsetHeight > foldheight){
	    console.log("fold");
		$(this).innerHeight(foldheight);
	}	

	else if(this.scrollHeight > foldheight){
		console.log("unfold");
		$(this).innerHeight(this.scrollHeight);
	}

}


$(document).ready(main);
var main = function(){

	//dropdown menu control
	$(document).on('click',".user",function(){
		console.log("user clicked");
		$(".user-dropdown").slideToggle(200);
	});

	//show hide control
	$(".showhidecontrol").bind("click",function () {
			$(".header").slideToggle(400);
		    $(".nav").slideToggle(400);
		    $(".lec-toolbox").slideToggle(400);
	})


	//QR Open Control
	$(".lec-lecqr").bind("click",function(){
		$(".qr-popout").fadeIn(400);
	})

	$(".qrclosebtn").bind("click",function(){
		$(".qr-popout").fadeOut(200);
	})

	//Btn Mouseover Effect
	$(document).on('mouseover',".lec-editbtn",function(){
		$(this).children().attr('src','img/editimg3-black.png');
	})

	$(document).on('mouseout',".lec-editbtn",function(){
		$(this).children().attr('src','img/editimg3.png');
	})

	$(document).on('mouseover',".lec-deletebtn",function(){
		$(this).children().attr('src','img/deleteimg-black.png');
	})

	$(document).on('mouseout',".lec-deletebtn",function(){
		$(this).children().attr('src','img/deleteimg.png');
	})

	$(document).on('mouseover',".lec-starbtn",function(){
		if($(this).hasClass("lec-starbtn-clicked")==false){
		   $(this).children().attr('src','img/starimg-empty-black.png');
	    }
	    else{
			$(this).children().attr('src','img/starimg-yellow-black.png');
	    }
	})

	$(document).on('mouseout',".lec-starbtn",function(){
		if($(this).hasClass("lec-starbtn-clicked")==false){
		  $(this).children().attr('src','img/starimg-empty.png');
	    }
	    else{
	      $(this).children().attr('src','img/starimg-yellow.png');
	    }
	})


	//star clicked event
	$(document).on('click',".lec-starbtn",function(){
		if($(this).hasClass("lec-starbtn-clicked")==false){
		   $(this).addClass("lec-starbtn-clicked");
		   $(this).children().attr('src','img/starimg-yellow-black.png');
		}
		else{
		   $(this).removeClass("lec-starbtn-clicked");
		   $(this).children().attr('src','img/starimg-empty-black.png');
		};
	});


	//On/Off label transition
	$(document).on('click',".lec-opencheck",function(){
		if($(this).children("#lec-opencheckInput").is(":checked") == false){
			$(this).children("#lec-opencheckInput").attr("checked",true);
			console.log("check=true");
			$(this).css({"background-color":"#979797"});
			$(this).children("label").css({"left":"32px"});
			$(this).children(".checkOn").animate({"opacity":"0"},100)
			$(this).children(".checkOff").animate({"opacity":"100"},100)
		}
		else{
			$(this).children("#lec-opencheckInput").attr("checked",false);
			$(this).css({"background-color":"#6ecf68"});
			$(this).children("label").css({"left":"2px"});
			$(this).children(".checkOn").animate({"opacity":"100"},100)
			$(this).children(".checkOff").animate({"opacity":"0"},100)
		}
	});



	// delete lecture btn click
	$(document).on('click',".lec-deletebtn",function(e){

		if($("body").children(".bubblecontainer").is(".bubblecontainer")==false){	
			console.log("bubble=false");
			var newbubble = $("#defaultbubble").clone().removeAttr("id");
			var selectlecture = $(e.target).parents(".boardcontainer");

			$("body").prepend(newbubble);
			var bubblex = $(e.target).closest(".lec-deletebtn").offset().left - 203;
			var bubbley = $(e.target).closest(".lec-deletebtn").offset().top -23;
			newbubble.css({"display":"block","opacity":"0","left":bubblex,"top":bubbley}).animate({opacity:"1","top":(bubbley-20)},200);
			
			//bind delete-confirm event
			newbubble.find(".delete-confirm").bind('click',function(){
			 	console.log("delete confirmed");
			    selectlecture.children().andSelf().animate({minHeight:"0",height:"0",opacity:"0"},function(){
			 		$(this).remove();
			 	})		
				
			 });
 
			//bind one-time fullscreen fadeout event to clear the btnwithbubble
			$(document).one('click', function(e){
				newbubble.animate({"top":bubbley,opacity:"0"},100,function(){
				$(this).remove();
				console.log("bubble removed");
				});
			});	
	    }
	})


	// common Close btn click
	$(".newlecclosebtn").click(function(){
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
  
	    if(namecharactersLeft < 0 || descripcharactersLeft < 0) {
	      $('.confirmbtn').addClass('uni-disabled'); 
	      $('.confirmbtn').attr("disabled","disabled");
	    }
	    else if(namecharactersLeft == 100 || descripcharactersLeft == 300) {
	      $('.confirmbtn').addClass('uni-disabled');
	      $('.confirmbtn').attr("disabled","disabled");
	    }
	    else {
	      $('.confirmbtn').removeClass('uni-disabled');
	      $('.confirmbtn').removeAttr("disabled");
	    }
    }; 

	$('.newlecname').keyup(characterleftcheck);
	$('.newlecdescrip').keyup(characterleftcheck);


     //Lecture edit control
    $(document).on('click',".lec-editbtn",function(){
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
	$(document).on('click',".editlec-confirm",function(){
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
	$(document).on('click',".newboard-btn",function(){
		$(".lec-popout").fadeIn(400);
		//add confirm type
		$(".confirmbtn").addClass("newlec-confirm")
		//set up default text
		$('.newlecname').val("Lecture "+($('.lec-board').children().size()+1)+" - New Lecture");
		$('.newlecdescrip').val("Description: This is a new lecture");
		console.log("newboard-btn clicked");
	})

	// newlec confirm click
	$(document).on('click',".newlec-confirm",function(){
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
	    $(document.body).animate({scrollTop:$(".lec-board").children(".boardcontainer").last().offset().top}, 600 );
		$(".lec-popout").fadeOut(200);
	})

};




$(document).ready(main);
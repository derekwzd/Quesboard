var foldheight = 80;

var main = function(){

	//show hide control
	$(".showhidecontrol").bind("click",function () {
			$(".header").slideToggle(400);
		    $(".nav").slideToggle(400);
	})


	//QR Open Control
	$(".lec-qr").bind("click",function(){
		$(".qr-popout").fadeIn(400);
	})

	$(".qrclosebtn").bind("click",function(){
		$(".qr-popout").fadeOut(200);
	})

	//Section Mouseover Effect
	$(document).on('mouseover',".sec-editbtn",function(){
		$(this).children().attr('src','img/editimg3-black.png');
	})

	$(document).on('mouseout',".sec-editbtn",function(){
		$(this).children().attr('src','img/editimg3.png');
	})

	$(document).on('mouseover',".sec-deletebtn",function(){
		$(this).children().attr('src','img/deleteimg-black.png');
	})

	$(document).on('mouseout',".sec-deletebtn",function(){
		$(this).children().attr('src','img/deleteimg.png');
	})



	// delete section btn click
	$(document).on('click',".sec-deletebtn",function(){
		//if($(this).children(".bubblecontainer").css("display")=="none"){
		if($(this).children(".bubblecontainer").is(".bubblecontainer")==false){	
			console.log("false");
			$(this).prepend($(".bubblecontainer").clone());
			$(this).children(".bubblecontainer").fadeIn(100);

			//bind delete-confirm event
			$(this).find(".delete-confirm").bind('click',function(){
				console.log("delete confirmed");
				$(this).parents(".sectionframe").remove();
			});

			//all screen fadeout event
			var bubblefade = function(){		
				$(".bubblecontainer").fadeOut(100);
				console.log("fadeOut by func")
				$(".sec-deletebtn").children(".bubblecontainer").remove();
			}
			$("body").one('click', bubblefade);//bind one-time event to all element
			//$(".bubblecontainer").unbind(); //avoid bug when clicking same btn
	    }

	    else{
		    $(this).children(".bubblecontainer").remove();
		    console.log("fadeout by else")
	    }
		
		

	})

	// $(document).on('click',".delete-confirm",function(){
	// 	console.log("delete confirmed");
	// 	console.log($(this).parents(".sectionframe"));
	// 	$(this).parents(".sectionframe").remove();
	// })



	// common Close btn click
	$(".newsecclosebtn").click(function(){
		$(".sec-popout").fadeOut(200);
		$(".inputbox").val("");
		$(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

	    //remove editing-class (if possible)
		$(".editing-secname").removeClass("editing-secname");

	})


	// common input text length control(using common comfirm class)
	$('.inputbox').keyup(function() {
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
		console.log($(this).siblings(".sectionname"));
		$(this).siblings(".sectionname").addClass("editing-secname");
		$('.inputbox').val($(".editing-secname").text());
		console.log("sec-editbtn clicked");
	})

	// Section edit confirmbtn click
	$(document).on('click',".editsec-confirm",function(){
		console.log("editsec-confirm clicked");

		//customize section frame
		var sectext = $(".inputbox").val();
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
		$('.inputbox').val("Section "+($('.sectionframe').length+1)+". Q&A Section");
		console.log("newsec-btn clicked");
	})

	// newsec confirm click
	$(document).on('click',".newsec-confirm",function(){
		console.log("newsec-confirm clicked");
		
		var newseccontent= $(".sectionframe").html();
		var newsec = $("<div>").html(newseccontent);
		newsec.addClass("sectionframe");
		$(".sectionlist").append(newsec);


		//customize section frame
		var sectext = $(".inputbox").val();
		$(".sectionframe").last().find(".sectionname").text(sectext);

	    //clear newsec-confirm class
	    $(".confirmbtn").removeClass("newsec-confirm editsec-confirm");

	    //scroll to the new section part
	    $(document.body).animate({scrollTop:$(".sectionframe").last().offset().top}, 600 );
		$(".sec-popout").fadeOut(200);
	})

};





// opensec event control



$(document).ready(main);
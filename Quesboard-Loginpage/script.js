$(document).ready(function(){

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
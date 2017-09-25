(function($){
    $.fn.scrollingTo = function( opts ) {
        var defaults = {
            animationTime : 1000,
            easing : '',
            callbackBeforeTransition : function(){},
            callbackAfterTransition : function(){}
        };

        var config = $.extend( {}, defaults, opts );

        $(this).click(function(e){
            var eventVal = e;
            e.preventDefault();

            var $section = $(document).find( $(this).data('section') );
            if ( $section.length < 1 ) {
                return false;
            };

            if ( $('html, body').is(':animated') ) {
                $('html, body').stop( true, true );
            };

            var scrollPos = $section.offset().top;

            if ( $(window).scrollTop() == scrollPos ) {
                return false;
            };

            config.callbackBeforeTransition(eventVal, $section);

            $('html, body').animate({
                'scrollTop' : (scrollPos+'px' )
            }, config.animationTime, config.easing, function(){
                config.callbackAfterTransition(eventVal, $section);
            });
        });
    };
}(jQuery));



jQuery(document).ready(function(){
    "use strict";
    new WOW().init();


(function(){
 jQuery('.smooth-scroll').scrollingTo();
}());

});




$(document).ready(function(){

    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $(".navbar-brand a").css("color","#fff");
            $("#top-bar").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color","inherit");
            $("#top-bar").addClass("animated-header");
        }
    });


});



// fancybox
$(".fancybox").fancybox({
    padding: 0,

    openEffect : 'elastic',
    openSpeed  : 450,

    closeEffect : 'elastic',
    closeSpeed  : 350,

    closeClick : true,
    helpers : {
        title : { 
            type: 'inside' 
        },
        overlay : {
            css : {
                'background' : 'rgba(0,0,0,0.8)'
            }
        }
    }
});

$(document).ready(function () {
    $('.main-menu').click( function() { alert('sdf')  } ) 
    navigateDiv('#topClick','#hero-area');
    navigateDiv('#aboutClick','#about');
    navigateDiv('#worksClick','#works');
    navigateDiv('#teamClick','#team');
    navigateDiv('#callActionClick','#call-to-action');
    navigateDiv('#featureClick','#feature');

});

function navigateDiv(clickDiv,targetDiv) {
    $(clickDiv).on("click",function(e){
        var posTop = $(targetDiv).offset().top; //Get the position of the element you want to scroll to
        e.preventDefault();
        e.stopPropagation();
        //$('html, body').scrollTop(posTop); //Scroll to that position
        $('html,body').animate({scrollTop: posTop},'slow');

    });
}

function snackbar() {
    $('#snackbar').addClass('show');
}

$(document).ready(function () {
    $('#contact-submit').click(function() { 
        name = $('#name').val().trim();
        message = $('#message').val().trim();

        if(name != '' && message != '') {
            $.ajax({
                url: "http://kingstoneducation.net/inv.php",
                data: {'name' : name, 'message' : message},
                dataType : 'json',
                success: function(result){

                    if(result.status == true) {
                        $('#couroselItems').data('owlCarousel').addItem('<div class="item"><div class="itemContent"><p class="wishesTitle">'+name+'</p><p class="wishesDesc">'+message+'</p></div></div>', 0);
                        $('#snackbar').html(result.message+'..<span class="closeSpan">x</span>').css('background','green');
                    } else {
                        $('#snackbar').html(result.message+'..<span class="closeSpan">x</span>').css('background','red');
                    }
                    snackbar();
                },
                error: function() {
                    $('#snackbar').html('Something went wrong..Try again after refreshing the page..<span class="closeSpan">x</span>').css('background','red');
                    snackbar();
                }
            });
            
        } else {
            $('#snackbar').html('Please enter your name and wishes..<span class="closeSpan">x</span>').css('background','red');
            snackbar();
        }

    });

    $(document).on('click','.closeSpan',function(){
        $('#snackbar').removeClass('show');
    })



    $.ajax({
        url: "http://kingstoneducation.net/invGet.php",
        dataType : 'json',
        success: function(result){
            items = "";
            if(result.status == true) {
                $(result.data).each(function(i, value){
                        items += '<div class="item"><div class="itemContent"><p class="wishesTitle">'+value[0]+'</p><p class="wishesDesc">'+value[1]+'</p></div></div>';
                });
                $('#couroselItems').html(items);

                $('.owl-carousel').owlCarousel({
                    loop:true,
                    margin:10,
                    items : 1,
                    loop : true,
                    autoPlay : 4000, 
                    pagination: false,
                    navigation:true,
                    navigationText: [
                       "<i class='glyphicon glyphicon-chevron-left'></i>",
                       "<i class='glyphicon glyphicon-chevron-right'></i>"
                    ],
                    stopOnHover : true
                });
                
            } else {
                
            }
        },
        error: function() {

        }
    });
});


$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('#back-to-top').tooltip('show');


// Set the date we're counting down to
var countDownDate = new Date("Sep 29, 2017 16:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
   /* document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";*/
    $('#days').html('0'+days);
    $('#hours').html(hours);
    $('#minutes').html(minutes);
    $('#seconds').html(seconds);
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Wish you a happy married life :)";
    }
}, 1000);

});


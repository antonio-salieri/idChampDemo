(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })
    
    
      $('.section-brivo.section-hero').css('background-image', 'url(<?php echo $image[0]; ?>)');
  $('.section-brivo.section-hero').addClass('img-cover');
  $('.section-brivo.section-hero').removeClass('no-background-img');
  
  	// CONTACT PAGE FLYOUT
	
	$('li.menu-contact a').on('click', function(){
		$('.contact-flyout').slideToggle();
		$('li.menu-contact a').toggleClass('flyout-active');
		return false;
    });
	$('.contact-flyout a.close').on('click', function(){
		$('.contact-flyout').slideToggle();
		$('li.menu-contact a').toggleClass('flyout-active');
		return false;
    });
    $('#contact-type').change(function () {
        var val = $(this).val();
        
         if (val === 'default') {
          $('.showform-0').addClass('shown');
          $('.showform-1').removeClass('shown');
          $('.showform-2').removeClass('shown');
          $('.showform-3').removeClass('shown');
        }
         if (val === 'solution') {
          $('.showform-0').removeClass('shown');
          $('.showform-1').addClass('shown');
          $('.showform-2').removeClass('shown');
          $('.showform-3').removeClass('shown');
        }
        else if (val === 'dealer') {
          $('.showform-0').removeClass('shown');
          $('.showform-1').removeClass('shown');
          $('.showform-2').addClass('shown');
          $('.showform-3').removeClass('shown');
          }
        else if (val === 'care') {
          $('.showform-0').removeClass('shown');
          $('.showform-1').removeClass('shown');
          $('.showform-2').removeClass('shown');
          $('.showform-3').addClass('shown');
          }
    });
    
    //Main Nav Scroll Change
    var header = $(".scrolled-top");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 10) {
            header.removeClass('scrolled-top').addClass("scrolled-down");
        } else {
            header.removeClass("scrolled-down").addClass('scrolled-top');
        }
    });	
    
    // Career Filter
    
     
    
    
     $( ".careers-filter select" ).change(function() {
         var selectValue = $(this).val();
         if(selectValue !== ''){
        $('.loading-overlay').fadeIn(300, function(){
               $('.job-row').removeClass('search-hide');
               $('.careers-listing .search-none').empty();
               $( ".job-row" ).not( document.getElementsByClassName( selectValue ) ).addClass('search-hide'); 
               if (!$(".job-row").not(".search-hide").length) {
                    $('.careers-listing .search-none').text('No positions available');
                }
               $('.loading-overlay').fadeOut(300);
           });
         } else{
             $('.loading-overlay').fadeIn(300, function(){
               $('.job-row').removeClass('search-hide');
               $('.loading-overlay').fadeOut(300);
             });
         }
         if($(this).hasClass('filter-dept')){
             $('.filter-loc').val('');
         } else if($(this).hasClass('filter-loc')){
             $('.filter-dept').val('');
         }
    });

    // Integrations: Search - MM

   $( '.search-select' ).change(function( ev ) {
        var selectValue = $(this).val();
        var selectTitle = $(this).find("option:selected").text();
        if(selectValue != 'null'){
            $( "#search-results" ).empty();
            $( "#search-results" ).append('<div class="integrations-loading"></div>');
            ev.preventDefault();
            $.post(
                "/wp-admin/admin-ajax.php",
                {
                    action: "thirdparty_select",
                    search_select: selectValue,
                    search_title: selectTitle,
                },
                function ( response ) {
                    $( "#search-results" ).empty();
                    $(response).hide().appendTo("#search-results").fadeIn(300);
                    $('[data-toggle="popover"]').popover({ 
                          html : true, 
                          content: function() {
                            return $(this).next().html();
                          }
                    });
                    
                }
            );
        }else{$( "#search-results" ).empty();}
    });
    
    $( "#search-all" ).on( "submit", function ( ev ) {
        if($("#search-all .search-all").val() != ''){
            $( "#search-results" ).empty();
            $( "#search-results" ).append('<div class="integrations-loading"></div>');
            ev.preventDefault();
            $.post(
                "/wp-admin/admin-ajax.php",
                {
                    action: "thirdparty_search",
                    search: $( "#s" ).val()
                },
                function ( response ) {
                    $( "#search-results" ).empty();
                    $(response).hide().appendTo("#search-results").fadeIn(300);
                    $('[data-toggle="popover"]').popover({ 
                          html : true, 
                          content: function() {
                            return $(this).next().html();
                          }
                    });
                }
            );
        }else{return false;}
    });
        
    // FAQ: Search - MM
    
    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
    });
    
     $( "#faq #brivo-search" ).on( "submit", function(ev){
         ev.preventDefault();
         var searchVal = $('#brivo-search input[type="text"]').val();
         if(searchVal != ''){
        $('.loading-overlay').fadeIn(300, function(){
               $('#faq .question-outer').removeClass('search-hide');
               $('#faq .question-outer:not(:contains(' + searchVal + '))').addClass('search-hide'); 
               $('.loading-overlay').fadeOut(300);
           });
         } else if(searchVal === ''){
        $('.loading-overlay').fadeIn(300, function(){
               $('#faq .question-outer').removeClass('search-hide');
               $('.loading-overlay').fadeOut(300);
           });
         }
    });
    
    // GENERAL SEARCH

    $( "#brivo-search" ).on( "submit", function ( ev ) {
        if($("#brivo-search .brivo-input").val() != ''){
            ev.preventDefault();
            $('.content-results').fadeOut(300, function() {
               $(this).empty().append('<div class="integrations-loading"></div>').fadeIn(300);
            });
            $.post(
                "/wp-admin/admin-ajax.php",
                {
                    action: "brivo_search",
                    search: $( "#s" ).val(),
                    posttype: $( "#brivo-search .brivo-input" ).attr('data-type')
                },
                function ( response ) {
                    $('.content-results').fadeOut(300, function() {
                       $(this).empty().append(response).fadeIn(300);
                    });
                }
            );
        }else{return false;}
    });

    // LOAD MORE
    
    var ppp = 6; // Post per page
    var pageNumber = 1;
    
    function load_posts(pt,sl){
        pageNumber++;
        var str = '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&posttype=' + pt + '&secondload=' + sl + '&action=brivo_load_more';
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "/wp-admin/admin-ajax.php",
            data: str,
            success: function(data){
                var $data = $(data);
                if($data.length){
                    $($data).hide().appendTo("#more").fadeIn(300);
                    $(".load-more").text('Load More').attr("disabled",false).removeClass('load-more-loading').attr('data-status','secondload');
                } else{
                    $("#more").append('<div class="load-more-none col-md-12">That\'s all folks!</div>');
                    $(".load-more").remove();
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }
    
        });
        return false;
    }
    $(".load-more").click(function(){ // When btn is pressed.
        $(this).addClass('load-more-loading');
        $(".load-more").empty().attr("disabled",true); // Disable the button, temp.
        var posttype = $(this).attr('id');
        var secondload = $(this).attr('data-status');if(secondload === ''){secondload = 'no';}
        load_posts(posttype,secondload);
    });

    // CATEGORIES
    
    $('.cat-link').click(function(ev){
        var linkText = $(this).text();
        var linkClass = $(this).attr('class').split('cat-link ');
        var postType = linkClass[1];
        var theCat = $(this).attr('id');
        ev.preventDefault();
        $('.content-results').fadeOut(300, function() {
            $(this).empty().append('<div class="integrations-loading"></div>').fadeIn(300);
        });
        $.post(
            "/wp-admin/admin-ajax.php",
            {
                action: "brivo_cat",
                search: $( "#s" ).val(),
                linktext: linkText,
                posttype: postType,
                cat: theCat
            },
            function ( response ) {
                $('.content-results').fadeOut(300, function() {
                    $('#more').fadeOut(300);
                    $(this).empty().append(response).fadeIn(300);
                });
            }
        );


    });
    
    //CARD CALCULATOR
    
                $('#calculateButton').click(function() {
                    cardCalculate();
                });
                $('#resetButton').click(function() {
                    cardReset();
                });

			function cardCalculate() {
                var bits = parseInt($('#bitLengthValue').val(), 10);
                var hex = $('#hexValue').val();
                var hexPattern = /^[0-9A-Fa-f]*$/;
                if (!hexPattern.test(hex)) {
                    var en = "Please enter the hexadecimal value exactly as it appears. " + "Allowed characters: 0-9 and A-F/a-f. No spaces.";
                    var fr = "Saisissez la valeur hexadecimal telle qu'elle apparait. " + "Caracteres permis: 0-9 et A-F/a-f. Pas d'espaces.";
                    alert(en);
                    return false;
                }
                while (hex.length < 16) {
                    hex = "0" + hex;
                }
                var firsthalfhex = hex.substr(0, 8);
                var secondhalfhex = hex.substr(8, 8);
                var firsthalfbinary = parseInt(firsthalfhex, 16).toString(2);
                var secondhalfbinary = parseInt(secondhalfhex, 16).toString(2);
                while (firsthalfbinary.length < 32) {
                    firsthalfbinary = "0" + firsthalfbinary;
                }
                while (secondhalfbinary.length < 32) {
                    secondhalfbinary = "0" + secondhalfbinary;
                }
                var combinedbinary = firsthalfbinary + secondhalfbinary;
                var proplengthbinary = combinedbinary.substring(64 - bits);
                document.getElementById("bitPattern").innerHTML = proplengthbinary;
                var f1, f2, f3;
                switch (bits) {
                    case 26:
                        f1 = "Standard 26 Bit";
                        f2 = toDecimal(proplengthbinary.substr(9, 16));
                        f3 = toDecimal(proplengthbinary.substr(1, 8));
                        cardPopulate(f1, f2, f3);
                        break;
                    case 33:
                        f1 = "Generic 33 Bit";
                        f2 = toDecimal(proplengthbinary.substr(8, 24));
                        f3 = toDecimal(proplengthbinary.substr(1, 7));
                        cardPopulate(f1, f2, f3);
                        break;
                    case 34:
                        var str = proplengthbinary.substr(17).match(/1/g).length;
                        var parity = str % 2 === 0 ? "EVEN" : "ODD";
                        f1 = "Generic 34 Bit " + parity + " Parity";
                        f2 = toDecimal(proplengthbinary.substr(17, 16));
                        f3 = toDecimal(proplengthbinary.substr(1, 16));
                        cardPopulate(f1, f2, f3);
                        break;
                    case 35:
                        f1 = "HID Corporate 1000";
                        f2 = toDecimal(proplengthbinary.substr(14, 20));
                        f3 = toDecimal(proplengthbinary.substr(2, 12));
                        cardPopulate(f1, f2, f3);
                        break;
                    case 37:
                        f1 = "HID 37 Bit (or HID 37 Bit with Facility Code)";
                        f2 = toDecimal(proplengthbinary.substr(1, 35)) + " (" + toDecimal(proplengthbinary.substring(17, 19)) + ")";
                        f3 = "None (" + toDecimal(proplengthbinary.substr(1, 16)) + ")";
                        cardPopulate(f1, f2, f3);
                        break;
                    case 40:
                        var x1 = toDecimal(proplengthbinary.substr(1, 19)).toString();
                        var x2 = toDecimal(proplengthbinary.substr(20, 19)).toString();
                        while (x1.length < 6) {
                            x1 = "0" + x1;
                        }
                        while (x2.length < 6) {
                            x2 = "0" + x2;
                        }
                        f1 = "Casi-Rusco 40 Bit";
                        f2 = x1 + x2;
                        f3 = "None";
                        
                        cardPopulate(f1, f2, f3);
                        break;
                }
                return false;
            }
            function cardPopulate(cardFormat, cardNumber, facilityCode) {
                $('#cardFormat').text(cardFormat);
                $("#cardNumber").text(cardNumber.toString());
                $("#facilityCode").text(facilityCode.toString());
            }
            function toDecimal(binary) {
                var d = 0;
                var j = -1;
                var i;
                for (i = binary.length; i >= 0; i--) {
                    d += binary.substr(i, 1) * Math.pow(2, j++);
                }
                return d;
            }
            function cardTrim(field) {
                var str = field.value;
                field.value = str.replace(/^\s+/, "").replace(/\s+$/, "");
                alert('cardtrim');
            }
            function cardReset() {
                $('#bitPattern').text('').append('&nbsp;');
                $('#cardFormat').text('').append('&nbsp;');
                $('#cardNumber').text('').append('&nbsp;');
                $('#facilityCode').text('').append('&nbsp;');
            }

    

})(jQuery); // End of use strict




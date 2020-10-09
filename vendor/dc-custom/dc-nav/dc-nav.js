(function($){
    
$.fn.dcFixedNav = function(options){ 
    options = $.extend({
        fixedMenu: false,
        minScroll:300,
        minScreen: 768
    }, options);

    var $this = this;
    var walkMstart =true;
    var walkingMenu='';
    var fxdNav = '#dc-fixed-nav'

    if(!$this.hasClass('dc-nav-trans')){
        $('<div id="dc-fixed-nav"></div>').prependTo('body')
        $($this).clone().removeAttr("id").appendTo('#dc-fixed-nav')
    }
    
    var fxheight=$('#dc-fixed-nav').outerHeight();
    
    var dc_mb_menu = $('.dc-mb-icon-box');
    var dc_nav = $('.dc-nav-ul');
    var dc_dropdown_menu_item = $('.dc-nav-ul li');


    // checking for submenu and appending dropdown box
    dc_dropdown_menu_item.each(function(){
        if($(this).children('ul').length > 0 || $(this).children('.dc-mg-container').length > 0)
        {
            $(this).prepend('<span class="dc-dd-box"><i class="fa fa-angle-down"></i></span>');
        }
        var togmenu = '.dc-dd-box';
        $(this).children(togmenu).on('click', function(){
                $(this).siblings('ul').slideToggle();
                $(this).siblings('.dc-mg-container').slideToggle();
        })
    })

    //mobile menu click event
    dc_mb_menu.each(function(){
        $(this).on('click',function(e){
            e.preventDefault();
            $(this).parent('.dc-mb-menu').siblings('.dc-nav-ul').slideToggle();
        });
    })

    $(window).on('resize', function(){
        dc_nav.css('display', '');
        $('.dc-nav-ul ul').css('display', '');
        $('.dc-mg-container').css('display', '');
    })
    
    
    var navTop = $this.offset().top
    var navHeight =$this.outerHeight()
    var totTop = navTop + navHeight + options.minScroll
    
    $(fxdNav).css({
        visibility:'hidden',
        opacity:0,
        'z-index':-999
    });
    $(fxdNav).children('nav').removeClass('dc-nav-toggle-full').removeClass('dc-nav-trans').removeClass('dc-nav-middle')
    if(options.fixedMenu==true){

        checkPos();
        $(window).on('scroll', function(){
            navTop = $this.offset().top
            navHeight =$this.outerHeight()
            totTop = navTop + navHeight + options.minScroll
            checkPos();
        })
    }
    
    $(window).on('resize', function(){
        if(options.fixedMenu == true && $(window).outerWidth() >= options.minScreen && $(window).scrollTop() >= $('#dc-fixed-nav').outerHeight()){
            fxheight=$('#dc-fixed-nav').outerHeight();
        }
        else{
            fxheight=0;
        }
        if($(window).outerWidth()<options.minScreen){
            $(fxdNav).css({
                visibility:'hidden',
                opacity:0,
                'z-index':-999
            });
        }
    })
    function checkPos(){
        if($(window).scrollTop()>=totTop && $(window).outerWidth()>=options.minScreen){
            $(fxdNav).css({
                visibility:'visible',
                opacity:1,
                'z-index':999
            });
        }
        else{
            $(fxdNav).css({
                visibility:'hidden',
                opacity:0,
                'z-index':-999
            });
        }
    }
    $('a[href*=#]:not([href=#])').click(function() { // event on clicking any # link
       if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
            var dctarget = $(this.hash);
            dctarget = dctarget.length ? dctarget : $('[name=' + this.hash.slice(1) + ']');
            if (dctarget.length && dctarget.offset().top >= fxheight + options.minScroll && options.fixedMenu ==true && $(window).outerWidth()>= options.minScreen) {
                $('html,body').animate({
                    scrollTop: dctarget.offset().top - fxheight +1 // scroll to top
                }, 1800); // controller of animation speed
                return false;
            }
            else if(dctarget.length){
                $('html,body').animate({
                    scrollTop: dctarget.offset().top +1 // scroll to top
                }, 1800); // controller of animation speed
                return false;
            }
        }
    });
    $this.children('.dc-nav-ul').children('li').each(function(){
        var selected = $(this).children('a').eq(0).attr('href');
        if(selected.substring(0,1)=='#' && selected.length >=2){
            if(walkMstart==true){
                walkingMenu = walkingMenu + selected;
                walkMstart= false;
            }
            else{
                walkingMenu = walkingMenu + ', ' + selected;
            }
        }
    })
    walkingMenu = $(walkingMenu);
    var navWinTop= $(window).scrollTop();
    var navWinBtm = $(window).height() +navWinTop;
    walkingMenu.each(function(){
        var thisNav= $(this);
        $('.dc-nav-ul').children('li').children('a').each(function(){
            var thisLi =$(this);
            $(window).on('scroll',function(){
                navWinTop= $(window).scrollTop();
                navWinBtm = $(window).height() +navWinTop;
                if (thisNav.offset().top >= fxheight + options.minScroll && options.fixedMenu ==true && $(window).outerWidth()>= options.minScreen) {
                    if(navWinTop + fxheight >= thisNav.offset().top && navWinTop + fxheight <= thisNav.offset().top + thisNav.outerHeight()){
                            if(thisLi.attr('href')== '#'+ thisNav.attr('id')){
                                thisLi.parent().siblings('li').removeClass('dc-active');
                                thisLi.parent().addClass('dc-active');
                            }
                    }
                }
                else{
                    if(navWinTop >= thisNav.offset().top && navWinTop <= thisNav.offset().top + thisNav.outerHeight()){
                            if(thisLi.attr('href')== '#'+ thisNav.attr('id')){
                                thisLi.parent().siblings('li').removeClass('dc-active');
                                thisLi.parent().addClass('dc-active');
                            }
                    }
                }
            })
                if (thisNav.offset().top >= fxheight + options.minScroll && options.fixedMenu ==true && $(window).outerWidth()>= options.minScreen) {
                    if(navWinTop + fxheight >= thisNav.offset().top && navWinTop + fxheight <= thisNav.offset().top + thisNav.outerHeight()){
                            if(thisLi.attr('href')== '#'+ thisNav.attr('id')){
                                thisLi.parent().siblings('li').removeClass('dc-active');
                                thisLi.parent().addClass('dc-active');
                            }
                    }
                }
                else{
                    if(navWinTop >= thisNav.offset().top && navWinTop <= thisNav.offset().top + thisNav.outerHeight()){
                            if(thisLi.attr('href')== '#'+ thisNav.attr('id')){
                                thisLi.parent().siblings('li').removeClass('dc-active');
                                thisLi.parent().addClass('dc-active');
                            }
                    }
                }
        })
    })
}
})(jQuery);
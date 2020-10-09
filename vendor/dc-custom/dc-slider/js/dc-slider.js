(function($){
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
    // options
    $.fn.dcSlider = function(options){

        options = $.extend({
            interval: 9000,  // Interval between transitions
            slideshow: true, // Auto transitons
            activeslide: 1,
            height: 535,     // height of the slider
            width: 1150,      // maximum width of every slide-inner section
            button: true,
            pagignation: true,
            pagigtype : 'square',
            panaroma: false,
            prev: '<i class="fa fa-angle-left"></i>', // default previous button for slider
            next: '<i class="fa fa-angle-right"></i>', // default next button for slider
            navtype: 'transparent',
            playicon: '<i class="fa fa-play"></i>', // default play icon for slider
            pauseicon: '<i class="fa fa-pause"></i>', // default pause icon for slider
            pausecontrol:false // default pausecontrol option for slider
        }, options);
        var playIt=1;
        var dcSl = this; // Main Slider
        var ratio = 1; // ration that will be implemented on every responsive object
        var slide = dcSl.find('.dc-slide'); // all dc-slideslider
        var inner = dcSl.find('.dc-sl-inner'); // all dc-slide in single slides
        var nav = ''; // start generating nav with bullets
        var dcSlength = slide.length -1;
        var dcCurSlide = options.activeslide-1;
        var dcPause = false;
        var resizeTimer = false;
        var panarr = {}
        dcSl.find('.dc-slide').eq(dcCurSlide).addClass('dc-sl-active')
        dcSl.find('.dc-sl-active').siblings('.dc-slide').css({'z-index': '-2', 'opacity': '0'});
        dcSl.find('.dc-sl-active').css({'z-index': '1', 'opacity': '1'});
                
        $(window).on('load', function(){
            if(options.pagigtype=='round'){
                nav = '<div class="dc-sl-nav dc-sl-round-nav"><ul>';
            }
            else if(options.pagigtype=='square'){
                nav = '<div class="dc-sl-nav dc-sl-square-nav"><ul>';
            }
            else{
                nav = '<div class="dc-sl-nav"><ul>';
            }
            dcSl.find('.dc-slide').each(function(){
                var $thisone = $(this)
                $thisone.find('*').each(function(){
                    if($(this).attr('data-itemType')=='panaroma'){
                        var name = 'slideNo' + $thisone.index() + $(this).index()
                        panarr[name] = 0
                    }
                })
            })
            // calling calcAuto function
            calcAuto();

            if(options.button==true){
                var navtype1 = ''
                var navtype2 = ''
                if(options.navtype=='round'){
                    navtype1 = '<div class="dc-slprev dc-sl-round-nav">'
                    navtype2 = '<div class="dc-slnext dc-sl-round-nav">'
                }
                else if(options.navtype=='transparent'){
                    navtype1 = '<div class="dc-slprev dc-sl-transparent-nav">'
                    navtype2 = '<div class="dc-slnext dc-sl-transparent-nav">'
                }
                else{
                    navtype1 = '<div class="dc-slprev">'
                    navtype2 = '<div class="dc-slnext">'
                }
                dcSl.append(navtype1 + options.prev + '</div>' + navtype2 + options.next + '</div>'); // add next and previous button inside slider
            }
            if(options.pagignation==true){
                for(var i = 0; i < slide.length; i++) {//generate bullets for nav
                    if(i==dcCurSlide){
                        nav = nav + '<li class="dc-sel-nav"></li>';
                    }
                    else{
                        nav = nav + '<li></li>';
                    }
                }
                nav = nav + '</ul></div>'; // end generating nav with bullets
                dcSl.append(nav); // add nav with bullets inside slider
            }
            if(options.pausecontrol==true){
                dcSl.append('<div class="dc-slider-pause">' + options.pauseicon + '</div>'); // add next and previous button inside slider
            }
            if(options.panaroma == true){
                inner.css({
                    'width' : '100%' //set width for panaromic dc-sl-inner
                });
            }
            else{
                inner.css({
                    'max-width' : options.width + 'px' //set max width for dc-sl-inner
                });
            }
            changeHeight();
            elmSize();
            background();
            elmAnimation();

            if(options.slideshow) {
                setTimeout(autoTransition, options.interval);
            }

            $(window).on('resize', function(){
                if (resizeTimer !== false) {
                    clearTimeout(resizeTimer);
                }
                timer = setTimeout(function() {
                    changeHeight(); // change height on screen size change
                    elmSize();      // change slide element size on screen size change
                }, 50);
            });
            dcSl.find('.dc-sl-nav ul').on('click touchstart', 'li', function(e) {
                var dcInd = dcSl.find('.dc-sl-nav ul li').index(this);
                transition(dcInd);
                dcPause = true;
            });
            //Play Pause Starts
            dcSl.find('.dc-slider-pause').on('click', function() {
                if(playIt==0){
                    playIt=1;
                    if(dcCurSlide == dcSlength) {
                        transition(0);
                    } else {
                        transition(dcCurSlide + 1);
                    }
                    dcPause = true;
                    setTimeout(autoTransition, options.interval);
                    dcSl.find('.dc-slider-pause').empty().append(options.pauseicon);
                }
                else{
                    playIt=0;
                    dcSl.find('.dc-slider-pause').empty().append(options.playicon);
                }
            });
            // playpause ends
            dcSl.find('.dc-slprev').on('click touchstart', function(e) {
                if(dcCurSlide == 0) {
                    transition(dcSlength);
                } else {
                    transition(dcCurSlide - 1);
                }
                dcPause = true;
            });
            dcSl.find('.dc-slnext').on('click touchstart', function(e) {
                if(dcCurSlide == dcSlength) {
                    transition(0);
                } else {
                    transition(dcCurSlide + 1);
                }
                dcPause = true;
            });

            //mobile
            dcSl.on('swipeleft', function(){
                if(dcCurSlide == dcSlength) {
                    transition(0);
                } else {
                    transition(dcCurSlide + 1);
                }
                dcPause = true;
            });
            dcSl.on('swiperight', function(){
                if(dcCurSlide == 0) {
                    transition(dcSlength);
                } else {
                    transition(dcCurSlide - 1);
                }
                dcPause = true;
            });
            function changeHeight(){        // Calculate the height of the current slider    
                if($(window).outerWidth() < options.width && options.panaroma==false){
                    ratio = slide.outerWidth() /  options.width;
                    ratio = ratio.toFixed(2)
                }
                else if(options.panaroma==true){
                    ratio = slide.outerWidth() /  options.width;
                }
                else{
                   ratio=1;
                }
                dcSl.css({
                    'height' : options.height * ratio + 'px'
                })
            }

            function background(){
                slide.each(function(){
                    $(this).css({
                        'background-image' : "url('" + $(this).attr('data-bg') + "')"
                    })
                    if($(this).attr('data-repeat')=='x'){
                        $(this).css({
                            'background-size': 'auto 100%',
                            'background-position': 'left top',
                            'background-repeat' : 'repeat-x'
                        })
                    }
                    else if($(this).attr('data-repeat')=='y'){
                        $(this).css({
                            'background-size': '100% auto',
                            'background-position': 'left top',
                            'background-repeat' : 'repeat-y'
                        })
                    }
                    else if($(this).attr('data-repeat')=='both'){
                        $(this).css({
                            'background-repeat' : 'repeat'
                        })
                    }
                    else if($(this).attr('data-repeat')=='fxcover'){
                        $(this).css({
                            'background-size' : 'cover', 
                            'background-attachment' : 'fixed',
                            'background-position' : 'center center'
                        })
                    }
                    else if($(this).attr('data-repeat')=='repcover'){
                        $(this).css({
                            'background-repeat' : 'repeat',
                            'background-attachment' : 'fixed',
                            'background-position' : 'center center'
                        })
                    }
                    else if($(this).attr('data-repeat')=='stretch'){
                        $(this).css({
                            'background-size' : '100% 100%'
                        })
                    }
                    else{
                        $(this).css({
                            'background-size' : 'cover', 
                            'background-position' : 'center center'
                        })
                    }
                    $(this).css({
                        'background-color' : $(this).attr('data-bgcolor')
                    })
                })
            }

            function elmSize(){           // Calculate the height of all slide elements 
                dcSl.find('.dc-sl-inner').children().each(function(){
                    var top = $(this).attr('data-posY');
                    var left = $(this).attr('data-posX');
                    var fontSize = $(this).attr('data-fontSize');
                    var itemWidth = $(this).attr('data-itemWidth');
                    var trTime = $(this).attr('data-time');
                    var trDelay = $(this).attr('data-delay');
                    var trRepeat = $(this).attr('data-repeat');
                    var dataType = $(this).attr('data-itemType')
                    if(!trTime || trTime == 'undefined' || trTime ==''){
                        trTime = 1;
                    }
                    if(!trDelay || trDelay == 'undefined' || trDelay ==''){
                        trDelay = 0;
                    }
                    if(!trRepeat || trRepeat == 'undefined' || trRepeat ==''){
                        trRepeat = 1;
                    }

                    $(this).css({
                        top : top * ratio + 'px',
                        left : left * ratio + 'px',
                        '-webkit-animation-duration': trTime + 's',
                        '-moz-animation-duration': trTime + 's',
                        '-webkit-animation-delay': trDelay + 's',
                        '-moz-animation-delay': trDelay + 's',
                        '-ms-animation-duration': trTime + 's',
                        '-ms-animation-delay': trDelay + 's',
                        '-o-animation-duration': trTime + 's',
                        '-o-animation-delay': trDelay + 's',
                        '-webkit-animation-iteration-count': trRepeat,
                        '-moz-animation-iteration-count': trRepeat,
                        '-ms-animation-iteration-count': trRepeat,
                        '-o-animation-iteration-count': trRepeat,
                        'animation-duration': trTime + 's',
                        'animation-delay': trDelay + 's',
                        'animation-iteration-count': trRepeat
                    });
                    if(fontSize && fontSize != 'undefined' && fontSize !='' && dataType !='panaroma'){
                        $(this).css({
                            'font-size' : fontSize * ratio + 'px'
                        });
                    }
                    if(itemWidth && itemWidth != 'undefined' && itemWidth !='' && itemWidth >0 && dataType !='panaroma'){
                        $(this).css({
                            'width' : itemWidth * ratio + 'px'
                        });
                    }
                        if($(this).attr('data-itemType')!='panaroma'){
                            $(this).css({
                                'width' : itemWidth * ratio + 'px'
                            })
                        }
                        $(this).css({
                            'padding-top' : $(this).attr('data-itemTopPad') * ratio + 'px',
                            'padding-right':  $(this).attr('data-itemRightPad') * ratio + 'px',
                            'padding-bottom':  $(this).attr('data-itemBottomPad') * ratio + 'px',
                            'padding-left': $(this).attr('data-itemLeftPad') * ratio + 'px'
                        });
                    if($(this).attr('data-itemType')=='panaroma'){
                        var p = $(this)
                        if($(this).attr('data-panDir')=='top' || $(this).attr('data-panDir')=='bottom'){
                            var calcw = +p.attr('data-width') * ratio
                            p.css({
                                height: '100%',
                                'width' : calcw + 'px'
                            })
                        }
                        else{
                            var calch = +p.attr('data-height') * ratio
                            p.css({
                                width: '100%',
                                'height' : calch + 'px'
                            })
                        }
                    }
                })
            }

            function calcAuto(){
                dcSl.find('.dc-sl-inner').children().each(function(){
                    var calcFsize = $(this).attr('data-fontSize');
                    if(!calcFsize || calcFsize == 'undefined' || calcFsize =='' || calcFsize <=0){
                        if($(this).attr('data-itemType') !='panaroma'){
                            var autoFontSize=$(this).css('font-size').slice(-2);
                            if(autoFontSize=='px' || autoFontSize=='PX' || autoFontSize=='Px' || autoFontSize=='pX'){
                                autoFontSize= $(this).css('font-size').slice(0,-2);
                                autoFontSize = Number(autoFontSize);
                                if(autoFontSize<=0){
                                    autoFontSize=0;
                                }
                            }
                        }
                        // padding end

                        $(this).attr('data-fontSize', autoFontSize);
                    }

                    var calcWidth = $(this).attr('data-itemWidth');
                    if(!calcWidth || calcWidth == 'undefined' || calcWidth =='auto' || calcWidth =='' || calcWidth <=0){

                        if(calcWidth !='auto' && $(this).attr('data-itemType') !='panaroma'){
                            var autoWidth=$(this).css('width').slice(-2);

                            if(autoWidth=='px' || autoWidth=='PX' || autoWidth=='Px' || autoWidth=='pX'){
                                autoWidth = $(this).css('width').slice(0,-2);
                                autoWidth = Number(autoWidth);
                                if(autoWidth<=0){
                                    autoWidth=0;
                                }
                            }
                            $(this).attr('data-itemWidth', autoWidth);
                        }
                    }
                        var autoPaddingLeft=$(this).css('padding-left').slice(-2);
                        if(autoPaddingLeft=='px' || autoPaddingLeft=='PX' || autoPaddingLeft=='Px' || autoPaddingLeft=='pX'){
                            autoPaddingLeft= $(this).css('padding-left').slice(0,-2);
                            autoPaddingLeft = Number(autoPaddingLeft);
                            if(autoPaddingLeft<=0){
                                autoPaddingLeft=0;
                            }
                        }
                        var autoPaddingRight=$(this).css('padding-right').slice(-2);
                        if(autoPaddingRight=='px' || autoPaddingRight=='PX' || autoPaddingRight=='Px' || autoPaddingRight=='pX'){
                            autoPaddingRight= $(this).css('padding-right').slice(0,-2);
                            autoPaddingRight = Number(autoPaddingRight);
                            if(autoPaddingRight<=0){
                                autoPaddingRight=0;
                            }
                        }
                        var autoPaddingTop=$(this).css('padding-top').slice(-2);
                        if(autoPaddingTop=='px' || autoPaddingTop=='PX' || autoPaddingTop=='Px' || autoPaddingTop=='pX'){
                            autoPaddingTop= $(this).css('padding-top').slice(0,-2);
                            autoPaddingTop = Number(autoPaddingTop);
                            if(autoPaddingTop<=0){
                                autoPaddingTop=0;
                            }
                        }
                        var autoPaddingBottom=$(this).css('padding-bottom').slice(-2);
                        if(autoPaddingBottom=='px' || autoPaddingBottom=='PX' || autoPaddingBottom=='Px' || autoPaddingBottom=='pX'){
                            autoPaddingBottom= $(this).css('padding-bottom').slice(0,-2);
                            autoPaddingBottom = Number(autoPaddingBottom);
                            if(autoPaddingBottom<=0){
                                autoPaddingBottom=0;
                            }
                        }
                        // padding end
                        $(this).attr('data-itemLeftPad', autoPaddingLeft);
                        $(this).attr('data-itemRightPad', autoPaddingRight);
                        $(this).attr('data-itemTopPad', autoPaddingTop);
                        $(this).attr('data-itemBottomPad', autoPaddingBottom);

    //                var calcHeight = $(this).attr('data-itemHeight');

                    if(options.panaroma==true && $(this).attr('data-itemType')=='panaroma'){
                        var a = $(this)
                        var b =a.attr('data-image')
                        var c = new Image;
                        var d;
                            c.src = b
                            c.onload = function(){
                                if(a.attr('data-panDir')=='top' || a.attr('data-panDir')=='bottom'){
                                    d = c.height * +a.attr('data-width') / c.width
                                    d = d.toFixed(1)
                                    a.attr('data-height', d)
                                }
                                else{
                                    d = c.width * +a.attr('data-height') / c.height
                                    d = d.toFixed(1)
                                    a.attr('data-width', d)
                                }
                            }
                            if($(this).attr('data-panDir')=='top' || $(this).attr('data-panDir')=='bottom'){
                                $(this).css({
                                    'background-image' : 'url('+b+')',
                                    'background-repeat' : 'repeat-y',
                                    'background-size': '100% auto',
                                    'background-position': '0px 0px'
                                })
                            }
                            else{
                                 $(this).css({
                                    'background-image' : 'url('+b+')',
                                    'background-repeat' : 'repeat-x',
                                    'background-size': 'auto 100%',
                                    'background-position': '0px 0px'
                                })
                            }
                        $(this).css({
                            'background-color' : $(this).attr('data-bgcolor')
                        })
                    }
                });
            }
            setTimeout(panInterval, 60);
            function panInterval(){
                dcSl.find('.dc-slide').each(function(){
                    var $thisone = $(this)
                    $(this).find('*').each(function(){
                        if($(this).attr('data-itemType')=='panaroma' && $thisone.hasClass('dc-sl-active') && $(this).attr('data-panDir')!='none'){
                            var p = $(this)
                            var a = $(this).css('background-position')
                            var ps = +$(this).attr('data-moveSpeed') * ratio

                            if($(this).attr('data-panDir')=='top'){
                                var name = 'slideNo' + $thisone.index() + p.index()
                                var pos = panarr[name]
                                    pos = pos.toFixed(1)
                                var b = p.attr('data-height')
                                    b = +b * ratio
                                    p.css({
                                        backgroundPosition:'0px '+ pos +'0px'
                                    })
                                    panarr[name] = panarr[name] - ps
                                if(pos < -b){
                                    panarr[name] = b + (+pos) - ps
                                }
                            }
                            else if($(this).attr('data-panDir')=='bottom'){
                                var name = 'slideNo' + $thisone.index() + p.index()
                                var pos = panarr[name]
                                    pos = pos.toFixed(1)
                                var b = p.attr('data-height')
                                    b = +b * ratio
                                    p.css({
                                        backgroundPosition:'0px '+ pos +'0px'
                                    })
                                    panarr[name] = panarr[name] + ps
                                if(pos>b){
                                    panarr[name] = (+pos) + ps - b
                                }
                            }
                            else if($(this).attr('data-panDir')=='left'){
                                var name = 'slideNo' + $thisone.index() + p.index()
                                var pos = panarr[name]
                                    pos = pos.toFixed(1)
                                var b = p.attr('data-width')
                                    b = +b * ratio
                                    p.css({
                                        backgroundPosition: pos + 'px 0px'
                                    })
                                    panarr[name] = panarr[name] - ps
                                if(pos < -b){
                                    panarr[name] = b + (+pos) - ps
                                }
                            }
                            else if($(this).attr('data-panDir') =='right'){
                                var name = 'slideNo' + $thisone.index() + p.index()
                                var pos = panarr[name]
                                    pos = pos.toFixed(1)
                                var b = p.attr('data-width')
                                    b = +b * ratio
                                    p.css({
                                        backgroundPosition: pos + 'px 0px'
                                    })
                                    panarr[name] = panarr[name] + ps
                                if(pos > b){
                                    panarr[name] = (+pos) + ps - b
                                }
                            }
                        }
                    })
                })
                setTimeout(panInterval, 60);
            }
            function elmAnimation(){       // animation on showing elements of a slide
                dcSl.find('.dc-sl-active').siblings('.dc-slide').css({'z-index': '-2', 'opacity': '0'});
                dcSl.find('.dc-sl-active').css({'z-index': '1', 'opacity': '1'});

                dcSl.find('.dc-sl-active').siblings('.dc-slide').children().find('*').fadeOut()
                dcSl.find('.dc-sl-active').children().find('*').show();

                dcSl.find('.dc-sl-active .dc-sl-inner').children().each(function(){
                    $(this).animateCss($(this).data('animation'));
                });
            }

            function transition(slNumb) {
                dcSl.find('.dc-slide').removeClass('dc-sl-active'); // remove active class from all slides
                dcSl.find('.dc-slide').eq(slNumb).addClass('dc-sl-active'); // add active class to current slide
                dcSl.find('.dc-sl-nav li').removeClass('dc-sel-nav'); // remove active class from all bullets
                dcSl.find('.dc-sl-nav li').eq(slNumb).addClass('dc-sel-nav'); // add active class to current bullet
                dcCurSlide = slNumb;
                elmAnimation();
                changeHeight();
                elmSize();
            }

            function autoTransition() {
                if(playIt==1){
                    if(dcPause) {
                        dcPause = false;
                    } else {
                        if(dcCurSlide == dcSlength) {
                            dcCurSlide = 0;
                        } else {
                            dcCurSlide++;
                        }
                        transition(dcCurSlide);
                    }
                    setTimeout(autoTransition, options.interval);
                }
            }
            
        })
        
    };
})(jQuery);
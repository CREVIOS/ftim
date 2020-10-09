(function($){ 
/*
 * --------------------------------------------
 *  01. - Start : Main nav
 * --------------------------------------------
 */
    $('#dc-nav').dcFixedNav({
        fixedMenu: true,
        minScroll:100,   // minimum height to show the sticky header
        minScreen: 768  // sticky header starts from this point 
    });


/*
 * --------------------------------------------
 *  11. - Start : scrollToTop initial function
 * --------------------------------------------
 * 
 */
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('.scrollToTop').fadeIn();
        } 
        else {
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').each(function(){
        if($(this).attr('href')==='#'){
            $(this).on('click', function(){
                $('html, body').animate({scrollTop : 0},800); // scroll to top. possible to increasing animation speed by reducing 800
                return false;
            });
        }
    });

/*
 * --------------------------------------------
 *  02. - Start : LightBox- Group
 * --------------------------------------------
 */
    
    $.fn.dcLightBox = function(options){
        options = $.extend({
            portfolio:false,
            section: ''
        }, options);
        var curImg = 0;
        var pfo = this;
        var allImg='';
        if(options.portfolio==true && options.section!=''){
            allImg = pfo.find(options.section).find('.dc-lbimg-lnk');
        }
        else{
            allImg = pfo.find('.dc-lbimg-lnk');
        }
        var allsrc=[];
        if(options.portfolio==false && options.section==''){
            pfo.prepend('<div class="dc-lbimg-frm"><img src="#" alt="Image is not found"/><ul class="dc-lbcont"><li class="lb_prev"><i class="fa fa-angle-left"></i></li><li class="lb_next"><i class="fa fa-angle-right"></i></li><li class="lb_close"><i class="fa fa-close"></i></li></ul></div>');
        }
        for(var i=0; i<allImg.length; i++){
            if(options.portfolio==true && options.section!=''){
                allsrc.push(pfo.find(options.section).find('.dc-lbimg-lnk').eq(i).attr('href'));
                pfo.find(options.section).find('.dc-lbimg-lnk').eq(i).attr('data-count', i);
            }
            else{
                allsrc.push(pfo.find('.dc-lbimg-lnk').eq(i).attr('href'));
                pfo.find('.dc-lbimg-lnk').eq(i).attr('data-count', i);
            }
        }
        var selPf='';
        if(options.portfolio==true && options.section!=''){
            selPf= pfo.find(options.section).find('.dc-lbimg-lnk');
        }
        else{
            selPf= pfo.find('.dc-lbimg-lnk');
        }
        selPf.each(function(){
            var pfl = $(this);
            pfl.on('click',function(e){
                e.preventDefault();
                var bi = pfl.attr('href');
                pfo.find('.dc-lbimg-frm').find('img').attr('src', bi);
                pfo.find('.dc-lbimg-frm').fadeIn();
                curImg= pfl.data('count');
            });
        });

        pfo.find('.lb_next').on('click',function(e){
            e.preventDefault();

            if(curImg < allsrc.length-1){
                curImg++;
                pfo.find('.dc-lbimg-frm').find('img').attr('src', allsrc[curImg]);
            }
            else{
                curImg=0;
                pfo.find('.dc-lbimg-frm').find('img').attr('src', allsrc[curImg]);
            }
        });

        pfo.find('.lb_prev').on('click',function(i){
            i.preventDefault();
            if(curImg > 0){
                curImg--;
                pfo.find('.dc-lbimg-frm').find('img').attr('src', allsrc[curImg]);
            }
            else{
                curImg = allsrc.length - 1;
                pfo.find('.dc-lbimg-frm').find('img').attr('src', allsrc[curImg]);
            }
        });
        pfo.find('.lb_close').on('click',function(i){
            pfo.find('.dc-lbimg-frm').find('img').attr('src', '');
            pfo.find('.dc-lbimg-frm').fadeOut();
        });
    };


/*
 * --------------------------------------------
 *  03. - Start : tab
 * --------------------------------------------
 */
    $('.dc-tab').each(function(){
        var $this = $(this);
        var myTabContainer =$this.find('.dc-nav-tab'); // graving very first nav
        var myTabs = myTabContainer.find('li'); // graving li
        var indexactive = myTabContainer.find('.dc-active').index();
        var tabtime= $this.attr('data-time');
        var tabpause = true;
        if(!tabtime){
            tabtime = 1000;
        }
        var tabtrans='';
        if($this.attr('data-slide')=="yes"){
            $this.children('.dc-tab-content').css('overflow', 'hidden');
            $this.children('.dc-tab-content').children('.dc-tab-container').addClass('clearfix');
            if($this.attr('data-section-type')=="float"){
                $this.children('.dc-tab-content').children('.dc-tab-container').addClass('clearfix')
                $this.children('.dc-tab-content').children('.dc-tab-container').css({
                    'width' : (myTabs.length * 100) + '%'
                });
                $this.find('.dc-tab-pane').css({
                    'width' : (100/ myTabs.length) + '%',
                    'float' : 'left',
                    'display' : 'initial'
                });
            }
            else{
                $this.children('.dc-tab-content').children('.dc-tab-container').css({
                    'width' : (myTabs.length * 100) + '%',
                    'display' : 'table'
                });
                $this.find('.dc-tab-pane').css({
                    'width' : (100/ myTabs.length) + '%',
                    'display' : 'table-cell',
                    'position' : 'initial'
                });
            }
        }
        if($this.attr('data-slide')=="yes"){
            $this.children('.dc-tab-content').children().eq(0).css({
                'margin-left' : '-' + (indexactive * 100) + '%'
            })
        }
        else {
            $this.children('.dc-tab-content').children('.dc-tab-container').children().eq(indexactive).show();
        }
        myTabs.each(function(){
            
            $(this).on('click', function(){ // event on clicking li
                indexactive = $(this).index();
                if($this.attr('data-slide')=='yes'){
                    $this.children('.dc-tab-content').children().eq(0).css({
                        'margin-left' : '-' + (indexactive * 100) + '%'
                    })
                    if($this.attr('data-slideshow')=='yes'){
                    }
                }
                else{
                    $this.children('.dc-tab-content').children('.dc-tab-container').children().eq(indexactive).siblings('div').hide(0,function(){
                        $this.children('.dc-tab-content').children('.dc-tab-container').children().eq(indexactive).fadeIn(200); // opening the selecting tab content
                    }); // closing other open tab content
                }
                $(this).siblings().removeClass('dc-active'); // removing dcactive class form other li
                $(this).addClass('dc-active'); // adding dcactive class to selected li
            });
        });
        $this.on('mouseover', function(){
            tabpause=false;
        })
        $this.on('mouseleave', function(){
            tabpause=true;
            if(tabtrans==''){
                setSlideshow()
            }
        })
        setSlideshow();
        function setSlideshow(){
            if($this.attr('data-slide')=='yes' && $this.attr('data-slideshow')=='yes') {
                tabtrans = setTimeout(tabtransition, tabtime);
            }
        }

        function tabslidetransition() {
            if($this.attr('data-slide')=='yes' && $this.attr('data-slideshow')=='yes'){
                if(indexactive== myTabs.length-1){
                    indexactive = 0;
                }
                else{
                    indexactive++;
                }
                $this.children('.dc-tab-content').children().eq(0).css({
                    'margin-left' : '-' + (indexactive * 100) + '%'
                })
                myTabContainer.find('.dc-active').removeClass('dc-active');
                myTabContainer.find('li').eq(indexactive).addClass('dc-active')
            }
        }

        function tabtransition() {
            if(tabpause==true){  
                tabslidetransition();
                setTimeout(tabtransition, tabtime);
            }
            else{
                tabtrans='';
            }
        }
    });


/*
 * --------------------------------------------
 *  07. - Start : Number counter
 * --------------------------------------------
 */
    $('.dc-count').each(function () {
        var $this = $(this);
        if(!$this.hasClass('dc-counted')){
            $({ dccount: 0 }).animate({ dccount: $this.data('count') }, {
                duration: 1500,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.dccount));
                }
            });
        }
        $(window).scroll(function(){ // event on scrolling
            var winTop= $(window).scrollTop(); // graving scroll top value
            var winBottom = $(window).height() + winTop;
                var countTop = $this.offset().top;
                var countBottom = $this.outerHeight() + countTop;
                if($(window).scrollTop() + $(window).height() >= $this.offset().top && $(window).scrollTop() <= $this.offset().top + $this.outerHeight()){
                    if(!$this.hasClass('dc-counted') && $this.text()=='0'){
                        $({ dccount: 0 }).animate({ dccount: $this.data('count') }, {
                            duration: 1500,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.ceil(this.dccount));
                            }
                        });
                        $this.addClass('dc-counted');
                    }
                    else{
                        $this.addClass('dc-counted');
                    }
                }
                //Start reactivation of the counter
                else{
                    if($this.hasClass('dc-counted') && $this.attr('data-count-repeat')=='yes'){
                        $this.removeClass('dc-counted');
                    }
                    else if(!$this.hasClass('dc-counted')){
                        $this.html('0');
                    }
                }
            });
    });

/*
 * --------------------------------------------
 *  04. - Start : Animated Circular counter 
 * --------------------------------------------
 */
    $('.dc-circle-counter').each(function(){
        var $this = $(this);
        var dataCount = +$(this).attr('data-count');
        var counter = dataCount * 360/100;
            counter = counter.toFixed(1);
            counter = +counter;
        var count = 0;
        var part = 0;
        var anim1 = 0;
        var anim2 = 0 ;
        var animTime = 1000;
        var timeout;
            // if($(window).scrollTop() + $(window).height() >= $this.offset().top && $(window).scrollTop() <= $this.offset().top + $this.outerHeight()){
                if(counter<=180){
                    count = counter;
                    part=3;
                    anim1 = animTime;
                }
                else if(counter>180){
                    count = 180;
                    anim1 = animTime * 50 / dataCount ;
                    anim1 = anim1.toFixed(0);
                    anim1 = +anim1;
                    anim2 = animTime - anim1;
                    anim2 = anim2.toFixed(0);
                    anim2 = +anim2;
                    part=2
                }
                timeout = setTimeout(cycle, 500)
            // }
        $(window).scroll(function(){ // event on scrolling
            var winTop= $(window).scrollTop(); // graving scroll top value
            var winBottom = $(window).height() + winTop;
            var countTop = $this.offset().top;
            var countBottom = $this.outerHeight() + countTop;
            if($(window).scrollTop() + $(window).height() >= $this.offset().top && $(window).scrollTop() <= $this.offset().top + $this.outerHeight()){
                if(!$this.hasClass('dc-circulated') && $this.attr('data-repeted')=='0'){
                    $this.addClass('dc-circulated');
                    if(counter<=180){
                        count = counter;
                        part=3;
                        anim1 = animTime;
                    }
                    else if(counter>180){
                        count = 180;
                        anim1 = animTime * 50 / dataCount ;
                        anim1 = anim1.toFixed(0);
                        anim1 = +anim1;
                        anim2 = animTime - anim1;
                        anim2 = anim2.toFixed(0);
                        anim2 = +anim2;
                        part=2
                    }
                    timeout = setTimeout(cycle, 500);
                    
                }
                else{
                    $this.addClass('dc-circulated');
                }
            }
            //Start reactivation of the counter
            else{
                if($this.hasClass('dc-circulated') && $this.attr('data-circle-repeat')=='yes'){
                    clearTimeout(timeout)
                    $this.removeClass('dc-circulated');
                    count = 0;
                    part = 0;
                    anim1 = 0;
                    anim2 = 0 ;
                    $this.find('.dc-circle-front-1').removeAttr('style');
                    $this.find('.dc-circle-front-2').removeAttr('style');
                }
                else if(!$this.hasClass('dc-circulated')){
                    $this.attr('data-repeted', '0')
                    clearTimeout(timeout)
                    count = 0;
                    part = 0;
                    anim1 = 0;
                    anim2 = 0 ;
                    $this.find('.dc-circle-front-1').removeAttr('style');
                    $this.find('.dc-circle-front-2').removeAttr('style');
                }
            }
        });



        function cycle(){
            if (part==3 || part==2){
                $this.find('.dc-circle-front-1').css({
                    '-o-transition' : 'all ' + anim1 + 'ms linear',
                    '-moz-transition' : 'all ' + anim1 + 'ms linear',
                    '-ms-transition' : 'all ' + anim1 + 'ms linear',
                    '-webkit-transition' : 'all ' + anim1 + 'ms linear',
                    'transition' : 'all ' + anim1 + 'ms linear',
                    '-o-transform' : 'rotate(' + count + 'deg)',
                    '-moz-transform' : 'rotate(' + count + 'deg)',
                    '-ms-transform' : 'rotate(' + count + 'deg)',
                    '-webkit-transform' : 'rotate(' + count + 'deg)',
                    'transform' : 'rotate(' + count + 'deg)'
                })
                if(counter>180){
                    count = counter - count;
                }
            }
            else if (part==1){
                $this.find('.dc-circle-front-2').css({
                    '-o-transition' : 'all ' + anim2 + 'ms linear',
                    '-moz-transition' : 'all ' + anim2 + 'ms linear',
                    '-ms-transition' : 'all ' + anim2 + 'ms linear',
                    '-webkit-transition' : 'all ' + anim2 + 'ms linear',
                    'transition' : 'all ' + anim2 + 'ms linear',
                    '-o-transform' : 'rotate(' + count + 'deg)',
                    '-moz-transform' : 'rotate(' + count + 'deg)',
                    '-ms-transform' : 'rotate(' + count + 'deg)',
                    '-webkit-transform' : 'rotate(' + count + 'deg)',
                    'transform' : 'rotate(' + count + 'deg)'
                })
            }
            if(part==1 || part==3){
                part = 0;
            }
            else if(part==2){
                part=1;
            }
            if (part>0){
                timeout =setTimeout(cycle, anim1-1)
            }
        }
    })

/*
 * --------------------------------------------
 *  04. - Start : animation on scroll 
 * --------------------------------------------
 * data-duration="2" data-repeat="yes" data-animcount="" data-timeout="1000" data-animation="zoomIn" class="animateOnScroll"
 */
function animatedScroll(){
    var $window           = $(window),
	win_height_padded = $window.height() * 1.1,
	isTouch           = Modernizr.touch;

	if (isTouch) { $('.animateOnScroll').addClass('animated'); }

	$window.on('scroll', animateOnScroll);

	function animateOnScroll() {
	var scrolled = $window.scrollTop(),
	    win_height_padded = $window.height() * 1.1;

	// Showed...
    $(".animateOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;
          offsetBottom = $this.offset().top + $this.outerHeight();
          dur = $this.attr('data-duration');
          count = $this.attr('data-animcount');
          if(dur && dur!='' && dur!='undefined' && dur!='NaN'){
              $this.css({
                '-webkit-animation-duration': dur + 'ms',
                '-moz-animation-duration': dur + 'ms',
                '-ms-animation-duration': dur + 'ms',
                '-o-animation-duration': dur + 'ms'
              }); 
          }
          if(count && count!='' && count!='undefined' && count!='NaN'){
              $this.css({    
                '-webkit-animation-iteration-count': count,
                '-moz-animation-iteration-count': count,
                '-ms-animation-iteration-count': count,
                '-o-animation-iteration-count': count,
                'animation-iteration-count': count 
            });
          }  
	  if (scrolled + win_height_padded > offsetTop && offsetBottom > scrolled) {
	    if ($this.data('timeout')) {
	      window.setTimeout(function(){
	        $this.addClass('dc-visible');
	        $this.addClass('animated ' + $this.data('animation'));
	      }, parseInt($this.data('timeout'),10));
	    } else {
	      $this.addClass('animated ' + $this.data('animation'));
	        $this.addClass('dc-visible');
	    }
	  }
	});
	// Hidden...
	$(".animateOnScroll.animated").each(function (index) {
	  var $this     = $(this),
	      offsetTop = $this.offset().top;
	  if (!((scrolled + win_height_padded) > offsetTop && offsetBottom > scrolled) && $this.attr('data-repeat')=='yes') {
	    $(this).removeClass('animated ' + $this.attr('data-animation'))
	    $this.removeClass('dc-visible');
	  }
	});
	}
	animateOnScroll();
}
animatedScroll();

//----------------------------Data Table-------------------------------//

$('.dc-table').each(function(){
    var $this = $(this)
    if(+$this.attr('data-screen') >0){
        if($this.children('div').eq(0).hasClass('dc-table-head')){
            var tbHdCount = $this.children('.dc-table-head').children('div');
                tbHdCount = tbHdCount.length;
            var tbFline = true;
            var tbCount= -1
            for(var i=0; i < tbHdCount; i++){ 
                $this.children('div').each(function(){
                    if(tbCount < i){
                        tbCount =i;
                        tbFline=false;
                    }
                    else if(tbFline==true){
                        tbFline=false;
                    }
                    else{
                        $(this).children('div').eq(i).prepend('<div class="dc-table-span">' + $this.children('.dc-table-head').children('div').eq(i).text() + '</div>')
                    }
                })
            }
        }

        dcTable($this)
        $(window).resize(function(){
            dcTable($this)
        })
        
    }
    function dcTable(a){
        if($(window).width() >= +a.attr('data-screen')){
            a.children('div').eq(0).show();
            a.removeAttr('style');
            a.children('div').removeAttr('style');
            a.children('div').children('div').removeAttr('style');
            a.children('div').children('div').children().removeAttr('style');
            a.find('.dc-table-span').hide();
            a.children('div').children('div').children('div:nth-child(even)').removeClass('dc-resp-tab-border')
            a.children('div').children('div:nth-child(even)').children('div:nth-child(even)').removeClass('dc-resp-tab-color')
            a.children('div').children('div:nth-child(odd)').children('div:nth-child(even)').removeClass('dc-resp-tab-color')
        }
        else{
            a.css({
                'display' : 'block'
            })
            a.children('div').css({
                'display' : 'block',
                'margin-bottom' : '20px'
            })
            a.children('div').children('div').css({
                'display': 'table',
                'background-color' :'inherit',
                'border' : 'none',
                'width' : '100%',
                'padding' : 0
            })
            a.children('div').children('div').children().css({
                'display': 'table-cell',
                'width' : '50%',
                'padding' : '10px'
            })
            a.children('div').children('div').children('div:nth-child(even)').addClass('dc-resp-tab-border')
            // a.children('div').children('div:last-child').children('div').css({
            //     'border-bottom' : 'none'
            // })
                a.children('div').children('div:nth-child(even)').children('div:nth-child(even)').addClass('dc-resp-tab-color')
                a.children('div').children('div:nth-child(odd)').children('div:nth-child(even)').addClass('dc-resp-tab-color')
            if(!a.attr('data-align')){
                a.children('div').children('div').children('div').css({
                    'text-align' : 'left'
                })
                a.find('.dc-table-span').css({
                    'text-align' : 'right'
                })
            }
            else{
                a.children('div').children('div').children('div').css({
                    'text-align' : 'center'
                })
            }
            a.children('div').eq(0).hide();
            a.find('.dc-table-span').show();
        }
    }
})


//  ,---.,---.,-.-.,-.-.,---.,---.|-- 
//  |    |   || | || | ||---'|   ||    ====== START : accordion
//  `---'`---'` ' '` ' '`---'`   '`--


$('.dc-accordion').each(function(){
    var $this = $(this);
    var dcExp = $this.attr('data-expand')
    var dcClose = $this.attr('data-openicon')
    var dcStart = $this.attr('data-start')
    if(!dcClose){
        dcClose = 'fa-minus';
    }
    var dcOpen = $this.attr('data-closeicon')
    if(!dcOpen){
        dcOpen = 'fa-plus';
    }
    $this.find('.dc-accrd-icon').addClass('fa ' + dcOpen)
    $this
        .find('.dc-acc-box')
        .children('.dc-acc-head')
            .on('click',function() // event on clicking on accordion heading
                {
                    if(!$(this).hasClass('dc-acc-active')){ // checking if the class is available
                        $(this)
                            .next('.dc-acc-body')
                                .slideDown()
                                    .prev('.dc-acc-head')
                                        .addClass('dc-acc-active') //exapnding accordion body and adding class
                                        .find('i').removeClass(dcOpen).addClass(dcClose);
                    }

                    else{
                        $(this)
                            .next('.dc-acc-body')
                                .slideUp()
                                    .prev('.dc-acc-head')
                                        .removeClass('dc-acc-active') // collapsing accordion body and removing class
                                        .find('i').removeClass(dcClose).addClass(dcOpen);
                                        
                    }
                    
                    

                    // collapsing other according body and removing class
                    if(dcExp != 'all'){
                        $(this).parent('.dc-acc-box')
                            .siblings()
                                .children('.dc-acc-body').slideUp().end()
                                .children('.dc-acc-head').removeClass('dc-acc-active').end()
                                .children('.dc-acc-head').find('i').removeClass(dcClose).addClass(dcOpen);
                    }
                });
    $this.find('.dc-acc-box').children('.dc-acc-body').hide();
    if(dcStart && dcStart > 0){
        $this.find('.dc-acc-box').eq(dcStart-1).children('.dc-acc-body').first().show().prev('.dc-acc-head').addClass('dc-acc-active').find('i').removeClass(dcOpen).addClass(dcClose);
    }
    // else if (!dcStart || dcStart < 1){
        // $this.find('.dc-acc-box').children('.dc-acc-body').first().show().prev('.dc-acc-head').addClass('dc-acc-active').find('i').removeClass(dcOpen).addClass(dcClose);
    // }
});



//  ,---.,---.,-.-.,-.-.,---.,---.|-- 
//  |    |   || | || | ||---'|   ||    ====== START : PARALLAX BACKGROUND
//  `---'`---'` ' '` ' '`---'`   '`--
    
            $('.dc-parallax').each(function(){
                var $this = $(this),
                    bgpos = $this.attr('data-parallax-pos'),
                    parallaxSpeed = $this.data('parallax-speed'),
                    dCrazeVal;
                if(!bgpos || bgpos==''){
                    bgpos='center'
                }
                
                if(!$.isNumeric(parallaxSpeed)){
                    parallaxSpeed = 1.5; // controller of counting animation speed
                }
                
                instParPos($this)
                $(window).resize(function(){ // setting for window resize
                    instParPos($this)
                });
                
                function instParPos(a){
                    if(a.attr('data-parallax-dir') !='left' && a.attr('data-parallax-dir') !='right'){
                        if($(window).width()<=767){
                            a.css({
                                'background-size' : 'auto auto'
                            });
                        }
                        else{
                            a.css({
                                'background-size' : 'cover'
                            });
                        }
                        a.css({
                            'background-position' : 'center center'
                        });
                    }
                    else{
                        if(a.attr('data-parallax-fixed') == 'yes'){
                            if(a.outerHeight() >= $(window).height()){
                                a.css({
                                'background-size' : (a.outerHeight() + a.outerWidth()) + 'px auto' 
                                });
                                if(a.attr('data-parallax-dir') =='left'){
                                    a.css({
                                    'background-position' : (-($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                    });
                                }
                                else{
                                    a.css({
                                    'background-position' : (-$this.outerHeight()+($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                    });
                                }
                            }
                            else{
                                a.css({
                                'background-size' : ($(window).height() + a.outerWidth()) + 'px auto' 
                                });
                                if(a.attr('data-parallax-dir') =='left'){
                                    a.css({
                                    'background-position' : (-($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                    });
                                }
                                else{
                                    a.css({
                                    'background-position' : (-$(window).height()+($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                    });
                                }
                            }
                        }
                        else if(a.attr('data-parallax-fixed') !== 'yes' && a.attr('data-parallax-type') == 'panaroma'){
                            a.css({
                            'background-size' : 'auto 100%',
                            });
                            if(a.attr('data-parallax-dir') =='left'){
                                a.css({
                                'background-position' : (-($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                });
                            }
                            else{
                                a.css({
                                'background-position' : (($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                });
                            }
                        }
                        else{
                            if(a.attr('data-parallax-dir') =='left'){
                                a.css({
                                'background-position' : (-($(window).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                });
                            }
                            else{
                                a.css({
                                'background-position' : (($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px ' + bgpos
                                });
                            }
                        }
                    }
                }

                $(window).on('scroll', function(){
                    if($this.attr('data-parallax-dir') =='left'){
                        dCrazeVal = (-($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px';
                        if($(window).height() + $(this).scrollTop() >= $this.offset().top && $(this).scrollTop() <= $this.outerHeight() + $this.offset().top){
                            $this.css({
                            'background-position' : dCrazeVal + ' ' + bgpos
                            });
                        }
                    }
                    else if($this.attr('data-parallax-dir') =='right'){
                        if($this.attr('data-parallax-fixed') == 'yes'){
                            if($this.outerHeight() >=$(window).height()){
                                dCrazeVal = (-$this.outerHeight()+($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px';
                            }
                            else{
                                dCrazeVal = (-$(window).height()+($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px';
                            }
                        }
                        else{
                                dCrazeVal = (($(this).scrollTop()+$(window).height()-$this.offset().top)/2) + 'px';
                            
                        }
                        if($(window).height() + $(this).scrollTop() >= $this.offset().top && $(this).scrollTop() <= $this.outerHeight() + $this.offset().top){
                            $this.css({
                            'background-position' : dCrazeVal + ' ' + bgpos
                            });
                        }
                    }
                    else{
                        dCrazeVal = Math.ceil((($(this).scrollTop()-$this.offset().top-$this.offset().top/50)-($(this).scrollTop()-$this.offset().top)/parallaxSpeed)) + 'px';
                        if($(window).height() + $(this).scrollTop() >= $this.offset().top && $(this).scrollTop() <= $this.outerHeight() + $this.offset().top){
                            $this.css({
                                'background-position' : 'center '+ dCrazeVal
                            });
                        }
                    }
                });
                
            });
})(jQuery);
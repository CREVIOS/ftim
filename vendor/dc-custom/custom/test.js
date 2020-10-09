(function($){ 

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
        var tabtrans;
        if($this.attr('data-slide')=="yes"){
            $this.children('.dc-tab-content').css('overflow', 'hidden');
            $this.children('.dc-tab-content').children('.dc-tab-container').addClass('clearfix');
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
        if($this.attr('data-slide')=="yes"){
            console.log(indexactive)
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
                        tabpause=false;
                        clearTimeout(tabtrans);
                        tabpause=true;
                        tabtrans = setTimeout(tabtransition, tabtime);
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
            clearTimeout(tabtrans);
            tabtrans = setTimeout(tabtransition, tabtime);
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
        }
    });

})(jQuery);
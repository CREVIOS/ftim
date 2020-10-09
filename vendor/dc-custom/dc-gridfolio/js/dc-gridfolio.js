(function($){

/*
 * --------------------------------------------
 *  02. - Start : Portfolio
 * --------------------------------------------
 */
    $.fn.dcPfolio = function(options){ 
        options = $.extend({
            button:true,
            transition: 600,
            column: 4,
            medium: 3,
            small: 2,
            tiny: 1,
            borderstyle: 'none',
            appearance: 'zoomIn',
            animation: 'classic',
            leftspace:0,
            rightspace:0,
            topspace:0,
            bottomspace:0,
            startgroup:'',
            buttonclass:''
        }, options);
        //Start Main Variables Declaration
        var $this = this;
        var disabledButton='all';
        var expCol = options.column;
        var borderstyle = options.borderstyle;
        var animationTime = options.transition;
        var globThisData='.dc-pfitem';
        var globItemdiv='';
        var items = $this.find('.dc-pfitem');
        var section=[];
        var pFolioButton = '<button class="dc-pfbtn ' + options.buttonclass + '" data-dc-pfctg="all">All</button>';
        var startgroup = options.startgroup;
        if(startgroup !=''){
            pFolioButton='';
            startgroup = startgroup.toLowerCase();
            startgroup = capitalize(startgroup);
            startgroup = $.trim(startgroup);
            startgroup = startgroup.replace(/\ /g, '-');
        };
        var col;
        var myOffset=[];
        var pfolioRatio =1;
        var pfCurrScr = $this.outerWidth();
        var animationtype = options.animation;
        var pftop=options.topspace;
        var pfbottom=options.bottomspace;
        var pfleft=options.leftspace;
        var pfright=options.rightspace;
        if(! $.isNumeric(pftop)){pftop=0;}
        if(! $.isNumeric(pfbottom)){pfbottom=0;}
        if(! $.isNumeric(pfleft)){pfleft =0;}
        if(! $.isNumeric(pfright)){pfright =0;}
        items.css({
            'padding-top' : pftop,
            'padding-right' : pfright,
            'padding-bottom' : pfbottom,
            'padding-left' : pfleft
        });
        if(animationtype !='none' || animationtype !='modern' || animationtype!='classic'){
            animationtype == 'modern';
        }
        $this.prepend('<div class="dc-lbimg-frm"><img src="#" alt="Image is not found"/><ul class="dc-lbcont"><li class="lb_prev"><i class="fa fa-angle-left"></i></li><li class="lb_next"><i class="fa fa-angle-right"></i></li><li class="lb_close"><i class="fa fa-close"></i></li></ul></div>');
        //End Main Variables Declaration
        
        //Start Showing portfolio item containers if js is active
        $this.show();
        //End Showing portfolio item containers if js is active

        //Start calculating animation time
        if(!$.isNumeric(animationTime) || animationTime<100){
            animationTime = 600;
        }
        //End calculating animation time
        function capitalize(a) {
            return a.charAt(0).toUpperCase() + a.slice(1);
        }
        //Start Auto Generated Button
        items.each(function(){
            var dataSec = $(this).data('dc-pfsec');
            dataSec = dataSec.toLowerCase();
            dataSec = dataSec.split(',');
            var dataSecLen = dataSec.length;
            for(var i=0; i<dataSecLen; i++){
                var dataSecTrim = $.trim(dataSec[i]);
                    dataSecTrim = dataSecTrim.replace(/\ /g, '-');
                    dataSecTrim = capitalize(dataSecTrim);
                $(this).addClass('dc-pf-'+ dataSecTrim);
                var validate = $.inArray(dataSecTrim, section);
                if(validate === -1){
                    section.push(dataSecTrim);
                }
            }
        });
        section.sort();
        var sectionLen = section.length;
        if(options.button==true){
            pFolioButton = '<div class="dc-pfbtn-grp">' + pFolioButton;
            for(var i=0; i<sectionLen; i++){
                    var dis='';
                if(startgroup!='' && startgroup==section[i]){
                    var dis=' disabled';
                };
                pFolioButton = pFolioButton + '<button class="dc-pfbtn ' + options.buttonclass + '" data-dc-pfctg="dc-pf-'+ section[i] +'"'+ dis +'>'+ section[i].replace(/\-/g, ' ') +'</button>';
            }
            pFolioButton = pFolioButton + '</div>';
            $this.closest('.dc-pfolio').prepend(pFolioButton);
        }
        //End Auto Generated Button

        //Start adding border style
        if(borderstyle !== 'none' || borderstyle !== ''){
            if(borderstyle === 'parallel')
            {  
                items.find('.dc-pf-img').addClass('dc-bdr-parallel');
            }
            else if(borderstyle === 'parallel-fixed')
            {  
                items.find('.dc-pf-img').addClass('dc-bdr-parallel-fixed');
            }
            else if(borderstyle === 'topleft-bottomright')
            {  
                items.find('.dc-pf-img').addClass('dc-bdr-topleft-bottomright');
            }
            else if(borderstyle === 'topright-bottomleft')
            {  
                items.find('.dc-pf-img').addClass('dc-bdr-topright-bottomleft');
            }
        }
        
        if(animationtype=='modern'){
            items.addClass('animated').addClass(options.appearance);
        }
        
        responsCol();
        //End Calling Default grid at the beginning

        //Start Function for Beginning layout and Responsive layout
        function responsCol(){
            if(globItemdiv===''){
                globItemdiv = items;
            }

            if(expCol===6){
                if($(window).width()>991){
                    col = 6;
                }
                else{
                    respDevice();
                }
            }
            else if(expCol===5){
                 if($(window).width()>991){
                    col = 5;
                }
                else{
                    respDevice();
                }
            }
            else if(expCol===3){
                if($(window).width()>991){
                    col = 3;
                }
                else{
                    respDevice();
                }
            }
            else{
                if($(window).width()>991){
                    col = 4;
                }
                else{
                    respDevice();
                }

            }
            function respDevice(){
                if($(window).width()>767){
                    col = options.medium;
                }
                else if($(window).width()>479){
                    col = options.small;
                }
                else if($(window).width()<=480){
                    col = options.tiny;
                }
            }
            if(startgroup !=''){
                globThisData = '.dc-pf-'+ startgroup;
                globItemdiv = $this.children(globThisData);
            }
            if(animationtype !='classic'){
                thisDefault(col, globItemdiv, items, globThisData);                
            }
            else{
                thisDefault2(col, globItemdiv, items, globThisData);                
            }
            $this.dcLightBox({
                portfolio:true,
                section: globThisData
            })
        }
        //End Function for Beginning layout and Responsive layout
        
        //Start Responsiveness
        $(window).on('resize', function(){
            responsCol();
        });
        //End Responsiveness

        //Start Detecting Button Click
        $this.closest('.dc-pfolio').find('.dc-pfbtn').each(function(){
            var thisData = $(this).data('dc-pfctg');
            disabledButton = thisData;
            if(thisData === 'all'){
                thisData = '.dc-pfitem';
                $(this).attr('disabled', 'disabled');
            }
            else{    
                thisData = '.'+ thisData;
            }
            var itemdiv = $this.children(thisData);
            $(this).on('click', function(){
                $(this).attr('disabled', 'disabled');
                $(this).siblings('button').removeAttr('disabled');
                globThisData = thisData;
                globItemdiv = itemdiv;
                if(animationtype !='classic'){
                    thisDefault(col, itemdiv, items, thisData);
                }
                else{
                    thisAnimation(col, itemdiv, items, thisData);                    
                }
                $this.dcLightBox({
                    portfolio:true,
                    section: thisData
                })
            });
        });
        //End Detecting Button Click
        
        //start selected button
        
        //end selected button
        
//----------------------------------------------------------------------------------------------
        //Start Default Function CSS
        function thisDefault(col, subitems, items, thisData){
            var subitemsLen = subitems.length;
            var itemsLen = items.length;
            var gridWidth = Math.ceil($this.outerWidth()/col);
            var minOffset;
            var myOffsetValue;
            myOffset =[];
            for(var i=0; i<col; i++){
                myOffset.push(0);
            }

            for(var x=0; x<itemsLen; x++){
                $(items[x]).removeClass('dc-pfactive');
            }
            for(var x=0; x<subitemsLen; x++){
                $(subitems[x]).addClass('dc-pfactive');
            }
            for(var x=0; x<itemsLen; x++){
                $(items[x]).css({
                    opacity: 0,
                    width: gridWidth,
                    zIndex:0,
                    top: Math.ceil($(this).outerHeight()/4),
                    left: $this.outerWidth()/2 - $(items[x]).outerWidth()/2

                });
                $(items[x]).hide();
            }
            for(var z=0; z<subitemsLen; z++){
                for(var i=0; i<myOffset.length; i++){
                    if(i===0){
                        myOffsetValue=myOffset[i];
                        minOffset=0;
                    }
                    else if(myOffset[i]<myOffsetValue){
                        myOffsetValue = myOffset[i];
                        minOffset = i;
                    }
                }
                $(subitems[z]).show();
                $(subitems[z]).css({
                    opacity: 1,
                    width: gridWidth,
                    zIndex:99,
                    top: myOffsetValue,
                    left: minOffset*gridWidth
                });
                myOffset[minOffset] = myOffsetValue + $(subitems[z]).outerHeight();

            }
            for(var i=0; i<myOffset.length; i++){
                if(i===0){
                    myOffsetValue=myOffset[i];
                    minOffset=0;
                }
                else if(myOffset[i]>myOffsetValue){
                    myOffsetValue = myOffset[i];
                    minOffset = i;
                }
            }
            $this.css({
                height:myOffsetValue
            });
        }
        //End Default Function CSS

        //Start Default Function CSS
        function thisDefault2(col, subitems, items, thisData){
            var subitemsLen = subitems.length;
            var itemsLen = items.length;
            var gridWidth = Math.ceil($this.outerWidth()/col);
            var minOffset;
            var myOffsetValue;
            myOffset =[];
            for(var i=0; i<col; i++){
                myOffset.push(0);
            }

            for(var x=0; x<itemsLen; x++){
                $(items[x]).removeClass('dc-pfactive');
            }
            for(var x=0; x<subitemsLen; x++){
                $(subitems[x]).addClass('dc-pfactive');
            }
            for(var x=0; x<itemsLen; x++){
                if(!$(items[x]).hasClass('dc-pfactive')){
                    $(items[x]).css({
                        opacity: 0,
                        width: gridWidth,
                        zIndex:0,
                        top: Math.ceil($(this).outerHeight()/4),
                        left: $this.outerWidth()/2 - $(items[x]).outerWidth()/2

                    });
                    $(items[x]).hide();
                }
            }
            for(var z=0; z<subitemsLen; z++){
                for(var i=0; i<myOffset.length; i++){
                    if(i===0){
                        myOffsetValue=myOffset[i];
                        minOffset=0;
                    }
                    else if(myOffset[i]<myOffsetValue){
                        myOffsetValue = myOffset[i];
                        minOffset = i;
                    }
                }
                $(subitems[z]).show();
                $(subitems[z]).css({
                    opacity: 1,
                    width: gridWidth,
                    zIndex:99,
                    top: myOffsetValue,
                    left: minOffset*gridWidth
                });
                myOffset[minOffset] = myOffsetValue + $(subitems[z]).outerHeight();

            }
            for(var i=0; i<myOffset.length; i++){
                if(i===0){
                    myOffsetValue=myOffset[i];
                    minOffset=0;
                }
                else if(myOffset[i]>myOffsetValue){
                    myOffsetValue = myOffset[i];
                    minOffset = i;
                }
            }
            $this.css({
                height:myOffsetValue
            });
        }
        //End Default Function CSS


        //Start Function for animation
        function thisAnimation(col, subitems, items, thisData){
            var subitemsLen = subitems.length;
            var itemsLen = items.length;
            var gridWidth = Math.ceil($this.outerWidth()/col);
            var minOffset;
            var myOffsetValue;
            myOffset =[];
            for(var i=0; i<col; i++){
                myOffset.push(0);
            }

            for(var x=0; x<itemsLen; x++){
                $(items[x]).removeClass('dc-pfactive');
            }
            for(var x=0; x<subitemsLen; x++){
                $(subitems[x]).addClass('dc-pfactive');
            }
            for(var x=0; x<itemsLen; x++){
                if(!$(items[x]).hasClass('dc-pfactive')){
                    $(items[x]).animate({
                        opacity: 0,
                        width: gridWidth,
                        zIndex: 0,
                        top: Math.ceil($(this).outerHeight()/4),
                        left: $this.outerWidth()/2 - $(items[x]).outerWidth()/2
                    }, animationTime, function(){$(items[x]).hide();});
                }
            }
            for(var z=0; z<subitemsLen; z++){
                for(var i=0; i<myOffset.length; i++){
                    if(i===0){
                        myOffsetValue=myOffset[i];
                        minOffset=0;
                    }
                    else if(myOffset[i]<myOffsetValue){
                        myOffsetValue = myOffset[i];
                        minOffset = i;
                    }
                }
                $(subitems[z]).show();
                $(subitems[z]).animate({
                    opacity: 1,
                    width: gridWidth,
                    top: myOffsetValue,
                    zIndex:99,
                    left: minOffset*gridWidth
                }, animationTime);
                myOffset[minOffset] = myOffsetValue + $(subitems[z]).outerHeight();

            }
            for(var i=0; i<myOffset.length; i++){
                if(i===0){
                    myOffsetValue=myOffset[i];
                    minOffset=0;
                }
                else if(myOffset[i]>myOffsetValue){
                    myOffsetValue = myOffset[i];
                    minOffset = i;
                }
            }
            $this.animate({
                height:myOffsetValue
            }, animationTime);
        }

        // Calculate the height ratio of the current pfolio itmes 
        function changePfolioHeight(){         
                pfolioRatio = $this.outerWidth() /  pfCurrScr;
                pfolioRatio = pfolioRatio
        }
    };
/*
 * --------------------------------------------
 *  02. - End : Portfolio
 * --------------------------------------------
 */

})(jQuery);
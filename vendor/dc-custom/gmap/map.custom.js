(function($){
//  ,---.,---.,-.-.,-.-.,---.,---.|-- 
//  |    |   || | || | ||---'|   ||    ====== Start : Custom Google Map
//  `---'`---'` ' '` ' '`---'`   '`--

	$('.dc-gmap').each(function(){ // grabing goolmap section
                var dCrazeGoogMapHeight=$(this).data('height'); // grabing data attribute
                var dCrazeGoogMapId;
                var dCrazeGoogMap = Math.floor((Math.random() * 1000000)+1);
                var dCrazeGoogMapIdCheck = $('body').find('#dcrazegmap'+dCrazeGoogMap);
                var dCrazeGoogMapIdChecklen = dCrazeGoogMapIdCheck.length;
                var customMarker;
                if($(this).attr('data-marker') != 'Undefined' && $(this).attr('data-marker') != ''){
                    customMarker = $(this).attr('data-marker');
                }
                while(dCrazeGoogMapIdChecklen>=1){
                    dCrazeGoogMap = Math.floor((Math.random() * 1000000)+1);
                    dCrazeGoogMapIdCheck = $('body').find('#dcrazegmap'+dCrazeGoogMap);
                    dCrazeGoogMapIdChecklen = dCrazeGoogMapIdCheck.length;
                }
                $(this).append('<div id="dcrazegmap' + dCrazeGoogMap + '"></div>'); // appending google map div
                dCrazeGoogMapId = 'dcrazegmap' + dCrazeGoogMap;
                
                if($.isNumeric(dCrazeGoogMapHeight)){ // checking map height in numeric
                    dCrazeGoogMapHeight = Math.round(dCrazeGoogMapHeight);
                    $(this).children('div').css({ // adding data height to google map
                        width: '100%',
                        height: dCrazeGoogMapHeight + 'px'
                    })
                }
                else{
                    $(this).children('div').css({ // if not found custom height adding default height
                        width: '100%',
                        height: '400px'
                    })
                }
                // setting latitude 
                var myLatlng,
                    mapOptions,
                    map,
                    marker,
                    
                    myLat=$(this).data('latitude'),
                    myLng=$(this).data('longitude'),
                    myZoom = $(this).data('zoom'),
                    mapDrag = $(this).data('draggable'),
                    myDefaultUi = $(this).data('defaultcontrol'),
                    myScrollWheel = $(this).data('scrollable'),
                    myMapType = $(this).data('maptype'),
                    tooltip=$(this).data('mapinfo');
                    if(!tooltip){
                        tooltip='';
                    }
                    if(myMapType=='satellite'){
                        myMapType = 'satellite';
                    }
                    else if(myMapType=='hybrid'){
                        myMapType = 'hybrid';
                    }
                    else if(myMapType=='terrain'){
                        myMapType = 'terrain';
                    }
                    else{
                        myMapType= 'roadmap';
                    }
                    
                    if(!$.isNumeric(myLat)){
                       myLat=22.804598; 
                    }
                    if(!$.isNumeric(myLng)){
                       myLng=89.550186; 
                    }
                    if($.isNumeric(myZoom) && myZoom > 1){
                        myZoom = Math.round(myZoom); 
                    }
                    else{
                        myZoom = 12;
                    }
                    if(mapDrag=='no'){
                        mapDrag=false; 
                    }
                    else{
                        mapDrag=true;
                    }
                    if(myDefaultUi=='yes'){
                        myDefaultUi=false; 
                    }
                    else{
                        myDefaultUi=true;
                    }
                    if(myScrollWheel=='yes'){
                        myScrollWheel=true;
                    }
                    else{
                        myScrollWheel=false; 
                    }
                    
                function dCrazeGmap(){ // custom function
                    
                    myLatlng = new google.maps.LatLng(myLat , myLng);
                    mapOptions = { // map option
                        zoom: myZoom,
                        scrollwheel : myScrollWheel,
                        navigationControl: false,
                        mapTypeControl: true,
                        scaleControl: true,
                        draggable: mapDrag,
                        disableDefaultUI: myDefaultUi,
                        center: myLatlng,
                        mapTypeId: myMapType
                    }
                    map = new google.maps.Map(document.getElementById(dCrazeGoogMapId), mapOptions);

                    // To add the marker to the map, use the 'map' property
                    
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        icon: customMarker
                    });
                    var iw = new google.maps.InfoWindow({
                        content: tooltip
                    });
                    if(tooltip!==''){
                    iw.open(map, marker);
                    google.maps.event.addListener(marker, "click", function (e) { iw.open(map, this); });
                    }
                };
                dCrazeGmap();
                $(window).resize(function(){ // calling same function for responsive design on mobile
                    dCrazeGmap();
                });
            });
})(jQuery);
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;


function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  //var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    center: { lat: 34.067728, lng: -118.447223},
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}


function calcRoute() {
  var markerArray = new Array();
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var start, end;
	  var route = response.routes[0];
      for(var i = 0; i<route.overview_path.length; i++) {
        end = route.overview_path[i];
        if(i == 0 || haversine(start, end) > 5) {
		  
          var marker = new google.maps.Marker({
            position: route.overview_path[i],
            map: map
          });
		var contentString = '<p>Test</p>';
		var infowindow = new google.maps.InfoWindow({
      content: contentString
  });	
		   google.maps.event.addListener(marker, 'click', function() {
			 
				infowindow.open(map,this);
  });
		  
          start = route.overview_path[i];
        }
		
		
		
      }
      directionsDisplay.setDirections(response);
    }
  });

  
 
}
Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}
function haversine(end, start) {
  var dLon = end.lng().toRadians()-start.lng().toRadians();
  var dLat = end.lat().toRadians()-start.lat().toRadians();
  var a = (Math.pow(Math.sin(dLat/2), 2)) + Math.cos(start.lat().toRadians()) * Math.cos(end.lat().toRadians()) * Math.pow(Math.sin(dLon/2), 2);
  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = 3961 * c;
  return d;
}

google.maps.event.addDomListener(window, 'load', initialize);

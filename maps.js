var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

// Where the map starts
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    center: { lat: 34.067728, lng: -118.447223},
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
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
	  
	  
	   var contentString = '<div id="content">'+
      '<p>Test info box</p>' +
      '</div>';
	   var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  
  
      for(var i = 0; i<response.routes[0].overview_path.length; i++) {
        end = response.routes[0].overview_path[i];
        if(i == 0 || haversine(start, end) > 5) {
          var marker = new google.maps.Marker({
            position: response.routes[0].overview_path[i],
            map: map
			title: 'Test Title'
          });
		  
		   google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  
  
          start = response.routes[0].overview_path[i];
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

// Define the AngularJS module
var app = angular.module("MapApp", []);

// Define the controller
app.controller("MapController", function ($scope) {
    let map, markers = [];

    // Initialize the map
    function initMap() {
        const mapOptions = {
            center: { lat: 37.7749, lng: -122.4194 }, // Default: San Francisco
            zoom: 10,
        };

        // Create the map instance
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Add a click event listener to place markers
        map.addListener("click", function (event) {
            placeMarker(event.latLng);
        });
    }

    // Function to place a marker
    function placeMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        markers.push(marker);
    }

    // Load the map after the DOM is loaded
    angular.element(document).ready(function () {
        initMap();
    });
});

let map;

function initMap() {
    const locations = [
        {
            name: "UST Blessed Pier Giorgio Frassati Building",
            description: "This Building is for Senior High School and College of Communication and Computing Science",
            position: { lat: 14.608964933135388, lng: 120.99236791564276 }
        },
        {
            name: "Buenaventura Garcia Paredes, O.P. Building",
            description: "This Building is for Faculty of Arts and Letters and UST College of Tourism and Hospitality Management",
            position: { lat: 14.608332944050334, lng: 120.98826276891752 }
        },
        {
            name: "Quadricentennial Pavilion",
            description: "This Building is for Institute of Physical Education & Athletics and other Athletes",
            position: { lat: 14.609424270893728, lng: 120.99140024761824 }
        },
        {
            name: "Thomas Aquinas Research Complex Auditorium",
            description: "This Building is for conferences and lectures.",
            position: { lat: 14.610559233160144, lng: 120.9873562848916 }
        },
        {
            name: "UST Santísimo Rosario Parish",
            description: "UST Church",
            position: { lat: 14.60886043323613, lng: 120.98795346110415 }
        },
        {
            name: "Tan Yan Kee Student Center",
            description: "Org Building",
            position: { lat: 14.611450112337272, lng: 120.98831729253153 }
        },
        {
            name: "UST Hospital",
            description: "Hospital lang",
            position: { lat: 14.61086897651376, lng: 120.99024456868231 }
        }
        ,
        {
            name: "UST Central Laboratory",
            description: "COS",
            position: { lat: 14.609786274117747, lng: 120.98687750219305 }
        }

    ];

    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: locations[0].position,
    });

    // Add markers and info windows
    locations.forEach(location => {
        const infoContent = `
                        <div>
                            <h3>${location.name}</h3>
                            <p>${location.description}</p>
                        </div>
                    `;
        const infoWindow = new google.maps.InfoWindow({ content: infoContent });

        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.name,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}
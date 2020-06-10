
// the new way fo ecmascript 6
// window.onload = () => {
//     displayStores();
// }

// the old way befor ES6
window.onload = function () {
    displayStores();
}

var map;
var markers = [];
var infoWindow;

// var bardo = { lat: 36.811484, lng: 10.140587 };
function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 8,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });
    // var marker = new google.maps.Marker({ position: bardo, map: map });
    infoWindow = new google.maps.InfoWindow();

    displayStores()
    showStoreMarker()
    setOnClickListener()

}
function displayStores() {
    var storeHtml = ''

    stores.forEach(function (store, index) {
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storeHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">
                    ${phone}
                    </div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index + 1}
                    </div>
                </div>
            </div>                    
        `
    });
    document.querySelector('.stores-list').innerHTML = storeHtml;

}


function showStoreMarker() {
    var bounds = new google.maps.LatLngBounds();
    for (var [index, store] of stores.entries()) {
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name = store.name;
        var address = store.addressLines[0];
        var statustext = store.openStatusText;
        var phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, statustext, phone, index + 1)
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, statustext, phone, index) {

    var html = `<div class="store-info-window">
                    <div class="store-info-name">
                        ${name}
                    </div>
                    <div class="store-info-status">
                        ${statustext}
                    </div>
                    <div class="store-info-address">
                    <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                    </div>
                        ${address}
                     </div>
                    <div class="store-info-phone">
                    <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                    </div>
                         ${phone}
                    </div>
                </div>`

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: index.toString(),
        animation: google.maps.Animation.DROP,

    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);

}

function setOnClickListener() {

    var storeElements = document.querySelectorAll('.store-container');
    console.log(storeElements);
    storeElements.forEach(function (elem, index) {
        elem.addEventListener('click', function () {
            google.maps.event.trigger(markers[index], 'click');
        })
    });
}

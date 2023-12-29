<script>
  import { defineComponent, ref } from "vue";
  import { GoogleMap, Marker } from "vue3-google-map";
  
  export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { GoogleMap, Marker },
    options:{
      zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
    },
    setup() {      
      const center = { lat: -8.897641, lng: 13.185581 };
      const locations = [
        { lat: -8.897641, lng: 13.185581, icon: 'src/assets/icon_atm_red.png'},
        { lat: -8.897700, lng: 13.185400, icon: 'src/assets/icon_atm_green.png'},
        { lat: -8.896900, lng: 13.185200, icon: 'src/assets/icon_atm_yellow.png.png'},
        { lat: -8.896500, lng: 13.185900, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897300, lng: 13.184700, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897100, lng: 13.186000, icon: 'src/assets/icon_atm.png'},
        { lat: -8.898000, lng: 13.185300, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896700, lng: 13.184800, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897500, lng: 13.185700, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896800, lng: 13.186200, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897200, lng: 13.185000, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896600, lng: 13.185400, icon: 'src/assets/icon_atm.png'},
        { lat: -8.898100, lng: 13.185700, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896900, lng: 13.186100, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897800, lng: 13.185200, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897000, lng: 13.185600, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896400, lng: 13.185300, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897600, lng: 13.185800, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896800, lng: 13.184900, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897400, lng: 13.186000, icon: 'src/assets/icon_atm.png'},
        { lat: -8.898200, lng: 13.185400, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896700, lng: 13.185200, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897900, lng: 13.185900, icon: 'src/assets/icon_atm.png'},
        { lat: -8.896500, lng: 13.185700, icon: 'src/assets/icon_atm.png'},
        { lat: -8.897300, lng: 13.185100, icon: 'src/assets/icon_atm.png'}
    ];

    const themes = ['aubergine', 'dark', 'grey', 'minimal', 'retro', 'roadways', 'roadwaysMinimal', 'ultraLight']
    const theme = ref('dark')
    const styless = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ];

      return { center, locations,themes, theme, styless };
    },
  });
</script>

<template>
  <div class="map-container">
    <GoogleMap
      api-key="AIzaSyBHRnPECJNHMjp8-QSgWrIMFesfllVB6Kw"
      style="width: 100%; height: 100%"      
      
      :zoomControl="true"
      :center="center"
      :zoom="15"     
      :styles="styless" 
      :fullscreenControl="true"
      :mapTypeControl="false"
      :noClear="false"
      :keyboardShortcuts="false"
      :scrollwheel="false"
      :disableDefaultUi="false"
    >
   
      <Marker :options="{ position: center }" /> 
      <Marker v-for="(location, i) in locations" :options="{ position: location,icon: location.icon }" :key="i" />            
    </GoogleMap>
    
    </div>
  </template>
  
  <style scoped>
    .map-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    </style>
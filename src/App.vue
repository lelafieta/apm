<script>
import { defineComponent, ref, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow, Polyline, Polygon  } from "vue3-google-map";
import { styles } from "./data/styles";
import { atms } from "./data/atms";
import { mdas } from "./data/mdas";
import { status } from "./data/status";
import { useGeolocation } from "@vueuse/core";
import DirectionsRenderer from "@/views/components/DirectionsRenderer";
import $ from 'jquery'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { GoogleMap, Marker, InfoWindow, Polyline,Polygon, DirectionsRenderer   },
  options: {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  },

  setup() {    
    const { coords, locatedAt, error, resume, pause } = useGeolocation();
    //const center = { lat: -8.897641, lng: 13.185581 };
    const center = ref([]);

    const locations = [];
    let allAtms = ref([]);
    const atmss = ref([]);
    const items = ref([]);
    const value = ref("");
    const clickWithMoney = ref(false);
    const clickWithoutMoney = ref(false);
    const clickWithPaper = ref(false);
    const clickWithoutPaper = ref(false);
    const isClasseAtiva = ref(false);
    const myLatitude = ref("");
    const myLongitude = ref("");
    let markerOptions = [];
    const theorigin = { lat: -8.992384, lng: 13.2639 };
    const thedestination = { lat: -8.92682699, lng: 13.35133756 };
    const title = ref("ATMs")    
    
    const flightPlanCoordinates = ref([]);
    const flightPath = {
      path: flightPlanCoordinates.value,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    };

    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];
    const bermudaTriangle = {
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    };

    newFunction();
    locatorButtonPressed();

    const dialog = ref(false);
    function jqueryFunc(){
      
    }

    function locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          
          myLatitude.value = position.coords.latitude
          myLongitude.value = position.coords.longitude             
          
          //markerOptions = {position:{ lat: position.coords.latitude, lng: position.coords.longitude }, title: "Minha localização"}
          //markerOptions = {position:{ lat: -8.992384, lng: 13.2639 }, title: "Minha localização"}
        },
        (error) => {
          console.log(error.message);
        }
      );
    }

    function newFunction() {
      //option = {position:{ lat: -8.992384, lng: 13.2639 }, icon:"src/assets/icon_atm_yellow.png"}
      //drawLineBetweenEndPoints()
      
      
      
      onMounted(() => {
        center.value = {
            lat: myLatitude,
            lng: myLongitude,            
            icon: "src/assets/icon_atm_red.png"
          };
          jqueryFunc()
        markerOptions = {position:{ lat: myLatitude.value, lng: myLongitude.value }, title: "Minha localização"}        
        fullAllAtm();      
      });


    }

    function fullAllAtm() {
      locations.value = []
      allAtms.value = []
      value.value = []
      let icon = "src/assets/icon_atm.png";
          atms.map((location) => {
            locations.push({
              lat: location.lat,
              lng: location.long,
              icon: icon,
              country: location.atm_sigit_localizacao,
              denominacao: location.denominacao,
              atm_sigit_code: location.atm_sigit_code,
            });
          });

          status.map((state) => {
            locations.map((location) => {
              if(state.atm_id==location.atm_sigit_code) {
                if(state.estado_dinheiro==1) {
                  location.icon="src/assets/icon_atm_green.png";
                } else if(state.estado_dinheiro==2) {
                  location.icon="src/assets/icon_atm_yellow.png";
                } else {
                  location.icon="src/assets/icon_atm_red.png";
                }
                items.value=[];
                allAtms.value.push({ atm: location, status: state });
                atmss.value.push({ atm: location, status: state });
                allAtms.value.map((element) => {
                  items.value.push(element.atm.denominacao);
                });
              }
            });
          });
        }

    function distanceBetween(lat1, lon1, lat2, lon2) {
      // Implemente a lógica de cálculo de distância entre duas coordenadas geográficas
      // Você pode usar a fórmula Haversine ou alguma biblioteca externa, como geolib.js
      // Por exemplo, uma função simples para calcular a distância em metros usando a fórmula de Haversine:

      const earthRadius = 6371000; // Raio da Terra em metros
      const deg2rad = (deg) => deg * (Math.PI / 180);

      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;

      return distance;
    }

    function filteredItems() {
      //console.log("trocou!!")
      //console.log(value.value)
      const array = ref([]);
      if (value.value != null && value.value.length != 0) {
        array.value = atmss.value.filter((item) => {
          //console.log(item)
          return item.atm.denominacao
            .toLowerCase()
            .includes(value.value.toLowerCase());
        });

        if (value.value.length == 0) {
          allAtms.value = atmss;
        }
        allAtms.value = array.value;
      }
    }

    function withMoney() {
      clickWithMoney.value = !clickWithMoney.value;
      search();
    }

    function withoutMoney() {
      clickWithoutMoney.value = !clickWithoutMoney.value;
      search();
    }
    function withPaper() {
      clickWithPaper.value = !clickWithPaper.value;
    }
    function withoutPaper() {
      clickWithoutPaper.value = !clickWithoutPaper.value;
      console.log(clickWithMoney.value);
    }

    function search() {
      allAtms.value = [];

      if (clickWithMoney.value == false && clickWithoutMoney.value == false) {
        allAtms.value = atmss.value;
      } else {
        if (clickWithMoney.value == true) {
          atmss.value.map((element) => {
            if (
              element.status.estado_dinheiro == 1 ||
              (element.status.estado_dinheiro == 2 &&
                element.status.estado_papel == 1)
            ) {
              allAtms.value.push(element);
            }
          });
        }

        if (clickWithoutMoney.value == true) {
          atmss.value.map((element) => {
            if (
              element.status.estado_dinheiro == 0 &&
              element.status.estado_papel == 1
            ) {
              allAtms.value.push(element);
            }
          });
        }
      }
    }

    function atmConfig(){
      title.value = "ATMs"
    }

    function mdaConfig(){
      title.value = "MDAs"      
    }

    function cleanValue(){
      value.value = ""
      fullAllAtm();
    }

    return {
      center,
      locations,
      styles,
      dialog,
      allAtms,
      atmss,
      clickWithMoney,
      clickWithoutMoney,
      clickWithPaper,
      clickWithoutPaper,
      withMoney,
      isClasseAtiva,
      withoutMoney,
      withoutPaper,
      withPaper,
      search,
      items,
      value,
      filteredItems,
      coords,
      locatedAt,
      error,
      resume,
      pause,
      distanceBetween,
      locatorButtonPressed,
      flightPath,
      myLatitude,
      myLongitude,
      markerOptions,
      bermudaTriangle,
      //drawLineBetweenEndPoints
      theorigin,
      thedestination,
      jqueryFunc,
      title,
      atmConfig,
      mdaConfig,
      cleanValue
    };
  },
  methods: {},
});
</script>

<template>  
  <!-- {{ coords.latitude }}
  &nbsp;
  {{ coords.longitude }} -->
  <div id="menu">
    <div class="search-input">
      <!-- <p>Limpar</p> -->
      <v-combobox
        v-model="value"
        :items="items"
        :change="filteredItems()"
        density="compact"
        label="Pesquisar"
      ></v-combobox>
    </div>
    <div class="number">
      {{ allAtms.length }}
    </div>
    <div class="clean" @click="cleanValue()">
      Limpar
    </div>
    <p class="title">{{ title }}</p>
    <div class="controlers">
      <v-btn
        prepend-icon="mdi-cash-100"
        :class="{ active: clickWithMoney, btn: true }"
        @click="withMoney"
      >
        Com dinheiro + Papel
      </v-btn>
      
      <v-btn
        prepend-icon="mdi-cash-100"
        :class="{ active: clickWithoutMoney, btn: true }"
        @click="withoutMoney"
      >
        Sem dinheiro + Papel
      </v-btn>
      
    </div>
  </div>
  <br /><br /><br />

  <div class="map-container">
   
    <GoogleMap
      api-key="AIzaSyBHRnPECJNHMjp8-QSgWrIMFesfllVB6Kw"
      style="width: 100%; height: 100%"
      :zoomControl="true"
      :center="center"
      :zoom="15"
      :styles="styles"
      :fullscreenControl="false"
      :mapTypeControl="false"
      :keyboardShortcuts="false"
      :disableDefaultUi="false"
     class="google-map-atm" v-if="title == 'ATMs'">

    
      
      <DirectionsRenderer travelMode="DRIVING" :origin="theorigin" :destination="thedestination"/>
      
      <Marker       
        :options="markerOptions"        
      />
      
      
      <Polyline :options="flightPath" />

      <Polygon :options="bermudaTriangle" />

      <Marker
        v-for="(atm, i) in allAtms"
        :options="{ position: atm.atm, icon: atm.atm.icon }"
        :key="i"
      >
        <InfoWindow>
          <div id="content">
            <div id="siteNotice"></div>
            <h3
              id="firstHeading"
              class="firstHeading red"
              v-if="atm.status.estado_dinheiro == 0"
            >
              SEM DINHEIRO
            </h3>
            <h3
              id="firstHeading"
              class="firstHeading green"
              v-else-if="atm.status.estado_dinheiro == 1"
            >
              COM DINHEIRO
            </h3>
            <h3 id="firstHeading" class="firstHeading orange" v-else>
              POUCO DINHEIRO
            </h3>
            <div id="bodyContent">
              <p v-on:click="test" class="bold">{{ atm.atm.country }}</p>
              <b>
                <p v-on:click="test">{{ atm.atm.denominacao }}</p>
              </b>
              <b>
                <p>Lat: {{ atm.atm.lat }}, Long: {{ atm.atm.lng }}</p>
              </b>
              <p v-if="atm.status.estado_papel == 1" class="green bold">
                COM PAPEL
              </p>
              <p v-else-if="atm.status.estado_papel == 0" class="red bold">
                NÃO PAPEL
              </p>
              <p v-else class="orange bold">NÃO PAPEL</p>
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>

    <GoogleMap
      api-key="AIzaSyBHRnPECJNHMjp8-QSgWrIMFesfllVB6Kw"
      style="width: 100%; height: 100%"
      :zoomControl="true"
      :zoom="2"
      :styles="styles"
      :fullscreenControl="false"
      :mapTypeControl="false"
      :keyboardShortcuts="false"
      :disableDefaultUi="false"
     class="google-map-atm" v-else>

    
      <Marker       
        :options="markerOptions"        
      />
            
      <!-- <Marker
        v-for="(atm, i) in allAtms"
        :options="{ position: atm.atm, icon: atm.atm.icon }"
        :key="i"
      >
        <InfoWindow>
          <div id="content">
            <div id="siteNotice"></div>
            <h3
              id="firstHeading"
              class="firstHeading red"
              v-if="atm.status.estado_dinheiro == 0"
            >
              SEM DINHEIRO
            </h3>
            <h3
              id="firstHeading"
              class="firstHeading green"
              v-else-if="atm.status.estado_dinheiro == 1"
            >
              COM DINHEIRO
            </h3>
            <h3 id="firstHeading" class="firstHeading orange" v-else>
              POUCO DINHEIRO
            </h3>
            <div id="bodyContent">
              <p v-on:click="test" class="bold">{{ atm.atm.country }}</p>
              <b>
                <p v-on:click="test">{{ atm.atm.denominacao }}</p>
              </b>
              <b>
                <p>Lat: {{ atm.atm.lat }}, Long: {{ atm.atm.lng }}</p>
              </b>
              <p v-if="atm.status.estado_papel == 1" class="green bold">
                COM PAPEL
              </p>
              <p v-else-if="atm.status.estado_papel == 0" class="red bold">
                NÃO PAPEL
              </p>
              <p v-else class="orange bold">NÃO PAPEL</p>
            </div>
          </div>
        </InfoWindow>
      </Marker>
       -->
    </GoogleMap>

    <ul id="nav">
      <li style="margin: 50px 0 0 0" @click="atmConfig()"><a href="#" title="Caixas automáticos (ATMS)"><span class="material-icons-sharp mt-2 text-white">atm</span></a></li>
      <li style="margin: 0px 0 0 -50px" @click="mdaConfig()"><a href="#" title="MDAs"><i class="icon-caret-up"></i><span class="material-icons-sharp mt-2 text-white">drive_eta</span></a></li>
      <li style="margin: -50px 0 0 0"><a href="#" title="Raio"><span class="material-icons-sharp mt-2 text-white">explore</span></a></li>
    </ul>
    
  </div>

  <!-- <div class="text-center">
    <v-btn color="primary" @click="dialog = true"> Open Dialog </v-btn>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <p>Valor:</p>
          <p>Valor:</p>
          <p>Valor:</p>
          <p>Valor:</p>
          <p>Valor:</p>
          <p>Valor:</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->
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
  z-index: -1;
}

.search-input {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 400px;
  height: 40px;
  background: white;
  border-radius: 5px;
}

#menu {
  width: 100%;
  background: red;
}

.controlers {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  justify-content: space-between;
}

.controlers .btn {
  margin-left: 10px;
}

.active {
  background: green;
  color: white;
}

.with-money {
  color: green;
}

.red {
  color: red;
}

.green {
  color: green;
}

.orange {
  color: orange;
}

.bold {
  font-weight: 600;
  padding-top: 10px;
}

* {
  outline: none;
}

.number {
  position: fixed;
  top: 20px;
  left: 530px;
  background: #ffbf75;
  width: 45px;
  height: 45px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 900;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
}

.clean {
  position: fixed;
  top: 20px;
  left: 430px;
  background: #f86f6f;
  padding: 8px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
}
.nav{
  z-index: -99;
}
.title{
  position: fixed;
  top: 15px;
  left: 50%;
  background-color: black;
  padding: 10px;
  font-weight: bold;
  color: white;
  border-radius: 10px;
}

.clean{
  cursor: pointer;
}
</style>

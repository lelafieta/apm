import { defineComponent } from "vue";
export default defineComponent({
  name: "directionsRenderer",

  ctr() {
    return window.google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String }
  },

  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this;
        if (!origin || !destination || !travelMode) return;

        directionsService.route(
          {
            origin,
            destination,
            travelMode
          },
          (response, status) => {
            console.log("AQUI!!!!")
            if (status !== "OK") return;
            directionsRenderer.setDirections(response);
          }
        );
      }
    );
  }
});
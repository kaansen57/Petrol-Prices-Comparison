import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPetrol: "Seçiniz",
    titlePrice: [],
    city: "",
    district: ""
  },
  getters: {
    selectedPetrols(state) {
      return state.selectedPetrol;
    },
    titlePrices(state) {
      return state.titlePrice;
    },
    citys(state) {
      return state.city;
    },
    districts(state) {
      return state.districts;
    },
  },
  mutations: {
    selectedPetrolSet(state, payload) {
      state.selectedPetrol = payload
    },
    titlePriceSet(state, payload) {
      if (!payload) {
        state.titlePrice = []
      } else {
        state.titlePrice.push(payload);
      }
    },
    citySet(state, payload) {
      state.city = payload;
    },
    districtSet(state, payload) {
      state.district = payload;
    }
  },
  actions: {
    petrolOfisiAction(context) {
      const options = {
        url: `https://www.petrolofisi.com.tr/posvc/fiyat/guncel?il=${context.state.city}&Ilce=${context.state.district}`,
        method: "GET",
      };
      axios(options)
        .then((res) => {
          console.log(res)
          Object.keys(res.data).forEach((key) => {
            if (key === "AktarimTarihi") {
            } else {
              context.commit("titlePriceSet", { title: key, price: res.data[key] })
            }
          });
        })
        .catch((err) => {
          console.error("Connected Failed " + err);
        });
    },
    opet() {

    }
  }
})

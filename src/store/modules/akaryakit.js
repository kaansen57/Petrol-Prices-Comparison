import axios from 'axios';
const OPET_API = process.env.VUE_APP_OPET_API;
const PO_PRICES_API  = process.env.VUE_APP_PO_PRICES_API;
const PO_DISTRICT_API  = process.env.VUE_APP_PO_DISTRICT_API;



const state = {
    selectedPetrol: "Seçiniz",
    titlePrice: [],
    city: "",
    district: "",
    districts: [],
}

const getters = {
    selectedPetrols(state) {
        return state.selectedPetrol;
    },
    titlePrices(state) {
        return state.titlePrice;
    },
    citys(state) {
        return state.city;
    },
    districtsGet(state) {
        return state.district;
    },
    arrDistricts(state) {
        return state.districts;
    }
}

const mutations = {
    selectedPetrolSet(state, payload) {
        state.selectedPetrol = payload
    },
    titlePriceSet(state, payload) {
        if (!payload) {
            state.titlePrice = []
        } else {
            state.titlePrice = payload;
        }
    },
    citySet(state, payload) {
        if (state.selectedPetrol === "PO" && payload === "AFYONKARAHISAR") {
            state.city = "AFYON";
        } else {
            state.city = payload;
        }
    },
    districtSet(state, payload) {
        state.district = payload;
    },
    arrDistrictSet(state, payload) {
        if (!payload) {
            state.districts = []
        } else {
            state.districts.push(payload);
        }
    },
}
const actions = {
    opetDistrict(context) {
        const options = {
            url: `${OPET_API + context.getters.citys}`,
            method: "POST",
        };
        axios(options)
            .then((res) => {
                res.data.data
                    .forEach((x) => {
                        context.commit("arrDistrictSet", x._IlceAd);
                    });
            })
            .catch((err) => {
                console.error("Connected Failed " + err);
            });
    },
    petrolOfisiDistrict(context) {
        const options = {
            url: `${PO_DISTRICT_API+context.getters.citys}`,
            method: "GET"
        };
        axios(options)
            .then((res) => {
                res.data.Ilceler.forEach((x) => {
                    context.commit("arrDistrictSet", x);
                })
            })
            .catch((err) => {
                console.error(err);
            })
    },
    petrolOfisiAction(context) {
        const options = {
            url: `${PO_PRICES_API+context.getters.citys}&Ilce=${context.getters.districtsGet}`,
            method: "GET",
        };
        axios(options)
            .then((res) => {
                const data = res.data;
                const arr = [
                    { title: "V/Max Kurşunsuz 95", price: data.K95 },
                    { title: "V/Max Kurşunsuz 97", price: data.K97 },
                    { title: "V/Max EuroDiesel", price: data.Mot50 },
                    { title: "V/Pro EuroDiesel", price: data.MotPro },
                    { title: "PO/Gaz", price: data.PoGaz }
                ];
                context.commit("titlePriceSet", arr);
            })
            .catch((err) => {
                console.error(err);
            });
    },
    opet(context) {
        const options = {
            url: `${OPET_API+context.getters.citys}`,
            method: "POST",
        };
        axios(options)
            .then((res) => {
                res.data.data
                    .filter((district) =>
                        district._IlceAd.includes(context.getters.districtsGet)
                    )
                    .forEach((x) => {
                        const arr = [
                            { title: "Kurşunsuz 95", price: x._Kursunsuz95 },
                            { title: "Motorin", price: x._Motorin },
                            { title: "Motorin Eco Force", price: x._MotorinEcoForce },
                            { title: "Fuel Oil", price: x._FuelOil },
                            { title: "Yüksek Kükürtlü Oil", price: x._YuksekKukurtluOil },
                            { title: "Gaz Yağı", price: x._GazYagi },
                            { title: "Kalorifer Yakıtı", price: x._KaloriferYakiti }];
                        context.commit("titlePriceSet", arr);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
import axios from 'axios';


const state = {
    selectedPetrol: "Seçiniz",
    titlePrice: [],
    city: "",
    district: "",
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
    districts(state) {
        return state.districts;
    },
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
        state.city = payload;
    },
    districtSet(state, payload) {
        state.district = payload;
    },
}

const actions = {
    petrolOfisiAction(context) {
        const options = {
            url: `https://www.petrolofisi.com.tr/posvc/fiyat/guncel?il=${context.state.city}&Ilce=${context.state.district}`,
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
                console.error("Connected Failed " + err);
            });
    },
    opet(context) {
        const options = {
            url: `https://www.opet.com.tr/AjaxProcess/GetFuelPricesList?Cityname=${context.state.city}`,
            method: "POST",
        };
        axios(options)
            .then((res) => {
                res.data.data
                    .filter((district) =>
                        district._IlceAd.includes(context.state.district)
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
                console.error("Connected Failed " + err);
            });
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
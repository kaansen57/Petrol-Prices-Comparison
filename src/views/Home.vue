<template>
  <div>
    <Header :petrol="selectedPetrol" />
    <div class="row mx-auto">
      <div class="col-md-4 custom-margin">
        <div class="input-group">
          <select
            class="custom-select"
            id="input1"
            @change="ilId($event)"
            v-model="selectedCity"
          >
            <option selected disabled>Seçiniz</option>
            <option :value="i" v-for="(il, i) in iller" :key="i" selected>
              {{ il.il }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4 custom-margin">
        <select class="custom-select" id="input2" v-model="selectedDistrict">
          <option selected disabled>Seçiniz</option>
          <option
            :value="ilce.toUpperCase()"
            v-for="(ilce, i) in districts"
            :key="i"
            selected
          >
            {{ ilce }}
          </option>
        </select>
      </div>

      <div class="col-md-4 custom-margin">
        <select class="custom-select" id="input2" v-model="selectedPetrol">
          <option selected disabled>Seçiniz</option>
          <option value="PO">Petrol Ofisi</option>
          <option value="OPET">Opet</option>
        </select>
      </div>
    </div>
    <div class="row mx-auto">
      <Card
        :title="fiyat.title"
        :price="fiyat.price"
        :petrol="selectedPetrol"
        v-for="(fiyat, i) in titlePrice"
        :key="i"
      ></Card>
    </div>
  </div>
</template>

<script>
import cityJSON from "@/il-ilce.json";
import axios from "axios";
import Header from "@/components/Header";
import Card from "@/components/Card";

export default {
  data() {
    return {
      iller: [],
      selectedCity: "Seçiniz",
      selectedPetrol: "Seçiniz",
      selectedDistrict: "Seçiniz",
      cityNo: -1,
      districts: [],
      po: [],
      opet: [],
      titlePrice: [],
    };
  },
  components: {
    Header,
    Card,
  },
  methods: {
    ilId(event) {
      this.cityNo = parseInt(event.target.value);
    },
    petrolSelect(event) {
      this.selectedPetrol = event.target.value;
    },
    turkishToEnglish(deger) {
      return deger
        .replace(/Ğ/gim, "G")
        .replace(/Ü/gim, "U")
        .replace(/Ş/gim, "S")
        .replace(/İ/gim, "I")
        .replace(/Ö/gim, "O")
        .replace(/Ç/gim, "C")
        .replace(/ğ/gim, "g")
        .replace(/ü/gim, "u")
        .replace(/ş/gim, "s")
        .replace(/ı/gim, "i")
        .replace(/ö/gim, "o")
        .replace(/ç/gim, "c");
    },
  },
  watch: {
    cityNo(newValue, oldValue) {
      this.selectedDistrict = "Seçiniz";
      this.selectedPetrol = "Seçiniz";
      this.districts = [];
      this.titlePrice = [];

      for (let i of this.iller[newValue].ilceleri) {
        this.districts.push(i);
      }
    },
    selectedDistrict() {
      this.titlePrice = [];
      this.selectedPetrol = "Seçiniz";
    },
    selectedPetrol(newValue, oldValue) {
      this.titlePrice = [];
      if (newValue === "PO") {
        let citys = this.turkishToEnglish(this.iller[this.cityNo].il);
        let district = this.turkishToEnglish(this.selectedDistrict);
        const options = {
          url: `https://www.petrolofisi.com.tr/posvc/fiyat/guncel?il=${citys.toUpperCase()}&Ilce=${district.toUpperCase()}`,
          method: "GET",
        };

        axios(options)
          .then((res) => {
            Object.keys(res.data).forEach((key) => {
              if (key === "AktarimTarihi") {
              } else {
                this.titlePrice.push({ title: key, price: res.data[key] });
              }
            });
          })
          .catch((err) => {
            console.error("Connected Failed");
          });
      } else if (newValue === "OPET") {
        const options = {
          url: `https://www.opet.com.tr/AjaxProcess/GetFuelPricesList?Cityname=${this.iller[
            this.cityNo
          ].il.toUpperCase()}`,
          method: "POST",
        };
        axios(options)
          .then((res) => {
            console.log(res);

            res.data.data
              .filter((district) =>
                district._IlceAd.includes(this.selectedDistrict.toUpperCase())
              )
              .forEach((x) => {
                this.titlePrice.push(
                  { title: "Kurşunsuz 95", price: x._Kursunsuz95 },
                  { title: "Motorin", price: x._Motorin },
                  { title: "Motorin Eco Force", price: x._MotorinEcoForce },
                  { title: "Fuel Oil", price: x._FuelOil },
                  { title: "Yüksek Kükürtlü Oil", price: x._YuksekKukurtluOil },
                  { title: "Gaz Yağı", price: x._GazYagi },
                  { title: "Kalorifer Yakıtı", price: x._KaloriferYakiti }
                );
              });
          })
          .catch((err) => {
            console.log("Connected Failed");
          });
      }
    },
  },
  created() {
    this.iller = cityJSON;
  },
};
</script>

<style scoped>
.custom-margin {
  margin-top: 3rem;
}
</style>
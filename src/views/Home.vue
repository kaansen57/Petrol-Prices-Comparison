<template>
  <div>
    <Header :petrol="selectedPetrol" />
    <div class="row mx-auto">
      <div class="col-md-12 text-center mt-4">
        <h1 :class="textBg"><b> Akaryakıt Fiyat Karşılaştırması</b></h1>
      </div>
    </div>
    <div class="row mx-auto">
      <div class="col-md-3 custom-margin">
        <select class="custom-select" id="input2" v-model="selectedPetrol">
          <option selected disabled>Seçiniz</option>
          <option value="PO">Petrol Ofisi</option>
          <option value="OPET">Opet</option>
        </select>
      </div>
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
      <div class="col-md-3 custom-margin">
        <select class="custom-select" id="input2" v-model="selectedDistrict">
          <option selected disabled>Seçiniz</option>
          <option
            :value="ilce"
            v-for="(ilce, i) in districts"
            :key="i"
            selected
          >
            {{ ilce }}
          </option>
        </select>
      </div>
      <div class="col-md-2 custom-margin">
        <transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <button
            class="btn col-md-9"
            :class="btnBg"
            v-if="selectedDistrict !== 'Seçiniz'"
            @click="pricesGet"
          >
            Fiyatları Getir
          </button>
        </transition>
      </div>
    </div>
    <transition-group
      enter-active-class="animate__animated animate__bounceInLeft"
      leave-active-class="animate__animated animate__bounceOutRight"
      appear
    >
      <Card
        class="float-left"
        :cardData="item"
        v-for="(item, i) in titlePrices"
        :key="cardKey[i]"
      ></Card>
    </transition-group>
  </div>
</template>

<script>
import cityJSON from "@/il-ilce.json";
import axios from "axios";
import { mapGetters } from "vuex";
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
      textBg: "text-dark",
      btnBg: "btn-dark",
      cardKey: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    poVuexConfig() {
      this.$store.commit(
        "citySet",
        this.turkishToEnglish(this.iller[this.cityNo].il.toUpperCase())
      );
      this.$store.commit(
        "districtSet",
        this.turkishToEnglish(this.selectedDistrict.toUpperCase())
      );
      this.$store.dispatch("petrolOfisiAction");
    },
    opetVuexConfig() {
      this.$store.commit("citySet", this.iller[this.cityNo].il);
      this.$store.commit("districtSet", this.selectedDistrict.toUpperCase());

      this.$store.dispatch("opet");
    },
    pricesGet() {
      if (this.selectedPetrols === "PO") {
        this.poVuexConfig();
      } else if (this.selectedPetrols === "OPET") {
        this.opetVuexConfig();
      }
    },
  },
  computed: {
    ...mapGetters(["titlePrices", "selectedPetrols", "arrDistricts", "citys"]),
  },
  watch: {
    cityNo(newValue, oldValue) {
      this.$store.commit("arrDistrictSet", false); // ilçeleri statede temizle temizle
      this.$store.commit("titlePriceSet", false);
     
      this.selectedDistrict = "Seçiniz";

      if (this.selectedPetrols === "PO") {
         this.$store.commit("citySet", this.turkishToEnglish(this.iller[newValue].il.toUpperCase()));
        this.$store.dispatch("petrolOfisiDistrict");
        this.districts = this.arrDistricts;
      } else if (this.selectedPetrols === "OPET") {
         this.$store.commit("citySet",this.iller[newValue].il)
        this.$store.dispatch("opetDistrict");
        this.districts = this.arrDistricts;
      }
    },
    selectedDistrict() {
      this.$store.commit("titlePriceSet", false);
    },
    selectedPetrol(newValue) {
      this.districts = [];
      this.selectedCity = "Seçiniz";
      this.selectedDistrict = "Seçiniz";
      this.iller = cityJSON;

      this.$store.commit("titlePriceSet", false); //cardDatasını temizlemek için mutationa false gönder.
      this.$store.commit("selectedPetrolSet", newValue);

      if (newValue === "PO") {
        this.textBg = "text-danger ";
        this.btnBg = "btn-danger ";
      } else if (newValue === "OPET") {
        this.textBg = "opet";
        this.btnBg = "opet-btn";
      }
    },
  },
  created() {},
};
</script>

<style scoped>
.custom-margin {
  margin-top: 3rem;
}
.opet {
  color: #005295;
}
.opet-btn {
  color: white;
  background-color: #005295;
}
.opet-btn:hover {
  color: white;
  background-color: #01447a;
}
</style>
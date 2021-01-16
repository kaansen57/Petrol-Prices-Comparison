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
    <transition-group
      enter-active-class="animate__animated animate__bounceInLeft"
      leave-active-class="animate__animated animate__bounceOutRight"
      appear
    >
      <Card
        class="float-left"
        :cardData="item"
        v-for="(item, i) in titlePrices"
        :key="i"
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
  computed: {
    ...mapGetters(["titlePrices", "selectedPetrols"]),
  },
  watch: {
    cityNo(newValue, oldValue) {
      this.selectedDistrict = "Seçiniz";
      this.selectedPetrol = "Seçiniz";
      this.districts = [];
      for (let i of this.iller[newValue].ilceleri) {
        this.districts.push(i);
      }
    },
    selectedDistrict() {
      this.selectedPetrol = "Seçiniz";
    },
    selectedPetrol(newValue, oldValue) {
      this.$store.commit("titlePriceSet", false); //cardDatasını temizlemek için mutationa false gönder.
      this.$store.commit("selectedPetrolSet", newValue);

      if (newValue === "PO") {
        this.$store.commit(
          "citySet",
          this.turkishToEnglish(this.iller[this.cityNo].il.toUpperCase())
        );
        this.$store.commit(
          "districtSet",
          this.turkishToEnglish(this.selectedDistrict.toUpperCase())
        );
        this.$store.dispatch("petrolOfisiAction");
      } else if (newValue === "OPET") {
        console.log("opetegirdi");
        this.$store.commit("citySet", this.iller[this.cityNo].il.toUpperCase());
        this.$store.commit("districtSet", this.selectedDistrict.toUpperCase());
        this.$store.dispatch("opet");
      }
    },
  },
  created() {
    this.iller = cityJSON;
  },
};
</script>

<style >
.custom-margin {
  margin-top: 3rem;
}
</style>
<template>
  <div>
    <Header />
    <div class="row">
      <div class="col-md-5 custom-margin">
        <div class="input-group mb-3 px-3">
          <select
            class="custom-select"
            id="inputGroupSelect01"
            @change="ilId($event)"
            v-model="cityId"
          >
            <option selected>Seçiniz</option>
            <option :value="i" v-for="(il, i) in iller" :key="i">
              {{ il.il }}
            </option>
          </select>
          
          <select class="custom-select" id="inputGroupSelect01">
            <option v-for="(ilce, i) in ilceler" :key="i">{{ ilce }}</option>
          </select>
        </div>
      </div>

      <div class="col-md-2 text-center custom-margin">
        <button type="button" class="btn btn-danger" @click="bas">
          Comparison
        </button>
      </div>

      <div class="col-md-5 custom-margin">
      
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import cityJSON from "@/il-ilce.json";
export default {
  data() {
    return {
      iller: [],
      cityId: "",
      cityNo: 1,
      ilceler: [],
    };
  },
  components: {
    Header,
  },
  methods: {
    ilId(event) {
      this.cityNo = parseInt(event.target.value);
    },
    bas() {
      // console.log(this.iller[this.cityId].ilceleri);
    },
  },
  watch: {
    cityNo(yeni, eski) {
      this.ilceler = [];
      for (let i of this.iller[yeni].ilceleri) {
        this.ilceler.push(i);
      }
      console.log(this.ilceler);
    },
  },
  created() {
    this.iller = cityJSON;
   
  },
};
</script>

<style scoped>
.custom-margin {
  margin-top: 8rem;
}
</style>
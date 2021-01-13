<template >
  <div class="col-md-4 mt-4 mx-auto">
    <div class="card po po-image text-center p-4" v-if="petrol === 'PO'">
      <div class="card-title">
        <h3 class="mt-3 text-white">{{ title }}</h3>
      </div>
      <hr />
      <div class="card-body">
        <h4 class="text-white">
          <span
            ><b>{{ price }}</b></span
          >
        </h4>
      </div>
    </div>

    <div class="card opet opet-image text-center p-4" v-if="petrol === 'OPET'">
      <div class="card-title">
        <h3 class="mt-4 text-white">{{ title }}</h3>
      </div>
      <hr />
      <div class="card-body">
        <h4 class="text-white">
          <span
            ><b>{{ price }}</b></span
          >
        </h4>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Card",
  props: ["title", "price", "petrol"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.po {
  border-radius: 50px;
  background: #cb1515;
  box-shadow: 11px 11px 22px #b11111, -11px -11px 22px #f4f5f5;
}

.opet {
  border-radius: 50px;
  background: #1564cb;
  box-shadow: 11px 11px 22px #0f4892, -11px -11px 22px #f4f5f5;
}
.po-image {
  background-image: url("../assets/pologo.png");
  background-repeat: no-repeat;
  background-position: 10% 10px;
  background-size: 20%;
}

.opet-image {
  background-image: url("../assets/opet-logo.png");
  background-repeat: no-repeat;
  background-position: 10% 20px;
  background-size: 20%;
}
</style>
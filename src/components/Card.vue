<template >
  <div class="col-md-4 mt-4 mx-auto" >
    <div class="card po po-image shadow text-center p-4" v-if="petrol === 'PO'">
      <div class="card-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <h4>{{ price }}</h4>
      </div>
    </div>

    <div class="card opet opet-image shadow text-center p-4"  v-if="petrol === 'OPET'">
      <div class="card-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <h4>{{ price }}</h4>
      </div>
    </div>
  </div>

  <!-- <div class="col-md-4 mt-4 ">
      
    </div> -->
</template>



<script>
export default {
  name: "Card",
  props: ["title", "price", "petrol"],
};
</script>

<style scoped>
.po {
  background: rgba(208, 2, 27, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20.5px);
  -webkit-backdrop-filter: blur(20.5px);
}

.opet {
  background: rgba(11, 113, 182, 0.568);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border-radius: 10px;
}
.po-image {
  border-radius: 10px;
  background-image: url("../assets/pologo.png");
  background-repeat: no-repeat;
  background-position:15px 15px;
  background-size: 20%;
}

.opet-image {
  background-image: url("../assets/opet-logo.png");
  background-repeat: no-repeat;
   background-position:15px 15px;
  background-size: 20%;
}
</style>
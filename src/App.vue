<template>
  <div class="container-fluid">
      <Home />
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  data() {
    return {};
  },
  components: {
    Home,
   
  },
};
</script>
<style >
body {
  background-color : lightgray; 
}
.container-fluid {
  padding: 0 !important;
}

</style>

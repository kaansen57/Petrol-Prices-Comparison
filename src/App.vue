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
<style scoped>
.container-fluid {
  padding: 0 !important;
}
</style>

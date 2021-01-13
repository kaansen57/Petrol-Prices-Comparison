<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" :class="bg" >
      <a class="navbar-brand" href="/"> Petrol Comparison</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">Pompa Fiyatları</a>
          </li>
         
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props:["petrol"],
  data(){
    return{
      bg : "bg-dark",
    }
  },
  watch:{
    petrol(newValue, oldValue){
        if(newValue === "PO"){
          this.bg = "bg-danger";
        }else if(newValue === "OPET"){
          this.bg = "opet";
        }
    } 
  }
};
</script>

<style scoped>
.opet{
  background-color:#005295;
}
</style>
<template >
  <div class="row mx-auto">
    <div class="col-md-4 mt-5 mb-3" v-for="(item, i) in titlePrices" :key="i">
      <transition-group
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceOutRight"
        appear
      >
        <div v-if="selectedPetrols === 'PO'" :key="1">
          <div class="ks__card text-center">
            <div class="ks__card--side ks__card--front po">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-10 text-center">
                  <div class="card-body">
                    <div class="card-title">
                      <h3 class="mt-5 ml-5 text-white">
                        Yakıt Türü : <b>{{ item.title }}</b>
                      </h3>
                    </div>
                    <h4 class="text-white">
                      Fiyat : <b>{{ item.price }}</b>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <!-- card back -->
            <div class="ks__card--side ks__card--back back-po"></div>
          </div>
        </div>

        <div v-if="selectedPetrols === 'OPET'" :key="2">
          <div class="ks__card text-center">
            <div class="ks__card--side ks__card--front opet">
              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="card-body">
                    <div class="card-title">
                      <h3 class="mt-5 ml-5 text-white">
                        Yakıt Türü : <b>{{ cardData.title }}</b>
                      </h3>
                    </div>
                    <h4 class="text-white">
                      Fiyat : <b>{{ cardData.price }}</b>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <!-- card back -->
            <div class="ks__card--side ks__card--back back-opet"></div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Card",
  props: ["cardData"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["titlePrices", "selectedPetrols", "citys", "districts"]),
  },
};
</script>

<style scoped>
.ks__card {
  height: 15rem;
  perspective: 3rem;
  -webkit-perspective: 150rem;
  -moz-perspective: 150rem;
  position: relative;
}
.ks__card--side {
  height: 15rem;
  transition: all 0.8s ease;
  -webkit-transition: all 0.8s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
}

.ks__card--front {
  background-repeat: no-repeat;
  background-position: 5% center;
  background-size: 20%;
}
.po {
  background-color: #cb1515;
  box-shadow: 11px 11px 22px #b11111, -11px -11px 22px #f4f5f5;
  background-image: url("../assets/pologo.png");
}
.opet {
  background-color: #1564cb;
  box-shadow: 11px 11px 22px #0f4892, -11px -11px 22px #f4f5f5;
  background-image: url("../assets/opet-logo.png");
}
.ks__card--back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 30%;
}

/* back logo image */
.back-po {
  background-image: url("../assets/pologo.png");
  background-color: #cb1515;
}
.back-opet {
  background-image: url("../assets/opet-logo.png");
  background-color: #1564cb;
}

.ks__card:hover .ks__card--front {
  transform: rotateY(-180deg);
  -webkit-transform: rotateY(-180deg);
}
.ks__card:hover .ks__card--back {
  transform: rotateY(0);
  -webkit-transform: rotateY(0);
}
</style>
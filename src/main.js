import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import G2 from "@antv/g2";
import Dataset from "@antv/data-set";
console.log(Vue, G2);
Vue.prototype.G2 = G2;
Vue.prototype.Dataset = Dataset;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

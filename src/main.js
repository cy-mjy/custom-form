import Vue from 'vue'
import App from './App.vue'

import './assets/preset.css'
import './assets/theme.css'

import ElementUI from 'element-ui'
import AttrBoard from "./panels/AttrBoard.vue";
import DesignBoard from "./panels/DesignBoard.vue";
import FormRender from "./panels/FormRender.vue";
import WidgetSetup from "./panels/WidgetSetup.vue";

Vue.use(ElementUI)
;[AttrBoard, DesignBoard, FormRender, WidgetSetup].forEach((c) => {
  Vue.component(c.name, c)
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')

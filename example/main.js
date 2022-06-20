import Vue from 'vue';
import App from './App.vue';
import VueWilltable from 'qcc-editable-table'
import 'qcc-editable-table/dist/qcc-editable-table.css'

Vue.component('VueWilltable', VueWilltable)
new Vue({
    render: (h) => h(App),
}).$mount('#app');
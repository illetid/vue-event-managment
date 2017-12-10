// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import {
  store
} from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertComponent from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC8FxMjvOpOti69hCLWoXfc5S6y81DBoGg",
      authDomain: "vue-meetups-13e89.firebaseapp.com",
      databaseURL: "https://vue-meetups-13e89.firebaseio.com",
      projectId: "vue-meetups-13e89",
      storageBucket: "gs://vue-meetups-13e89.appspot.com",
      messagingSenderId: "411706306353"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadedMeetups');
  }
})

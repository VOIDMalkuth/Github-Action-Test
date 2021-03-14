import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import axios from 'axios'
import moment from 'moment'

Vue.use(axios)
Vue.use(Antd)
Vue.use(moment);

import Vuex from 'vuex'
Vue.use(Vuex)

import VueRouter from "vue-router";
Vue.use(VueRouter)

axios.defaults.baseURL = '/'

const store = new Vuex.Store({
  state: {
    logged_in: false,
    csrf_token: "",
    user_id: "",
    user: {},
  },
  mutations: {
    addToken(state, token) {
        state.csrf_token = token;
    },
    update_user_id(state, user_id) {
      state.user_id = user_id;
    },
    login(state, user) {
      state.logged_in = true;
      state.user = user;
    },
    logout(state) {
      state.logged_in = false;
      state.user_id = "";
      state.user = {};
    }
  }
})

Vue.config.productionTip = false

// cookie
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);


// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Login from "@/components/Login";
import MainPage from "@/components/MainPage";
import Logout from "@/components/Logout";
import MySpace from "@/components/MySpace";
import Register from "@/components/Register";
import UserPage from "@/components/UserPage";
import Video from "@/components/Video";
import UploadVideo from "@/components/UploadVideo";
import Settings from "@/components/Settings";
import AdminPage from "./components/AdminPage";
import SearchPage from "./components/SearchPage";
import ManageVideo from "./components/ManageVideo";
import TypedVideoPage from "./components/TypedVideoPage";

const routes = [
  { path: '/', redirect: "/index"},
  { path: '/register', component: Register},
  { path: '/login', component: Login },
  { path: '/index', component: MainPage},
  { path: '/logout', component: Logout},
  { path: '/myspace', component: MySpace},
  { path: '/user/:router_user_id', component: UserPage},
  { path: '/video/:video_id', component: Video},
  { path: '/upload', component: UploadVideo},
  { path: '/settings', component: Settings},
  { path: '/admin', component: AdminPage},
  { path: '/search', component: SearchPage},
  { path: '/manage-video/:video_id', component: ManageVideo},
  { path: '/type/:video_type_id', component: TypedVideoPage}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')

<template>
  <a-layout class="layout">
    <div class="layout-header">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="2">
          <div class="logo">VideoPro</div>
        </a-col>

        <a-col :span="4">
          <a-menu
              theme="light"
              mode="horizontal"
              :default-selected-keys="[]"
              v-model="selected_keys_public"
              :style="{ lineHeight: '48px', borderBottom: 'none'}"
          >
            <a-menu-item key="1">
              <router-link to="/index">主页</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>

        <a-col :span="6">
          <a-input-search
              v-model="searchKeyword"
              @search="doSearch"
              @pressEnter="doSearch"
              enter-button
              placeholder="请输入要搜索的关键词"
          >
          </a-input-search>
        </a-col>

        <a-col :span="4">
          <a-menu
              v-if="$store.state.logged_in"
              theme="light"
              mode="horizontal"
              :default-selected-keys="[]"
              v-model="selected_keys_personal"
              :style="{ lineHeight: '48px', borderBottom: 'none'}"
          >
            <a-menu-item key="1">
              <router-link to="/myspace">个人中心</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>

        <a-col :span="1">
          <template v-if="$store.state.logged_in">
            <a-button type="primary" icon="upload" shape="round" @click="onUpload">
              投稿
            </a-button>
          </template>
        </a-col>

        <a-col :span="1">
          <template v-if="!$store.state.logged_in">
            <a-button type="primary" icon="login" shape="round" @click="onLogin">
              登录
            </a-button>
          </template>
          <template v-if="$store.state.logged_in">
            <a-dropdown>
              <a-button shape="circle">
                <a-avatar :src="$store.state.user.avatar_address"/>
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="onOpenSettings"> <a-icon type="profile" />个人设置</a-menu-item>
                <a-menu-item key="2" @click="onLogout"> <a-icon type="logout" />注销</a-menu-item>
                <a-menu-item v-if="$store.state.user.privilege === 'admin'" key="3" @click="onGotoAdmin"> <a-icon type="setting" />后台管理</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>

        </a-col>
      </a-row>
    </div>

    <a-layout-content style="padding: 10px 50px;">
      <transition>
        <slot></slot>
      </transition>
    </a-layout-content>

    <a-layout-footer style="text-align: center;">
      VideoPro ©2020 Created With Ant Design Vue
    </a-layout-footer>
  </a-layout>
</template>

<script>
import VideoContainer from "@/components/VideoContainer/VideoContainer";
import Login from "@/components/Login";
import api_service from "@/utils/apis";


export default {
  name: "SiteFrame",
  components: {VideoContainer, Login},
  data: function() {
    return {
      searchKeyword: '',
      selected_keys_public: ['1'],
      selected_keys_personal: [],
    };
  },
  methods: {
    onLogin() {
      this.$router.push('/login');
    },
    onLogout() {
      this.$router.push("/logout");
    },
    onGotoAdmin() {
      this.$router.push("/admin");
    },
    onUpload() {
      this.$router.push("/upload");
    },
    onOpenSettings() {
      this.$router.push("/settings");
    },
    doSearch() {
      this.$router.push("/search/?keyword=" + this.searchKeyword);
    },
  },
  created() {
    api_service.do_update_info(this.$store).catch((err)=>{console.log(err)});
    let _this = this;
    this.$router.beforeEach((to, from, next) => {
      if (from.path === "/index") {
        _this.selected_keys_public = [];
      }

      if (to.path === "/index" || to.path === "/") {
        _this.selected_keys_public = ['1'];
      }

      if (from.path === "/myspace") {
        _this.selected_keys_personal = [];
      }

      if (to.path === "/myspace") {
        _this.selected_keys_personal = ['1'];
      }

      if (from.path.startsWith('/search') && !to.path.startsWith('/search')) {
        _this.searchKeyword = "";
      }
      next();
    });
    if (this.$route.path !== "/index") {
      _this.selected_keys_public = [];
    }
  }
}
</script>

<style>
.layout {
}

.layout-header {
  background-color: #fff;
}

.logo {
  font-size: 18px;
  color: #0AA679;
  /*font-family: 'Arial';*/
  font-weight: bold;
}
</style>
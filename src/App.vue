<template>
  <div id="app">
    <site-frame class="frame">
        <router-view></router-view>
    </site-frame>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import VideoCard from "@/components/VideoContainer/VideoCard";
import VideoContainer from "@/components/VideoContainer/VideoContainer";
import SiteFrame from "@/components/SiteFrame";
import api_service from "@/utils/apis";

export default {
  name: 'App',
  components: {
    SiteFrame,
    VideoContainer,
    Login,
    VideoCard
  },
  created() {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  background-color: #f0f2f5;
  /*margin-top: 60px;*/
}

.frame {
  min-height: 100%;
}
</style>

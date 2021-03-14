<template>
  <div class="search-page-root">
    <video-container mode="search_videos" :keyword="keyword"></video-container>
  </div>
</template>

<script>
import VideoContainer from "./VideoContainer/VideoContainer";

export default {
  name: "SearchPage",
  components: {VideoContainer},
  data() {
    return {
      keyword: '',
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.keyword) {
        this.keyword = to.query.keyword;
        console.log(this.keyword)
      }
    }
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
  }
}
</script>

<style scoped>
.search-page-root {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 10, 10, 0.15);
}
</style>
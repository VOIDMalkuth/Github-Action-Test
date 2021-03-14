<template>
  <div class="typed-video-container-root">
    <div class="type-head">
      <div class="type-name">{{video_type.type}}</div>
      <a-button @click="gotoTypeArea(video_type.video_type_id)" type="link">
        <a-icon type="more" />进入分区，查看更多
      </a-button>
    </div>

    <a-skeleton active :loading="loading">
      <div class="video-containers">
        <div v-for="item of videoList" v-bind:key="item.video_id" class="container-card">
          <video-card :video_id="item.video_id" :title="item.video_title" :video_address="item.video_address"
                      :imgsrc="item.thumbnail_address" :upload_time="item.upload_time"></video-card>
        </div>
      </div>
    </a-skeleton>

    <div v-if="videoList.length === 0 && !loading">
      <a-empty description="暂时没有视频哦，快来做第一个上传者吧"></a-empty>
    </div>

  </div>
</template>

<script>
import api_service from "../../utils/apis";

import VideoCard from "./VideoCard";

export default {
  name: "TypedVideoContainer",
  components: {VideoCard},
  props: ['video_type'],
  data() {
    return {
      videoList: [],
      loading: true,
    }
  },
  methods: {
    updatePage() {
      this.loading = true;
      let _this = this;
      api_service.call_get_video_by_type(this.$store, this.video_type.video_type_id)
        .then(res => {
          _this.loading= false;
          _this.videoList = res.slice(0, 4);
        })
    },
    gotoTypeArea(video_type_id) {
      this.$router.push("/type/" + video_type_id);
    }
  },
  watch: {
    video_type(to, from) {
      if (to.video_type_id !== from.video_type_id) {
        this.updatePage();
      }
    }
  },
  created() {
    this.updatePage();
  }
}
</script>

<style scoped>
.typed-video-container-root {
  width: 80%;

  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.15);
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  margin: 16px auto 0px;
}

.type-head {
  display: flex;
}

.type-name {
  font-size: 24px;
  font-weight: bold;
}

.video-containers {
  margin: 16px;
  display: flex;
  justify-content: start;
}

.container-card {
  margin: 8px;
}
</style>
<template>
  <div class="video-container-external-list-root">
    <a-skeleton :paragraph="{rows:16}" :loading="loading" active>
      <div v-if="video_list.length !== 0">
        <div class="inner-container">
          <div v-for="item of current_list" v-bind:key="item.video_id" class="container-card">
            <video-card :video_id="item.video_id" :title="item.video_title" :video_address="item.video_address"
                        :imgsrc="item.thumbnail_address" :upload_time="item.upload_time"></video-card>
          </div>

          <video-card class="container-card fake" :video_id="1111"></video-card>
          <video-card class="container-card fake" :video_id="1111"></video-card>
          <video-card class="container-card fake" :video_id="1111"></video-card>
          <video-card class="container-card fake" :video_id="1111"></video-card>
        </div>
        <a-pagination v-if="video_list.length !== 0" :default-current="1" :page-size="page_size" :total="video_list.length" @change="onPaginationChange" />
      </div>

      <div v-if="video_list.length === 0">
        <a-empty :description="false" />
        <span>暂无符合要求的视频</span>
      </div>
    </a-skeleton>

  </div>
</template>

<script>
import VideoCard from "./VideoCard";

export default {
  name: "VideoContainerExternalList",
  props: ['video_list'],
  components: {VideoCard},
  data() {
    return {
      loading: false,
      current: 1,
      current_list: [],
      page_size: 12,
    };
  },
  methods: {
    onPaginationChange(current) {
      //console.log(current)
      if (this.video_list.length === 0) {
        return;
      }
      this.current = current;
      let start = (this.current - 1) * this.page_size;
      let end = (this.current * this.page_size < this.video_list.length) ?
          (this.current * this.page_size) : (this.video_list.length);
      this.current_list = this.video_list.slice(start, end);
    },
  },
  watch: {
    video_list(to, from) {
      this.onPaginationChange(1);
    }
  },
  mounted() {
    this.onPaginationChange(1);
  }
}
</script>

<style scoped>
.video-container-external-list-root {
  text-align: center;
  padding: 8px 32px;
}

.inner-container {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  justify-content: space-between;
}

.container-card {
  flex: 0 0 23%;
  margin: 16px 8px 16px;
}

.fake {
  height: 0px;
  visibility: hidden;
}
</style>
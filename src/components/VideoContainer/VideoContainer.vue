<template>
  <div class="video-container-root">
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
        <a-pagination :default-current="1" :page-size="page_size" :total="video_list.length" @change="onPaginationChange" />
      </div>

      <div v-if="video_list.length === 0 && !loading">
        <a-empty :description="false" />
        <span>暂无符合要求的视频</span>
      </div>
    </a-skeleton>

  </div>
</template>

<script>
import api_service from "@/utils/apis";
import VideoCard from "@/components/VideoContainer/VideoCard";


export default {
  name: "VideoContainer",
  props: ['mode', 'user_id', 'keyword'],
  components: {VideoCard},
  data() {
    return {
      loading: true,
      current: 1,
      video_list: [],
      current_list: [],
      page_size: 12,
    };
  },
  watch: {
    user_id(to, from) {
      if (this.mode === "user_videos") {
        this.updatePage();
      }
    },
    keyword(to, from) {
      if (this.mode === "search_videos") {
        if (to.trim() === '') {
          this.video_list = [];
        }
        this.updatePage();
      }
    }
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
    updatePage() {
      this.loading = true;
      let _this = this;
      let promiseItem = null;
      if (this.mode === "user_videos") {
        promiseItem = api_service.call_get_user_video(this.$store, this.user_id)
      } else if (this.mode === "search_videos") {
        if (this.keyword.trim() !== '') {
          promiseItem = api_service.call_search_video(this.$store, this.keyword)
        } else {
          this.loading = false;
        }
      } else if (this.mode === 'all_videos') {
        promiseItem = api_service.call_get_all_videos(this.$store);
      }

      if (promiseItem) {
        promiseItem
            .then((res) => {
              _this.video_list = res;
              _this.onPaginationChange(1);
              _this.loading = false;
            })
            .catch((err) => {
              console.log(err)
              this.$notification.open({
                message: '获取视频失败',
                description: err.status,
                duration: 5,
                icon: <a-icon type="warning" style="color: #ed002f" />,
              });
            });
      }
    }
  },
  created() {
    this.updatePage();
  }
}
</script>

<style scoped>
.video-container-root {
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
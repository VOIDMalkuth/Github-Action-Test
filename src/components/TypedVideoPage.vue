<template>
  <div class="typed-video-page-root">
    <div class="type-info">
      <a-skeleton active :loading="loading1">
        <div class="type-name">{{video_type.type}}</div>
        <div class="description">{{video_type.description}}</div>
      </a-skeleton>
    </div>

    <div class="video-containers">
      <a-skeleton :paragraph="{rows:12}" active :loading="loading2">
        <video-container-external-list :video_list="videoList"></video-container-external-list>
      </a-skeleton>
    </div>

    <div v-if="videoList.length === 0 && !loading2">
      <a-empty description="暂时没有视频哦，快来做第一个上传者吧"></a-empty>
    </div>
  </div>
</template>

<script>
import api_service from "../utils/apis";
import VideoContainerExternalList from "./VideoContainer/VideoContainerExternalList";

export default {
  name: "TypedVideoPage",
  components: {VideoContainerExternalList},
  data() {
    return {
      video_type_id: -1,
      loading1: true,
      loading2: true,
      video_type: [],
      videoList: []
    };
  },
  methods: {
    updatePage() {
      this.loading1 = true;
      this.loading2 = true;
      this.video_type = {};
      let _this = this;
      let promise1 = api_service.call_get_video_type_by_id(this.$store, this.video_type_id)
        .then(res => {
          _this.loading1= false;
          _this.video_type = res;
        });
      let promise2 = api_service.call_get_video_by_type(this.$store, this.video_type_id)
          .then(res => {
            _this.videoList = res.slice(0, 4);
            _this.loading2= false;
          });
      Promise.all([promise1, promise2])
        .catch((err) => {
          _this.loading1= false;
          _this.loading2= false;
          console.log(err)
          this.$notification.open({
            message: '获取分区视频失败',
            description: err.status,
            duration: 5,
            icon: <a-icon type="warning" style="color: #ed002f" />,
          });
        });
    }
  },
  beforeMount() {
    this.video_type_id = Number(this.$route.params.video_type_id);
    this.updatePage();
  },
  watch: {
    $route(to, from) {
      if (to.params.video_type_id && this.video_type_id !== Number(to.params.video_type_id)) {
        this.video_type_id = Number(to.params.video_type_id);
        this.updatePage();
      }
    }
  },
}
</script>

<style scoped>
.type-info, .video-containers {
  text-align: left;
  width: 80%;
  padding: 16px 32px;
  margin: 0 auto 16px;

  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.15);

  background-color: #fff;
  border-radius: 8px;
}

.type-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.description {
  font-size: 18px;
}
</style>
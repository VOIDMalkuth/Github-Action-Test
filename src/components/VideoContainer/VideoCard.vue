<template>
  <div class="video-card-root">
    <a-card hoverable style="width: 250px;" class="card"
            :body-style="{paddingTop: '16px', paddingBottom: '8px', textAlign: 'left'}"
            @click="onClick"
    >
      <a-spin slot="cover" :spinning="spinning">
        <img
            @load="imageloaded"
            alt="图片加载中"
            :src="imgsrc"
            class="image"
        />
      </a-spin>

      <a-card-meta :title="title" class="card-description">
        <template slot="description">
          {{upload_time}}
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import api_service from "@/utils/apis";


export default {
  name: "VideoCard",
  props: ['video_id', 'title', 'imgsrc', 'upload_time', 'video_address'],
  data: function () {
    return {
      spinning: true,
    };
  },
  methods: {
    imageloaded() {
      this.spinning = false;
    },
    onClick() {
      this.$router.push('/video/' + this.video_id.toString());
    },
  },
  created() {
    // setTimeout(() => {api_service.call_get_video(this.$store, this.video_id)
    //     .then((res) => {
    //       _this.title = res.video_title
    //       _this.upload_time = res.upload_time
    //       _this.video_address = res.video_address
    //       _this.imgsrc = res.thumbnail_address
    //       _this.load_done = true;
    //     })}, 3000)
    // api_service.call_get_video(this.$store, this.video_id)
    //     .then((res) => {
    //       _this.title = res.video_title
    //       _this.imgsrc = res.thumbnail_address
    //       _this.upload_time = res.upload_time
    //       _this.video_address = res.video_address
    //       _this.load_done = true;
    //     })
  },
}
</script>

<style scoped>
.video-card-root {
  height: 205px;
}

.card {
  border-width: 2px;
  border-radius: 4px;
}

.card-description {
  margin-bottom: 0px;
}

.image {
  width:100%;
  height:128px;
}

</style>
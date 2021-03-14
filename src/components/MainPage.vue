<template>
  <div class="main-page-root">
    <div class="carousel-box">
      <div style="margin: 0px 0px 0px 0px; font-size: 24px; font-weight: bold;">最新视频</div>
      <a-carousel arrows autoplay>
        <div
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="left: 10px;zIndex: 1"
        >
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>

        <div v-for="item in carousel_list" v-bind:key="item.video_id">
          <div @click="gotoAddress(item.video_id)" class="top-card" style="margin: 16px auto;">
            <div style="height: 260px; width: 60%">
              <img :src="item.thumbnail_address" height="100%" width="100%" style="margin: auto; border-radius: 16px 0px 0px 16px;" />
            </div>
            <div style="height: 260px; width: 40%; font-size: 30px; padding: 36px 24px">
              {{item.video_title}}
              <div style="font-size: 20px; margin-top: 8px">
                {{item.introduction}}
              </div>
            </div>
          </div>
        </div>
      </a-carousel>
    </div>

    <div class="typed-videos-area">
      <div class="typed-video-container" v-for="item in type_lists" v-bind:key="item.video_type_id">
        <typed-video-container :video_type="item"></typed-video-container>
      </div>
    </div>

    <div class="all-video-area">
      <div style="margin: 0px 8px; font-size: 24px; font-weight: bold;">全部视频</div>
      <video-container mode="all_videos"></video-container>
    </div>
  </div>
</template>

<script>
import api_service from "@/utils/apis";
import TypedVideoContainer from "./VideoContainer/TypedVideoContainer";
import VideoContainer from "./VideoContainer/VideoContainer";


export default {
  name: "MainPage",
  components: {VideoContainer, TypedVideoContainer},
  data() {
    return {
      all_list: [],
      type_lists: [],
      carousel_list: [],
    };
  },
  methods: {
    updatePage() {
      let _this = this;
      api_service.call_get_all_videos()
        .then(res => {
          _this.all_list = res;
          _this.carousel_list = res.slice(0, 4);
        })
      api_service.call_get_video_types(this.$store)
        .then(res => {
          this.type_lists = res;
        })
    },
    gotoAddress(addr) {
      this.$router.push("/video/"+addr)
    }
  },
  mounted() {
    this.updatePage();
  }
}
</script>

<style scoped>
.ant-carousel >>> .custom-slick-arrow {
  width: 50px;
  height: 50px;
  font-size: 40px;
  color: #12CCA7;
  opacity: 0.2;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-dots-bottom {
  bottom: 0px;
}

.ant-carousel >>> .slick-dots-bottom li button {
  background-color: #0AA679;
}

.top-card {
  background-color: #f9f9f9;
  margin: 8px auto 8px;
  border-radius: 16px 16px 16px 16px;
  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.15);
  width: 80%;

  display: flex;
  justify-content: space-between;

  cursor: pointer;
}

.top-card:hover {
  box-shadow: 0 2px 8px rgba(0, 10, 10, 0.3);
}

.carousel-box {
  width: 80%;

  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.2);
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  margin: 16px auto;
}

.all-video-area {
  width: 80%;

  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.2);
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  margin: 16px auto;
}
</style>
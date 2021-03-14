<template>
  <div class="status-upload-video-root" style="text-align: left;">
    <a-comment>
      <a slot="author" @click="gotoAuthor(videoPublisher)">{{videoPublisher.nickname}}<a-tag style="margin-left: 4px" color="purple">发布了视频</a-tag></a>
      <a-avatar
          @click="gotoAuthor(videoPublisher)"
          slot="avatar"
          :src="videoPublisher.avatar_address"
          :alt="videoPublisher.nickname"
      />

      <div slot="content">
        <div class="content-box">
          <div class="text-wrapper-box">
            <div class="video-title">{{videoItem.video_title}}</div>
            <div class="video-intro">{{videoItem.introduction}}</div>
          </div>
          <video-card :video_id="videoItem.video_id" :title="videoItem.video_title" :video_address="videoItem.video_address"
                      :imgsrc="videoItem.thumbnail_address" :upload_time="videoItem.upload_time"></video-card>
        </div>
      </div>


      <a-tooltip slot="datetime" :title="moment(videoItem.upload_time).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(videoItem.upload_time).fromNow() }}</span>
      </a-tooltip>
    </a-comment>
  </div>
</template>

<script>
import moment from "moment";
import api_service from "@/utils/apis";
import VideoCard from "../VideoContainer/VideoCard";

export default {
  name: "StatusPostContainer",
  components: {VideoCard},
  props: ['videoItem'],
  data: function () {
    return {
      videoPublisher: {},
      replaced_content: "",
      showDelete: false,
      deleteLoading: false,
      showEdit: false,
      editLoading: false,
      moment,
    };
  },
  methods: {
    gotoAuthor(author) {
      this.$router.push("/user/" + author.user_id.toString())
    }
  },
  created() {
    api_service.call_get_user_info(this.$store, this.videoItem.publisher)
        .then((res) => {
          this.videoPublisher = res;
        })
  }
}
</script>

<style scoped>
.status-upload-video-root {
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 32px 0px;
  margin-bottom: 8px;
}

.status-upload-video-root:hover {
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.content-box {
  display: flex;
  align-items: top;
  margin-bottom: 16px;
}

.text-wrapper-box {
  width: 60%;
  margin-top: 16px;
  margin-left: 32px;
  margin-right: 64px;
}

.video-title {
  font-size: 28px;
  margin: 12px 0px;
}

.video-intro {
  font-size: 18px;
}
</style>
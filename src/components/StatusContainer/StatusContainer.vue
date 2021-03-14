<template>
  <div class="status-container-root">
    <template v-if="item.status_type === 'uploadVideo'">
      <status-upload-video-container :video-item="item"> </status-upload-video-container>
    </template>

    <template v-if="item.status_type === 'sendPost'">
      <status-post-container :post_item="item" :post_id="item.post_id" @delPost="onItemChange" @editPost="onItemChange"></status-post-container>
    </template>

    <template v-if="item.status_type === 'sendComment'">
      <comment-with-video :comment_id="item.comment_id" :comment_time="item.comment_time"
               :comment_video="item.comment_video" :commenter="item.commenter" :content="item.content"
               @delComment="onItemChange" @editComment="onItemChange"
      ></comment-with-video>
    </template>
  </div>
</template>

<script>
import CommentWithVideo from "./CommentWithVideo";
import StatusUploadVideoContainer from "./StatusUploadVideoContainer";
import StatusPostContainer from "./StatusPostContainer";

export default {
  name: "StatusContainer",
  components: {StatusPostContainer, CommentWithVideo, StatusUploadVideoContainer},
  props: ['item'],
  methods: {
    onItemChange() {
      this.$emit("itemChange");
    }
  }
}
</script>

<style scoped>
.status-container-root {
  width:  95%;
  margin: 0 auto 16px;
}
</style>
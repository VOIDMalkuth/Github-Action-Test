<template>
  <div class="manage-video-root">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="视频信息管理">
        <video-update :video_id="video_id"></video-update>
      </a-tab-pane>
      <a-tab-pane key="2" tab="视频付费信息">
        <video-payment-list :video_id="video_id"></video-payment-list>
      </a-tab-pane>
      <a-tab-pane key="3" tab="高级操作">
        <a-alert
            message="危险操作"
            description="以下操作可能带来不可恢复性的损失，请慎重考虑后执行"
            type="warning"
            show-icon
        />
        <div class="warn-box">
          <div class="delete-text"><div class="text">删除视频:</div> <a-button @click="showDelete" type="danger">删除视频</a-button></div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api_service from "../utils/apis";

import VideoUpdate from "./VideoUpdate";
import VideoPaymentList from "./Payments/VideoPaymentList";

export default {
  name: "ManageVideo",
  components: {VideoPaymentList, VideoUpdate},
  data() {
    return {
      video_id: null
    };
  },
  watch: {
    $route(to, from) {
      this.video_id = to.params.video_id;
    }
  },
  methods: {
    showError(str) {
      this.$notification.open({
        message: '视频删除失败',
        description: str,
        duration: 3,
        icon: <a-icon type="warning" style="color: #ed002f" />,
      });
    },
    showDelete() {
      let _this = this;
      this.$confirm({
        title: '删除确认',
        content: '确定要删除视频？此操作不可恢复！',
        onOk() {
          console.log("ok")
          api_service.call_delete_video(_this.$store, _this.video_id)
              .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                  return Promise.reject(res);
                }
                _this.$message.success('视频删除成功，正在跳转回主页');
                _this.$router.push('/');
              })
              .catch((err) => {
                console.log(err);
                try{
                  _this.showError(err.status);
                } catch(e) {
                  console.log(e)
                }
              });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
  mounted() {
    this.video_id = this.$route.params.video_id;
  }
}
</script>

<style scoped>
.manage-video-root {
  background-color: #fff;
  padding: 32px;
  width: 80%;
  margin: 0 auto;
  text-align: left;
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.warn-box {
  /*background-color: #FFFAE7;*/
  padding: 16px 0px;
  border-radius: 8px;
}

.delete-text {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: start;
  align-items: center;
}

.text {
  margin: 0 16px 0 0;
}
</style>
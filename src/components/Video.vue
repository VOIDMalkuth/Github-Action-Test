<template>
  <div class="video-page-root">
    <template v-if="error_happened">
      <a-result
          status="warning"
          title="视频加载失败"
          sub-title="请确认该视频是否存在，或联系网站管理员"
      >
        <template #extra>
          <a-button key="console" type="primary" @click="onGoHome">
            回到主页
          </a-button>
        </template>
      </a-result>
    </template>

    <a-modal
        title="收银台"
        :visible="buyVideoShow"
        :footer="null"
        :maskClosable="false"
        :destroyOnClose="true"
        @cancel="cancelPayment"

        :width="720"
    >
      <new-payment :payment_info="payment_info" v-on:payment-successful="updatePage" v-on:close-window="cancelPayment"></new-payment>
    </a-modal>

    <template v-if="!error_happened">
      <div class="video-info-top">
        <div class="video-info-top-left">
          <div class="video-info-title">
            <a-icon type="video-camera" theme="twoTone" two-tone-color="#12CCA7" /> {{video.video_title}}
          </div>
          <div class="video-info-subtop">
            VID: {{video_id}} {{video.upload_time}}
          </div>
        </div>
        <div class="video-info-top-right" v-if="($store.state.user.user_id === video.publisher) || ($store.state.user.privilege === 'admin')">
          <router-link :to="'/manage-video/' + video_id"><a-icon type="control" /> 视频管理</router-link>
        </div>
      </div>

      <div class="video-player-container" v-if="video.has_permission">
        <video :src="video.video_address" width="100%" controls></video>
      </div>

      <div>
        <div class="payment-message-container" v-if="!video.has_permission">
          <a-result
              status="403"
              title="权限不足"
              :sub-title="$store.state.logged_in ? '此视频需要付费观看' : '请先登录'"
          >
          </a-result>
          <div class="detailed-payment-info">
            <a-statistic title="视频价格 (CNY)" :precision="2" :value="'￥' + video.price" />
            <div class="buy-video-button">
              <a-button :disabled="!$store.state.logged_in" block type="primary" @click="buyVideo">购买此视频</a-button>
            </div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="info-video-info">
          <div>视频分类: {{video_type_str}}</div>
          <div>视频介绍:</div>
          <p class="video-intro">{{video.introduction}}</p>
        </div>
        <div class="info-author-info">
          <a-avatar class="info-avatar" shape="circle" :size="60" :src="author.avatar_address" />
          <div class="author-nickname">{{ author.nickname }}</div>
          <div class="author-tag">
            <a-tag class="author-privilege" :color="getColor(author.privilege)">{{ privilegeMap[author.privilege] }}</a-tag>
          </div>
          <a-button shape="round" type="primary" size="small" style="font-size: 14px;" @click="goToAuthor">Ta的主页</a-button>
        </div>
      </div>

      <div class="comments">
        <div class="comment-title">评论区</div>
        <comment-list mode="video" :permission="video.has_permission" :video_id="video_id" :ready="got_video && !error_happened"></comment-list>
      </div>

    </template>
  </div>
</template>

<script>
import api_service from "@/utils/apis";
import CommentList from "@/components/Comments/CommentList";
import NewPayment from "./Payments/NewPayment";

const privilegeMap = {
  none: "注册用户",
  member: "高级会员",
  admin: "管理员"
}

export default {
  name: "Video",
  components: {NewPayment, CommentList},
  comments: {
    CommentList
  },
  data: function () {
    return {
      privilegeMap: privilegeMap,
      got_video: false,
      error_happened: false,
      video_id: "",
      video: {},
      author: {},
      payment_info: {},
      buyVideoShow: false,
      video_type_str: '',
    };
  },
  methods: {
    updatePage() {
      let _this = this;
      api_service.call_get_video(this.$store, this.video_id)
        .then((res) => {
          console.log(res)
          _this.video = res;
          return (api_service.call_get_user_info(_this.$store, res.publisher));
        })
        .then((res) => {
          _this.author = res;
          _this.error_happened = false;
          _this.got_video = true;
          return api_service.call_get_video_type_by_id(_this.$store, _this.video.video_type)
        })
        .then(res => {
          console.log(res)
          _this.video_type_str = res.type;
        })
        .catch((err) => {
          _this.error_happened = true;
        })
    },
    goToAuthor() {
      this.$router.push('/user/' + this.video.publisher.toString());
    },
    onGoHome() {
      this.$router.push('/index');
    },
    getColor(str) {
      if (str == 'none') {
        return 'orange';
      } else if (str === 'member') {
        return 'green';
      } else if (str === 'admin') {
        return 'red';
      }
      return 'white'
    },
    buyVideo() {
      this.payment_info = {
        amount: this.video.price,
        content: "付费视频: " + this.video.video_id,
        payment_type: "video",
        video_id: this.video.video_id,
      }
      this.buyVideoShow = true;
    },
    cancelPayment() {
      this.buyVideoShow = false;
    }
  },
  watch: {
    $route(to, from) {
      this.video_id = to.params.video_id;
      this.updatePage();
    }
  },
  created() {
    this.video_id = this.$route.params.video_id;
    this.updatePage();
  }
}
</script>

<style scoped>

.video-page-root {
  padding-top: 16px;
  width: 75%;
  margin: 0 auto;
}

.video-info-top {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 8px;
}

.video-info-title{
  text-align: left;
  font-size: 22px;
  font-weight: bold;
}

.video-info-subtop {
  text-align: left;
  color: #888888;
}

.video-player-container {

}

.detailed-payment-info {
  text-align: center;
  background-color: #fff;
  margin: 0px auto 0px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.15);
  width: 100%;
}

.buy-video-button {
  width: 30%;
  margin: 16px auto 0px;
}

.info-video-info, .info-author-info, .comments {
  margin-top: 8px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 10, 10, 0.15);
  background-color: #fff;
}

.info {
  text-align: center;
  display: flex;
  justify-content: space-between;
  justify-items: center;
}

.info-video-info {
  width: 75%;
  margin-right: 4px;
  text-align: left;
  font-size: 16px;
  color: #888888;
}

.info-author-info {
  width: 30%;
  margin-left: 4px;
}

.author-nickname{
  margin: 8px;
  font-size: 16px;
}

.author-tag{
  margin: 0px 8px 16px 8px;
  font-size: 16px;
}

.video-intro {
  word-break: break-word;
}

.comment-title {
  margin-top: 16px;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
}
</style>
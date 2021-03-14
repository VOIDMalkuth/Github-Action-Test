<template>
  <div class="user-root">
    <template v-if="error_happened">
      <a-result
          status="warning"
          title="用户主页查看失败"
          sub-title="请确认该用户是否存在，或联系网站管理员"
      >
        <template #extra>
          <a-button key="console" type="primary" @click="onGoHome">
            回到主页
          </a-button>
        </template>
      </a-result>
    </template>

    <template>
      <a-modal
        title="收银台"
        :visible="buyMembershipShow"
        :footer="null"
        :maskClosable="false"
        :destroyOnClose="true"
        @cancel="cancelPayment"

        :width="720"
      >
        <new-payment :payment_info="payment_info" v-on:payment-successful="updatePage" v-on:close-window="cancelPayment"></new-payment>
      </a-modal>
    </template>

    <template v-if="!error_happened">
      <div class="info">
        <div class="info-with-avatar">
          <div class="basic-info">
            <a-descriptions title="用户信息"
                            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                            :colon="false">
              <a-descriptions-item label="昵称">
                {{ user.nickname }}
              </a-descriptions-item>
              <a-descriptions-item label="用户名">
                {{ user.username }}
              </a-descriptions-item>
              <a-descriptions-item label="会员级别">
                <template v-if="user.privilege === 'none' && user.user_id === $store.state.user.user_id">
                  <a-tag color="orange">注册用户</a-tag>
                  <a-button class="upgrade-button" type="link" @click="buyMembership"> <a-icon type="rocket"></a-icon> 立即升级高级会员</a-button>
                </template>
                <template v-if="user.privilege === 'member'">
                  <a-tag color="green">高级会员</a-tag>
                </template>
                <template v-if="user.privilege === 'admin'">
                  <a-tag color="red">管理员</a-tag>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="邮箱">
                {{ user.email }}
              </a-descriptions-item>
              <a-descriptions-item label="生日">
                {{ user.birthday }}
              </a-descriptions-item>
              <a-descriptions-item label="性别">
                <template value="male" v-if="user.gender === 'male'">
                  <a-icon type="man" />
                  男性
                </template>
                <template value="female" v-if="user.gender === 'female'">
                  <a-icon type="woman" />
                  女性
                </template>
                <template value="unset" v-if="user.gender === 'unset'">
                  <a-icon type="question-circle" />
                  保密
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="个性签名">
                {{ user.sign }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <a-avatar class="info-avatar" shape="circle" :size="120" :src="user.avatar_address" />
        </div>

        <div class="user-actions">
          <a-tabs default-active-key="1" @change="tabChangeCallback">
            <a-tab-pane key="1" tab="用户投稿">
                <video-container mode="user_videos" :user_id="user_id"></video-container>
            </a-tab-pane>
            <a-tab-pane key="2" tab="用户动态">
              <status-list :user_id="user_id"></status-list>
            </a-tab-pane>
            <template v-if="user_id == this.$store.state.user_id">
              <a-tab-pane key="3" tab="付款记录">
                <user-payment-list :user_id="user_id"></user-payment-list>
              </a-tab-pane>
            </template>

          </a-tabs>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api_service from "@/utils/apis";

import VideoContainer from "@/components/VideoContainer/VideoContainer";
import UserPaymentList from "./Payments/UserPaymentList";
import NewPayment from "./Payments/NewPayment";
import StatusList from "./StatusContainer/StatusList";


const payment_info = {
  amount: 98,
  content: "升级高级会员",
  payment_type: "membership",
  video_id: 0,
};


export default {
  name: "UserPage",
  components: {StatusList, UserPaymentList, NewPayment, VideoContainer},
  props: ['prop_user_id'],
  data: function() {
    return {
      payment_info: payment_info,
      user_id: "",
      user: {},
      error_happened: false,
      buyMembershipShow: false,
      current_tab: 1,
    };
  },
  methods: {
    onGoHome() {
      this.$router.push("/index")
    },
    updatePage() {
      let _this = this;
      api_service.call_get_user_info(this.$store, this.user_id)
          .then((res) => {
            _this.error_happened = false;
            if ('code' in res && res['code'] !== 0) {
              return Promise.reject(res);
            }
            _this.user = res;
          })
          .catch((err) => {
            _this.error_happened = true;
          })
    },
    buyMembership() {
      this.buyMembershipShow = true;
    },
    cancelPayment() {
      this.buyMembershipShow = false;
    },
    tabChangeCallback(key) {
      this.current_tab = key;
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.router_user_id) {
        this.user_id = to.params.router_user_id;
        this.updatePage();
      }
    }
  },
  beforeMount() {
    if (this.prop_user_id) {
      this.user_id = this.prop_user_id;
      this.error_happened = false;
    } else if (this.$route.params.router_user_id) {
      this.user_id = this.$route.params.router_user_id;
      this.error_happened = false;
    } else {
      this.error_happened = true;
      return;
    }
    this.updatePage();
  }
}
</script>

<style scoped>
.info {
  margin-left: 64px;
  margin-right: 64px;
}

.info-with-avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.basic-info {
  text-align: left;
  width: 80%;
  padding: 16px;

  box-shadow: 0 2px 8px rgba(0, 10, 10, 0.15);

  background-color: #fff;
  border-radius: 8px;
}

.info-avatar {
  background-color: #fff;
  border: solid 4px #f4ffe6;
}

.user-actions {
  box-shadow: 0 1px 4px rgba(0, 10, 10, 0.15);
  padding: 16px 24px;
  background-color: #fff;
  border-radius: 8px;
  margin: 16px 0px 0px;
}

.upgrade-button {
  padding: 0;
}
</style>
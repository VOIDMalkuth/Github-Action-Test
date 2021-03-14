<template>
  <div class="admin-root">
    <template v-if="!$store.state.logged_in">
      <a-alert
          message="Error"
          description="您并没有登录"
          type="error"
          show-icon
          class="login-alert"
      />
    </template>

    <div class="admin-info" v-if="$store.state.logged_in">
      <a-tabs default-active-key="1" tabPosition="left">
        <a-tab-pane key="1" tab="视频类型管理">
          <video-type-managing></video-type-managing>
        </a-tab-pane>
<!--        <a-tab-pane key="2" tab="Tab 2">-->
<!--          Content of Tab Pane 2-->
<!--        </a-tab-pane>-->
<!--        <a-tab-pane key="3" tab="Tab 3">-->
<!--          Content of Tab Pane 3-->
<!--        </a-tab-pane>-->
      </a-tabs>
    </div>
  </div>
</template>

<script>
import api_service from "@/utils/apis";
import VideoTypeManaging from "./AdminTables/VideoTypeManaging";

export default {
  name: "AdminPage",
  components: {VideoTypeManaging},
  data : function () {
    return {};
  }
}
</script>

<style scoped>
.admin-root {
  background-color: #fff;
  height: 100%;
  padding: 16px;
  border-radius: 4px;
}
</style>
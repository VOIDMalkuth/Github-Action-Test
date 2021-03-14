<template>
  <div class="logout-root">
    <template>
      <a-result title="正在注销" v-if="!doneLogout">
        <template #icon>
          <a-icon type="sync" spin  />
        </template>
      </a-result>
    </template>

    <template>
      <a-result title="注销成功" v-if="doneLogout">
        <template #extra>
          <a-button key="home" type="primary" @click="onGoHome">
            返回主页
          </a-button>
        </template>
      </a-result>
    </template>


  </div>
</template>

<script>
import api_service from "@/utils/apis";


export default {
  name: "Logout",
  data: function () {
    return {
      doneLogout: false,
    };
  },
  methods: {
    onGoHome() {
      this.$router.push("/index")
    },
    logout() {
      let _this = this;
      api_service.call_logout(this.$store)
          .then((res) => {
            _this.doneLogout = true;
            console.log(res);
          })
          .catch((err) => {
            _this.doneLogout = true;
            console.log(err);
          })
    }
  },
  mounted() {
    this.logout();
  }
}
</script>

<style scoped>

</style>
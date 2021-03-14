<template>
  <div>
    <template v-if="!$store.state.logged_in">
      <a-alert
          message="Error"
          description="您并没有登录"
          type="error"
          show-icon
          class="login-alert"
      />
    </template>
    <template v-if="$store.state.logged_in">
      <user-page :prop_user_id="this.$store.state.user_id"></user-page>
    </template>
  </div>
</template>

<script>
import UserPage from "@/components/UserPage";

export default {
  name: "MySpace",
  components: {UserPage},
  comments: {
    UserPage,
  },
  data: function() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style scoped>
.login-alert {
  width: 400px;
  margin: 32px auto;
}
</style>
<template>
  <div class="user-payment-list-root">
    <a-spin :spinning="loading">
      <payments-list :tableData="payment_list"></payments-list>
    </a-spin>
  </div>
</template>

<script>
import api_service from "../../utils/apis";
import PaymentsList from "./PaymentsList";

export default {
  name: "UserPaymentList",
  components: {PaymentsList},
  props: ['user_id'],
  data() {
    return {
      payment_list: [],
      loading: true,
    };
  },
  methods: {
    updatePage() {
      this.loading = true;
      let _this = this;
      api_service.call_get_payments_by_user(this.$store, this.user_id)
        .then(res => {
          _this.payment_list = res;
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          console.log(err);
          try {
            _this.showErrorNotification("获取付款记录失败", err.status);
          } catch (e) {
            console.log(e);
            _this.showErrorNotification("获取付款记录失败", "ERROR");
          }
        })
    },
    showErrorNotification(op, msg) {
      this.$notification.open({
        message: op,
        description: msg,
        duration: 3,
        icon: <a-icon type="warning" style="color: #ed002f" />,
      });
    },
    showSuccessMessage(msg) {
      this.$message.success(msg);
    },
  },
  mounted() {
    this.updatePage();
  }
}
</script>

<style scoped>

</style>
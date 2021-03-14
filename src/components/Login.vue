<template>
  <div class="login-root">
    <div class="inner-login">
      <a-icon type="idcard" theme="twoTone" two-tone-color="#12CCA7" :style="{ fontSize: '90px' }" />
      <a-form
          id="login-form"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              class="login-form-input"
              v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]"
              placeholder="Username"
              autocomplete=off
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
              class="login-form-input"
              v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
              type="password"
              placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input-password >
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button" v-bind:loading="login_loading">
            登录
          </a-button>
          <div>
            没有帐号？
            <a href="javascript: void(0);" @click="goToRegister">
              现在注册！
            </a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import api_service from "@/utils/apis.js"

export default {
  name: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  data: function() {
    return {
      login_loading: false,
      login_error: false,
      from_logout: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          _this.login_loading = true;
          api_service.call_login(this.$store, values.userName, values.password)
            .then((res) => {
              if ('code' in res && res['code'] !== 0) {
                return Promise.reject(res);
              }
              return api_service.do_update_info(this.$store)
                      .then((res) => {
                        _this.login_loading = false;
                        this.showSuccessMessage("登录成功，正在跳转");
                        if (_this.from_logout) {
                          this.$router.push('/index');
                        } else {
                          this.$router.back();
                        }
                      });
            })
            .catch((err) => {
              _this.login_loading = false;
              try {
                this.showErrorNotification(err.status);
              } catch (e) {
                console.log(e);
                this.showErrorNotification("ERROR");
              }
            })
        }
      });
    },
    showErrorNotification(msg) {
      this.$notification.open({
        message: '登录失败',
        description: msg,
        duration: 10,
        icon: <a-icon type="warning" style="color: #ed002f" />,
      });
    },
    showSuccessMessage(msg) {
      this.$message.success(msg);
    },
    goToRegister() {
      this.$router.push('/register')
    }
  },
  beforeRouteEnter (to, from, next) {

    next(vm => {
      if (from.path === "/logout") {
        vm.from_logout = true;
      }
    });
  },
}


</script>

<style scoped>
  .login-root {
    /*background-image: url("../assets/login_background.jpg");*/
    text-align: center;
    background-size: cover;
    font-size: 18px;
    padding-top: 50px;
    background-color: #f0f0f0;
    min-height: 100%;
  }
  
  .inner-login {
    /*opacity: 0.9;*/
    background-color: #fff;
    display: inline-block;
    padding-top: 32px;

    border-radius: 8px;
    border-color: hsv(0, 0, 85%);
    border-width: 1px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }

  .login-form {
    margin: 32px 64px 32px 64px;
  }

  .login-form-input {
    width: 250px;
  }

  .login-form-button {
    width: 250px;
  }
</style>
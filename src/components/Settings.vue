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

    <template v-if="$store.state.logged_in && !finished">
      <div class="edit-user-info">
        <a-form-model ref="updateForm" :model="updateForm" :rules="rules" v-bind="layout">
          <a-form-model-item has-feedback label="用户名" prop="username">
            <a-input v-model="updateForm.username" />
          </a-form-model-item>

          <a-form-model-item label="昵称" prop="nickname">
            <a-input v-model="updateForm.nickname" />
          </a-form-model-item>

          <a-form-model-item label="个性签名" prop="sign">
            <a-input placeholder="请输入个性签名" :rows="2" v-model="updateForm.sign" />
          </a-form-model-item>

          <a-form-model-item label="性别" prop="gender">
            <a-radio-group default-value="unset" v-model="updateForm.gender" button-style="solid">
              <a-radio-button value="male">
                <a-icon type="man" />
                男性
              </a-radio-button>
              <a-radio-button value="female">
                <a-icon type="woman" />
                女性
              </a-radio-button>
              <a-radio-button value="unset">
                <a-icon type="question-circle" />
                保密
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="出生日期" prop="birthday">
            <a-date-picker allowClear valueFormat="YYYY-MM-DD" v-model="updateForm.birthday" />
          </a-form-model-item>

          <a-form-model-item label="头像" prop="avatar">
            <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="200"/>
              <div v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          </a-form-model-item>

          <div class="button-container">
            <a-form-model-item>
              <div class="button-container">
                <div>
                  <a-button type="primary" class="button" @click="doSubmit" v-if="current_step == 0">
                    确认<a-icon type="check" />
                  </a-button>
                </div>
              </div>
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>
    </template>

    <div class="result" v-if="finished">
      <a-result
          status="success"
          title="信息修改成功"
          sub-title=""
      >
        <template #extra>
          <a-button key="console" type="primary" @click="goBack">
            返回
          </a-button>
        </template>
      </a-result>
    </div>

  </div>
</template>

<script>
import api_service from "@/utils/apis";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "Settings",
  data: function () {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    let validateBirthday = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请输入生日'));
      } else {
        callback();
      }
    };
    return {
      current_step: 0,
      finished: false,
      submitting: false,
      updateForm: {
        username: '',
        password: '',
        nickname: '',
        gender: 'unset',
        sign: '',
      },
      photo_updated: false,
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        birthday: [{ validator: validateBirthday, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },
      file: null,
      imageUrl: null,
    };
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    }
  },
  watch: {
    getUser(to, from) {
      this.updateForm = this.$store.state.user;
      this.imageUrl = this.$store.state.user.avatar_address;
    },
  },
  methods: {
    doSubmit() {
      let _this = this;
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          _this.submitting = true;
          api_service.call_update_user_info(_this.$store, _this.updateForm.username, _this.updateForm.nickname,
              _this.updateForm.sign, _this.updateForm.birthday, _this.updateForm.gender
              , _this.file)
              .then((res) => {
                _this.submiting = false;
                console.log(res);
                if ('code' in res && res['code'] !== 0) {
                  return Promise.reject(res);
                }
                _this.finished = true;
                return api_service.do_update_info(_this.$store);
              })
              .catch((err) => {
                _this.submiting = false;
                console.log(err);
                this.$notification.open({
                  message: '信息更新失败',
                  description: err.status,
                  duration: 0,
                  icon: <a-icon type = "warning" style = "color: #ed002f" />,
                });
              })
        } else {
          return false;
        }
      });
    },
    beforeUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
      this.photo_updated = true;
      return false;
    },
    handleChange(info) {
      console.log(info)
      let _this = this;
      this.file = info.file;
      this.photo_updated = true;
      getBase64(info.file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
    },
    goBack() {
      this.$router.back();
    }
  },
  created() {
    this.updateForm = this.$store.state.user;
    this.imageUrl = this.$store.state.user.avatar_address;
  }
}
</script>

<style scoped>
.edit-user-info {
  background-color: #fff;
  padding: 32px;
  width: 70%;
  margin: 0 auto;
  text-align: left;
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.button-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.button {
  margin: 0px 0px 0px 16px;
}
</style>
<template>
  <div class="update-video-root">
    <template v-if="!$store.state.logged_in">
      <a-alert
          message="Error"
          description="您并没有登录"
          type="error"
          show-icon
          class="login-alert"
      />
    </template>

    <div class="update-video-info" v-if="$store.state.logged_in">
      <a-form-model ref="registerForm" :model="uploadVideoForm" :rules="rules" v-bind="layout">
        <div class="video-upload">
          <a-upload-dragger
              name="视频文件"
              :multiple="false"
              accept=".mp4"
              :showUploadList="true"
              :fileList="videoList"
              :before-upload="beforeVideoUpload"
              @change="handleVideoChange"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="cloud-upload" />
            </p>
            <p class="ant-upload-text">
              点击或拖放视频文件覆盖原视频文件
            </p>
            <p class="ant-upload-hint">
              请上传MP4格式的视频
            </p>
          </a-upload-dragger>
        </div>


        <a-form-model-item has-feedback label="视频标题" prop="video_title">
          <a-input v-model="uploadVideoForm.video_title" />
        </a-form-model-item>
        <a-form-model-item label="视频介绍" prop="introduction">
          <a-input v-model="uploadVideoForm.introduction" />
        </a-form-model-item>

        <a-form-model-item label="视频类型" prop="video_type_id">
          <a-select
              v-model="uploadVideoForm.video_type_id"
              option-filter-prop="children"
              :filter-option="selectFilterOption"
              :loading="selectLoading"
              show-search
          >
            <a-select-option v-for="item in selectOptionList" :key="item.video_type_id">
              <a-tooltip placement="right" class="tooltip">
                <template slot="title">
                  {{ item.description }}
                </template>
                {{ item.type }}
              </a-tooltip>
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="付费观看" prop="paidVideo">
          <a-switch v-model="uploadVideoForm.paidVideo" />
        </a-form-model-item>

        <a-form-model-item v-if="uploadVideoForm.paidVideo" label="费用" prop="videoPrice">
          <a-input-number
              class="price-input"
              :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
              :defaultValue="0"
              v-model="uploadVideoForm.videoPrice"
              :min="1"
              :max="200"/>
        </a-form-model-item>

        <a-form-model-item label="缩略图" prop="thumbnail">
          <a-upload
              name="thumbnail"
              list-type="picture-card"
              class="thumbnail-uploader"
              :show-upload-list="false"
              :before-upload="beforeThumbnailUpload"
              @change="handleThumbnailChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="350"/>
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
                <a-button class="button" @click="goBack">
                  <a-icon type="left" />取消
                </a-button>
              </div>
              <div class="submit">
                <a-button type="primary" class="button" @click="doSubmit" :loading="submitting">
                  更新<a-icon type="upload" v-if="!submitting"/>
                </a-button>
              </div>
            </div>
          </a-form-model-item>
        </div>
      </a-form-model>
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
  name: "UploadVideo",
  props: ['video_id'],
  data: function () {
    let validateNonEmpty = (rule, value, callback) => {
      value = value.toString();
      if (!value || value.trim() === '') {
        callback(new Error('视频标题不能为空'));
      } else {
        callback();
      }
    };
    return {
      videoList: [],
      current_step: 0,
      submitting: false,
      doneUploading: false,
      uploadVideoForm: {
        video_title: '',
        introduction: '',
        video_type_id: 0,
        paidVideo: false,
        videoPrice: 1,
      },
      oldVideoInfo: {},
      rules: {
        video_title: [{ validator: validateNonEmpty, trigger: 'change' }],
        video_type_id: [{ validator: validateNonEmpty, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      thumbnail: null,
      imageUrl: null,
      video: null,
      selectLoading: false,
      selectOptionList: [],
    };
  },
  methods: {
    checkFile(file) {
      if (!file) {
        return true;
      }
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('请上传 JPG/PNG 文件!');
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('图片大小应小于 5MB!');
      }
      return isJpgOrPng && isLt5M;
    },
    checkVideo(file) {
      if (!file) {
        return true;
      }
      const isMp4 = file.type === 'video/mp4';
      if (!isMp4) {
        this.$message.error('请上传 MP4 文件!');
      }
      return isMp4;
    },
    doSubmit() {
      let _this = this;
      this.$refs.registerForm.validate(valid => {
        if (valid && this.checkFile(_this.thumbnail) && _this.checkVideo(_this.video)) {
          _this.submitting = true;
          api_service.call_update_video(_this.$store, _this.oldVideoInfo.video_id, _this.uploadVideoForm.video_title,
              _this.uploadVideoForm.introduction, _this.uploadVideoForm.video_type_id,
              _this.uploadVideoForm.paidVideo ? _this.uploadVideoForm.videoPrice : 0, _this.video,
              _this.thumbnail, _this.oldVideoInfo)
              .then((res) => {
                _this.submitting = false;
                console.log(res);
                if ('code' in res && res['code'] !== 0) {
                  return Promise.reject(res);
                }
                _this.doneUploading = true;
                this.showSuccessMessage(res['status']);
              })
              .catch((err) => {
                _this.submitting = false;
                console.log(err);
                this.$notification.open({
                  message: '视频更新失败',
                  description: err.status,
                  duration: 0,
                  icon: <a-icon type="warning" style="color: #ed002f" />,
                });
              })
        } else {
          return false;
        }
      });
    },
    beforeThumbnailUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
      return false;
    },
    beforeVideoUpload(file, fileList) {
      this.video = file;
      return false;
    },
    handleThumbnailChange(info) {
      console.log(info)
      let _this = this;
      this.thumbnail = info.file;
      getBase64(info.file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
    },
    handleVideoChange(info) {
      console.log(info)
      let _this = this;
      this.video = info.file;
      this.videoList = [this.video];
      if (info.file.status == "removed") {
        this.video = null;
        this.videoList = [];
      }
    },
    goBack() {
      this.$router.back();
    },
    openVideoPage() {
      this.$router.push("/myspace");
    },
    getSelectOptions() {
      this.selectLoading = true;
      let _this = this;
      api_service.call_get_video_types(this.$store)
          .then((res) => {
            // console.log(res)
            this.selectLoading = false;
            _this.selectOptionList = res;
          })
          .catch((err) => {
            this.selectLoading = false;
            console.log(err);
            try {
              this.showErrorNotification(err.status);
            } catch (e) {
              console.log(e);
              this.showErrorNotification("ERROR");
            }
          });
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
    selectFilterOption(input, option) {
      return (
          option.componentOptions.children[0].componentOptions.children[1].text.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    updatePage() {
      let _this = this;
      this.selectLoading = true;
      api_service.call_get_video_types(this.$store)
          .then((res) => {
            // console.log(res)
            _this.selectLoading = false;
            _this.selectOptionList = res;
          })
          .catch((err) => {
            _this.selectLoading = false;
            console.log(err);
            try {
              _this.showErrorNotification("获取视频分类失败", err.status);
            } catch (e) {
              console.log(e);
              _this.showErrorNotification("获取视频分类失败", "ERROR");
            }
          })
          .then((res) => {
            return api_service.call_get_video(_this.$store, _this.video_id);
          })
          .then(res => {
            _this.oldVideoInfo = res;
            _this.uploadVideoForm.video_title = res.video_title;
            _this.uploadVideoForm.introduction = res.introduction;
            _this.uploadVideoForm.paidVideo = (res.price !== 0);
            _this.uploadVideoForm.videoPrice = res.price;
            _this.imageUrl = res.thumbnail_address;
            _this.uploadVideoForm.video_type_id = res.video_type;
          })
          .catch((err) => {
            _this.selectLoading = false;
            console.log(err);
            try {
              _this.showErrorNotification("更新视频信息失败", err.status);
            } catch (e) {
              console.log(e);
              _this.showErrorNotification("更新视频信息失败", "ERROR");
            }
          })
    }
  },
  watch: {
    video_id(to, from) {
      if (to !== from) {
        this.updatePage();
      }
    },
  },
  mounted() {
    this.updatePage();
  }
}
</script>

<style scoped>
.update-video-root {

}

.update-video-info {
  margin: 32px auto;
  width: 60%;
}

.video-upload{
  margin: 0 auto 32px;
  width: 70%;
}

.button-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.button {
  margin: 0px 0px 0px 16px;
}

.price-input {
  width: 150px;
}
</style>
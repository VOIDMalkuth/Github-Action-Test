<template>
  <div class="status-list-root">
    <template v-if="loading">
      <a-skeleton avatar active :loading="loading"></a-skeleton>
      <a-skeleton avatar active :loading="loading"></a-skeleton>
      <a-skeleton avatar active :loading="loading"></a-skeleton>
      <a-skeleton avatar active :loading="loading"></a-skeleton>
    </template>

    <template v-if="$store.state.logged_in && $store.state.user_id === user_id">
      <div class="new-comment">
        <div class="new-post-text">新增动态</div>
        <a-comment>
          <a-avatar
              slot="avatar"
              :src="$store.state.user.avatar_address"
              :alt="$store.state.user.nickname"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea placeholder="在此处输入动态内容" v-model="post_value" :rows="6" :allowClear="true" />
            </a-form-item>
            <a-form-item style="text-align: right">
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                发布动态
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </template>

    <template v-if="!loading">
      <div v-if="total_list.length !== 0" class="item-list">
        <div class="inner-container">
          <div v-for="item of current_list" v-bind:key="item.status_id" class="container-card">
            <status-container :item="item" v-on:itemChange="updatePage"></status-container>
          </div>
        </div>
        <a-pagination :default-current="1" :page-size="page_size" :total="total_list.length" @change="onPaginationChange" />
      </div>
    </template>
  </div>
</template>

<script>
import api_service from "../../utils/apis";
import StatusContainer from "./StatusContainer";

export default {
  name: "StatusList",
  props: ['user_id'],
  components: {StatusContainer},
  data() {
    return {
      loading: true,
      page_size: 10,
      current_page: 1,
      comments_list: [],
      uploads_list: [],
      posts_list: [],
      total_list: [],
      current_list: [],

      post_value: "",
      submitting: false,
    };
  },
  methods: {
    updatePage() {
      this.loading = true;
      let _this = this;
      let comments_promise = api_service.call_get_comments_by_user(this.$store, this.user_id)
          .then((res)=>{
            if ('code' in res && res['code'] !== 0) {
              return Promise.reject(res);
            }
            return res['comments'];
          })
          .then(res => {
            res.forEach(x => {
              x.status_type = 'sendComment';
              x.status_time = new Date(x.comment_time);
              x.status_id = x.status_type + x.comment_id;
            });
            _this.comments_list = res;
          });
      let uploads_promise = api_service.call_get_user_video(this.$store, this.user_id)
          .then(res => {
            res.forEach(x => {
              x.status_type = 'uploadVideo';
              x.status_time = new Date(x.upload_time);
              x.status_id = x.status_type + x.video_id;
            });
            _this.uploads_list = res;
          })
      let posts_promise = api_service.call_get_posts_by_user(this.$store, this.user_id)
          .then(res => {
            res.forEach(x => {
              x.status_type = 'sendPost';
              x.status_time = new Date(x.post_time);
              x.status_id = x.status_type + x.post_id;
            });
            _this.posts_list = res;
          })

      Promise.all([comments_promise, uploads_promise, posts_promise])
        .then(res => {
          let allList = [].concat(_this.posts_list).concat(_this.comments_list).concat(_this.uploads_list);
          allList.sort((a, b) => a.status_time < b.status_time ? -1 : 1);
          allList.reverse();
          _this.total_list = allList;
          _this.onPaginationChange(this.current_page);
          _this.loading = false;
        })
        .catch(err => {
          console.log(err);
          try {
            _this.showErrorNotification("获取动态失败", err.status);
          } catch (e) {
            console.log(e);
            _this.showErrorNotification("获取动态失败", "ERROR");
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
    onPaginationChange(current) {
      if (this.total_list.length === 0) {
        return;
      }
      this.current_page = current;
      let start = (this.current_page - 1) * this.page_size;
      let end = (this.current_page * this.page_size < this.total_list.length) ?
          (this.current_page * this.page_size) : (this.total_list.length);
      this.current_list = this.total_list.slice(start, end);
      this.current_list = this.total_list.slice(start, end);
    },
    handleSubmit() {
      if (this.post_value.trim() === '') {
        this.$message.error('请输入动态内容!');
        return false;
      }

      this.submitting = true;
      let _this = this;
      api_service.call_create_post(this.$store, this.post_value)
          .then((res) => {
            _this.submitting = false;
            if ('code' in res && res['code'] !== 0) {
              return Promise.reject(res);
            }
            _this.$message.success('新增动态成功');
            _this.post_value = ""
            _this.updatePage();
          })
          .catch((err) => {
            console.log(err);
            _this.submitting = false;
            try{
              this.$notification.open({
                message: '动态新增失败',
                description: err.status,
                duration: 3,
                icon: <a-icon type="warning" style="color: #ed002f" />,
              });
            } catch(e) {
              console.log(e)
            }
          });
    },
  },
  mounted() {
    this.updatePage();
  }
}
</script>

<style scoped>
.item-list {
  text-align: right;
}

.new-comment {
  width: 95%;
  margin: 0 auto 16px;
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 32px 0px;
}

.new-comment:hover {
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.new-post-text {
  color: #0AA679;
  margin-top: 16px;
  font-size: 24px;
}
</style>
<template>
  <div class="comment-list-root">
    <template>

      <div class="unable-new-comment" v-if="!$store.state.logged_in || !permission">
        <a-comment>
          <a-avatar slot="avatar" icon="user"/>
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="2" value="登录或购买本视频后方可评论" disabled />
            </a-form-item>
            <a-form-item style="text-align: left">
              <a-button html-type="submit" type="primary" disabled>
                新增评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>

      <div class="new-comment" v-if="$store.state.logged_in && permission">
        <a-comment>
          <a-avatar
              slot="avatar"
              :src="$store.state.user.avatar_address"
              :alt="$store.state.user.nickname"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea v-model="comment_value" :rows="4" :allowClear="true" />
            </a-form-item>
            <a-form-item style="text-align: left">
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                新增评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </template>

    <a-skeleton :paragraph="{rows:12}" :loading="loading" active>
      <div v-if="comment_list.length !== 0" class="comment-list">
        <div class="inner-container">
          <div v-for="item of current_list" v-bind:key="item.comment_id" class="container-card">
            <a-divider />
            <comment :comment_id="item.comment_id" :comment_time="item.comment_time"
                     :comment_video="video_id" :commenter="item.commenter" :content="item.content"
                     @delComment="onDelComment" @editComment="onEditComment"
            ></comment>
          </div>
        </div>
        <a-pagination :default-current="1" :page-size="page_size" :total="comment_list.length" @change="onPaginationChange" />
      </div>

      <div v-if="comment_list.length === 0" class="comment-info">
        <a-empty :description="false" />
        <span>暂无评论</span>
      </div>
    </a-skeleton>
  </div>
</template>

<script>
import api_service from "@/utils/apis";
import Comment from "@/components/Comments/Comment"


export default {
  name: "CommentList",
  components: {Comment},
  props: ['mode', 'video_id', 'ready', 'permission'],
  data: function() {
    return {
      page_size: 10,
      loading: true,
      comment_value: "",
      submitting: false,
      current_list: [],
      comment_list: [],
      current_page: 1,
    };
  },
  methods: {
    onPaginationChange(current) {
      if (this.comment_list.length === 0) {
        return;
      }
      this.current_page = current;
      let start = (this.current_page - 1) * this.page_size;
      let end = (this.current_page * this.page_size < this.comment_list.length) ?
          (this.current_page * this.page_size) : (this.comment_list.length);
      this.current_list = this.comment_list.slice(start, end);
    },
    update_comments() {
      let _this = this;
      api_service.call_get_video_comments(this.$store, this.video_id)
        .then((res) => {
          console.log(res);
          if ('code' in res && res['code'] !== 0) {
            return Promise.reject(res);
          }
          _this.comment_list = res.comments;
          _this.onPaginationChange(this.current_page);
          _this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$notification.open({
            message: '评论获取失败',
            description: err.status,
            duration: 3,
            icon: <a-icon type="warning" style="color: #ed002f" />,
          });
          _this.loading = false;
          _this.comment_list = [];
        })
    },
    onDelComment(comment_id) {
      this.comment_list = this.comment_list.filter(item => (item.comment_id !== comment_id));
      this.onPaginationChange(this.current_page);
    },
    onEditComment(comment_id, new_content) {
      this.comment_list.forEach(item => {
        if (item.comment_id === comment_id) {
          item.content = new_content;
        }
      });
      this.onPaginationChange(this.current_page);
    },
    handleSubmit() {
      if (this.comment_value === '') {
        this.$message.error('请输入评论内容!');
        return false;
      }

      this.submitting = true;
      let _this = this;
      api_service.call_create_comment(this.$store, this.video_id, this.comment_value)
        .then((res) => {
          _this.submitting = false;
          if ('code' in res && res['code'] !== 0) {
            return Promise.reject(res);
          }
          _this.$message.success('评论成功');
          _this.comment_value = ""
          _this.update_comments();
        })
        .catch((err) => {
          console.log(err);
          _this.submitting = false;
          try{
            this.$notification.open({
              message: '评论添加失败',
              description: err.status,
              duration: 3,
              icon: <a-icon type="warning" style="color: #ed002f" />,
            });
          } catch(e) {
            console.log(e)
          }
        })

    }
  },
  watch: {
    ready: function(to, from){
      if (to === true) {
        this.update_comments();
      }
    }
  },
  mounted() {
    if (this.ready === true) {
      this.update_comments();
    }
  }
}
</script>

<style scoped>
.container-card {
  /*border-top: 1px solid #dddddd;*/
}

.comment-list {
  text-align: center;
}

.comment-info {
  text-align: center;
}
</style>
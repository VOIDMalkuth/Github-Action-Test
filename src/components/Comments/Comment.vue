<template>
  <div class="comment-root" style="text-align: left;">
    <div>
      <a-modal
          title="确认删除？"
          :visible="showDelete"
          :confirm-loading="deleteLoading"
          @ok="handleDelOk"
          @cancel="handleDelCancel"
      >
        <p>此操作不可撤销</p>
      </a-modal>
    </div>

    <div>
      <a-modal
          title="请输入修改的内容"
          :visible="showEdit"
          :confirm-loading="editLoading"
          @ok="handleEditOk"
          @cancel="handleEditCancel"
      >
        <a-textarea v-model="replaced_content" :rows="4" />
      </a-modal>
    </div>

    <a-comment>
      <template slot="actions" v-if="$store.state.logged_in && $store.state.user_id === commenter">
        <a-icon type="edit" class="comment-action" @click="editComment" />
        <a-icon type="delete" class="comment-action" @click="deleteComment" />
      </template>
      <a slot="author" @click="gotoAuthor(comment_creator)">{{comment_creator.nickname}}</a>
      <a-avatar
          @click="gotoAuthor(comment_creator)"
          slot="avatar"
          :src="comment_creator.avatar_address"
          :alt="comment_creator.nickname"
      />
      <div slot="content">
        {{ content }}
      </div>
      <a-tooltip slot="datetime" :title="moment(comment_time).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(comment_time).fromNow() }}</span>
      </a-tooltip>
    </a-comment>
  </div>
</template>

<script>
import moment from "moment";
import api_service from "@/utils/apis";

import VideoCard from "../VideoContainer/VideoCard";

export default {
  name: "Comment",
  components: {VideoCard},
  props: ['comment_id', 'commenter', 'comment_video', 'comment_time', 'content'],
  data: function () {
    return {
      comment_creator: {},
      replaced_content: "",
      showDelete: false,
      deleteLoading: false,
      showEdit: false,
      editLoading: false,
      moment,
    };
  },
  methods: {
    deleteComment() {
      this.showDelete = true;
    },
    editComment() {
      this.replaced_content = this.content;
      this.showEdit = true;
    },
    handleDelOk(e) {
      this.deleteLoading = true;
      let _this = this;
      api_service.call_del_comment(this.$store, this.comment_id)
        .then((res) => {
          _this.showDelete = false;
          _this.deleteLoading = false;
          this.$message.success('评论删除成功');
          this.$emit('delComment', this.comment_id);
        })
      .catch((err) => {
        _this.showDelete = false;
        _this.deleteLoading = false;
        this.$error({
          title: '出错了',
          content: h => <div>评论删除失败</div>,
          onOk() {},
        });
      })
    },
    handleEditOk(e) {
      this.deleteLoading = true;
      let _this = this;
      api_service.call_update_comment(this.$store, this.comment_id, this.replaced_content)
          .then((res) => {
            _this.showEdit = false;
            _this.editLoading = false;
            this.$message.success('评论修改成功');
            this.$emit('editComment', this.comment_id, this.replaced_content);
          })
          .catch((err) => {
            _this.showEdit = false;
            _this.editLoading = false;
            this.$error({
              title: '出错了',
              content: h => <div>评论更新失败</div>,
            onOk() {},
          });
          })
    },
    handleDelCancel(e) {
      this.showDelete = false;
    },
    handleEditCancel(e) {
      this.showEdit = false;
    },
    gotoAuthor(author) {
      this.$router.push("/user/" + author.user_id.toString())
    }
  },
  created() {
    api_service.call_get_user_info(this.$store, this.commenter)
      .then((res) => {
        this.comment_creator = res;
      })
  }
}
</script>

<style scoped>
.comment-action {
  margin: 0px 8px 0px 0px;
}

</style>
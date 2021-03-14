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
      <template slot="actions" v-if="$store.state.logged_in && $store.state.user_id === post_item.poster">
        <div class="action-box">
          <a-icon type="edit" class="comment-action" @click="editPost" />
          <a-icon type="delete" class="comment-action" @click="deletePost" />
        </div>
      </template>
      <a slot="author" @click="gotoAuthor(post_creator)">{{post_creator.nickname}}<a-tag style="margin-left: 4px" color="cyan">发布了动态</a-tag></a>
      <a-avatar
          @click="gotoAuthor(post_creator)"
          slot="avatar"
          :src="post_creator.avatar_address"
          :alt="post_creator.nickname"
      />

      <div slot="content" class="content-box">
          <div class="content-text">
            <span>{{ post_item.content }}</span>
          </div>
      </div>


      <a-tooltip slot="datetime" :title="moment(post_item.post_time).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(post_item.post_time).fromNow() }}</span>
      </a-tooltip>
    </a-comment>
  </div>
</template>

<script>
import moment from "moment";
import api_service from "@/utils/apis";

export default {
  name: "StatusPostContainer",
  components: {},
  props: ['post_id', 'post_item'],
  data: function () {
    return {
      post_creator: {},
      replaced_content: "",
      showDelete: false,
      deleteLoading: false,
      showEdit: false,
      editLoading: false,
      moment,
    };
  },
  methods: {
    deletePost() {
      this.showDelete = true;
    },
    editPost() {
      this.replaced_content = this.post_item.content;
      this.showEdit = true;
    },
    handleDelOk(e) {
      this.deleteLoading = true;
      let _this = this;
      api_service.call_delete_post(this.$store, this.post_item.post_id)
          .then((res) => {
            _this.showDelete = false;
            _this.deleteLoading = false;
            this.$message.success('评论删除成功');
            this.$emit('delPost', this.post_item.post_id);
          })
          .catch((err) => {
            _this.showDelete = false;
            _this.deleteLoading = false;
            this.$error({
              title: '出错了',
              content: h => <div>动态删除失败</div>,
              onOk() {},
            });
          })
    },
    handleEditOk(e) {
      this.deleteLoading = true;
      let _this = this;
      api_service.call_update_post(this.$store, this.post_item.post_id, this.replaced_content)
          .then((res) => {
            _this.showEdit = false;
            _this.editLoading = false;
            this.$message.success('动态修改成功');
            this.$emit('editPost', this.post_item.post_id, this.replaced_content);
          })
          .catch((err) => {
            _this.showEdit = false;
            _this.editLoading = false;
            this.$error({
              title: '出错了',
              content: h => <div>动态更新失败</div>,
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
    api_service.call_get_user_info(this.$store, this.post_item.poster)
        .then((res) => {
          this.post_creator = res;
        })
  }
}
</script>

<style scoped>
.comment-root {
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 32px 0px;
  margin-bottom: 16px;
}

.comment-root:hover {
  border-radius: 8px;
  border-color: hsv(0, 0, 85%);
  border-width: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.comment-action {
  margin: 0px 8px 0px 0px;
}

.content-box {
  background-color: #fff;
  padding: 8px;
}

.text-wrapper-box {
  width: 55%;
  margin-left: 80px;
}

.action-box {
  font-size: 18px;
}

.content-top {
  line-height: 1;
  height: 30px;
  font-size: 72px;
}

.content-text {
  font-size: 18px;
  margin: 8px auto;
}

.content-bottom {
  height: 30px;
  line-height: 1;
  text-align: right;
  font-size: 72px;
}

</style>
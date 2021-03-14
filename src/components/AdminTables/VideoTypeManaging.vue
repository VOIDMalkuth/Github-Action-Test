<template>
  <div class="video-type-management-root">

    <a-modal
        title="新增类型"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleCreateOk"
        @cancel="handleCreateCancel"
    >
      <a-form layout="horizontal">
        <a-form-item
            :label-col="{span :4}"
            :wrapper-col="{span: 18}"
            label="视频分类"
        >
          <a-input allowClear placeholder="请输入新的视频分类" v-model="newTypeName">
            <a-icon slot="prefix" type="tag" />
          </a-input>
        </a-form-item>
        <a-form-item
            :label-col="{span :4}"
            :wrapper-col="{span: 18}"
            label="详细描述"
        >
          <a-textarea allowClear placeholder="请输入对分类的详细描述" v-model="newTypeDescription"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-table :columns="columns" :data-source="tableData" rowKey="video_type_id">
<!--      过滤器-->
      <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
      >
        <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
      />

      <div class="operation-tltle" slot="customTitle">
        <div>操作</div>
        <div><a-button @click="createRecord" class="create-record-button" type="primary" icon="plus" size="small">新增类型</a-button></div>
      </div>

<!--      自定义渲染-->
      <template
          v-for="col in ['video_type_id', 'type', 'cutted_description']"
          :slot="col"
          slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
              v-if="record.editable && col === 'cutted_description'"
              style="margin: -5px 0"
              :value="(col !== 'cutted_description') ? text : record.description"
              @change="e => handleEditChange(e.target.value, record['video_type_id'], col)"
          />
          <template v-else-if="col === 'video_type_id' && record.updating">
            <a-spin />
            {{ text }}
          </template>
          <template v-else-if="col === 'cutted_description' && record.cutted_description !== record.description">
            {{ text }}
            <a @click="showDetail(record.description)" :disabled="record.updating"><a-icon type="zoom-in"/></a>
          </template>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
<!--      删除修改-->
      <template slot="action" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a-popconfirm title="确定保存?" @confirm="() => saveRow(record['video_type_id'])">
              <a>保存</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a @click="() => cancelRow(record['video_type_id'])">取消</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== '' || record.updating" @click="() => editRow(record['video_type_id'])">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm :class="record.updating ? 'disabled-delete':'normal-delete'" :disabled="record.updating" title="确定删除?" @confirm="() => deleteRow(record['video_type_id'])">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import api_service from "@/utils/apis";
const columns = [
  {
    title: 'id',
    dataIndex: 'video_type_id',
    scopedSlots: { customRender: 'video_type_id' },
  },
  {
    title: '类型',
    dataIndex: 'type',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'type'
    },
    onFilter: (value, record) =>
        record.type
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '说明',
    dataIndex: 'cutted_description',
    scopedSlots: { customRender: 'cutted_description' },
  },
  {
    dataIndex: 'action',
    width: 300,
    slots: { title: 'customTitle' },
    scopedSlots: {
      customRender: 'action'
    },
  },
];

export default {
  name: "VideoTypeManaging",
  data() {
    return {
      cacheData: null,
      tableData: [],
      columns: columns,
      searchInput: "",
      editingKey: '',
      maxlen: 25,
      visible: false,
      confirmLoading: false,
      newTypeName: "",
      newTypeDescription: "",
    };
  },
  methods: {
    showDetail(info) {
      this.$info({
        title: '详细内容',
        content: info,
      });
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    updateList() {
      let _this = this;
      api_service.call_get_video_types(this.$store)
        .then((res) => {
          // console.log(res)
          res.forEach((x) => {
            x['cutted_description'] = x['description'].slice(0, _this.maxlen) + ((x['description'].length > _this.maxlen) ? "..." : "");
          })
          _this.tableData = res;
          _this.cacheData = _this.tableData.map(item => ({ ...item }));
        })
        .catch((err) => {
          console.log(err);
          try {
            this.showErrorNotification(err.status);
          } catch (e) {
            console.log(e);
            this.showErrorNotification("ERROR");
          }
        });
    },
    handleEditChange(value, key, column) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item['video_type_id'])[0];
      if (target) {
        target[column] = value;
        if (column === "cutted_description") {
          target['description'] = value;
          target['cutted_description'] = target['description'].slice(0, this.maxlen) + ((target['description'].length > this.maxlen) ? "..." : "");
        }
        this.tableData = newData;
      }
    },
    editRow(key) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item['video_type_id'])[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.tableData = newData;
      }
    },
    saveRow(key) {
      const newData = [...this.tableData];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item['video_type_id'])[0];
      const targetCache = newCacheData.filter(item => key === item['video_type_id'])[0];
      if (target && targetCache) {
        delete target.editable;
        this.tableData = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';

      target.updating = true;
      this.$forceUpdate();
      let _this = this;
      // todo: efficiency
      api_service.call_update_video_types(this.$store, target.video_type_id, target.description)
        .then((res) => {
          _this.showSuccessMessage("修改视频类型成功");
          target.updating = false;
          this.$forceUpdate()
          _this.updateList();
        })
        .catch((err) => {
          target.updating = false;
          this.$forceUpdate()

          console.log(err);
          try {
            _this.showErrorNotification("修改失败", err.status);
          } catch (e) {
            console.log(e);
            _this.showErrorNotification("修改失败", "ERROR");
          }
        });
    },
    cancelRow(key) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item['video_type_id'])[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item['video_type_id'])[0]);
        delete target.editable;
        this.tableData = newData;
      }
    },
    deleteRow(key) {
      let target = this.tableData.filter(item => key === item['video_type_id'])[0];
      let _this = this;
      if (target) {
        target.updating = true;
        this.$forceUpdate()
        // todo: efficiency
        api_service.call_delete_video_types(this.$store, key)
          .then((res) => {
            _this.showSuccessMessage("删除视频类型成功");
            target.updating = false;
            this.$forceUpdate()
            _this.updateList();
          })
          .catch((err) => {
            target.updating = false;
            this.$forceUpdate()

            console.log(err);
            try {
              _this.showErrorNotification("删除失败", err.status);
            } catch (e) {
              console.log(e);
              _this.showErrorNotification("删除失败", "ERROR");
            }
          });
      }
    },
    createRecord() {
      this.visible = true;
    },
    handleCreateOk(e) {
      this.confirmLoading = true;
      console.log(this.newTypeName, this.newTypeDescription);
      let _this = this;
      api_service.call_create_video_types(this.$store, this.newTypeName, this.newTypeDescription)
        .then((res) => {
            _this.showSuccessMessage("新增视频类型成功");
            _this.updateList();
            _this.visible = false;
            _this.confirmLoading = false;
        })
        .catch((err) => {
          _this.confirmLoading = false;
          console.log(err);
          try {
            _this.showErrorNotification("新增视频分类失败", err.status);
          } catch (e) {
            console.log(e);
            _this.showErrorNotification("新增视频分类失败", "ERROR");
          }
        });
    },
    handleCreateCancel(e) {
      this.visible = false;
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
    this.updateList();
  }
}
</script>

<style scoped>
.operation-tltle {
  display: flex;
  justify-content: space-between;
}

.create-record-button {
  margin-left: 100px;
}

.disabled-delete{
  color: rgba(0, 0, 0, 0.25);
}
</style>
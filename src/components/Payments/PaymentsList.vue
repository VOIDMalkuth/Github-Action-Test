<template>
  <div class="payments-list-root">
    <a-table :columns="columns" :data-source="tableData">
      <template slot="payment-type" slot-scope="text">{{ typeMap[text] }}</template>

      <template slot="related-info" slot-scope="text">
        <template v-if="text != null && text !== ''">
          <router-link :to="'/video/' + text">视频{{text}}</router-link>
        </template>
      </template>

      <template slot="purchaser" slot-scope="text">
        <template v-if="text != null && text !== ''">
          <router-link :to="'/user/' + text">用户{{text}}</router-link>
        </template>
      </template>

    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'payment_id',
    key: 'id',
  },
  {
    title: '类型',
    dataIndex: 'payment_type',
    scopedSlots: { customRender: 'payment-type' },
  },
  {
    title: '相关内容',
    dataIndex: 'video_id',
    scopedSlots: { customRender: 'related-info' },
  },
  {
    title: '付款人',
    dataIndex: 'purchaser',
    scopedSlots: { customRender: 'purchaser' },
    sorter: (a, b) => ( ( a.purchaser == b.purchaser ) ? 0 : ( ( a.purchaser > b.purchaser ) ? 1 : -1 ) ),
  },
  {
    title: '付款时间',
    dataIndex: 'purchase_time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => (new Date(a.purchase_time)) < (new Date(b.purchase_time)) ? -1 : 1,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  }
];

const typeMap = {
  video: "付费视频",
  membership: "会员"
}

export default {
  name: "PaymentsList",
  props: ['tableData'],
  data() {
    return {
      typeMap: typeMap,
      columns: columns,
    };
  }
}
</script>

<style scoped>

</style>
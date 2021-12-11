<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-content>
            <div v-for="order in fix_orders" :key="order.order_id" id="mycard1">
              <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33" >
                <md-card-header :data-background-color="dataBackgroundColor">
                  <h4 class="title">工单详细信息{{ order.order_id }}</h4>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-size-33">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>编号</label>
                        <md-input v-model="order.order_id" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>类别</label>
                        <md-input v-model="order.order_type" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>创建时间</label>
                        <md-input v-model="order.order_create_time" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>地点</label>
                        <md-input v-model="order.order_address" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>申报人</label>
                        <md-input v-model="order.order_requester_name" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <md-field>
                        <label>联系方式</label>
                        <md-input v-model="order.order_phone" readonly></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5">
                        <label>具体问题</label>
                        <md-textarea v-model="order.order_issue" readonly></md-textarea>
                      </md-field>
                    </div>
                    <md-button class="md-info" type="text" @click="open">接单</md-button>
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
  },
  components: {
  },
  methods:{
    open() {
      this.$confirm('您正要接单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功接单'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消接单'
        });
      });
    }
  },
  data() {
    return {
      fix_orders: [
        {
          order_id: "#0001",
          order_type: "水电类",
          order_create_time: "2021-10-01",
          order_address: "金华市永康市",
          order_requester_name: "施志豪",
          order_phone: "18257871786",
          order_issue: "停电停水了啊，活不下去了啊，领导们！",
        },
        {
          order_id: "#0002",
          order_type: "门窗类",
          order_create_time: "2022-10-01",
          order_address: "美国罗德岛",
          order_requester_name: "刘元驰",
          order_phone: "17236381627",
          order_issue: "邻居把我们家前门拆了，住不下去了啊，领导们！",
        },
        {
          order_id: "#0003",
          order_type: "机械类",
          order_create_time: "2021-09-01",
          order_address: "浙江省杭州市",
          order_requester_name: "施志豪",
          order_phone: "18257871786",
          order_issue: "怎么又停天然气了啊，真的活不下去了啊，领导们！",
        },
        {
          order_id: "#0004",
          order_type: "土木类",
          order_create_time: "2021-06-01",
          order_address: "金华市永康市",
          order_requester_name: "施志豪",
          order_phone: "18257871786",
          order_issue: "家里屋顶漏水",
        },
        {
          order_id: "#0005",
          order_type: "电子类",
          order_create_time: "2021-10-10",
          order_address: "浙江省杭州市",
          order_requester_name: "汤鸿涛",
          order_phone: "19283736542",
          order_issue: "电脑显卡烧了，活不下去了啊，领导们！",
        },
      ],
    };
  },
};
</script>
<style>
#mycard1{
  display: inline !important;
}
</style>
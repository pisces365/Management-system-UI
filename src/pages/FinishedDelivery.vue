<!--
 * @FileDescription: 工作人员-已完成工单界面
 * @Author: 刘元驰
 * @Date: 12/15/2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/21/2021
 -->
<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">我的订单（已完成）</h4>
            <p class="category">我完成的订单</p>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>工单列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="delivery_id"
                      md-sort-order="asc" md-fixed-header v-if="errored === false && loading === false && list_empty === false">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">工单列表</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="查询工单编号" v-model="search" @input="searchOnTable"/>
                </md-field>
              </md-table-toolbar>
              <md-table-empty-state
                  md-label="无结果"
                  v-if="searched_empty"
                  :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入`">
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="工单编号" md-sort-by="orderId">{{ item.orderId }}</md-table-cell>
                <md-table-cell md-label="订单编号" md-sort-by="deliveryId">{{ item.deliveryId }}</md-table-cell>
                <md-table-cell md-label="工单状态" md-sort-by="orderStatus">{{
                    (item.orderStatus === 1) ? "进行中" : "已完成"
                  }}</md-table-cell>
                <md-table-cell md-label="配送员状态" md-sort-by="orderCourierStatus">{{
                    (item.orderCourierStatus === 1) ? "正在配送" : ((item.orderCourierStatus === 2) ? "已接单" : "已完成")
                  }}
                </md-table-cell>
                <md-table-cell md-label="收件人姓名" md-sort-by="packageRecipientName">{{
                    item.packageRecipientName
                  }}
                </md-table-cell>
                <md-table-cell md-label="期望送达时间" md-sort-by="deliveryEta">{{ item.deliveryEta }}</md-table-cell>
                <md-table-cell md-label="配送地址" md-sort-by="packageRecipientAddress">
                  {{ item.packageRecipientAddress }}
                </md-table-cell>
                <md-table-cell md-label="可选操作">
                  <!-- 点击此按钮展示当前条目完整信息 -->
                  <el-button type="primary" @click="getSelectedDetails(item)" icon="el-icon-info"/>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
        <div>
          <!-- 工单详情对话, 根据变量dialogTableVisible的值展示/关闭 -->
          <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
            <!-- 工单详情 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">工单信息</span>
              </div>
              <!-- 从selected_order取数据 -->
              <el-table :data="selected_order" border style="width: 100%">
                <el-table-column property="deliveryId" label="上门服务器工单号"></el-table-column>
                <el-table-column property="deliveryContactlessDistribution" label="是否使用无接触配送">
                  <template slot-scope="scope">
                    <span v-if="scope.row.deliveryContactlessDistribution=== 0">使用</span>
                    <span v-if="scope.row.deliveryContactlessDistribution=== 1">不使用</span>
                  </template>
                </el-table-column>
                <el-table-column property="deliveryPhonesProtected" label="是否使用虚拟号码">
                  <template slot-scope="scope">
                    <span v-if="scope.row.deliveryPhonesProtected=== 0">使用</span>
                    <span v-if="scope.row.deliveryPhonesProtected=== 1">不使用</span>
                  </template>
                </el-table-column>
                <el-table-column property="deliveryFreight" label="工单配送费"></el-table-column>
                <el-table-column property="deliveryPaymentMethod" label="收货人付款方式"></el-table-column>
                <el-table-column property="orderStatus" label="工单状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus=== 1">进行中</span>
                    <span v-if="scope.row.orderStatus=== 2">已完成</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="selected_order" border style="width: 100%">
                <el-table-column property="orderId" label="需求工单编号"></el-table-column>
                <el-table-column property="deliveryRecipientPhone" label="收货人手机号"></el-table-column>
                <el-table-column property="orderCourierStatus" label="配送员状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderCourierStatus=== 1">正在配送</span>
                    <span v-if="scope.row.orderCourierStatus=== 2">已接单</span>
                    <span v-if="scope.row.orderCourierStatus=== 3">已完成</span>
                  </template>
                </el-table-column>
                <el-table-column property="deliveryEta" label="收件人期望收货时间"></el-table-column>
                <el-table-column property="puid" label="配送员id"></el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">包裹信息</span>
              </div>
              <!-- 从selected_order取数据 -->
              <el-table :data="selected_order" border style="width: 100%">
                <el-table-column property="packageId" label="快递号"></el-table-column>
                <el-table-column property="packageWeight" label="包裹重量"></el-table-column>
                <el-table-column property="packageDetails" label="包裹物品信息"></el-table-column>
                <el-table-column property="packageState" label="包裹状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.packageState=== 1">揽件</span>
                    <span v-if="scope.row.packageState=== 2">运输</span>
                    <span v-if="scope.row.packageState=== 3">派送</span>
                    <span v-if="scope.row.packageState=== 4">待收</span>
                    <span v-if="scope.row.packageState=== 5">已签收</span>
                  </template>
                </el-table-column>
                <el-table-column property="packageEta" label="包裹预期到达时间"></el-table-column>
                <el-table-column property="packageRecipientName" label="包裹收件人姓名"></el-table-column>
                <el-table-column property="packageType" label="包裹类型"></el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">收货人信息</span>
              </div>
              <!-- 从selected_order取数据 -->
              <el-table :data="selected_order" border style="width: 100%">
                <el-table-column property="deliveryRecipientName" label="收件人姓名"></el-table-column>
                <el-table-column property="deliveryRecipientAddress" label="收件人地址"></el-table-column>
                <el-table-column property="deliveryRecipientPhone" label="收货人手机号"></el-table-column>
                <el-table-column property="deliveryRecipientGender" label="收货人性别">
                  <template slot-scope="scope">
                    <span v-if="scope.row.deliveryRecipientGender=== 0">男</span>
                    <span v-if="scope.row.deliveryRecipientGender=== 1">女</span>
                  </template>
                </el-table-column>
                <el-table-column property="deliveryEta" label="收件人期望收货时间"></el-table-column>
              </el-table>
            </el-card>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalVariable from "../globalVariable";

const toLower = text => {
  return text.toString().toLowerCase()
}
const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.orderId).includes(toLower(term)))
  }
  return items
}

export default {
  props: {
    tableHeaderColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      search: null,
      selected: [],
      searched: [],
      searched_empty: false,  // 搜素结果是否为空
      errored: false, // 数据加载是否错误
      loading: false, // 是否正在加载数据
      list_empty: false,  // 初始获取到的数据是否为空
      delivery_list: [],  // 进行中工单列表
      dialogTableVisible: false,  // 工单详情是否可见
      selected_order: [], // 选中的工单
      processOrderVisible: false, // 修改工单信息是否可见
    };
  },
  created() {
    this.$axios
        .get('http://112.124.35.32:8081/xiangliban/express/selectMyFinishedOrders', {
          params: {
            uid: globalVariable.currentUserId()
          }
        })
        .then(successResponse => {
          this.delivery_list = successResponse.data; // 将获取的数据保存
          for (var index = 0; index < this.delivery_list.length; ++index) {
            var formedDate = this.delivery_list[index].deliveryEta.substring(0, 10) + " " + this.delivery_list[index].deliveryEta.substring(11, 19);
            this.delivery_list[index].deliveryEta = formedDate;
          }
          this.list_empty = (this.delivery_list.length === 0); // 将获取数据是否为空保存
          this.searched = this.delivery_list; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    searchOnTable() {
      this.searched = searchById(this.delivery_list, this.search);
      this.searched_empty = (!this.searched.isEmpty)
    },
    getSelectedDetails(item) {
      this.selected_order.pop();
      this.selected_order.push(item);
      this.dialogTableVisible = true;
    },
  },
};

</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
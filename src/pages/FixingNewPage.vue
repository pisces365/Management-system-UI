<!--
 * @FileDescription: 工作人员-新工单界面
 * @Author: 刘元驰
 * @Date: 12/15/2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/21/2021
 -->
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="fixBlue">
        <h4 class="title">新工单列表</h4>
      </md-card-header>
      <md-card-content>
        <!-- 页面加载/运算出错的提示 -->
        <section v-if="errored">
          <h4>很抱歉，出了点问题</h4>
        </section>
        <!-- 页面获取数据为空的提示 -->
        <section v-if="list_empty">
          <h4>没有未处理的工单！</h4>
        </section>
        <!-- 页面正在加载的提示 -->
        <section v-if="loading">
          <el-skeleton :rows="6" animated/>
        </section>
        <!-- 显示所有未处理的工单 -->
        <div v-for="order in fix_list" :key="order.fixId" id="myCard">
          <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33">
            <md-card-header data-background-color="fixBlue">
              <h4 class="title">维修工单{{ order.fixOrderId }}详细信息</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout md-size-33">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>维修表编号</label>
                    <md-input v-model="order.fixId" readonly></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>故障类别</label>
                    <md-input v-model="order.fixType" readonly></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>创建时间</label>
                    <md-input v-model="order.fixSubmitTime" readonly></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>期望上门时间</label>
                    <md-input v-model="order.fixExpectTime" readonly></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>用户大致地址</label>
                    <md-input v-model="order.fixUserAddress" readonly></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>问题描述</label>
                    <md-textarea v-model="order.fixDetails" readonly></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-primary" type="text" @click="open(order.fixOrderId)">接单</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
// 导入全局变量, 用于获取当前工作人员id
import globalVariable from "../globalVariable";

export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    return {
      errored: false, // 从后台获取数据是否出错
      loading: true, // 是否正在从后台获取数据
      list_empty: false, // 从后台获取的工单列表是否为空
      fix_list: [], // 从后台获取的全部没有人接单的工单
    };
  },
  // 初始化页面完成后,从后台获取全部没有人接单的工单
  mounted() {
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/fix/allUnprocessedOrder')
        .then(successResponse => {
          this.fix_list = successResponse.data;
          this.list_empty = (this.fix_list.length === 0);
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  },
  methods: {
    // 点击接单后, 二次确认
    open(fixOrderId) {
      var params = new URLSearchParams();
      params.append("fixOrderId", fixOrderId);
      params.append("fixWorkerId", globalVariable.currentUserId());
      this.$confirm('接单后不可取消, 是否确认接单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 工作人员确定接单后, 获取当前工单信息并写入后台
        this.$axios
            .post('http://112.124.35.32:8083/xiangliban/fix/takeOrderByOrderIdAndWorkerId', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '成功接单!工单号为' + fixOrderId
              });
              this.reload();
            }).catch(failResponse => {
          this.$message.error('接单失败!');
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消接单'
        });
      });
    }
  },
};
</script>
<style>
#myCard {
  display: inline !important;
}
</style>
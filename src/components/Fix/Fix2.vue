<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-content>
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <section v-if="list_empty">
              <h4>没有未处理的工单！</h4>
            </section>
            <section v-if="loading">
              <!--<h4>加载中……</h4>-->
              <el-skeleton :rows="6" animated />
            </section>
            <div v-for="order in fix_list" :key="order.fixId" id="myCard">
              <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33">
                <md-card-header :data-background-color="dataBackgroundColor">
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
                    <md-button class="md-raised md-primary" type="text" @click="open(order.fixOrderId)">接单</md-button>
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
import globalVariable from "../../globalVariable";

export default {
  inject: ['reload'],
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      errored: false,
      loading: true,
      list_empty: false,
      fix_list: [],
    };
  },
  mounted() {
    this.$axios
        .get('/fix/allUnprocessedOrder')
        .then(successResponse => {
          this.fix_list = successResponse.data;
          this.list_empty = (this.fix_list.isEmpty) ? true : false;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  },
  methods: {
    open(fixOrderId) {
      var params = new URLSearchParams();
      params.append("fixOrderId", fixOrderId);
      params.append("fixWorkerId", globalVariable.currentUserId());
      this.$confirm('接单后不可取消, 是否确认接单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
            .post('/fix/takeOrderByOrderIdAndWorkerId', params)
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
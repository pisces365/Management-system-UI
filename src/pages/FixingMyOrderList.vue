<!--
 * @FileDescription: 工作人员-本人的维修工单界面
 * @Author: 刘元驰
 * @Date: 2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/15/2021
 -->
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">报修工单管理（我接单的）</h4>
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
        <!-- 工作人员本人的全部报修工单的表格 -->
        <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="fixOrderId" md-sort-order="asc"
                  md-fixed-header v-if="errored == false && loading == false">
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">工单列表</h1>
            </div>
            <!-- 页内模糊查询工单编号 -->
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="查询工单编号" v-model="search" @input="searchOnTable"/>
            </md-field>
          </md-table-toolbar>
          <!-- 空状态/查询结果为空 -->
          <md-table-empty-state v-show="searched_empty" md-label="无结果"
                                :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`">
            <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
          </md-table-empty-state>
          <!-- 表单内容 -->
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="工单编号" md-sort-by="fixOrderId">{{ item.fixOrderId }}</md-table-cell>
            <md-table-cell md-label="工单类别" md-sort-by="fixType">{{ item.fixType }}</md-table-cell>
            <md-table-cell md-label="期望上门时间" md-sort-by="fixExpectTime">{{ item.fixExpectTime }}</md-table-cell>
            <md-table-cell md-label="申报人地点" md-sort-by="fixUserAddress">{{ item.fixUserAddress }}</md-table-cell>
            <md-table-cell md-label="具体问题" md-sort-by="fixDetails">{{ item.fixDetails }}</md-table-cell>
            <md-table-cell md-label="状态" md-sort-by="fixStatus">
              <el-tag :type="getLableColor(item.fixStatus)">
                {{
                  (item.fixStatus == 1) ? "未处理" : ((item.fixStatus == 2) ? "已派单" : ((item.fixStatus == 3) ? "进行中" : "已完成"))
                }}
              </el-tag>
            </md-table-cell>
            <!-- 自定义的标签,用于更直观的展示工单状态 -->
            <md-table-cell md-label="工单详情">
              <el-button @click="getSelectedDetails(item); getSelectedPictures(item); getSelectedTimeline(item)"
                         icon="el-icon-info" type="primary" plain/>
            </md-table-cell>
            <!-- 根据当前工单状态不同展示不同的可用操作: 出发修理或完成工单 -->
            <md-table-cell md-label="可选操作">
              <el-button @click="getAvailableDialog(item); getSelectedTimeline(item)" v-if="item.fixStatus != 4"
                         type="primary">
                {{
                  (item.fixStatus == 1) ? "错误" : ((item.fixStatus == 2) ? "出发修理" : "完成修理")
                }}
              </el-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
    <div>
      <!-- 工单详情对话, 根据变量dialogTableVisible的值展示/关闭 -->
      <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
        <el-tabs>
          <!-- 标签页1-工单详细信息: 将具体信息分为三部分以便更直观展示 -->
          <el-tab-pane label="详细信息">
            <el-card class="box-card">
              <div slot="header">
                <span style="font-weight: bold">工单详细信息</span>
              </div>
              <el-table :data="selected" border style="width: 100%">
                <el-table-column property="fixOrderId" label="工单编号"></el-table-column>
                <el-table-column property="fixId" label="维修单编号"></el-table-column>
                <el-table-column property="fixType" label="工单类别"></el-table-column>
                <el-table-column property="fixDetails" label="具体问题"></el-table-column>
                <el-table-column property="fixSubmitTime" label="工单创建时间"></el-table-column>
                <el-table-column property="fixExpectTime" label="期望上门时间"></el-table-column>
              </el-table>
              <el-table :data="selected" border style="width: 100%">
                <el-table-column property="name" label="维修人员姓名"></el-table-column>
                <el-table-column property="phone" label="维修人员联系方式"></el-table-column>
                <el-table-column property="fixMaterial" label="维修耗材"></el-table-column>
                <el-table-column property="fixMaterialCost" label="维修耗材费用"></el-table-column>
                <el-table-column property="fixLaborCost" label="维修工时费"></el-table-column>
                <el-table-column property="fixStatus" label="状态">
                  <template slot-scope="scope">
                    <el-tag :type="getLableColor(scope.row.fixStatus)">
                      {{
                        (scope.row.fixStatus == 1) ? "未处理" : ((scope.row.fixStatus == 2) ? "已派单" : ((scope.row.fixStatus == 3) ? "进行中" : "已完成"))
                      }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">用户相关信息</span>
              </div>
              <div>
                <el-table :data="selected" border style="width: 100%">
                  <el-table-column property="fixUserName" label="申报人姓名"></el-table-column>
                  <el-table-column property="fixUserPhone" label="申报人联系方式"></el-table-column>
                  <el-table-column property="fixUserAddress" label="位置"></el-table-column>
                  <el-table-column property="fixUserDoor" label="门牌号"></el-table-column>
                </el-table>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">用户提供的现场图片</span>
              </div>
              <!-- 从用户上传的照片中逐张读取并展示 -->
              <div class="block">
                <el-image v-for="(image,index) in this.selected_images"
                          :src="image"
                          :key="index"
                          :preview-src-list="selected_images">
                </el-image>
              </div>
            </el-card>
          </el-tab-pane>
          <!-- 标签页2-工单进度时间线: 顺序展示当前工单进度 -->
          <el-tab-pane label="进度追踪">
            <div>
              <!-- 将时间线数据逐个读取并顺序展示 -->
              <el-timeline>
                <el-timeline-item
                    v-for="(node, index) in selected_timeline"
                    :key="index"
                    :type="node.type"
                    color="#0bbd87"
                    :timestamp="node.timeNode">
                  {{ node.eventNode }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <!-- 点击出发修理后弹出的对话 -->
      <el-dialog title="出发修理" :visible.sync="startDialogVisible">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold">请确认以下的用户信息</span>
          </div>
          <div>
            <el-table :data="selected" border style="width: 100%">
              <el-table-column property="fixUserName" label="申报人姓名"></el-table-column>
              <el-table-column property="fixUserPhone" label="申报人联系方式"></el-table-column>
              <el-table-column property="fixUserAddress" label="位置"></el-table-column>
              <el-table-column property="fixUserDoor" label="门牌号"></el-table-column>
              <el-table-column property="fixExpectTime" label="期望上门时间"></el-table-column>
            </el-table>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="startDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="startFixing(selected)">出发修理</el-button>
        </div>
      </el-dialog>
      <!-- 点击修理完成后弹出的对话 -->
      <el-dialog title="修理完成" :visible.sync="endDialogVisible">
        <el-steps :active="stepperCurrent" finish-status="success" align-center>
          <el-step title="检查工单信息" icon="el-icon-view"></el-step>
          <el-step title="填写维修耗材与其费用" icon="el-icon-edit-outline"></el-step>
          <el-step title="确认并关闭工单" icon="el-icon-check"></el-step>
        </el-steps>
        <br><br>
        <el-card class="box-card" v-if="stepperCurrent === 0">
          <div slot="header">
            <span style="font-weight: bold">工单信息</span>
          </div>
          <el-table :data="selected" border style="width: 100%">
            <el-table-column property="fixOrderId" label="工单编号"></el-table-column>
            <el-table-column property="fixId" label="维修单编号"></el-table-column>
            <el-table-column property="fixType" label="工单类别"></el-table-column>
            <el-table-column property="fixDetails" label="具体问题"></el-table-column>
            <el-table-column property="fixSubmitTime" label="工单创建时间"></el-table-column>
            <el-table-column property="fixExpectTime" label="期望上门时间"></el-table-column>
          </el-table>
        </el-card>
        <!-- 步骤1: 工作人员再次确认这个工单的信息 -->
        <el-card class="box-card" v-if="stepperCurrent === 0">
          <div slot="header">
            <span style="font-weight: bold">工单时间线</span>
          </div>
          <div>
            <el-timeline>
              <el-timeline-item
                  v-for="(node, index) in selected_timeline"
                  :key="index"
                  :type="node.type"
                  color="#0bbd87"
                  :timestamp="node.timeNode">
                {{ node.eventNode }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
        <!-- 步骤2: 工作人员填写本次维修所用的耗材和耗材费用 -->
        <el-form :model="endingSubmitData" v-if="stepperCurrent === 1">
          <el-form-item label="维修耗材" :label-width="formLabelWidth">
            <el-input v-model="endingSubmitData.fixMaterial" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维修耗材费用" :label-width="formLabelWidth">
            <el-input v-model="endingSubmitData.fixMaterialCost" autocomplete="off">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 步骤3: 工作人员二次确认是否确认完成 -->
        <el-card class="box-card" v-if="stepperCurrent === 2">
          <h4>我确认我已经完成修理工作, 并愿意承担由于维修失误等产生的后果。</h4>
        </el-card>
        <!-- 步骤1的按钮 -->
        <div slot="footer" class="dialog-footer" v-if="stepperCurrent == 0">
          <el-button @click="endDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="stepperNext">下一步</el-button>
        </div>
        <!-- 步骤2的按钮 -->
        <div slot="footer" class="dialog-footer" v-if="stepperCurrent == 1">
          <el-button @click="stepperPrev">上一步</el-button>
          <el-button type="primary" @click="stepperNext">下一步</el-button>
        </div>
        <!-- 步骤3的按钮 -->
        <div slot="footer" class="dialog-footer" v-if="stepperCurrent === 2">
          <el-button @click="stepperPrev">上一步</el-button>
          <el-button type="primary" @click="endFixing(selected)">完成并关闭工单</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入全局变量获取当前登录的工作人员id
import globalVariable from "../globalVariable";
// 将输入的文字全部转为小写
const toLower = text => {
  return text.toString().toLowerCase()
}
// 在指定的结构中筛选出模糊查询结果
const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.fixOrderId).includes(toLower(term)))
  }
  return items
}

export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  // 设定表格列名的文字颜色
  props: {
    tableHeaderColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      search: null, // 需要模糊查询的内容,由用户在搜索框中输入
      dialogTableVisible: false, // 工单详情页是否可见
      startDialogVisible: false, // 前往维修页是否可见
      endDialogVisible: false, // 完成工单页是否可见
      list_empty: false, // 从后台获取的工单列表是否为空
      searched_empty: false, // 模糊查询结果是否为空
      errored: false, // 从后台获取数据是否出错
      loading: true, // 是否正在从后台获取数据
      searched: [], // 模糊查询的结果
      selected: [], // 点击详情或强制派单时所指定的工单
      selected_images: [], // 所指定的工单内用户上传的全部图片
      my_fix_orders: [], // 从后台获取的当前工作人员的全部工单
      selected_timeline: [], // 所指定的工单的时间线
      formLabelWidth: '120px', // 限制表格中标签长度
      stepperCurrent: 0, // 步骤页当前的步骤数
      endingSubmitData: {
        fixMaterial: '', // 工作人员填写的维修耗材
        fixMaterialCost: '', // 工作人员填写的维修耗材费用
      },
    };
  },
  // 页面模板渲染成html前,将查到的全部工单都显示出来
  created() {
    this.searched = this.my_fix_orders;
  },
  // 初始化页面完成后,从后台获取当前工作人员全部的工单
  mounted() {
    this.$axios
        .get('/fix/allFixDetailsByWorkerId', {
          params: {
            fixWorkerId: globalVariable.currentUserId()
          }
        })
        .then(successResponse => {
          this.my_fix_orders = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.my_fix_orders.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.my_fix_orders; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    // 页内搜索结果为空时点击按钮联系管理员
    contactAdmin() {
      window.alert('您的请求已经发出')
    },
    // 模糊查询工单id
    searchOnTable() {
      this.searched = searchById(this.my_fix_orders, this.search)
      this.searched_empty = (this.searched.isEmpty) ? false : true
    },
    // 自动计算工单状态标签的颜色并返回
    getLableColor(item) {
      if (item == 1) {
        return "danger";
      } else if (item == 2) {
        return "";
      } else if (item == 4) {
        return "success";
      } else if (item == 3) {
        return "warning";
      }
    },
    // 点击查看工单详情后, 获取当前工单信息并设置对话可见
    getSelectedDetails(item) {
      this.selected.pop();
      this.selected.push(item);
      this.dialogTableVisible = true;
    },
    // 点击查看工单详情后, 获取当前工单中保存的图片并解析保存
    getSelectedPictures(item) {
      var rawData = item.fixPicture;
      var imageList = rawData.split("#");
      this.selected_images = imageList;
    },
    // 点击查看工单详情后, 获取当前工单时间线并保存
    getSelectedTimeline(item) {
      this.$axios
          .get('/fix/analysisTimeline', {
            params: {
              fixOrderId: item.fixOrderId
            }
          })
          .then(successResponse => {
            this.selected_timeline = successResponse.data;
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    // 自动根据订单状态给出可选的动作,获取当前工单详情并设置按钮可见
    getAvailableDialog(item) {
      this.selected.pop();
      this.selected.push(item);
      if (item.fixStatus == 2) {
        this.startDialogVisible = true;
      } else if (item.fixStatus == 3) {
        this.endDialogVisible = true;
      } else {
        this.errored = true;
      }
    },
    // 点击按钮后跳转至下一个步骤
    stepperNext() {
      this.stepperCurrent++;
    },
    // 点击按钮后回到上一个步骤
    stepperPrev() {
      this.stepperCurrent--;
    },
    // 工作人员确认开始维修, 向后台写入数据并给出提示
    startFixing(selected) {
      var params = new URLSearchParams();
      params.append("fixOrderId", selected[0].fixOrderId);
      this.$axios
          .post('/fix/ongoingOrderByOrderId', params)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$message({
              type: 'success',
              message: '工单状态更新成功, 请您尽快出发!'
            });
            this.reload();
          }).catch(failResponse => {
        this.$message.error('出错了, 工单状态更新失败!');
      })
    },
    // 工作人员确认维修结束, 向后台写入数据并给出提示
    endFixing(selected) {
      var params = new URLSearchParams();
      params.append("fixMaterial", this.endingSubmitData.fixMaterial);
      params.append("fixMaterialCost", this.endingSubmitData.fixMaterialCost);
      params.append("fixOrderId", selected[0].fixOrderId);
      this.$axios
          .post('/fix/endOrderByOrderIdAndInfo', params)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$message({
              type: 'success',
              message: '工单已经完成, 感谢您的辛劳付出!'
            });
            this.reload();
          }).catch(failResponse => {
        this.$message.error('出错了, 工单状态更新失败!');
      })
    },
  },
}

</script>
<style>
.md-tabs.md-theme-default.md-info .md-tabs-navigation {
  background-color: #4fc3f7;
}

.md-table-head-label {
  font-weight: bold !important;
}
</style>
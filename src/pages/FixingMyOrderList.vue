<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">报修工单管理（我接单的）</h4>
      </md-card-header>
      <md-card-content>
        <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="fixOrderId" md-sort-order="asc"
                  md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">工单列表</h1>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="查询工单编号" v-model="search" @input="searchOnTable"/>
            </md-field>
          </md-table-toolbar>
          <md-table-empty-state v-show="searched_empty" md-label="无结果"
                                :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`">
            <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
          </md-table-empty-state>
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
            <md-table-cell md-label="工单详情">
              <el-button @click="getSelectedDetails(item); getSelectedPictures(item); getSelectedTimeline(item)"
                         icon="el-icon-info" type="primary" plain/>
            </md-table-cell>
            <md-table-cell md-label="可选操作">
              <el-button @click="getAvailableDialog(item); getSelectedTimeline(item)" v-if="item.fixStatus != 4" type="primary">
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
      <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
        <el-tabs>
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
              <div class="block">
                <el-image v-for="(image,index) in this.selected_images"
                          :src="image"
                          :key="index"
                          :preview-src-list="selected_images">
                </el-image>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="进度追踪">
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
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
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
        <el-card class="box-card" v-if="stepperCurrent === 2">
          <h4>我确认我已经完成修理工作, 并愿意承担由于维修失误等产生的后果。</h4>
        </el-card>
        <div slot="footer" class="dialog-footer" v-if="stepperCurrent == 0">
          <el-button @click="endDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="stepperNext">下一步</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="stepperCurrent == 1">
          <el-button @click="stepperPrev">上一步</el-button>
          <el-button type="primary" @click="stepperNext">下一步</el-button>
        </div>
        <div slot="footer" class="dialog-footer"  v-if="stepperCurrent === 2">
          <el-button @click="stepperPrev">上一步</el-button>
          <el-button type="primary" @click="endFixing(selected)">完成并关闭工单</el-button>
        </div>
      </el-dialog>
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
    return items.filter(item => toLower(item.fixOrderId).includes(toLower(term)))
  }
  return items
}


export default {
  inject: ['reload'],
  props: {
    tableHeaderColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      search: null,
      dialogTableVisible: false,
      startDialogVisible: false,
      endDialogVisible: false,
      list_empty: false,
      searched_empty: false,
      errored: false,
      loading: true,
      searched: [],
      selected: [],
      selected_images: [],
      my_fix_orders: [],
      selected_order: [],
      selected_timeline: [],
      formLabelWidth: '120px',
      stepperCurrent: 0,
      endingSubmitData: {
        fixMaterial: '',
        fixMaterialCost: '',
      },
    };
  },
  created() {
    this.searched = this.my_fix_orders;
  },
  mounted() {
    this.$axios
        .get('/fix/allFixDetailsByWorkerId', {
          params: {
            fixWorkerId: globalVariable.currentUserId()
          }
        })
        .then(successResponse => {
          this.my_fix_orders = successResponse.data;
          this.list_empty = (this.my_fix_orders.isEmpty) ? true : false;
          this.searched = this.my_fix_orders;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
  },
  methods: {
    contactAdmin() {
      window.alert('您的请求已经发出')
    },
    searchOnTable() {
      this.searched = searchById(this.my_fix_orders, this.search)
      this.searched_empty = (this.searched.isEmpty) ? false : true
    },
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
    getSelectedDetails(item) {
      this.selected.pop();
      this.selected.push(item);
      this.dialogTableVisible = true;
    },
    getSelectedPictures(item) {
      var rawData = item.fixPicture;
      var imageList = rawData.split("#");
      this.selected_images = imageList;
    },
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
    getAvailableDialog(item) {
      this.selected.pop();
      this.selected.push(item);
      if (item.fixStatus == 2) {
        this.startDialogVisible = true;
      }
      else if (item.fixStatus == 3) {
        this.endDialogVisible = true;
      }
      else {
        this.errored = true;
      }
    },
    startFixing(selected){
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
    stepperNext() {
      this.stepperCurrent++;
    },
    stepperPrev() {
      this.stepperCurrent--;
    },
    endFixing(selected){
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
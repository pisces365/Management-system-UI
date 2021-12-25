<template>
  <div class="content">

    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">医院拥挤情况（管理人员界面 ）</h4>
        <p class="category">在这可以看到医院各个不同地方的拥挤情况</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout-item md-size-25" style="float: right">
          <el-input placeholder="查询地名" v-model="search" @input="searchOnTable"/>
        </div>
        <el-table :data="searched" style="width: 100%" max-height="400">
          <el-table-column property="hospital_location_id" label="地名编号" fixed sortable></el-table-column>
          <el-table-column property="hospital_location_name" label="地名" ></el-table-column>
          <el-table-column property="wait_number" label="等待人数" ></el-table-column>
          <el-table-column property="crowded_situation" label="拥挤情况"></el-table-column>
        </el-table>
        <div class="md-layout-item md-size-100 text-right">

          <el-button type="success" round @click="addAddress1">新增地名</el-button>
          <el-button type="success" round @click="Crowd">查看拥挤程度图</el-button>
        </div>
      </md-card-content>
    </md-card>
    <el-dialog   width="70%" title="查看拥挤信息" :visible.sync="dialogFormVisible">
      <div class="content">
        <div class="md-layout">

          <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
            <md-card>
              <md-card-header data-background-color="blue">
                <h4 class="title">上一周访问医院的人次</h4>
                <p class="category">在这可以看到上一周每一天有多少人次访问该医院</p>
              </md-card-header>

              <md-card-content>
                <chart-card
                    :chart-data="dailySalesChart.data"
                    :chart-options="dailySalesChart.options"
                    :chart-type="'Line'"
                    data-background-color="blue"
                >
                  <template slot="content">
                  </template>

                  <template slot="footer">
                    <div class="stats">
                      <md-icon>access_time</md-icon>
                      updated 4 minutes ago
                    </div>
                  </template>
                </chart-card>
              </md-card-content>
            </md-card>
          </div>

          <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
          >
            <md-card>
              <md-card-header data-background-color="red">
                <h4 class="title">上一周访问各科室的人次</h4>
                <p class="category">在这可以看到上一周访问各科室的人数总和</p>
              </md-card-header>
              <md-card-content>
                <chart-card
                    :chart-data="emailsSubscriptionChart.data"
                    :chart-options="emailsSubscriptionChart.options"
                    :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
                    :chart-type="'Bar'"
                    data-background-color="red"
                >
                  <!--          <template slot="content">-->
                  <!--            <h4 class="title">Email Subscription</h4>-->
                  <!--            <p class="category">Last Campaign Performance</p>-->
                  <!--          </template>-->

                  <template slot="footer">
                    <div class="stats">
                      <md-icon>access_time</md-icon>
                      updated 10 days ago
                    </div>
                  </template>
                </chart-card>
              </md-card-content>
            </md-card>
          </div>
          <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
          >
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">上一周医院大厅的人流/时间分布图</h4>
                <p class="category">在这可以看到上一周医院大厅的人流随时间分布图</p>
              </md-card-header>
              <md-card-content>
                <chart-card
                    :chart-data="dataCompletedTasksChart.data"
                    :chart-options="dataCompletedTasksChart.options"
                    :chart-type="'Line'"
                    data-background-color="green"
                >
                  <!--          <template slot="content">-->
                  <!--            <h4 class="title">Completed Tasks</h4>-->
                  <!--            <p class="category">Last Campaign Performance</p>-->
                  <!--          </template>-->

                  <template slot="footer">
                    <div class="stats">
                      <md-icon>access_time</md-icon>
                      campaign sent 26 minutes ago
                    </div>
                  </template>
                </chart-card>
              </md-card-content>
            </md-card>

          </div>>
        </div>
      </div>
    </el-dialog>
    <el-dialog   width="70%" title="新增地名" :visible.sync="dialogFormVisible1">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">新增拥挤信息</h4>
            <p class="category">新增一行关于医院地名的拥挤信息</p>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>科室</label>
                  <md-input v-model="hospital_department"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>地名</label>
                  <md-input v-model="hospital_location_name" maxlength="10" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button class="md-raised md-success" @click="addAddress">提交新增地名</md-button>
              </div>
              <br>
            </div>
          </md-card-content>
        </md-card>

    </el-dialog>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.hospital_location_name).includes(toLower(term)))
  }

  return items
}
import {
  ChartCard,
} from "@/components";

export default {
  components: {
    ChartCard,
  },
  data() {
    return {
      search: null,
      searched: [],
      dialogFormVisible:false,
      dialogFormVisible1:false,
      user_empty: false,
      hospital_department:'',
      hospital_location_name:'',
      users: [],
      dailySalesChart: {
        data: {
          labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          series: [[1288, 1762, 705, 1714, 2306, 3899, 3888]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 5000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "妇科","儿科","牙科","内科","外科","肛肠科","骨科","神经科",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
  beforeCreate() {
    this.$axios
        .get('http://112.124.35.32:8085/xiangliban/selectHospitalLocationPersons')
        .then(successResponse => {
          console.log(successResponse.data);
          this.users = successResponse.data; // 将获取的数据保存
          this.searched = successResponse.data;
        })
        .catch(error => {
          console.log(error) // 记录出错信息
        })
  },
  methods: {
    addAddress() {
      var param = new URLSearchParams();
      param.append("hospital_department",this.hospital_department);
      param.append("hospital_location_name",this.hospital_location_name);
      this.$axios
          .post('http://112.124.35.32:8085/xiangliban/insertNewLocation',param)
          .catch(error => {
            console.log(error) // 记录出错信息
          })
      window.alert('新增已提交')
    },
    goBack(){
      this.$router.push("HospitalCrowdedSituation2");
    },
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search);
      this.user_empty = (this.searched.length == 0) ? false : true;
    },
    addAddress1 () {
      this.dialogFormVisible1 = true;
    },
    Crowd(){
      this.dialogFormVisible = true;

    },
  },

  created () {
    this.searched = this.users
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}

</style>
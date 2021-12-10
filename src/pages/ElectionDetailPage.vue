<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">选举信息</h4>
          </md-card-header>
          <md-card-content>
            <election-details table-header-color="blue"></election-details>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">参选人信息</h4>
          </md-card-header>
          <md-card-content>
            <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33" v-for="cdd in candidates" :key="cdd.id">
              <md-card-header data-background-color="blue">
                <h4 class="title">参选人{{ cdd.candidate_id }}详细信息</h4>
                <h3>当前得票： {{cdd.candidate_votes}}票</h3>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-size-33">
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <img style="width:150px;height:150px;object-fit: cover" v-bind:src=cdd.candidate_cover alt/>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>姓名</label>
                      <md-input v-model="cdd.candidate_name" readonly></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>性别</label>
                      <md-input v-model="cdd.candidate_gender" readonly></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>年龄</label>
                      <md-input v-model="cdd.candidate_age" readonly></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>政治面貌</label>
                      <md-input v-model="cdd.candidate_politics" readonly></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>竞选职务</label>
                      <md-input v-model="cdd.candidate_position" readonly></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field maxlength="5">
                      <label>个人简历</label>
                      <md-textarea v-model="cdd.candidate_resume" readonly></md-textarea>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field maxlength="5">
                      <label>工作规划</label>
                      <md-textarea v-model="cdd.candidate_plan" readonly></md-textarea>
                    </md-field>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">票数柱状图</h4>
          </md-card-header>
          <md-card-content>
            <chart-card
                :chart-data="emailsSubscriptionChart.data"
                :chart-options="emailsSubscriptionChart.options"
                :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
                :chart-type="'Bar'"
                data-background-color="blue"
            >
              <template slot="content">
                <h4 class="title">选举得票图</h4>
                <p class="category">本次选举中各选举人得票数据</p>
              </template>

              <template slot="footer">
                <div class="stats">
                  <md-icon>access_time</md-icon>
                  上次更新：10 分钟前
                </div>
              </template>
            </chart-card>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ElectionDetails,ChartCard } from "@/components";

export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  components: {
    ChartCard,
    ElectionDetails,
    // CandidateDetails,
  },
  data() {
    return {
      candidates: [
        {
          candidate_id:"EC#00001",
          candidate_name: "王德法",
          candidate_gender: "男",
          candidate_age: "25",
          candidate_politics: "党员",
          candidate_position: "村支书",
          candidate_resume: "今天是个好日子",
          candidate_plan: "建设最美乡村",
          candidate_votes:"10",
          candidate_cover:"http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png",
        },
        {
          candidate_id:"EC#00002",
          candidate_name: "候选人2",
          candidate_gender: "女",
          candidate_age: "22",
          candidate_politics: "共青团员",
          candidate_position: "村长",
          candidate_resume: "刚大学毕业",
          candidate_plan: "建设最好乡村",
          candidate_votes:"20",
          candidate_cover:"http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png",
        },
        {
          candidate_id:"EC#00003",
          candidate_name: "候选人3",
          candidate_gender: "男",
          candidate_age: "21",
          candidate_politics: "党员",
          candidate_position: "村选举监票人",
          candidate_resume: "曾获诺贝尔和平奖",
          candidate_plan: "保证选举公平",
          candidate_votes:"30",
          candidate_cover:"http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png",
        },
        {
          candidate_id:"EC#00004",
          candidate_name: "候选人4",
          candidate_gender: "女",
          candidate_age: "40",
          candidate_politics: "党员",
          candidate_position: "村支书",
          candidate_resume: "昨天是个好日子",
          candidate_plan: "建设最美乡村",
          candidate_votes:"4",
          candidate_cover:"http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png",
        },
        {
          candidate_id:"EC#00005",
          candidate_name: "候选人5",
          candidate_gender: "女",
          candidate_age: "30",
          candidate_politics: "党员",
          candidate_position: "村干部",
          candidate_resume: "明天是个好日子",
          candidate_plan: "建设最美人文",
          candidate_votes:"5",
          candidate_cover:"http://112.124.35.32:8081/xiangliban/api/file/jp944vtd05qh.png",
        },
      ],
      emailsSubscriptionChart: {
        data: {
          labels: [
            "王德法",
            "候选人2",
            "候选人3",
            "候选人4",
            "候选人5",
          ],
          series: [
            [10, 30, 20, 4, 5],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 50,
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
};
</script>
<style>
#mycard1{
  display: inline !important;
}
</style>
<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
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
                <!--            <h4 class="title">Daily Sales</h4>-->
                <!--            <p class="category">-->
                <!--              <span class="text-success">-->
                <!--                <i class="fas fa-long-arrow-alt-up"></i> 55%-->
                <!--              </span>-->
                <!--              increase in today sales.-->
                <!--            </p>-->
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
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable,
} from "@/components";

export default {
  name: "CrowdChart",
  components: {
    ChartCard,
  },
  data() {
    return {
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
};
</script>

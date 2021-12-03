<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
            :chart-data="dailySalesChart.data"
            :chart-options="dailySalesChart.options"
            :chart-type="'Line'"
            data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">日销售额</h4>
            <p class="category">
              <span class="text-success"
              ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              今日销售额增长
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              4分钟前更新
            </div>
          </template>
        </chart-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
            :chart-data="emailsSubscriptionChart.data"
            :chart-options="emailsSubscriptionChart.options"
            :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
            :chart-type="'Bar'"
            data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">订单数量</h4>
            <p class="category">按月统计</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              10天前更新
            </div>
          </template>
        </chart-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
            :chart-data="dataCompletedTasksChart.data"
            :chart-options="dataCompletedTasksChart.options"
            :chart-type="'Line'"
            data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">客流量</h4>
            <p class="category">各时段客流量统计</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              1分钟前更新
            </div>
          </template>
        </chart-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">今日收入</p>
            <h3 class="title">¥77,777</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              过去24小时
            </div>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">座位</p>
            <h3 class="title">
              49/50
              <small>桌</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">设为满客</a>
            </div>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">收到的投诉</p>
            <h3 class="title">7</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              <a href="#">处理投诉</a>
            </div>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fab fa-twitter"></i>
          </template>

          <template slot="content">
            <p class="category">收藏增长量</p>
            <h3 class="title">+30</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              刚刚更新
            </div>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">员工名单</h4>
            <p class="category">2021年10月10日有新员工入职</p>
          </md-card-header>
          <md-card-content>
            <employee-table></employee-table>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">写字板</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="员工留言" md-icon="dehaze">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="顾客评价" md-icon="code">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-posts" md-label="消息" md-icon="comment_bank">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
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
import SimpleTable from "../components/Tables/SimpleTable";
import OrderTableA from "../components/Tables/OrderTableA";
import EmployeeTable from "../components/Tables/EmployeeTable";

export default {
  components: {
    EmployeeTable,
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    //OrderedTable,
  },
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
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

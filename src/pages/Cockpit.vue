<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <!-- 页面加载/运算出错的提示 -->
          <section v-if="cardErrored">
            <h4>很抱歉，出了点问题</h4>
          </section>
          <!-- 页面获取数据为空的提示 -->
          <section v-if="cardEmpty">
            <h4>系统内用户为空</h4>
          </section>
          <!-- 页面正在加载的提示 -->
          <section v-if="cardLoading">
            <el-skeleton :rows="6" animated/>
          </section>
          <template slot="header">
            <md-icon>people</md-icon>
          </template>
          <template slot="content">
            <p>系统内用户量</p>
            <h3 class="title">{{ (systemUserNumber === null) ? 0 : systemUserNumber }}</h3>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <!-- 页面加载/运算出错的提示 -->
          <section v-if="cardErrored">
            <h4>很抱歉，出了点问题</h4>
          </section>
          <!-- 页面获取数据为空的提示 -->
          <section v-if="cardEmpty">
            <h4>卡片内容为空</h4>
          </section>
          <!-- 页面正在加载的提示 -->
          <section v-if="cardLoading">
            <el-skeleton :rows="6" animated/>
          </section>
          <template slot="header">
            <md-icon>local_shipping</md-icon>
          </template>
          <template slot="content">
            <p>送货上门未处理数</p>
            <h3 class="title">{{ (deliveryUnprocessedNumber === null) ? 0 : deliveryUnprocessedNumber }}</h3>
          </template>
          <!--          <template slot="footer">-->
          <!--            <div class="stats">-->
          <!--              <md-icon class="text-danger">warning</md-icon>-->
          <!--              <a href="#pablo">Get More Space...</a>-->
          <!--            </div>-->
          <!--          </template>-->
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <!-- 页面加载/运算出错的提示 -->
          <section v-if="cardErrored">
            <h4>很抱歉，出了点问题</h4>
          </section>
          <!-- 页面获取数据为空的提示 -->
          <section v-if="cardEmpty">
            <h4>卡片内容为空</h4>
          </section>
          <!-- 页面正在加载的提示 -->
          <section v-if="cardLoading">
            <el-skeleton :rows="6" animated/>
          </section>
          <template slot="header">
            <md-icon>engineering</md-icon>
          </template>
          <template slot="content">
            <p>报修未处理数</p>
            <h3 class="title">{{ (fixUnprocessedNumber === null) ? 0 : fixUnprocessedNumber }}</h3>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="deliveryBlue">
          <!-- 页面加载/运算出错的提示 -->
          <section v-if="cardErrored">
            <h4>很抱歉，出了点问题</h4>
          </section>
          <!-- 页面获取数据为空的提示 -->
          <section v-if="cardEmpty">
            <h4>卡片内容为空</h4>
          </section>
          <!-- 页面正在加载的提示 -->
          <section v-if="cardLoading">
            <el-skeleton :rows="6" animated/>
          </section>
          <template slot="header">
            <md-icon>roofing</md-icon>
          </template>
          <template slot="content">
            <p>租房工单未审核数</p>
            <h3 class="title">{{rentUnprocessedNumber}}</h3>
          </template>
        </stats-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="diagramBlue">
            <h4 class="title">老年大学课程选课人数柱状图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="courseErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="courseListEmpty">
              <h4>课程列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="courseLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="courseSelectDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!courseErrored && !courseListEmpty && !courseLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <md-card>
          <md-card-header data-background-color="diagramBlue">
            <h4 class="title">老年大学课程类别选课人数饼图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="coursePieErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="coursePieListEmpty">
              <h4>课程列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="coursePieLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="courseSelectPie" :style="{width: '100%', height: '400px'}"
                 v-if="!coursePieErrored && !coursePieListEmpty && !coursePieLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <md-card>
          <md-card-header data-background-color="deliveryBlue">
            <h4 class="title">维修每日完成数折线图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="fixLineErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="fixLineEmpty">
              <h4>维修列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="fixLineLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="fixDailyDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!fixLineErrored && !fixLineEmpty && !fixLineLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="deliveryBlue">
            <h4 class="title">维修系统内工单状态饼图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="fixPieErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="fixPieEmpty">
              <h4>维修列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="fixPieLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="fixPieDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!fixPieErrored && !fixPieEmpty && !fixPieLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="deliveryBlue">
            <h4 class="title">工作人员完成维修数柱状图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="fixWorkerErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="fixWorkerEmpty">
              <h4>工单列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="fixWorkerLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="fixWorkerDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!fixWorkerErrored && !fixWorkerEmpty && !fixWorkerLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="deliveryBlue">
            <h4 class="title">维修部门完成维修数柱状图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="fixDepartErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="fixDepartEmpty">
              <h4>工单列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="fixDepartLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="fixDepartDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!fixDepartErrored && !fixDepartEmpty && !fixDepartLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="cuisineGreen">
            <h4 class="title">餐馆预约情况饼图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="restReserveErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="restReserveEmpty">
              <h4>预约列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="restReserveLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="restReserveDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!restReserveErrored && !restReserveEmpty && !restReserveLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <md-card>
          <md-card-header data-background-color="cuisineGreen">
            <h4 class="title">餐馆菜品营业额柱状图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="cuisineErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="cuisineEmpty">
              <h4>营业额列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="cuisineLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="cuisineDiagram" :style="{width: '100%', height: '400px'}"
                 v-if="!cuisineErrored && !cuisineEmpty && !cuisineLoading"/>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="deliveryOrange">
            <h4 class="title">民宿预约情况饼图</h4>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="hotelReserveErrored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="hotelReserveEmpty">
              <h4>民宿预约列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="hotelReserveLoading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div id="hotelDiagram" :style="{width: '100%', height: '500px'}"
                 v-if="!hotelReserveErrored && !hotelReserveEmpty && !hotelReserveLoading"/>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
} from "@/components";

export default {
  components: {
    StatsCard,
  },
  mounted() {
    this.drawCourseSelectDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawCourseSelectDiagram); // 设置自适应
    this.drawCourseSelectPieDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawCourseSelectPieDiagram); // 设置自适应
    this.drawFixDailyDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawFixDailyDiagram); // 设置自适应
    this.drawFixPieDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawFixPieDiagram); // 设置自适应
    this.drawFixWorkerDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawFixWorkerDiagram); // 设置自适应
    this.drawFixDepartDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawFixDepartDiagram); // 设置自适应
    this.drawCuisineDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawCuisineDiagram); // 设置自适应
    this.drawRestReserveDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawRestReserveDiagram); // 设置自适应
    this.drawHotelPieDiagram(); // 绘制图表
    window.addEventListener('resize', this.drawHotelPieDiagram); // 设置自适应
    this.getSystemInfo(); // 获得卡片数据
  },
  beforeDestroy() { // 离开路由.vue跳转路由后还会继续执行,所以取消
    window.removeEventListener("resize", this.drawCourseSelectDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawCourseSelectPieDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawFixDailyDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawFixPieDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawFixWorkerDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawFixDepartDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawCuisineDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawRestReserveDiagram);  // 取消echarts自适应
    window.removeEventListener("resize", this.drawHotelPieDiagram);  // 取消echarts自适应
  },
  data() {
    return {
      // -------------------------------------
      courseErrored: false, // 课程是否加载出错
      courseListEmpty: false, // 课程获取数据是否为空
      courseLoading: false,  // 课程是否正在加载
      courseSelectData: [], // 每门课的选课人数
      // -------------------------------------
      coursePieErrored: false, // 课程饼图是否加载出错
      coursePieListEmpty: false, // 课程饼图获取数据是否为空
      coursePieLoading: false,  // 课程饼图是否正在加载
      coursePieSelectData: [],  // 每门类别的选课人数
      // -------------------------------------
      fixLineErrored: false, // 维修每日折线图是否加载出错
      fixLineEmpty: false, // 维修每日折线图获取数据是否为空
      fixLineLoading: false,  // 维修每日折线图是否正在加载
      fixLineSelectData: [],  // 维修每日的完成数
      // -------------------------------------
      fixPieErrored: false, // 维修系统内饼图是否加载出错
      fixPieEmpty: false, // 维修系统内饼图获取数据是否为空
      fixPieLoading: false,  // 维修系统内饼图是否正在加载
      fixPieSelectData: [],  // 维修系统内的状态
      // -------------------------------------
      fixWorkerErrored: false, // 工人完成维修数柱状图是否加载出错
      fixWorkerEmpty: false, // 工人完成维修数柱状图获取数据是否为空
      fixWorkerLoading: false,  // 工人完成维修数柱状图是否正在加载
      fixWorkerSelectData: [],  // 工人完成维修数
      // -------------------------------------
      fixDepartErrored: false, // 维修部门完成维修数柱状图是否加载出错
      fixDepartEmpty: false, // 维修部门完成维修数柱状图获取数据是否为空
      fixDepartLoading: false,  // 维修部门完成维修数柱状图是否正在加载
      fixDepartSelectData: [],  // 维修部门完成维修数
      // -------------------------------------
      cuisineErrored: false, // 菜品销售额是否加载出错
      cuisineEmpty: false, // 菜品销售额获取数据是否为空
      cuisineLoading: false,  // 菜品销售额是否正在加载
      cuisineSelectData: [],  // 菜品销售额
      // -------------------------------------
      restReserveErrored: false, // 餐馆预约是否加载出错
      restReserveEmpty: false, // 餐馆预约获取数据是否为空
      restReserveLoading: false,  // 餐馆预约是否正在加载
      restReserveSelectData: [],  // 餐馆预约
      // -------------------------------------
      hotelReserveErrored: false, // 民宿预约是否加载出错
      hotelReserveEmpty: false, // 民宿预约获取数据是否为空
      hotelReserveLoading: false,  // 民宿预约是否正在加载
      hotelReserveSelectData: [],  // 民宿预约
      // -------------------------------------
      cardErrored: false, // 获取小卡片数据是否加载出错
      cardEmpty: false, // 获取小卡片数据是否为空
      cardLoading: false,  // 获取小卡片数据是否正在加载
      systemUserInfo: [], // 系统内全部用户数据
      systemUserNumber: null, // 系统内用户数量
      deliveryUnprocessed: [],  // 未接单送货上门
      deliveryUnprocessedNumber: null,  // 未接单送货上门数量
      fixUnprocessed: [],  // 未接单报修
      fixUnprocessedNumber: null,  // 未接单报修数量
      rentUnprocessed: [],  // 租房工单
      rentUnprocessedNumber: 0,  // 未审核租房工单数量
      // -------------------------------------

    };
  },
  methods: {
    // 设置老年大学柱状图
    async drawCourseSelectDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let courseSelectDiagram = this.$echarts.init(document.getElementById('courseSelectDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/education/getAllCoursePplSelected')
          .then(successResponse => {
            this.courseSelectData = successResponse.data; // 将获取的数据保存
            this.courseListEmpty = (this.courseSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.courseErrored = true // 在前端提示用户出错
          })
          .finally(() => this.courseLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      courseSelectDiagram.setOption({
        title: {
          // text: '老年大学课程选课人数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '选课人数',
          type: 'value'
        },
        series: [{
          name: '选课人数',
          type: 'bar',
          showBackground: true,
        }],
        dataset: {
          dimensions: ['courseName', 'coursePplNumber'],
          source: this.courseSelectData,
        },
      });
      courseSelectDiagram.resize();
    },
    // 设置老年大学饼图
    async drawCourseSelectPieDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let courseSelectPie = this.$echarts.init(document.getElementById('courseSelectPie'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/education/getAllCourseCategorySelected')
          .then(successResponse => {
            this.coursePieSelectData = successResponse.data; // 将获取的数据保存
            this.coursePieListEmpty = (this.coursePieSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.coursePieErrored = true // 在前端提示用户出错
          })
          .finally(() => this.coursePieLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      courseSelectPie.setOption({
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {},
        series: [
          {
            name: '选课人数',
            type: 'pie',
            roseType: 'area',
            // radius: [0, '30%'],
            itemStyle: {
              borderRadius: 5,
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            datasetIndex: 0,
          },
          // {
          //   name: '选课人数',
          //   type: 'pie',
          //   radius: ['45%', '60%'],
          //   labelLine: {
          //     length: 30
          //   },
          //   itemStyle: {
          //     borderRadius: 10,
          //     borderColor: '#fff',
          //     borderWidth: 2
          //   },
          //   datasetIndex: 1,
          // }
        ],
        dataset: [
          {
            dimensions: ['courseCategoryName', 'coursePplNumber'],
            source: this.coursePieSelectData,
          },
          {
            dimensions: ['courseName', 'coursePplNumber'],
            source: this.courseSelectData,
          }
        ],
      });
      courseSelectPie.resize();
    },
    // 设置维修每日完工折线图
    async drawFixDailyDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let fixDailyDiagram = this.$echarts.init(document.getElementById('fixDailyDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/fix/getDailyFixNumber')
          .then(successResponse => {
            this.fixLineSelectData = successResponse.data; // 将获取的数据保存
            this.fixLineEmpty = (this.fixLineSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.fixLineErrored = true // 在前端提示用户出错
          })
          .finally(() => this.fixLineLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      fixDailyDiagram.setOption({
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '完工数',
          type: 'value'
        },
        series: [{
          name: '完工数',
          type: 'line',
          showBackground: true,
          smooth: true,
          itemStyle: {
            normal: {
              color: 'CornflowerBlue',
              borderColor: 'CornflowerBlue',
            }
          },
        }],
        dataset: {
          dimensions: ['fixDate', 'fixNumber'],
          source: this.fixLineSelectData,
        },
      });
      fixDailyDiagram.resize();
    },
    // 设置维修系统工单状态饼图
    async drawFixPieDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let fixPieDiagram = this.$echarts.init(document.getElementById('fixPieDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/fix/getFixStatusNumber')
          .then(successResponse => {
            this.fixPieSelectData = successResponse.data; // 将获取的数据保存
            for (let i = 0; i < this.fixPieSelectData.length; ++i) {
              if (this.fixPieSelectData[i].fixStatus === 1) {
                this.fixPieSelectData[i].fixStatus = "未处理"
              } else if (this.fixPieSelectData[i].fixStatus === 2) {
                this.fixPieSelectData[i].fixStatus = "已派单"
              } else if (this.fixPieSelectData[i].fixStatus === 3) {
                this.fixPieSelectData[i].fixStatus = "进行中"
              } else {
                this.fixPieSelectData[i].fixStatus = "已完成"
              }
            }
            this.fixPieEmpty = (this.fixPieSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.fixPieErrored = true // 在前端提示用户出错
          })
          .finally(() => this.fixPieLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      fixPieDiagram.setOption({
        avoidLabelOverlap: false,
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {},
        color: ['#EE6666', '#409EFF', '#FFC851', '#91CC75'],
        series: [
          {
            name: '工单数',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            datasetIndex: 0,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
          },
        ],
        dataset: [
          {
            dimensions: ['fixNumber', 'fixStatus'],
            source: this.fixPieSelectData,
          }
        ],
      });
      fixPieDiagram.resize();
    },
    // 设置工人完成维修数柱状图
    async drawFixWorkerDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let fixWorkerDiagram = this.$echarts.init(document.getElementById('fixWorkerDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/fix/getWorkerFixNumber')
          .then(successResponse => {
            this.fixWorkerSelectData = successResponse.data; // 将获取的数据保存
            this.fixWorkerEmpty = (this.fixWorkerSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.fixWorkerErrored = true // 在前端提示用户出错
          })
          .finally(() => this.fixWorkerLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      fixWorkerDiagram.setOption({
        color: ['#409EFF'],
        title: {
          // text: '工人完成维修数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '结单个数',
          type: 'value'
        },
        series: [{
          name: '结单个数',
          type: 'bar',
          showBackground: true,
        }],
        dataset: {
          dimensions: ['name', 'number'],
          source: this.fixWorkerSelectData,
        },
      });
      fixWorkerDiagram.resize();
    },
    // 设置部门完成维修数柱状图
    async drawFixDepartDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let fixDepartDiagram = this.$echarts.init(document.getElementById('fixDepartDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/fix/getDepartFixNumber')
          .then(successResponse => {
            this.fixDepartSelectData = successResponse.data; // 将获取的数据保存
            this.fixDepartEmpty = (this.fixDepartSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.fixDepartErrored = true // 在前端提示用户出错
          })
          .finally(() => this.fixDepartLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      fixDepartDiagram.setOption({
        color: ['#6495ED'],
        title: {
          // text: '部门完成维修数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '结单个数',
          type: 'value'
        },
        series: [{
          name: '结单个数',
          type: 'bar',
          showBackground: true,
        }],
        dataset: {
          dimensions: ['name', 'number'],
          source: this.fixDepartSelectData,
        },
      });
      fixDepartDiagram.resize();
    },
    // 设置菜品销售额柱状图
    async drawCuisineDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let cuisineDiagram = this.$echarts.init(document.getElementById('cuisineDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8087/xiangliban/rest/allBusiness')
          .then(successResponse => {
            this.cuisineSelectData = successResponse.data; // 将获取的数据保存
            this.cuisineEmpty = (this.cuisineSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.cuisineErrored = true // 在前端提示用户出错
          })
          .finally(() => this.cuisineLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      cuisineDiagram.setOption({
        color: ['#91CC75'],
        title: {
          // text: '菜品销售额',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          name: '营业额/元',
          type: 'value'
        },
        series: [{
          name: '营业额/元',
          type: 'bar',
          showBackground: true,
        }],
        dataset: {
          dimensions: ['cuisine_name', 'account'],
          source: this.cuisineSelectData,
        },
      });
      cuisineDiagram.resize();
    },
    // 设置餐馆预约情况饼图
    async drawRestReserveDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let restReserveDiagram = this.$echarts.init(document.getElementById('restReserveDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8087/xiangliban/rest/allAppointment')
          .then(successResponse => {
            this.restReserveSelectData = successResponse.data; // 将获取的数据保存
            this.restReserveEmpty = (this.restReserveSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.restReserveErrored = true // 在前端提示用户出错
          })
          .finally(() => this.restReserveLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      restReserveDiagram.setOption({
        avoidLabelOverlap: false,
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {},
        color: ['#EE6666', '#409EFF', '#FFC851', '#91CC75'],
        series: [
          {
            name: '预约数',
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            datasetIndex: 0,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
          },
        ],
        dataset: [
          {
            dimensions: ['num', 'name'],
            source: this.restReserveSelectData,
          }
        ],
      });
      restReserveDiagram.resize();
    },
    // 设置民宿预约饼图
    async drawHotelPieDiagram() {
      // 基于准备好的dom，初始化echarts实例
      let hotelDiagram = this.$echarts.init(document.getElementById('hotelDiagram'))
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8087/xiangliban/hotel/allroom')
          .then(successResponse => {
            this.hotelReserveSelectData = successResponse.data; // 将获取的数据保存
            this.hotelReserveEmpty = (this.hotelReserveSelectData.length === 0);  // 判断是否为空
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.hotelReserveErrored = true // 在前端提示用户出错
          })
          .finally(() => this.hotelReserveLoading = false) // 将加载中动画设为不可见
      // 绘制图表
      hotelDiagram.setOption({
        title: [
          {
            text: '民宿已预订房间情况',
            left: '18%',
            top: '86%',
          },
          {
            text: '民宿剩余房间情况',
            left: '69%',
            top: '86%',
          },
        ],
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {},
        // color: ['#EE6666', '#409EFF', '#FFC851', '#91CC75'],
        series: [
          {
            name: '已预定房间数',
            type: 'pie',
            center: ['50%', '75%'],
            radius: [0, '60%'],
            itemStyle: {
              borderRadius: 5,
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            datasetIndex: 0,
          },
          {
            name: '剩余房间数',
            type: 'pie',
            center: ['50%', '25%'],
            radius: [0, '60%'],
            labelLine: {
              length: 30
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            datasetIndex: 1,
          }
        ],
        dataset: [
          {
            dimensions: ['roomtype', 'roomused'],
            source: this.hotelReserveSelectData,
          },
          {
            dimensions: ['roomtype', 'roomrest'],
            source: this.hotelReserveSelectData,
          }
        ],
        media: [
          {
            option: {
              series: [
                {center: ['25%', '50%']},
                {center: ['75%', '50%']}
              ]
            }
          }
        ]
      });
      hotelDiagram.resize();
    },
    // 获取系统内用户数量,
    async getSystemInfo() {
      // 从API获取课程选课数据
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/user/selectAllUsers')
          .then(successResponse => {
            this.systemUserInfo = successResponse.data; // 将获取的数据保存
            this.cardEmpty = (this.systemUserInfo.length === 0);  // 判断是否为空
            this.systemUserNumber = this.systemUserInfo.length; // 将获取的数据保存
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.cardErrored = true // 在前端提示用户出错
          })
      // .finally(() => this.cardLoading = false) // 将加载中动画设为不可见
      await this.$axios
          .get('http://112.124.35.32:8081/xiangliban/express/selectNewBookedDeliveryRequests')
          .then(successResponse => {
            this.deliveryUnprocessed = successResponse.data; // 将获取的数据保存
            this.cardEmpty = (this.deliveryUnprocessed.length === 0);  // 判断是否为空
            this.deliveryUnprocessedNumber = this.deliveryUnprocessed.length; // 将获取的数据保存
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.cardErrored = true // 在前端提示用户出错
          })
      await this.$axios
          .get('http://112.124.35.32:8083/xiangliban/fix/allUnprocessedOrder')
          .then(successResponse => {
            this.fixUnprocessed = successResponse.data; // 将获取的数据保存
            this.cardEmpty = (this.fixUnprocessed.length === 0);  // 判断是否为空
            this.fixUnprocessedNumber = this.fixUnprocessed.length; // 将获取的数据保存
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.cardErrored = true // 在前端提示用户出错
          })
      await this.$axios
          .get('http://112.124.35.32:8087/xiangliban/RentHouse/allrent')
          .then(successResponse => {
            this.rentUnprocessed = successResponse.data; // 将获取的数据保存
            this.cardEmpty = (this.rentUnprocessed.length === 0);  // 判断是否为空
            for (let i = 0; i < this.rentUnprocessed.length; ++i) {
              if (this.rentUnprocessed[i].hr_check === 0) {
                this.rentUnprocessedNumber++;
              }
            }
          })
          .catch(error => {
            console.log(error) // 记录出错信息
            this.cardErrored = true // 在前端提示用户出错
          })

    },
  },
};
</script>

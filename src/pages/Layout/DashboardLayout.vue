<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

<!--      <sidebar-link to="/dashboard" v-if="quanxian === 0">-->
<!--        <md-icon>dashboard</md-icon>-->
<!--        <p>Dashboard</p>-->
<!--      </sidebar-link>-->

      <sidebar-link to="/HospitalCrowdedSituation" v-if="quanxian === 0">
        <md-icon>content_paste</md-icon>
        <p>医院拥挤情况</p>
      </sidebar-link>
      <sidebar-link to="/buslinelist">
        <md-icon>location_on</md-icon>
        <p>公交信息界面</p>
      </sidebar-link>

      <sidebar-link to="/allstoplist">
        <md-icon>location_on</md-icon>
        <p>公交车站信息界面</p>
      </sidebar-link>
      <sidebar-link to="/HospitalCrowdedSituation2" v-if="quanxian === 0">
        <md-icon>content_paste</md-icon>
        <p>医院拥挤情况（管理人员）</p>
      </sidebar-link>
      <sidebar-link to="/CopeMatter" v-if="quanxian === 0">
        <md-icon>content_paste</md-icon>
        <p>医生业务处理</p>
      </sidebar-link>
      <sidebar-link to="/RentHouseInformation" v-if=" quanxian ===0">
        <md-icon>content_paste</md-icon>
        <p>租房信息界面</p>
      </sidebar-link>

      <sidebar-link to="/HotelAppointment" v-if="quanxian === 1|| quanxian ===0">
        <md-icon>content_paste</md-icon>
        <p>民宿预约处理</p>
      </sidebar-link>
      <sidebar-link to="/HotelRoomManage" v-if="quanxian === 1|| quanxian ===0">
        <md-icon>content_paste</md-icon>
        <p>民宿房源管理</p>
      </sidebar-link>
      <sidebar-link to="/HotelCope"  v-if="quanxian === 1|| quanxian ===0">
        <md-icon>content_paste</md-icon>
        <p>民宿订单处理</p>
      </sidebar-link>

      <sidebar-link to="/RestAppointment" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>bubble_chart</md-icon>
        <p>餐馆预约界面</p>
      </sidebar-link>

      <sidebar-link to="/RestDue" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>bubble_chart</md-icon>
        <p>餐馆结账</p>
      </sidebar-link>
      <sidebar-link to="/RestBusiness" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>bubble_chart</md-icon>
        <p>餐馆营业额</p>
      </sidebar-link>

<!--      <sidebar-link to="/upgrade" class="active-pro">-->
<!--        <md-icon>unarchive</md-icon>-->
<!--        <p>Upgrade to PRO</p>-->
<!--      </sidebar-link>-->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import globalVariable from "../../globalVariable.js";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      quanxian: '',
    };
  },
  methods:{

  },
  created() {
    this.quanxian = globalVariable.currentUserAuthorization()
  }
};
</script>

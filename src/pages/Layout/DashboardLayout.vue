<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>assessment</md-icon>
        <p>驾驶舱</p>
      </sidebar-link>
<!--      选举界面-->
      <sidebar-link to="/manage-election-type">
        <md-icon>how_to_vote</md-icon>
        <p>选举类别管理</p>
      </sidebar-link>
      <sidebar-link to="/post-election">
        <md-icon>how_to_vote</md-icon>
        <p>选举发布界面</p>
        </sidebar-link>
      <sidebar-link to="/election-list">
        <md-icon>how_to_vote</md-icon>
        <p>选举信息概览</p>
      </sidebar-link>

<!--      报修界面-->
      <sidebar-link to="/fix-new-order">
        <md-icon>handyman</md-icon>
        <p>报修新工单管理</p>
        </sidebar-link>
      <sidebar-link to="/fix-my-order">
        <md-icon>handyman</md-icon>
        <p>报修我的工单界面</p>
      </sidebar-link>
      <sidebar-link to="/fix-all-order">
        <md-icon>handyman</md-icon>
        <p>报修所有工单界面</p>
      </sidebar-link>
      <!--      快递界面-->
      <sidebar-link to="/new-deliverys">
        <md-icon>delivery_dining</md-icon>
        <p>快递新工单界面</p>
      </sidebar-link>
      <sidebar-link to="/ongoing-deliverys">
        <md-icon>delivery_dining</md-icon>
        <p>快递进行中工单界面</p>
      </sidebar-link>
      <sidebar-link to="/finished-deliverys">
        <md-icon>delivery_dining</md-icon>
        <p>快递已完成工单界面</p>
      </sidebar-link>
      <!-- 课程界面-->
      <sidebar-link to="/courses">
        <md-icon>school</md-icon>
        <p>课程管理界面</p>
      </sidebar-link>
      <sidebar-link to="/courses-type">
        <md-icon>school</md-icon>
        <p>课程类别管理界面</p>
      </sidebar-link>
<!--      公交信息界面-->
      <sidebar-link to="/buslinelist">
        <md-icon>location_on</md-icon>
        <p>公交信息界面</p>
      </sidebar-link>
      <sidebar-link to="/allstoplist">
        <md-icon>location_on</md-icon>
        <p>公交车站信息界面</p>
      </sidebar-link>

      <!--      医院界面-->
      <sidebar-link to="/HospitalCrowdedSituation" v-if="quanxian === 0">
        <md-icon>gesture</md-icon>
        <p>医院拥挤情况</p>
      </sidebar-link>
      <sidebar-link to="/HospitalCrowdedSituation2" v-if="quanxian === 0">
        <md-icon>gesture</md-icon>
        <p>医院拥挤情况（管理人员）</p>
      </sidebar-link>
      <sidebar-link to="/CopeMatter" v-if="quanxian === 0">
        <md-icon>gesture</md-icon>
        <p>医生业务处理</p>
      </sidebar-link>
<!--      租房界面-->
      <sidebar-link to="/RentHouseInformation" v-if=" quanxian ===0">
        <md-icon>grade</md-icon>
        <p>租房信息界面</p>
      </sidebar-link>

<!--民宿界面-->
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
<!--    餐馆界面-->
      <sidebar-link to="/RestAppointment" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>flight_takeoff</md-icon>
        <p>餐馆预约界面</p>
      </sidebar-link>
      <sidebar-link to="/RestDue" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>flight_takeoff</md-icon>
        <p>餐馆结账</p>
      </sidebar-link>
      <sidebar-link to="/RestBusiness" v-if="quanxian === 2|| quanxian ===0">
        <md-icon>flight_takeoff</md-icon>
        <p>餐馆营业额</p>
      </sidebar-link>

    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>


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
import globalVariable from "../../globalVariable.js";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
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

<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
        :sidebar-item-color="sidebarBackground"
        :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"  ></mobile-menu>
      <sidebar-link to="/dashboard" v-if=" quanxian ===0">
        <md-icon>assessment</md-icon>
        <p>驾驶舱</p>
      </sidebar-link>
<!--      选举界面-->
      <sidebar-link to="/user-manage" v-if="quanxian ===0">
        <md-icon>manage_accounts</md-icon>
        <p>用户管理界面</p>
      </sidebar-link>
      <sidebar-link to="/manage-election-type" v-if="quanxian === 9|| quanxian ===0">
        <md-icon>how_to_vote</md-icon>
        <p>选举类别界面</p>
      </sidebar-link>
      <sidebar-link to="/post-election"  v-if="quanxian === 10|| quanxian ===0">
        <md-icon>how_to_vote</md-icon>
        <p>选举发布界面</p>
        </sidebar-link>
      <sidebar-link to="/election-list" v-if="quanxian === 10|| quanxian ===0">
        <md-icon>how_to_vote</md-icon>
        <p>选举信息概览</p>
      </sidebar-link>

<!--      报修界面-->
      <sidebar-link to="/fix-new-order"  v-if="quanxian === 12|| quanxian ===0">
        <md-icon>handyman</md-icon>
        <p>报修新工单管理</p>
        </sidebar-link>
      <sidebar-link to="/fix-my-order"  v-if="quanxian === 12|| quanxian ===0">
        <md-icon>handyman</md-icon>
        <p>报修我的工单界面</p>
      </sidebar-link>
      <sidebar-link to="/fix-all-order"  v-if="quanxian === 11|| quanxian ===0">
        <md-icon>handyman</md-icon>
        <p>报修所有工单界面</p>
      </sidebar-link>
      <!--      快递界面-->
      <sidebar-link to="/new-deliverys"  v-if="quanxian === 13|| quanxian ===0">
        <md-icon>delivery_dining</md-icon>
        <p>快递新工单界面</p>
      </sidebar-link>
      <sidebar-link to="/ongoing-deliverys"  v-if="quanxian === 13|| quanxian ===0">
        <md-icon>delivery_dining</md-icon>
        <p>快递进行中工单界面</p>
      </sidebar-link>
      <sidebar-link to="/finished-deliverys"  v-if="quanxian === 13|| quanxian ===0">
        <md-icon>delivery_dining</md-icon>
        <p>快递已完成工单界面</p>
      </sidebar-link>
      <!-- 课程界面-->
      <sidebar-link to="/courses"  v-if="quanxian === 8|| quanxian ===0">
        <md-icon>school</md-icon>
        <p>课程管理界面</p>
      </sidebar-link>
      <sidebar-link to="/courses-type"  v-if="quanxian === 7|| quanxian ===0">
        <md-icon>school</md-icon>
        <p>课程类别管理界面</p>
      </sidebar-link>
<!--      公交信息界面-->
      <sidebar-link to="/buslinelist"  v-if="quanxian === 6|| quanxian ===0">
        <md-icon>location_on</md-icon>
        <p>公交信息界面</p>
      </sidebar-link>
      <sidebar-link to="/allstoplist"  v-if="quanxian === 6|| quanxian ===0">
        <md-icon>location_on</md-icon>
        <p>公交车站信息界面</p>
      </sidebar-link>
      <sidebar-link to="/stopmap" v-if="quanxian === 6|| quanxian ===0">
        <md-icon>location_on</md-icon>
        <p>车站地图</p>
      </sidebar-link>
      <!--      医院界面-->
<!--      <sidebar-link to="/HospitalCrowdedSituation" v-if="quanxian === 5|| quanxian ===0">-->
<!--        <md-icon>local_hospital</md-icon>-->
<!--        <p>医院拥挤情况</p>-->
<!--      </sidebar-link>-->
      <sidebar-link to="/HospitalCrowdedSituation2" v-if="quanxian === 5|| quanxian ===0">
        <md-icon>local_hospital</md-icon>
        <p>医院拥挤情况</p>
      </sidebar-link>
      <sidebar-link to="/CopeMatter" v-if="quanxian === 5|| quanxian ===0">
        <md-icon>local_hospital</md-icon>
        <p>医生业务处理</p>
      </sidebar-link>
<!--      租房界面-->
      <sidebar-link to="/RentHouseInformation" v-if="quanxian === 2 ||  quanxian ===0">
        <md-icon>apartment</md-icon>
        <p>租房信息界面</p>
      </sidebar-link>

<!--民宿界面-->
      <sidebar-link to="/HotelAppointment" v-if="quanxian === 3|| quanxian ===0">
        <md-icon>cottage</md-icon>
        <p>民宿预约处理</p>
      </sidebar-link>
      <sidebar-link to="/HotelRoomManage" v-if="quanxian === 3|| quanxian ===0">
        <md-icon>cottage</md-icon>
        <p>民宿房源管理</p>
      </sidebar-link>
      <sidebar-link to="/HotelCope"  v-if="quanxian === 3|| quanxian ===0">
        <md-icon>cottage</md-icon>
        <p>民宿订单处理</p>
      </sidebar-link>
<!--    餐馆界面-->
      <sidebar-link to="/RestAppointment" v-if="quanxian === 4|| quanxian ===0">
        <md-icon>restaurant</md-icon>
        <p>餐馆预约界面</p>
      </sidebar-link>
      <sidebar-link to="/RestDue" v-if="quanxian === 4|| quanxian ===0">
        <md-icon>restaurant</md-icon>
        <p>餐馆结账</p>
      </sidebar-link>
      <sidebar-link to="/RestBusiness" v-if="quanxian === 4|| quanxian ===0">
        <md-icon>restaurant</md-icon>
        <p>餐馆营业额</p>
      </sidebar-link>

    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>


      <dashboard-content></dashboard-content>

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
  methods: {},
  created() {
    this.quanxian = globalVariable.currentUserAuthorization()
  }
};
</script>

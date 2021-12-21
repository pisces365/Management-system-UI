<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>主页面</p>
      </sidebar-link>
      <sidebar-link to="/HospitalCrowdedSituation">
        <md-icon>medication</md-icon>
        <p>医院拥挤情况</p>
      </sidebar-link>

      <sidebar-link to="/HospitalCrowdedSituation2">
        <md-icon>medication</md-icon>
        <p>医院拥挤情况（管理人员）</p>
      </sidebar-link>
      <sidebar-link to="/CopeMatter">
        <md-icon>medication</md-icon>
        <p>医生业务处理</p>
      </sidebar-link>


      <sidebar-link to="/icons">
        <md-icon>restaurant</md-icon>
        <p>餐馆后台界面</p>
      </sidebar-link>

      <sidebar-link to="/maps">
        <md-icon>hotel</md-icon>
        <p>民宿后台界面</p>
      </sidebar-link>

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
      <sidebar-link to="/fix-new-order">
        <md-icon>handyman</md-icon>
        <p>报修新工单管理</p>
      </sidebar-link>
      <sidebar-link to="/fix-all-order">
        <md-icon>handyman</md-icon>
        <p>报修所有工单界面</p>
      </sidebar-link>
      <sidebar-link to="/fix-my-order">
        <md-icon>handyman</md-icon>
        <p>报修我的工单界面</p>
      </sidebar-link>
      <sidebar-link to="/Amap">
        <md-icon>directions_bus</md-icon>
        <p>公交信息界面</p>
      </sidebar-link>
      <sidebar-link to="/shop">
        <md-icon>storefront</md-icon>
        <p>商店后台界面</p>
      </sidebar-link>
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
      <sidebar-link to="/courses">
        <md-icon>school</md-icon>
        <p>课程管理界面</p>
      </sidebar-link>
      <sidebar-link to="/courses-type">
        <md-icon>school</md-icon>
        <p>课程类别管理界面</p>
      </sidebar-link>
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
    };
  },
};
</script>

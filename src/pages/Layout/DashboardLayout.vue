<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

<!--      <sidebar-link to="/dashboard">-->
<!--        <md-icon>dashboard</md-icon>-->
<!--        <p>Dashboard</p>-->
<!--      </sidebar-link>-->

<!--      <sidebar-link to="/user">-->
<!--        <md-icon>person</md-icon>-->
<!--        <p>User Profile</p>-->
<!--      </sidebar-link>-->
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>医院后台界面</p>
      </sidebar-link>

      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>餐馆后台界面</p>
      </sidebar-link>

      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>民宿后台界面</p>
      </sidebar-link>

      <sidebar-link to="/election">
        <md-icon>location_on</md-icon>
        <p>选举后台界面</p>
      </sidebar-link>

      <sidebar-link to="/fix">
        <md-icon>location_on</md-icon>
        <p>报修后台界面</p>
      </sidebar-link>
      <sidebar-link to="/Amap">
        <md-icon>location_on</md-icon>
        <p>公交信息界面</p>
      </sidebar-link>
<!--      <sidebar-link to="/shopprofile">-->
<!--        <md-icon>house</md-icon>-->
<!--        <p>商店信息</p>-->
<!--      </sidebar-link>-->
<!--      <sidebar-link to="/shopdatastatistics">-->
<!--        <md-icon>dashboard</md-icon>-->
<!--        <p>商店信息统计</p>-->
<!--      </sidebar-link>-->
<!--      <sidebar-link to="/order">-->
<!--        <md-icon>reorder</md-icon>-->
<!--        <p>订单处理</p>-->
<!--      </sidebar-link>-->

      <sidebar-link to="/shop">
        <md-icon>reorder</md-icon>
        <p>商店后台界面</p>
      </sidebar-link>

      <sidebar-link to="/deliverys">
        <md-icon>content_paste</md-icon>
        <p>快递工单界面</p>
      </sidebar-link>
      <sidebar-link to="/courses">
        <md-icon>content_paste</md-icon>
        <p>课程管理界面</p>
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

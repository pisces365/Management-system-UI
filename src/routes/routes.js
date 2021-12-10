import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/Hospital.vue";
import Typography from "@/pages/Appointment.vue";
import Icons from "@/pages/Restaurant.vue";
import Maps from "@/pages/Hotel.vue";
import Notifications from "@/pages/Ask-online.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import PostElection from "@/pages/PostElection.vue";
import ElectionList from "@/pages/ElectionList.vue";
import fix from "@/pages/fix.vue";
import Amap from"@/pages/Amap.vue";
import Order from "@/pages/Order.vue";
import ShopProfile from "@/pages/ShopProfile.vue";
import ShopDataStatistics from "@/pages/ShopDataStatistics.vue";
import OrderPreviewPage from "@/pages/OrderPreviewPage.vue";
import OrderDetailPage from "@/pages/OrderDetailPage.vue";
import NewDelivery from "@/pages/NewDelivery.vue";
import OngoingDelivery from "@/pages/OngoingDelivery.vue";
import FinishedDelivery from "@/pages/FinishedDelivery.vue";
import CoursesManage from "@/pages/CoursesManage.vue";
import CourseDetails from "../pages/Layout/CourseManagePages/CourseDetails";
import AddCourse from "../pages/Layout/CourseManagePages/AddCourse";
import ElectionDetailPage from "../pages/ElectionDetailPage";
import shop from "@/pages/Shop.vue";
import ElectionTypeManagement from "../pages/ElectionTypeManagement";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",

    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "order-preview",
        name: "订单预览",
        component: OrderPreviewPage,
      },
      {
        path: "order-detail",
        name: "订单详情",
        component: OrderDetailPage,
      },
      {
        path: "new-deliverys",
        name: "快递新工单界面",
        component: NewDelivery,
      },
      {
        path: "ongoing-deliverys",
        name: "快递进行中工单界面",
        component: OngoingDelivery,
      },
      {
        path: "finished-deliverys",
        name: "快递已完成工单界面",
        component: FinishedDelivery,
      },
      {
        path: "shop",
        name: "shop",
        component: shop,
      },
      {
        path: "courses",
        name: "课程管理",
        component: CoursesManage,
      },
      {
        path: "course-details",
        name: "课程详情",
        component: CourseDetails,
      },
      {
        path: "add-course",
        name: "增加课程",
        component: AddCourse,
      },
      {
        path: "election-details-page",
        name: "选举详情",
        component: ElectionDetailPage,
      },
      {
        path: "manage-election-type",
        name: "选举类别管理",
        component: ElectionTypeManagement,
      },
      {
        path: "order",
        name: "订单列表",
        component: Order,
      },
      {
        path: "shopprofile",
        name: "商店简介",
        component: ShopProfile,
      },
      {
        path:"shopdatastatistics",
        name:"商店数据统计",
        component: ShopDataStatistics,
      },
      {
        path:"Amap",
        name:"Amap",
        component: Amap,
      },
      {
        path: "fix",
        name: "报修界面",
        component: fix,
      },
      {
        path: "post-election",
        name: "选举发布界面",
        component: PostElection,
      },
      {
        path: "election-list",
        name: "选举信息概览",
        component: ElectionList,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "table",
        name: "医院后台" ,
        component: TableList,

      },

      {
        path: "typography",
        name: "处理预约信息",
        component: Typography,
      },
      {
        path: "icons",
        name: "餐馆后台" ,
        component: Icons,
      },
      {
        path: "maps",
        name: "民宿后台",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "处理网上问诊",
        component: Notifications,
      },

      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
      },
    ],
  },
];

export default routes;

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/Hospital.vue";
import Icons from "@/pages/Restaurant.vue";
import Maps from "@/pages/Hotel.vue";
import CopeMatter from "@/pages/CopeMatter.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import PostElection from "@/pages/PostElection.vue";
import ElectionList from "@/pages/ElectionList.vue";
import FixingNewPage from "@/pages/FixingNewPage.vue";
import FixingOrderList from "@/pages/FixingOrderList.vue";
import FixingMyOrderList from "@/pages/FixingMyOrderList.vue";
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
import HospitalCrowdedSituation from "../pages/HospitalCrowdedSituation.vue";
import HospitalCrowdedSituation2 from "../pages/HospitalCrowdedSituation2.vue";
import addAddress from "../components/Hospital/addAddress.vue";
import checkInf from "../components/Hospital/checkInf.vue";
import CheckInformation from "../components/Hospital/CheckInformation.vue";
import AskOnlineDetail from "../components/Hospital/AskOnlineDetail.vue";
import AppointmentDetail from "../components/Hospital/AppointmentDetail.vue";
import CrowdChart from "../components/Hospital/CrowdChart.vue";
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
        path: "AskOnlineDetail",
        name: "AskOnlineDetail",
        component: AskOnlineDetail,
      },
      {
        path: "CrowdChart",
        name: "CrowdChart",
        component: CrowdChart,
      },
      {
        path: "AppointmentDetail",
        name: "AppointmentDetail",
        component: AppointmentDetail,
      },
      {
        path: "checkInf",
        name: "checkInf",
        component: checkInf,
      },
      {
        path: "CheckInformation",
        name: "CheckInformation",
        component: CheckInformation,
      },
      {
        path: "order-preview",
        name: "订单预览",
        component: OrderPreviewPage,
      },
      {
        path: "HospitalCrowdedSituation",
        name: "医院拥挤情况",
        component: HospitalCrowdedSituation,
      },
      {
        path: "HospitalCrowdedSituation2",
        name: "医院拥挤情况管理人员",
        component: HospitalCrowdedSituation2,
      },
      {
        path: "add-address",
        name: "增加地名",
        component: addAddress,
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
        path: "fix-new-order",
        name: "报修新工单界面",
        component: FixingNewPage,
      },
      {
        path: "fix-all-order",
        name: "报修所有工单",
        component: FixingOrderList,
      },
      {
        path: "fix-my-order",
        name: "报修我的工单",
        component: FixingMyOrderList,
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
        path: "CopeMatter",
        name: "处理网上问诊",
        component: CopeMatter,
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

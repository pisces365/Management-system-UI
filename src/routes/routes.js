import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import PostElection from "@/pages/PostElection.vue";
import ElectionList from "@/pages/ElectionList.vue";
import FixingNewPage from "@/pages/FixingNewPage.vue";
import FixingOrderList from "@/pages/FixingOrderList.vue";
import FixingMyOrderList from "@/pages/FixingMyOrderList.vue";
import NewDelivery from "@/pages/NewDelivery.vue";
import OngoingDelivery from "@/pages/OngoingDelivery.vue";
import FinishedDelivery from "@/pages/FinishedDelivery.vue";
import CoursesManage from "@/pages/CoursesManage.vue";
import CourseTypeManage from "@/pages/CourseTypeManage.vue";
import ElectionTypeManagement from "../pages/ElectionTypeManagement";
import Cockpit from "../pages/Cockpit";

const routes = [
  {
    // path: "/",
    // component: DashboardLayout,
    // redirect: "/cockpit",
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",

    children: [
      {
        path: "dashboard",
        name: "驾驶舱",
        component: Dashboard,
      },
      // {
      //   path: "cockpit",
      //   name: "Cockpit",
      //   component: Cockpit,
      // },
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
        path: "courses",
        name: "课程管理",
        component: CoursesManage,
      },
      {
        path: "courses-type",
        name: "课程类别管理",
        component: CourseTypeManage,
      },
      {
        path: "manage-election-type",
        name: "选举类别管理",
        component: ElectionTypeManagement,
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
    ],
  },
];

export default routes;

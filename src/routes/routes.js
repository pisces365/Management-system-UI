import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
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
import CopeMatter from "../pages/HospitalPage/CopeMatter";
import HospitalCrowdedSituation from "../pages/HospitalPage/HospitalCrowdedSituation";
import HospitalCrowdedSituation2 from "../pages/HospitalPage/HospitalCrowdedSituation2.vue";
import checkInf from "../components/Hospital/checkInf.vue";
import CheckInformation from "../components/Hospital/CheckInformation.vue";
import AskOnlineDetail from "../components/Hospital/AskOnlineDetail.vue";
import AppointmentDetail from "../components/Hospital/AppointmentDetail.vue";
import HotelAppointment from "../pages/HotelPage/HotelAppointment.vue";
import HotelRoomManage from "../pages/HotelPage/HotelRoomManage.vue";
import HotelCope from "../pages/HotelPage/HotelCope.vue";
import RestAppointment from "../pages/RestaurantPage/RestAppointment.vue";
import RestDue from "../pages/RestaurantPage/RestDue.vue";
import RestBusiness from "../pages/RestaurantPage/RestBusiness.vue";
import Login from "../pages/Login.vue";
import RentHouseInformation from "../pages/HouseRental/RentHouseInformation.vue";
import Dashboard from "../pages/Dashboard.vue";
import BusStopList from "../pages/BusStopList.vue";
import BusLineList from "../pages/BusLineList.vue";
import BusLineMapC from "../pages/BusLineMapC.vue";
import AllBusStopList from "../pages/AllBusStopList.vue";
import UserManage from "../pages/UserManage";
import AllStopMap from "../pages/AllStopMap";
import OneStopMap from "../pages/OneStopMap";


const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        // 打开项目时的默认界面
        path: "/",
        redirect: 'login',
        component: DashboardLayout,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: "dashboard",
                name: "主页",
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
                path: "user-manage",
                name: "用户管理界面",
                component: UserManage,
            },
            {
                path: "RentHouseInformation",
                name: "RentHouseInformation",
                component: RentHouseInformation,
            },
            {
                path: "ongoing-deliverys",
                name: "快递进行中工单界面",
                component: OngoingDelivery,
            },
            {

                path: "RestAppointment",
                name: "RestAppointment",
                component: RestAppointment,
            },
            {
                path: "RestDue",
                name: "RestDue",
                component: RestDue,
            },
            {
                path: "finished-deliverys",
                name: "快递已完成工单界面",
                component: FinishedDelivery,
            },
            {
                path: "fix-my-order",
                name: "报修我的工单界面",
                component: FixingMyOrderList,
            },

            {
                path: "RestBusiness",
                name: "RestBusiness",
                component: RestBusiness,
            },
            {
                path: "courses-type",
                name: "课程类别管理",
                component: CourseTypeManage,
            },
            {
                path: "courses",
                name: "课程管理",
                component: CoursesManage,
            },
            {
                path: "HotelAppointment",
                name: "HotelAppointment",
                component: HotelAppointment,
            },
            {
                path: "appointmentDetail",
                name: "AppointmentDetail",
                component: AppointmentDetail,
            },
            {
                path: "HotelRoomManage",
                name: "HotelRoomManage",
                component: HotelRoomManage,
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

                path: "HotelCope",
                name: "HotelCope",
                component: HotelCope,
            },
            {
                path: "AskOnlineDetail",
                name: "AskOnlineDetail",
                component: AskOnlineDetail,
            },
            {

                path: "fix-all-order",
                name: "报修所有工单",
                component: FixingOrderList,
            },
            {

                path: "post-election",
                name: "选举发布界面",
                component: PostElection,
            },
            {
                path: "checkInf",
                name: "checkInf",
                component: checkInf,
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
                path: "CopeMatter",
                name: "处理网上问诊",
                component: CopeMatter,
            },
            {
                path: "buslinemapc",
                name: "公交地图",
                component: BusLineMapC,
            },
            {
                path: "election-list",
                name: "选举信息概览",
                component: ElectionList,
            },
            {
                path: "CheckInformation",
                name: "CheckInformation",
                component: CheckInformation,
            },
            {
                path: "CopeMatter",
                name: "医生业务处理",
                component: CopeMatter,
            },
            {
                path: "busstoplist",
                name: "车站列表",
                component: BusStopList,
            },
            {
                path: "allstoplist",
                name: "车站管理",
                component: AllBusStopList,
            },
            {
                path: "buslinelist",
                name: "公交路线",
                component: BusLineList,
            },
            {
                path: "stopmap",
                name:"车站地图",
                component: AllStopMap,
            },
            {
                path: "onestopmap",
                name:"车站位置",
                component: OneStopMap,
            }
        ],
    },
];

export default routes;

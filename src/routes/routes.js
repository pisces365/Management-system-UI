import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CopeMatter from "@/pages/CopeMatter.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import HospitalCrowdedSituation from "../pages/HospitalPage/HospitalCrowdedSituation";
import HospitalCrowdedSituation2 from "../pages/HospitalPage/HospitalCrowdedSituation2.vue";
import addAddress from "../components/Hospital/addAddress.vue";
import checkInf from "../components/Hospital/checkInf.vue";
import CheckInformation from "../components/Hospital/CheckInformation.vue";
import AskOnlineDetail from "../components/Hospital/AskOnlineDetail.vue";
import AppointmentDetail from "../components/Hospital/AppointmentDetail.vue";
import CrowdChart from "../components/Hospital/CrowdChart.vue";
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
    component: DashboardLayout ,
    meta:{
      requireAuth: true
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component:Dashboard,
      },
      {
        path: "RentHouseInformation",
        name: "RentHouseInformation",
        component:RentHouseInformation,
      },
      {
        path: "RestAppointment",
        name: "RestAppointment",
        component:RestAppointment,
      },
      {
        path: "RestDue",
        name: "RestDue",
        component:RestDue,
      },

      {
        path: "RestBusiness",
        name: "RestBusiness",
        component:RestBusiness,
      },
      {
        path: "HotelAppointment",
        name: "HotelAppointment",
        component: HotelAppointment,
      },
      {
        path: "HotelRoomManage",
        name: "HotelRoomManage",
        component: HotelRoomManage,
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
        path: "user",
        name: "User Profile",
        component: UserProfile,
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
      {
        path: "buslinemapc",
        name:"公交地图",
        component: BusLineMapC,
      },
      {
        path: "busstoplist",
        name:"车站列表",
        component: BusStopList,
      },
      {
        path: "allstoplist",
        name:"车站管理",
        component: AllBusStopList,
      },
      {
        path: "buslinelist",
        name:"公交路线",
        component: BusLineList,
      },

    ],
  },

];

export default routes;

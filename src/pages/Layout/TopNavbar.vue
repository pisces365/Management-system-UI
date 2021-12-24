<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
            class="md-just-icon md-simple md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item href="#/login">
              <i class="material-icons">logout</i>
            </md-list-item>
            <el-popover
                placement="top-start"
                width="600"
                trigger="hover">
              <el-descriptions class="margin-top" title="个人信息" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                  </template>
                  {{ (currentUser.account === null)?"null":currentUser.account }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    姓名
                  </template>
                  {{ (currentUser.name === null)?"null":currentUser.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                  </template>
                  {{ (currentUser.phone === null)?"null":currentUser.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    性别
                  </template>
                  {{ (currentUser.sex === null)?"null":((currentUser.sex === 0) ? "女" : "男") }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    年龄
                  </template>
                  {{ (currentUser.age === null)?"null":currentUser.age }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    身份证号
                  </template>
                  {{ (currentUser.id === null)?"null":currentUser.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-key"></i>
                    权限等级
                  </template>
                  <el-tag size="small" :type="getLabelColor(currentUser.authorization)">
                    {{ (currentUser.authorization === null)?"null":getAuthority(currentUser.authorization) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    政治面貌
                  </template>
                  {{ (currentUser.political_face === null)?"null":currentUser.political_face }}
                </el-descriptions-item>
              </el-descriptions>
              <md-list-item slot="reference">
                <i class="material-icons">person</i>
<!--                <p class="hidden-lg hidden-md">Profile</p>-->
              </md-list-item>
            </el-popover>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import globalVariable from "../../globalVariable";

export default {
  data() {
    return {
      currentUser: null,  // 当前登录的用户
    };
  },
  created() {
    this.currentUser = globalVariable.getCurrentUser();
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    // 自动设置标签颜色
    getLabelColor(item) {
      if (item === 0) { // 系统管理员
        return "danger";
      } else if (item === 1) {  // 最低权限
        return "success";
      } else if (item >= 2 && item <= 13) {
        return "warning"; // 工作人员与管理员
      } else {
        return "danger";  // 出错
      }
    },
    // 自动设置权限等级
    getAuthority(item) {
      if (item === 0) { // 系统管理员
        return "系统管理员";
      } else if (item === 1) {  // 最低权限
        return "普通村民";
      } else if (item === 2) {  //
        return "租房工作人员";
      } else if (item === 3) {
        return "民宿工作人员";
      } else if (item === 4) {
        return "餐馆工作人员";
      } else if (item === 5) {
        return "医疗工作人员";
      } else if (item === 6) {
        return "交通工作人员";
      } else if (item === 7) {
        return "老年大学管理员";
      } else if (item === 8) {
        return "老年大学工作人员";
      } else if (item === 9) {
        return "选举管理员";
      } else if (item === 10) {
        return "选举工作人员";
      } else if (item ===11) {
        return "报修管理员";
      } else if (item === 12) {
        return "报修工作人员";
      } else if (item === 13) {
        return "快递工作人员";
      } else {
        return "错误,请马上联系系统管理员!";
      }
    },
  },
};
</script>

<style lang="css"></style>

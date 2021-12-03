<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">课程管理</h4>
            <p class="category">系统内的所有课程</p>
          </md-card-header>
          <md-card-content>
            <course-list table-header-color="green"></course-list>
          </md-card-content>
        </md-card>
      </div>
  </div>
  </div>
</template>

<script>
import { CourseList, } from "@/pages";

export default {
  components: {
    CourseList,
  },
};
</script>
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">工单管理</h4>
        <p class="category"> 在这可以看到用户的新工单</p>
      </md-card-header>
      <md-card-content>
        <Fix2></Fix2>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { Fix2 } from "@/components";

export default {
  components: {
    Fix2,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-info .md-tabs-navigation {
  background-color: #4fc3f7;
}
</style>
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">新工单列表</h4>
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
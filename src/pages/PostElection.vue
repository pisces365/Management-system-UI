<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">选举信息发布</h4>
            <p class="category">输入选举详细信息和选举人详细信息</p>
          </md-card-header>
          <md-card-content>
            <Election1></Election1>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Election1 } from "@/components";

export default {
  components: {
    Election1,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-success .md-tabs-navigation {
  background-color: #0d47a1;
}
</style>
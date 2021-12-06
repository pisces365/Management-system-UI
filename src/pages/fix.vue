<template>
  <div class="content">
    <md-tabs class="md-info" md-alignment="fixed" >

      <md-tab id="tab-home" md-label="报修信息管理" md-icon="home">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">报修信息管理</h4>
            <p class="category"> 在这可以看到保修的详细信息</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Fix1></Fix1>
      </md-tab>

      <md-tab id="tab-pages" md-label="工单管理" md-icon="pages">
        <md-card>-->
          <md-card-header data-background-color="blue">
            <h4 class="title">工单管理</h4>
            <p class="category"> 在这可以看到保修的工单信息</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Fix2></Fix2>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
import { Fix1,Fix2 } from "@/components";

export default {
  components: {
    Fix2,
    Fix1,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-info .md-tabs-navigation {
  background-color: #4fc3f7;
}
</style>
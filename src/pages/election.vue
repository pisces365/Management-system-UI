<template>
  <div class="content">
    <md-tabs class="md-success" md-alignment="fixed" >

      <md-tab id="tab-home" md-label="选举信息发布" md-icon="home">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">选举信息发布</h4>
            <p class="category"> 在这可以看到发布的被选举人的信息</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Election1></Election1>
      </md-tab>

      <md-tab id="tab-pages" md-label="选举信息概览" md-icon="pages">
        <md-card>-->
          <md-card-header data-background-color="blue">
            <h4 class="title">选举信息概览</h4>
            <p class="category"> 在这可以看到选举信息的概览</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Election2></Election2>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
import { Election1,Election2 } from "@/components";


export default {
  components: {
    Election2,
    Election1,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-success .md-tabs-navigation {
  background-color: #0d47a1;
}
</style>
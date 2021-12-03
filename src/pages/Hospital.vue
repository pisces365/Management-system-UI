<template>
  <div class="content">
    <md-tabs class="md-accent" md-alignment="fixed" >

      <md-tab id="tab-home" md-label="医院拥挤情况" md-icon="home">
        <md-card>-->
          <md-card-header data-background-color="green">
            <h4 class="title">医院拥挤情况</h4>
            <p class="category">在这可以看到医院各个地方的拥挤程度</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Hospital1></Hospital1>
      </md-tab>

      <md-tab id="tab-pages" md-label="各科取号人数" md-icon="pages">
        <md-card>-->
          <md-card-header data-background-color="blue">
            <h4 class="title">各科取号人数</h4>
            <p class="category">在这可以看到不同科室的预约取号人数</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Hospital2></Hospital2>
      </md-tab>

      <md-tab id="tab-posts" md-label="处理网上问诊" md-icon="pages">
        <md-card>-->
          <md-card-header data-background-color="orange">
            <h4 class="title">处理网上问诊</h4>
            <p class="category">在这对小程序中进行网上问诊的人进行回复</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Hospital3></Hospital3>
      </md-tab>
      <md-tab id="tab-favourites" md-label="上门就诊预约的处理" md-icon="favorite">
        <md-card>-->
          <md-card-header data-background-color="purple">
            <h4 class="title">上门就诊预约的处理</h4>
            <p class="category">在这处理用户关于上门就诊的预约</p>
          </md-card-header>
          <md-card-content>

          </md-card-content>
        </md-card>
        <Hospital4></Hospital4>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
import { Hospital1,Hospital2,Hospital3,Hospital4 } from "@/components";

export default {
  components: {
    Hospital1,
    Hospital2,
    Hospital3,
    Hospital4

  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
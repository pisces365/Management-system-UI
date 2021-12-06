<template>
  <div class="content">
    <md-tabs class="md-accent" md-alignment="fixed" >


      <md-tab id="tab-posts" md-label="处理网上问诊" md-icon="pages">
        <md-card>
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
import { Hospital3,Hospital4 } from "@/components";

export default {
  components: {


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
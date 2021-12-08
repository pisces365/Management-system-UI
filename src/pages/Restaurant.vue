<template>
  <div class="content">
    <md-tabs class="md-primary" md-alignment="fixed" >

      <md-tab id="tab-home" md-label="处理预约信息" md-icon="home">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">处理预约信息</h4>
            <p class="category">在这进行餐馆后台的功能</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Restaurant1></Restaurant1>
      </md-tab>

      <md-tab id="tab-pages" md-label="对电子菜单的管理" md-icon="pages">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">对电子菜单的管理</h4>
            <p class="category">对小程序中的电子菜单进行管理</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Restaurant2></Restaurant2>
      </md-tab>

      <md-tab id="tab-posts" md-label="餐桌结账" md-icon="posts">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">餐桌结账</h4>
            <p class="category">查看当前餐桌的账单</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
        <Restaurant3></Restaurant3>
      </md-tab>
      <md-tab id="tab-favourites" md-label="查看当日营业额" md-icon="favorite">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">查看当日营业额</h4>
            <p class="category">查看今天各菜品卖出去多少份，营业额多少</p>
          </md-card-header>
          <md-card-content>

          </md-card-content>
        </md-card>
        <Restaurant4></Restaurant4>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
import { Restaurant1,Restaurant2,Restaurant3,Restaurant4 } from "@/components";

export default {
  components: {
    Restaurant1,
    Restaurant2,
    Restaurant3,
    Restaurant4

  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
<template>
  <div class="content">
    <md-tabs class="md-info" md-alignment="fixed" >

      <md-tab id="tab-home" md-label="商店信息管理" md-icon="home">

        <shop-profile></shop-profile>
      </md-tab>

      <md-tab id="tab-pages" md-label="商店信息统计" md-icon="pages">
        <md-card>-->
          <md-card-header data-background-color="blue">
            <h4 class="title">商店信息统计</h4>
            <p class="category"> 在这可以看到商店信息统计</p>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card>
       <shop-data-statistics></shop-data-statistics>
      </md-tab>

      <md-tab id="tab-posts" md-label="订单处理" md-icon="home">
        <Order></Order>
      </md-tab>

    </md-tabs>


  </div>
</template>

<script>
import { ShopDataStatistics,ShopProfile,Order } from "@/pages";


export default {
  components: {
    Order,
    ShopDataStatistics,
    ShopProfile,
  },
};
</script>

<style scoped>
/*.md-tabs.md-theme-default.md-info .md-tabs-navigation {*/
/*  background-color: #4fc3f7;*/
</style>
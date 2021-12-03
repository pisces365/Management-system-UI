<template>
  <div class="content">
<!--    <md-tabs class="md-primary" md-alignment="fixed" >-->
<!--      <md-tab id="tab-home" md-label="新订单" md-icon="home">-->

<!--      </md-tab>-->
<!--      <md-tab id="tab-pages" md-label="我的订单（进行中）" md-icon="pages">-->

<!--      </md-tab>-->
<!--      <md-tab id="tab-posts" md-label="我的订单（已完成）" md-icon="favorite">-->

<!--      </md-tab>-->
<!--    </md-tabs>-->
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">新订单</h4>
            <p class="category">所有用户的新订单</p>
          </md-card-header>
          <md-card-content>
            <new-orders-list table-header-color="blue"></new-orders-list>
          </md-card-content>
        </md-card>
      </div>

      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">我的订单（进行中）</h4>
            <p class="category">我接单的订单</p>
          </md-card-header>
          <md-card-content>
            <ongoing-orders-list table-header-color="red"></ongoing-orders-list>
          </md-card-content>
        </md-card>
      </div>
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">我的订单（已完成）</h4>
            <p class="category">我接单的订单</p>
          </md-card-header>
          <md-card-content>
            <completed-orders-list table-header-color="green"></completed-orders-list>
          </md-card-content>
        </md-card>
      </div>
    </div>

  </div>
</template>

<script>
import { NewOrdersList, OngoingOrdersList, CompletedOrdersList } from "@/components";

export default {
  components: {
    NewOrdersList,
    OngoingOrdersList,
    CompletedOrdersList,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
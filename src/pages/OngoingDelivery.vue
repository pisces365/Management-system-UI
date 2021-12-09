<template>
  <div class="content">
    <div class="md-layout">
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
    </div>
  </div>
</template>

<script>
import { OngoingOrdersList } from "@/components";

export default {
  components: {
    OngoingOrdersList,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
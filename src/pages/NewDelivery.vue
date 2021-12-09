<template>
  <div class="content">
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
    </div>
  </div>
</template>

<script>
import { NewOrdersList } from "@/components";

export default {
  components: {
    NewOrdersList,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
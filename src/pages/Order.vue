<template>
  <div class="content">
    <div class="md-layout">

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">订单处理</h4>
            <p class="category">在此处理顾客的订单</p>
          </md-card-header>
          <md-card-content>
            <order-table-A></order-table-A>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable} from "@/components";
import OrderTableA from "../components/Tables/OrderTableA";

export default {
  components: {
    OrderTableA,
   // OrderedTable,
   // SimpleTable,
  },
};
</script>

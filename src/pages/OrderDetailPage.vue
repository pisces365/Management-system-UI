<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <order-details data-background-color="green"> </order-details>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { OrderDetails, UserCard } from "@/pages";

export default {
  components: {
    OrderDetails,
    UserCard,
  },
};
</script>

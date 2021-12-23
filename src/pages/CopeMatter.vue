<template>
  <div class="content">

    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">医生业务处理</h4>
        <p class="category">在这可以进行医生对相应业务的处理</p>
      </md-card-header>
      <md-card-content>
        <Hospital3></Hospital3>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { Hospital3, } from "@/components";

export default {
  components: {
    Hospital3,


  },
};

</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
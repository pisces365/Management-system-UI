<template>
  <div class="content">

    <md-card>
      <md-card-header data-background-color="blue">
        <h4 class="title">医院拥挤情况（管理人员界面 ）</h4>
        <p class="category">在这可以看到医院各个不同地方的拥挤情况</p>
      </md-card-header>
      <md-card-content>
        <Hospital2></Hospital2>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
import { Hospital2, } from "@/components";

export default {
  components: {
    Hospital2,


  },
};

</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
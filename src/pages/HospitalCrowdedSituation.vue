<template>
  <div class="content">

        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">医院拥挤情况</h4>
            <p class="category">在这可以看到医院各个不同地方的拥挤情况</p>
          </md-card-header>
          <md-card-content>
            <Hospital1></Hospital1>
          </md-card-content>
        </md-card>

  </div>
</template>

<script>
import { Hospital1, } from "@/components";

export default {
  components: {
    Hospital1,


  },
};
</script>
<style>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
</style>
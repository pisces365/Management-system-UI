<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">选举信息概览</h4>
            <p class="category"> 在这可以看到选举信息的概览</p>
          </md-card-header>
          <md-card-content>
            <Election2></Election2>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Election2 } from "@/components";


export default {
  components: {
    Election2,
  },
};
</script>
<style>
.md-tabs.md-theme-default.md-success .md-tabs-navigation {
  background-color: #0d47a1;
}
</style>
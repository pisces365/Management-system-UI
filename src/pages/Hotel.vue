<template>
  <div class="content">
        <md-tabs class="md-success" md-alignment="fixed" >

          <md-tab id="tab-home" md-label="处理预约信息" md-icon="home">
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">处理预约信息</h4>
                <p class="category">在这进行民宿后台的功能</p>
              </md-card-header>
              <md-card-content>
              </md-card-content>
            </md-card>
            <hotel1></hotel1>
          </md-tab>

          <md-tab id="tab-pages" md-label="房源管理" md-icon="pages">
            <md-card>-->
                        <md-card-header data-background-color="blue">
                          <h4 class="title">房源管理</h4>
                          <p class="category">查看已使用房源和剩余房源</p>
                        </md-card-header>
                        <md-card-content>
                        </md-card-content>
                      </md-card>
            <hotel2></hotel2>
          </md-tab>

          <md-tab id="tab-posts" md-label="客户订单处理" md-icon="posts">
            <md-card>-->
                        <md-card-header data-background-color="red">
                          <h4 class="title">客户订单处理</h4>
                          <p class="category">及时处理客户发来的需求订单</p>
                        </md-card-header>
                        <md-card-content>
                        </md-card-content>
                      </md-card>
            <hotel3></hotel3>
          </md-tab>
          <md-tab id="tab-favourites" md-label="退房后的清理" md-icon="favorite">
            <md-card>-->
                        <md-card-header data-background-color="purple">
                          <h4 class="title">退房后的清理</h4>
                          <p class="category">退房后通知卫生阿姨进行清理</p>
                        </md-card-header>
                        <md-card-content>

                        </md-card-content>
                      </md-card>
            <hotel4></hotel4>
          </md-tab>
        </md-tabs>

  </div>
</template>

<script>
import { Hotel1, Hotel2, Hotel3,Hotel4 } from "@/components";

export default {
  components: {
    Hotel2,
    Hotel1,
    Hotel4,
    Hotel3,

  },
};
</script>
<style>
.md-tabs.md-theme-default.md-success .md-tabs-navigation {
  background-color: #afb42b;
}
</style>
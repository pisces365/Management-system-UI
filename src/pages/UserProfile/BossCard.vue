<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">场所负责人</h6>
      <h4 class="card-title">李相赫</h4>
      <p class="card-description">
        Faker以顶级的游戏操作和取得赛事冠军的数目而闻名。带领SKT取得三届英雄联盟全球总决赛冠军，两届英雄联盟季中冠军赛冠军，九次韩国国内顶级联赛冠军  ，率领SKT建立起自己的王朝。
      </p>
      <md-button class="md-round md-success">详情</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "boss-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/faker1.jpg"),
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>

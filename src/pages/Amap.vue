<template>

  <baidu-map class="map" center="杭州" :scroll-wheel-zoom="true">
    <!--右上角缩放工具-->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <!--右下角定位按钮-->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <!--城市列表-->
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    <!--周日12点的交通路况-->
    <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>
    <!--公交路线规划-->
 <!--   <bm-transit start="浙江工业大学-屏峰校区" end="杭州东站" :auto-viewport="true" location="杭州"></bm-transit>-->
    <!--地图检索-->
    <label>关键词：<input v-model="keyword"></label>
    <label>地区：<input v-model="location"></label>
    <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>

  </baidu-map>

</template>
<script>
export default {
  data () {
    return {
      location: '杭州',
      keyword: '公交站'
    }
  }
}
</script>
<style>
.map {
  width: 100%;
  height: 700px;
}
</style>
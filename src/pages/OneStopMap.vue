<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
import { Scene, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
export default {
  data() {

    return {
      lng:'0',  //经度，从上个页面传来的参数
      lat:'0',  //纬度，从上个页面传来的参数
      sid:'0',  //公交站ID，从上个页面传来的参数
    };
  },
  methods:{
    getParams(){
      //取到路由带过来的参数
      this.lng=this.$route.query.lng;
      this.lat=this.$route.query.lat;
      this.sid=this.$route.query.sid;
    }
  },
  created() {
    this.getParams();
  },
  watch: {
    //监测路由变化，只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams",
  },
  mounted() {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'light',
        center: [ this.lng, this.lat ],
        zoom: 14.5,
        minZoom: 10
      })
    });
    scene.addImage("busStop", "busstop.svg");
    fetch(
        "http://112.124.35.32:8082/SelectStopMapById/"+this.sid,{
          methods:'GET'
        }
    )
        .then(res => res.json())
        .then(data => {
          const pointLayer = new PointLayer({})
              .source(data, {
                parser: {
                  type: 'json',
                  x: 'longitude',
                  y: 'latitude'
                }
              })
              .shape("busStop")
              .size(20)
              .style({
                offsets: [20, 0],
              });

          scene.addLayer(pointLayer);


          const busStopsName = new PointLayer()
              .source(data, {
                parser: {
                  x: "longitude",
                  y: "latitude",
                  type: "json",
                },
              })
              .shape("name", "text")
              .size(12)
              .color("#000")
              .style({
                textAnchor: "left",
                textOffset: [80, 0],
                stroke: "#fff",
                strokeWidth: 1,
              });
          scene.addLayer(busStopsName);
        });

  }
};
</script>
<!--<style>-->
<!--::-webkit-scrollbar {-->
<!--  display: none;-->
<!--}-->

<!--html,-->
<!--body {-->
<!--  overflow: hidden;-->
<!--  margin: 0;-->
<!--}-->

<!--#map {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  width: 100%;-->
<!--}-->
<!--</style>-->

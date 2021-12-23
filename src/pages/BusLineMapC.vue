<template>
  <div>
    <div id="map"></div>
    <div>name==={{name}}</div>
  </div>
</template>

<script>
import { Scene, LineLayer, Popup, PointLayer } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
import axios from "axios";

export default {
  data() {
    return {
      name: '1111',
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      //取到路由带过来的参数
      let routerParams = this.$route.query.name;
      //将数据方在当前组件的数据内
      this.name = this.$route.query.name;
    },
  },
  watch: {
    //监测路由变化，只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams",
  },
  mounted() {
    const scene = new Scene({
      id: "map",
      map: new GaodeMap({
        pitch: 4.00000000000001,
        style: "light",
        rotation: 19.313180925794313,
        center: [120.040928, 30.224315],
        zoom: 13.210275860702593,
      }),
    });
    scene.addImage("road", "road.svg");
    scene.addImage("start", "startstop.svg");
    scene.addImage("end", "endstop.svg");

    scene.addImage("busStop", "busstop.svg");

    fetch("http://112.124.35.32:8082/SelectBusRoute/"+this.name,{
      methods:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("成功");
        const { path, via_stops } = data;
        const startPoint = [path[0]];
        const endpoint = [path[path.length - 1]];
        const budStopsData = via_stops.map((stop) => ({
          lng: stop.location.lng,
          lat: stop.location.lat,
          name: stop.name,
        }));
        const data1 = [
          {
            id: "1",
            coord: path.map((p) => [p.lng, p.lat]),
          },
        ];
        const layer = new LineLayer({})
          .source(data1, {
            parser: {
              type: "json",
              coordinates: "coord",
            },
          })
          .size(5)
          .shape("line")
          .active(true)
          .color("rgb(99, 166, 242)")
          .texture("road")
          .animate({
            interval: 1, // 间隔
            duration: 1, // 持续时间，延时
            trailLength: 2, // 流线长度
          })
          .style({
            lineTexture: true,
            iconStep: 25,
          });

        /*     layer.on("mousemove", (e) => {
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: false,
          })
            .setLnglat(e.lngLat)
            .setHTML(`<span>车次: ${e.feature.name}</span>`);
          scene.addPopup(popup);
        });*/
        scene.addLayer(layer);

        const startPointLayer = new PointLayer({ zIndex: 1 })
          .source(startPoint, {
            parser: {
              x: "lng",
              y: "lat",
              type: "json",
            },
          })
          .shape("start")
          .size(20)
          .style({
            offsets: [0, 25],
          });
        scene.addLayer(startPointLayer);

        const endPointLayer = new PointLayer({ zIndex: 1 })
          .source(endpoint, {
            parser: {
              x: "lng",
              y: "lat",
              type: "json",
            },
          })
          .shape("end")
          .size(25)
          .style({
            offsets: [0, 25],
          });
        scene.addLayer(endPointLayer);

        const busStops = new PointLayer()
          .source(budStopsData, {
            parser: {
              x: "lng",
              y: "lat",
              type: "json",
            },
          })
          .shape("busStop")
          .size(13)
          .style({
            offsets: [20, 0],
          });
        scene.addLayer(busStops);

        const busStopsName = new PointLayer()
          .source(budStopsData, {
            parser: {
              x: "lng",
              y: "lat",
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
  },
};
</script>
<style></style>

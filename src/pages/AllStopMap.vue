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

    };
  },

  mounted() {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'light',
        center: [ 120.051958, 30.233368 ],
        zoom: 14.5,
        minZoom: 10
      })
    });
    scene.addImage("busStop", "busstop.svg");
    fetch(
        'http://112.124.35.32:8082/SelectAllStopMap'
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
              .size(13)
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

<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    
    <rect
      :height="height + this.unit"
      :width="width + this.unit"
      fill="#fff"
      stroke-width="1"
      stroke="#000"
    >
    </rect>
    <svg-text>内容</svg-text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
import svgText from "./svgText";
export default {
  name: "svgContent",
  mixins: [Box],
  components: { svgText },
};
</script>

<style>
</style>
<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-text>页码</svg-text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
import svgText from "./svgText";
export default {
  name: "svgPager",
  mixins: [Box],
  components: { svgText },
};
</script>

<style>
</style>
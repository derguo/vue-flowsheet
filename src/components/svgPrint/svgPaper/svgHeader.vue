<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-text>页眉</svg-text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
import svgText from "./svgText";
export default {
  name: "svgHeader",
  mixins: [Box],
  components: { svgText },
};
</script>

<style>
</style>
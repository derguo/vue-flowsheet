<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-text>页脚</svg-text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
import svgText from "./svgText";
export default {
  name: "svgFooter",
  mixins: [Box],
  components: { svgText },
};
</script>

<style>
</style>
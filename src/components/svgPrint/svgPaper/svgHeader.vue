<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <slot></slot>
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
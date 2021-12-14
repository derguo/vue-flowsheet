<template>
  <g :transform="`translate(${relativeXStr},${relativeYStr})`">
    <slot name="header"></slot>
    <slot></slot>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
export default {
  name: "svgTable",
  mixins: [Box],
  mounted() {
    let rx = 0;
    let ry = 0;
    for (const iterator of this.$slots.default) {
      iterator.componentInstance.relativeY = ry;
      ry += iterator.componentInstance.height;
    }
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
<template>
  <g :transform="`translate(0,0)`">
    <slot name="header"></slot>
    <slot></slot>
  </g>
</template>

<script>
export default {
  name: "svgTable",
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
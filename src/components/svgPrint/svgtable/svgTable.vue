<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <slot></slot>
    <line
      v-if="true"
      x1="0"
      :y1="cutLineY + this.unit"
      :x2="width + this.unit"
      :y2="cutLineY + this.unit"
      style="stroke: rgb(255, 0, 0); stroke-width: 2"
    />
  </g>
</template>

<script>
import Box from "../mix/svgBox";
export default {
  name: "svgTable",
  mixins: [Box],
  provide() {
    return {
      pushColumnWidths: this.pushColumnWidths,
      columnWidths: this.columnWidths,
    };
  },
  props: {
    maxHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      cutLine: false,
      cutLineY: 0,
      columnWidths: [],
    };
  },
  created() {
    
  },
  mounted() {
    let rx = 0;
    let ry = 0;
    for (const iterator of this.$slots.default) {
      iterator.componentInstance.relativeY = ry;
      ry += iterator.componentInstance.height;
      this.width = iterator.componentInstance.width;
      if (iterator.componentInstance.cut) {
        this.cutLine = true;
        this.cutLineY = ry;
      }
    }

    this.height = ry;
  },
  methods: {
    pushColumnWidths(width) {
      console.log("列宽", width);
      this.columnWidths.push(width);
    },
  },
};
</script>

<style>
</style>
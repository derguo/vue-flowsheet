<template>
  <g ref="title" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <text
      :font-size="fontSizeStr"
      :transform="`translate(0,${textTransform})`"
      style="font-weight: bolder;text-anchor:middle"
    >
      {{ title }}
    </text>
    <text :font-size="subfontSizeStr" :transform="`translate(0,${subtextTransform})`" style=" text-anchor:middle">
      {{ subtitle }}
    </text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
export default {
  name: "svgTitle",
  mixins: [Box],
  props: {
    title: {
      type: String,
      default: "住院患者管理记录单",
    },
    subtitle: {
      type: String,
      default: "WHCH-FD-9829-I/O",
    },
    fontSize: {
      type: Number,
      default: 18,
    },
    subfontSize: {
      type: Number,
      default: 9,
    },
  },
  computed: {
    fontSizeStr() {
      return this.fontSize + "" + this.unit;
    },
    subfontSizeStr() {
      return this.subfontSize + "" + this.unit;
    },
    textTransform() {
      let tt = this.fontSize * 1.06;

      if (this.unit == "pt") {
        tt = (tt * 4) / 3;
      }

      return tt;
    },
    subtextTransform() {
      let tt = (this.subfontSize + this.fontSize) * 1.06 + 5;

      if (this.unit == "pt") {
        tt = (tt * 4) / 3;
      }

      return tt;
    },
    boxHeightStr() {
      if (!this.height) {
        this.height = (this.fontSize * 132) / 100;
      } else if (this.defaultHeight) {
        this.height = this.defaultHeight;
      }

      return this.height + "" + this.unit;
    },
  },
  mounted() {
    
    this.height = this.$refs.title.getBoundingClientRect().height;
    console.log( this.height)
  }
};
</script>

<style>
</style>
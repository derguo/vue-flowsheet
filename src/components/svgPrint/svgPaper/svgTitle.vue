<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-text
      ref="title"
      :font-size="fontSizeStr"
      style="font-weight: bolder; text-anchor: middle"
    >
      {{ title }}
    </svg-text>
    <svg-text
      :font-size="subfontSizeStr"
      style="text-anchor: middle"
      :y="'27'"
    >
      {{ subtitle }}
    </svg-text>
  </g>
</template>

<script>
import Box from "../mix/svgBox";
import svgText from "./svgText"
export default {
  name: "svgTitle",
  mixins: [Box],
  components:{svgText},
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
  data() {
    return {
      titleHeight: 0,
      subtitleHeight: 0,
    };
  },
  computed: {
    fontSizeStr() {
      return this.fontSize + "" + this.unit;
    },
    subfontSizeStr() {
      return this.subfontSize + "" + this.unit;
    },
    textTransform() {
      let tt = (this.fontSize * 819) / 1000;

      if (this.unit == "pt") {
        tt = (tt * 4) / 3;
      }

      return tt;
    },
    subtextTransform() {
      // let tt = this.fontSize + (this.subfontSize * 5) / 6;
      let tt =  (this.subfontSize * 815) / 1000;

      if (this.unit == "pt") {
        tt = (tt * 4) / 3;
      }

      return tt;
    },
  },
};
</script>

<style>
</style>
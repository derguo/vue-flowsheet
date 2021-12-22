<template>
  <g ref="box" :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-text ref="label" style="font-weight: 600;">{{ label }} : </svg-text>
    <svg-text :x="labelWidth+''+unit"><slot></slot></svg-text>
  </g>
</template>

<script>
import svgBox from "../mix/svgBox";
import svgText from "../svgPaper/svgText";
export default {
  name: "svgFormitem",
  components: { svgText },
  mixins: [svgBox],
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      labelWidth:0,
    };
  },
  mounted() {
    this.labelWidth = this.$refs.label.width + 5;
    if(this.unit == 'pt'){
      this.labelWidth = (this.labelWidth * 3) / 4;
    }
  },
};
</script>

<style>
</style>
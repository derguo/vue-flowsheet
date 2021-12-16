<template>
  <!-- <text ref="text" alignment-baseline="before-edge" dominant-baseline="text-before-edge">
    <slot></slot>
  </text> -->
  <text ref="text" :transform="`translate(0,${textTransform})`">
    <slot></slot>
  </text>
</template>

<script>
export default {
  name: "svgText",
  inject: {
    unit: {
      default: "pt",
    },
    fontSize: {
      default: 9,
    },
  },
  data() {
    return {
      size: 0,
    };
  },
  mounted() {
      console.log('xxxxxxxxxx',this.fontSize, this.$refs.text.getAttribute("font-size"))
    if (this.$refs.text.getAttribute("font-size")) {
      this.size = parseInt(
        this.$refs.text.getAttribute("font-size").replace(this.unit, "")
      );
    } else {
        this.size = this.fontSize;
        this.$refs.text.setAttribute("font-size",this.size + ''+ this.unit) ;
      
    }
  },
  computed: {
    textTransform() {
      return this.size + (this.size * 185) / 1000;
    },
  },
};
</script>

<style>
</style>
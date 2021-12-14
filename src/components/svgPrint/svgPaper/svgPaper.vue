<template>
  <div
    :style="{
      width: this.width + '' + this.unit,
      height: this.height + '' + this.unit,
      boxShadow: '2px 2px 12px #ccc',
      margin: '0 auto',
      backgroundColor: '#fff',
    }"
  >
    <svg
      ref="svg"
      :style="{
        width: this.width + '' + this.unit,
        height: this.height + '' + this.unit,
        backgroundColor: '#fff',
        boxShadow: '2px 2px 12px #ccc',
        margin: '0 auto',
      }"
    >
      <slot></slot>
    </svg>
  </div>
</template>

<script>
import svgTitle from "./svgTitle";
export default {
  name: "svgPaper",
  provide() {
    return {
      unit: this.unit,
    };
  },
  components: { svgTitle },
  props: {
    size: {
      type: String || Array,
      default: "a4h",
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      unit: "pt",
    };
  },
  watch: {
    size: {
      handler() {
        if (Array.isArray(this.size)) {
          this.width = this.size[0];
          this.height = this.size[1];
        } else {
          switch (this.size) {
            case "a4":
              this.width = 595;
              this.height = 842;
              break;
            case "a4h":
              this.width = 942;
              this.height = 595;
              break;

            default:
              break;
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    let tempheight = 0;
    for (const iterator of this.$slots.default) {      
      if (iterator.tag.indexOf("svgTitle") >= 0) {
        iterator.componentInstance.relativeX = this.width / 2;
        tempheight += iterator.componentInstance.height;
      }

      console.log(tempheight)

      if (iterator.tag.indexOf("svgTable") >= 0) {
        iterator.componentInstance.relativeY = tempheight;
      }
    }
  },
};
</script>

<style>
</style>
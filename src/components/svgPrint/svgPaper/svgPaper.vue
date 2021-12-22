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
      fontSize: this.fontSize,
    };
  },
  components: { svgTitle },
  props: {
    size: {
      type: String || Array,
      default: "a4h",
    },
    unit: {
      type: String,
      default: "pt",
    },
    fontSize: {
      type: Number,
      default: 9,
    },
    typesetting: {
      type: Array,
      default() {
        return [
          ["svgTitle", "svgHeader", "svgTable"],
          ["svgFooter", "svgPager"],
        ];
      },
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
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
    this.$nextTick(() => {
      let tempheight = 0;
      // console.log('排版', this.$slots.default)
      for (const type of this.typesetting[0]) {
        for (const iterator of this.$slots.default) {
          if (type == "svgTitle" && iterator.tag.indexOf("svgTitle") >= 0) {
            iterator.componentInstance.relativeX = this.width / 2;
            iterator.componentInstance.relativeY = tempheight;
            tempheight += iterator.componentInstance.height;
          }

          if (type == "svgTable" && iterator.tag.indexOf("svgTable") >= 0) {
            iterator.componentInstance.relativeY = tempheight;
            tempheight += iterator.componentInstance.tabelH;
          }

          if (type == "svgHeader" && iterator.tag.indexOf("svgHeader") >= 0) {
            iterator.componentInstance.relativeY = tempheight;
            tempheight += iterator.componentInstance.height;
          }
        }
      }

      let bottomheight = 0;
      for (let index = this.typesetting[1].length - 1; index >= 0; index--) {
        const type = this.typesetting[1][index];
        for (const iterator of this.$slots.default) {
          if (type == "svgPager" && iterator.tag.indexOf("svgPager") >= 0) {
            bottomheight += iterator.componentInstance.height;
            iterator.componentInstance.relativeY = this.height - bottomheight;
          }

          if (type == "svgFooter" && iterator.tag.indexOf("svgFooter") >= 0) {
            bottomheight += iterator.componentInstance.height;
            iterator.componentInstance.relativeY = this.height - bottomheight;
          }
        }
      }

      for (const iterator of this.$slots.default) {
        if (iterator.tag.indexOf("svgContent") >= 0) {
          iterator.componentInstance.relativeY = tempheight;
          iterator.componentInstance.width = this.width
          iterator.componentInstance.height =
            this.height - tempheight - bottomheight;
        }
      }
    });
  },
};
</script>

<style>
</style>
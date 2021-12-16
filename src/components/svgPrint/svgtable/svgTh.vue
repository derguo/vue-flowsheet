<template>
  <g :transform="`translate(${relativeXStr},${relativeYStr})`">
    <svg-td :defaultWidth="thData.width" :defaultHeight="thData.height">
      <slot></slot>
    </svg-td>
    <svg-tr ref="son">
      <svg-th
        v-for="(item, index) in thData.son"
        :key="index + '' + item.info"
        :thData="item"
      >
        {{ item.info }}
      </svg-th>
    </svg-tr>
  </g>
</template>

<script>
import svgTd from "./svgTd";
import SvgTr from "./svgTr";

export default {
  name: "svgTh",
  components: {
    svgTd,
    SvgTr,
  },
  inject: {
    unit: {
      default: "pt",
    },
    pushColumnWidths:{
      default:() => {}
    },
  },
  props: {
    thData: {
      type: Object,
      default() {
        return {
          info: "",
          width: 0,
          height: 0,
          son: [],
        };
      },
    },
  },
  data() {
    return {
      relativeX: 0,
      relativeY: 0,
      width: 0,
      height: 0,
      thishash: "",
    };
  },
  computed: {
    relativeXStr() {
      let r = this.relativeX;
      if (this.unit == "pt") {
        r = (r * 4) / 3;
      }
      return r;
    },
    relativeYStr() {
      let r = this.relativeY;
      if (this.unit == "pt") {
        r = (r * 4) / 3;
      }
      return r;
    },
  },
  mounted(){
    // console.log("htData", this.thData,this.$refs.son);
    this.$refs.son.relativeY = this.thData.height;
    if(this.thData.son && !this.thData.son.length) {
      this.pushColumnWidths(this.thData.width)
    }
    
  },
  watch: {
    thData: {
      handler() {
        // console.log("htData", this.thData,this.$refs.son);
        this.width = this.thData.width;
        this.height = this.thData.height;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
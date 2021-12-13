<template v-slot:header>
  <g :transform="`translate(${relativeXStr},${relativeYStr})`">
    <slot></slot>
  </g>
</template>

<script>
export default {
  name: "svgThead",
  inject: {
    unit: {
      default: "pt",
    },
  },
  data() {
    return {
      height: 0,
      relativeY: 0,
      relativeX: 0,
    };
  },
  computed: {
    relativeYStr() {
      let r = this.relativeY;
      if (this.unit == "pt") {
        r = (r * 4) / 3;
      }
      return r;
    },
    relativeXStr() {
      let r = this.relativeX;
      if (this.unit == "pt") {
        r = (r * 4) / 3;
      }
      return r;
    },
  },
  mounted() {
    let rx = 0;
    let h = 0;
    if(!this.$slots.default){
      return;
    }
    for (const iterator of this.$slots.default) {
      iterator.componentInstance.relativeX = rx;
      rx += iterator.componentInstance.width;

      if (this.height < iterator.componentInstance.height) {
       this.height = iterator.componentInstance.height;
      }
    }
    for (const iterator of this.$slots.default) {
      iterator.componentInstance.height = this.height;
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>

<style>
</style>
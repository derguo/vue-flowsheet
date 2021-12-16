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
    columnWidths: {
      default() {
        return [];
      },
    },
  },
  props: {
    cutLine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      height: 0,
      width: 0,
      relativeY: 0,
      relativeX: 0,
      cut: false,
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
    if (!this.$slots.default) {
      return;
    }
    for (let index = 0; index < this.$slots.default.length; index++) {
      const slot = this.$slots.default[index];
      if (slot.tag.indexOf("svgTd") >= 0) {
        slot.componentInstance.width = this.columnWidths[index];
      }
    }

    for (const iterator of this.$slots.default) {
      iterator.componentInstance.relativeX = rx;
      rx += iterator.componentInstance.width;

      if (this.height < iterator.componentInstance.height) {
        this.height = iterator.componentInstance.height;
      }
    }
    // for (const iterator of this.$slots.default) {
    //   iterator.componentInstance.height = this.height;
    // }
    this.width = rx;
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
  watch: {
    cutLine: {
      handler() {
        this.cut = this.cutLine;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
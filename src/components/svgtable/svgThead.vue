<template v-slot:header>
  <g transform="translate(0,0)">
    <slot></slot>
    <!-- <ellipse cx="200" cy="80" rx="100" ry="50" @click="test"
  style="fill:yellow;stroke:purple;stroke-width:2" /> -->
  </g>
</template>

<script>
export default {
  name: "svgThead",
  methods: {
      test() {
        console.log(this.$slots.default[0].componentInstance)
        this.$slots.default[0].componentInstance.rX += 10
        // this.$slots.default[1].elm.transform = "translate(110,20)"
      }
  }
};
</script>

<style>
</style>
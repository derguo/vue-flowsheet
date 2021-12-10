<template>
  <div
    :style="{
      width: this.width + 'pt',
      height: this.height + 'pt',
      boxShadow: '2px 2px 12px #ccc',
      margin: '0 auto',
      backgroundColor: '#fff',
    }"
  >
    <svg
      :style="{
        width: this.width + 'pt',
        height: this.height + 'pt',
        backgroundColor: '#fff',
      }"
    >
      <slot></slot>
    </svg>
  </div>
</template>

<script>
export default {
  name: "svgPaper",
  provide: {
    unit: "pt",
  },
  props: {
    size: {
      type: String || Array,
      default: "a4",
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

            default:
              break;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
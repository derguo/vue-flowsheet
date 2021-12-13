<template>
  <g :transform="`translate(${relativeXStr},${relativeYStr})`">
    <defs>
      <clipPath :id.sync="thishash" class="clipPath1">
        <rect
          :height="boxHeightStr"
          :width="boxWidthStr"
          :y="-textTransform"
          :x="-this.fontSize / 2"
        >
        </rect>
      </clipPath>
      <path :id="MyPath" :d="lineNum" fill="#fff" stroke="#000" />
    </defs>
    <rect
      :height="boxHeightStr"
      :width="boxWidthStr"
      fill="#fff"
      stroke-width="1"
      stroke="#000"
      y="0"
      x="0"
      shape-rendering="geometricPrecision"
    >
    </rect>

    <text
      ref="texth"
      :transform="`translate(${this.fontSize / 2},${textTransform})`"
      font-family="Microsoft YaHei"
      :font-size="fontSizeStr"
      stroke-width="0"
      stroke="#000"
      y="20"
      fill="#000000"
      :clip-path="`url(#${thishash})`"
    >
      <textPath :xlink:href="`#${MyPath}`">
        <slot></slot>
      </textPath>
    </text>
    <!-- <foreignObject x="320" y="0" width="150" height="200">
      <p xmlns="http://www.w3.org/1999/xhtml">
        Text goes here, Text goes here, Text goes here, Text goes here
      </p>
      <text 
      alignment-baseline='before-edge'
      dominant-baseline='text-before-edge' >
        用户文字左上角对齐0坐标
      </text>
    </foreignObject> -->
  </g>
</template>

<script>
export default {
  name: "svgTd",
  inject: {
    unit: {
      default: "pt",
    },
  },
  props: {
    defaultWidth: {
      type: Number,
      default: 80,
    },
    defaultHeight: {
      type: Number,
      default: 0,
    },
    fontSize: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      textHeight: 0,
      relativeX: 0,
      relativeY: 0,
      width: 0,
      height: 0,
      thishash:'',
      MyPath:'',
    };
  },
  mounted() {
    this.textHeight = this.$refs.texth.getBoundingClientRect().height;
    this.thishash = this.onlyV();
    this.MyPath = this.onlyV();
  },
  updated() {},
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
    fontSizeStr() {
      return this.fontSize + "" + this.unit;
    },
    boxWidthStr() {
      return this.width + "" + this.unit;
    },
    boxHeightStr() {
      if (!this.height) {
        this.height = (this.fontSize * 132) / 100;
      } else if (this.defaultHeight) {
        this.height = this.defaultHeight;
      }

      return this.height + "" + this.unit;
    },
    textTransform() {
      let tt = this.fontSize * 1.06;

      if (this.textHeight < this.height && this.textHeight != 0) {
        console.log("计算", this.height, this.textHeight);
        tt += (this.height - this.textHeight) / 2;
      }

      if (this.unit == "pt") {
        tt = (tt * 4) / 3;
      }

      return tt;
    },
    lineNum() {
      let fontp = ``;
      let textLong = this.width - this.fontSize;
      let lineHeight = (this.fontSize * 137) / 100;

      if (this.unit == "pt") {
        lineHeight = (lineHeight * 4) / 3;
        textLong = (textLong * 4) / 3;
      }

      for (let index = 0; index < 1000; index++) {
        fontp += `M0 ${lineHeight * index} L${textLong} ${lineHeight * index} `;
      }
      return fontp;
    },
    
  },
  watch: {
    defaultWidth: {
      handler() {
        this.width = this.defaultWidth;
      },
      immediate: true,
    },
    defaultHeight: {
      handler() {
        this.height = this.defaultHeight;
      },
      immediate: true,
    },
  },
  methods:{
    onlyV() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  }
};
</script>

<style>
</style>
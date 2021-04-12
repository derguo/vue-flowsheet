<template>
  <div
    class="flow-block"
    :style="style"
    @mouseenter="mouseEnter($event)"
    @mouseleave="mouseLeave($event)"
  >
    <div
      class="linkEnd"
      @mouseup="slotMouseUp($event, 0)"
      @mousedown="slotBreak($event)"
    ></div>
    <div class="blockText" :title="datas.text">{{ datas.text }}</div>
    <div class="linkStart" @mousedown="slotMouseDown($event, 1)"></div>
    <div
      class="blockCloseButton"
      @click="closeBlock($event)"
      v-show="blockCloseButtonShow"
      title="删除节点"
    >
      x
    </div>
  </div>
</template>

<script>
export default {
  name: "FlowBlock",
  props: {
    id: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === "number";
      },
    },
    x: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === "number";
      },
    },
    y: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === "number";
      },
    },
    height: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === "number";
      },
    },
    width: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === "number";
      },
    },
    datas: {
      type: Object,
      default: function () {
        return { text: "新建模块" };
      },
    },
  },
  data() {
    return {
      blockCloseButtonShow: false,
      hasDragged: false,
    };
  },
  created() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.linking = false;
    this.dragging = false;

    this.inGroup = false;

    if (this.$parent.$vnode.tag.indexOf("FlowBlockGroup") >= 0) {
      this.inGroup = true;
    }
  },
  mounted() {
    if (!this.inGroup) {
      document.documentElement.addEventListener(
        "mousemove",
        this.handleMove,
        true
      );
      document.documentElement.addEventListener(
        "mousedown",
        this.handleDown,
        true
      );
      document.documentElement.addEventListener("mouseup", this.handleUp, true);
    }
  },
  beforeDestroy() {
    if (!this.inGroup) {
      document.documentElement.removeEventListener(
        "mousemove",
        this.handleMove,
        true
      );
      document.documentElement.removeEventListener(
        "mousedown",
        this.handleDown,
        true
      );
      document.documentElement.removeEventListener(
        "mouseup",
        this.handleUp,
        true
      );
    }
  },
  computed: {
    style() {
      return this.inGroup
        ? {
            position: "relative",
            height: this.height + "px",
            width: this.width + "px",
            lineHeight: this.height + "px",
            cursor: "default",
          }
        : {
            top: this.y + "px",
            left: this.x + "px",
            height: this.height + "px",
            width: this.width + "px",
            lineHeight: this.height + "px",
          };
    },
  },
  methods: {
    handleMove(e) {
      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

      if (this.dragging && !this.linking) {
        let diffX = this.mouseX - this.lastMouseX;
        let diffY = this.mouseY - this.lastMouseY;

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;

        this.moveWithDiff(diffX, diffY);

        this.hasDragged = true;
      }
    },
    handleDown(e) {
      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;

      const target = e.target || e.srcElement;
      if (this.$el.contains(target) && e.which === 1) {
        this.dragging = true;

        this.$emit("select");

        if (e.preventDefault) e.preventDefault();
      }
    },
    handleUp() {
      if (this.dragging) {
        this.dragging = false;

        if (this.hasDragged) {
          this.save();
          this.hasDragged = false;
        }
      }

      if (this.linking) {
        this.linking = false;
      }
    },
    moveWithDiff(diffX, diffY) {
      let left = this.x + diffX; // / this.options.scale;
      let top = this.y + diffY; // / this.options.scale;

      this.$emit("update:x", left);
      this.$emit("update:y", top);
    },
    save() {
      this.$emit("update");
    },

    slotMouseDown(e, dot) {
      this.linking = true;

      this.$emit("linkingStart", dot);
      if (e.preventDefault) e.preventDefault();
    },
    slotMouseUp(e, dot) {
      this.$emit("linkingStop", dot);
      if (e.preventDefault) e.preventDefault();
    },
    slotBreak(e) {
      this.linking = true;

      this.$emit("linkingBreak");
      if (e.preventDefault) e.preventDefault();
    },

    closeBlock(e) {
      this.$emit("close", this.id);
      if (e.preventDefault) e.preventDefault();
    },

    mouseEnter() {
      this.blockCloseButtonShow = true;
      this.$emit("mouseEnterBlock", this.id);
    },
    mouseLeave() {
      this.blockCloseButtonShow = false;
    },
  },
};
</script>
<style>
.flow-block {
  position: absolute;
  padding: 0px 7px;
  background-color: white;
}
.flow-block:hover {
  cursor: move;
  background-color: rgb(253, 231, 211);
}
.flow-block .blockText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: left;
}
.linkEnd,
.linkStart {
  position: absolute;
  height: 100%;
  width: 10px;
  top: 0;
}
.linkEnd:hover,
.linkStart:hover {
  background-color: rgb(1, 219, 110);
  cursor: crosshair;
}
.linkEnd {
  left: 0;
}
.linkStart {
  right: 0;
}
.blockCloseButton {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  color: white;
  font-size: 6px;
  line-height: 10px;
  cursor: pointer;
  right: -5px;
  top: -5px;
}
</style>
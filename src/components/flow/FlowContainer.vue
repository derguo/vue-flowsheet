<template>
  <div class="flow_container">
    <template v-for="block in blocks">
      <flow-block
        v-if="!(block.children && block.children.length)"
        v-bind.sync="block"
        :key="block.id + '1'"
        @linkingStart="linkingStart(block, $event)"
        @linkingStop="linkingStop(block, $event)"
        @mouseEnterBlock="$emit('mouseEnterBlock', $event)"
      ></flow-block>
      <FlowBlockGroup
        v-if="block.children && block.children.length"
        v-bind.sync="block"
      >
        <flow-block
          v-for="blockitem in block.children"
          v-bind.sync="blockitem"
          :key="blockitem.id"
          @linkingStart="linkingStart(blockitem, $event)"
          @linkingStop="linkingStop(blockitem, $event)"
          @mouseEnterBlock="$emit('mouseEnterBlock', $event)"
        ></flow-block>
      </FlowBlockGroup>
    </template>

    <FlowLink
      :lines="lines"
      :outline="true"
      @chooseLine="linkChoosed($event)"
    />
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import FlowBlock from "./FlowBlock";
import FlowBlockGroup from "./FlowBlockGroup";
import FlowLink from "./FlowLink";
import mouseHelper from "./helpers/mouse";

export default {
  name: "FlowContainer",
  components: { FlowBlock, FlowBlockGroup, FlowLink },
  props: {
    scene: {
      type: Object,
      default: function () {
        return { blocks: [], links: [], container: {} };
      },
    },
  },
  data() {
    return {
      blocks: [],
      links: [],
      container: {},
      tempLink: null,
      mouseX: 0,
      mouseY: 0,
      lastMouseX: 0,
      lastMouseY: 0,
      scale: 1,
      chooseLine: null,
    };
  },
  created() {
    this.blocks = cloneDeep(this.scene.blocks);
    this.links = cloneDeep(this.scene.links);
    this.container = cloneDeep(this.scene.container);
  },
  mounted() {
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
    document.documentElement.addEventListener("wheel", this.handleWheel, true);

    document.documentElement.addEventListener(
      "keydown",
      this.handleKeyboard,
      true
    );

    // this.centerX = this.$el.clientWidth / 2;
    // this.centerY = this.$el.clientHeight / 2;

    // this.importBlocksContent();
    // this.importScene();
  },
  beforeDestroy() {
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
    document.documentElement.removeEventListener(
      "wheel",
      this.handleWheel,
      true
    );
  },
  methods: {
    handleMove(e) {
      let mouse = mouseHelper.getMousePosition(this.$el, e);
      this.mouseX = mouse.x;
      this.mouseY = mouse.y;

      if (this.dragging) {
        let diffX = this.mouseX - this.lastMouseX;
        let diffY = this.mouseY - this.lastMouseY;

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;

        this.centerX += diffX;
        this.centerY += diffY;

        this.hasDragged = true;
      }

      if (this.linking && this.linkStartData) {
        let linkStartPos = this.getConnectionPos(
          this.linkStartData.block,
          this.linkStartData.lineDot
        );
        this.tempLink = {
          x1: linkStartPos.x,
          y1: linkStartPos.y,
          x2: this.mouseX,
          y2: this.mouseY,
        };
      }
    },
    handleDown(e) {
      const target = e.target || e.srcElement;
      if (
        (target === this.$el || target.matches("svg, svg *")) &&
        e.which === 1
      ) {
        this.dragging = true;

        let mouse = mouseHelper.getMousePosition(this.$el, e);
        this.mouseX = mouse.x;
        this.mouseY = mouse.y;

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;

        if (e.preventDefault) e.preventDefault();
      }
    },
    handleUp(e) {
      const target = e.target || e.srcElement;

      if (this.dragging) {
        this.dragging = false;

        if (this.hasDragged) {
          this.updateScene();
          this.hasDragged = false;
        }
      }

      if (this.$el.contains(target) && !(target.className === "linkEnd")) {
        this.linking = false;
        this.tempLink = null;
        this.linkStartData = null;
      }
    },
    handleWheel(e) {
      // const target = e.target || e.srcElement;
      // if (this.$el.contains(target)) {
      //   if (e.preventDefault) e.preventDefault();
      //   let deltaScale = Math.pow(1.1, e.deltaY * -0.01);
      //   this.scale *= deltaScale;
      //   if (this.scale < this.minScale) {
      //     this.scale = this.minScale;
      //     return;
      //   } else if (this.scale > this.maxScale) {
      //     this.scale = this.maxScale;
      //     return;
      //   }
      //   let zoomingCenter = {
      //     x: this.mouseX,
      //     y: this.mouseY,
      //   };
      //   let deltaOffsetX = (zoomingCenter.x - this.centerX) * (deltaScale - 1);
      //   let deltaOffsetY = (zoomingCenter.y - this.centerY) * (deltaScale - 1);
      //   this.centerX -= deltaOffsetX;
      //   this.centerY -= deltaOffsetY;
      //   this.updateScene();
      // }
    },
    handleKeyboard(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];

      if (e && e.keyCode == 46) {
        if (this.chooseLine !== null) {
          this.links = this.links.filter((val) => {
            return !(
              val.start === this.chooseLine.start &&
              val.end === this.chooseLine.end
            );
          });
          this.chooseLine = null;
          this.updateScene();
        }
      }
    },

    getConnectionPos(block, lineDot) {
      let dot = null;
      switch (lineDot) {
        case 0:
          dot = { x: block.x, y: block.y + block.height / 2 };
          break;
        case 1:
          dot = { x: block.x + block.width, y: block.y + block.height / 2 };
          break;
        case 2:
          dot = { x: block.x + block.width / 2, y: block.y };
          break;
        case 3:
          dot = { x: block.x + block.width / 2, y: block.y + block.height };
          break;
      }
      return dot; //{ x: block.x + block.width, y: block.y + block.height / 2 };
    },

    linkingStart(block, lineDot) {
      this.linkStartData = { block, lineDot };
      let linkStartPos = this.getConnectionPos(
        this.linkStartData.block,
        this.linkStartData.lineDot
      );
      this.tempLink = {
        x1: linkStartPos.x,
        y1: linkStartPos.y,
        x2: this.mouseX,
        y2: this.mouseY,
      };
      this.linking = true;
    },
    linkingStop(targetBlock, lineDot) {
      if (this.linkStartData && targetBlock) {
        this.links = this.links.filter((value) => {
          return !(
            value.start === this.linkStartData.block.id &&
            value.end === targetBlock.id
          );
        });
        // skip if looping
        if (this.linkStartData.block.id !== targetBlock.id) {
          this.links.push({
            start: this.linkStartData.block.id,
            end: targetBlock.id,
            themeColor: "#F85",
          });
          this.updateScene();
        }
      }

      this.linking = false;
      this.tempLink = null;
      this.linkStartData = null;
    },
    linkChoosed(e) {
      this.chooseLine = e;
    },

    exportScene() {
      return {
        blocks: this.blocks,
        links: this.links,
        container: this.container,
      };
    },
    updateScene() {
      this.$emit("update:scene", this.exportScene());
    },

    findBlockById(bs, blockId) {
      let r = null;
      for (let item of bs) {
        if (item.children && item.children.length) {
          r = this.findBlockById(item.children, blockId);
          if (r) {
            break;
          }
        } else if (item.id == blockId) {
          r = item;
          break;
        }
      }
      return r;
    },
  },
  computed: {
    lines() {
      let lines = [
        ...this.links.map((val) => {
          let startBlock = this.findBlockById(this.blocks, val.start);
          let endBlock = this.findBlockById(this.blocks, val.end);
          let startDot = null;
          let endDot = null;
          if (startBlock && endBlock) {
            startDot = this.getConnectionPos(startBlock, 1);
            endDot = this.getConnectionPos(endBlock, 0);
          }
          return {
            x1: startDot ? startDot.x : -1,
            y1: startDot ? startDot.y : -1,
            x2: endDot ? endDot.x : -1,
            y2: endDot ? endDot.y : -1,
            start: val.start,
            end: val.end,
            style: {
              stroke: val.themeColor || "#666",
              strokeWidth: 1 * this.scale,
              fill: "none",
            },
          };
        }),
      ];

      if (this.tempLink) {
        this.tempLink.style = {
          stroke: "#8f8f8f",
          strokeWidth: 2 * this.scale,
          fill: "none",
        };

        lines.push(this.tempLink);
      }
      return lines;
    },
    groups() {
      return this.blocks.filter((val) => {
        return val.children && val.children.length;
      });
    },
  },
  watch: {
    "scene.links": {
      handler(val) {
        this.links = cloneDeep(val);
      },
      deep: false,
    },
  },
};
</script>

<style scoped>
.flow_container {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
</style>
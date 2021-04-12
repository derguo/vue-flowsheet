<template>
  <ul class="flow-default-blocks">
    <template v-for="(item, i) in defaultBlocksOptions">
      <li
        :key="i"
        draggable="true"
        @dragstart="onDragstart($event, item)"
        @dragend="onDragend($event)"
        @dragover="onDragover($event)"
        @drop="onDrop($event)"
      >
        {{ item.datas.text }}
      </li>
    </template>
    <li style="height:50px;background-color: #ccc;"><icon-svg name="sql" class="site-sidebar__menu-icon"></icon-svg></li>
  </ul>
</template>

<script>
import mouseHelper from "./helpers/mouse";
import cloneDeep from "lodash/cloneDeep";

export default {
  inject: ["defaultBlocksOptions"],
  methods: {
    onDragstart(event, data) {
      let target = event.target || event.srcElement;

      let mouse = mouseHelper.getMousePosition(target, event);
      data = cloneDeep(data);
      data.x = mouse.x;
      data.y = mouse.y;

      console.log("开始拖拽", data);
      this.$emit("dragBlock", data);
    },
    onDragend() {},
    onDragover(e) {
      if (e.preventDefault) e.preventDefault();
    },
    onDrop() {},
  },
  name: "FlowDefaultBlocks",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.flow-default-blocks {
    width: 120px;
}
.flow-default-blocks li {
  float: left;
  cursor: pointer;
  height: 20px;
  width: 120px;
  font-size: 12px;
  text-align: left;
}
</style>
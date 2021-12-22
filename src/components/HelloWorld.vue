<template>
  <div
    class=""
    style="background-color: rgb(245, 247, 249); padding-bottom: 22px"
  >
    <!-- <flow-container
      ref="flow"
      id="flow"
      :scene.sync="scene"
      @mouseEnterBlock="mouseEnterBlock($event)"
      :defaultBlocks="defaultBlocks"
    ></flow-container> -->

  </div>
</template>

<script>
import FlowContainer from "./flow/FlowContainer";
export default {
  name: "HelloWorld",
  props: {
    msg: Object,
  },
  components: {
    FlowContainer,
  },
  mounted() {
    // console.log(this.$slots);
  },
  data() {
    return {
      defaultBlocks: [
        { icon: "a", datas: { text: "这是一个数据" } },
        { icon: "a", datas: { text: "这是一个校验" } },
      ],
      scene: {
        blocks: [
          {
            x: 10,
            y: 170,
            datas: { title: "表中文名/tableName" },
            themeColor: "#87481f",
            children: [
              {
                id: 11,
                x: 300,
                y: 100,
                width: 120,
                height: 20,
                datas: { text: "test Text test Text" },
              },
              {
                id: 12,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
            ],
          },
          {
            x: 330,
            y: 130,
            datas: { title: "表中文名/tableName" },
            themeColor: "#176833",
            children: [
              {
                id: 21,
                x: 300,
                y: 100,
                width: 120,
                height: 20,
                datas: { text: "test Text test Text" },
              },
              {
                id: 22,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
            ],
          },
          {
            x: 330,
            y: 230,
            datas: { title: "表中文名/tableName" },
            themeColor: "#661199",
            children: [
              {
                id: 31,
                x: 300,
                y: 100,
                width: 120,
                height: 20,
                datas: { text: "test Text test Text" },
              },
              {
                id: 32,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
              {
                id: 33,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
            ],
          },
          {
            x: 630,
            y: 230,
            datas: { title: "表中文名/tableName" },
            themeColor: "#667799",
            children: [
              {
                id: 51,
                x: 300,
                y: 100,
                width: 120,
                height: 20,
                datas: { text: "test Text test Text" },
              },
              {
                id: 52,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
              {
                id: 53,
                x: 10,
                y: 10,
                width: 120,
                height: 20,
                datas: { text: "test Text test Texttest Text test Text" },
              },
            ],
          },
          {
            id: 1,
            x: 300,
            y: 100,
            width: 120,
            height: 20,
            datas: { text: "test Text test Text" },
          },
          {
            id: 2,
            x: 10,
            y: 10,
            width: 120,
            height: 20,
            datas: { text: "test Text test Texttest Text test Text" },
          },
        ],
        links: [
          {
            start: 11,
            end: 22,
            themeColor: "#F85",
          },
          {
            start: 11,
            end: 21,
            themeColor: "#F85",
          },
          {
            start: 12,
            end: 21,
            themeColor: "#F85",
          },
          {
            start: 12,
            end: 31,
            themeColor: "#F85",
          },
          {
            start: 12,
            end: 32,
            themeColor: "#F85",
          },
          {
            start: 12,
            end: 33,
            themeColor: "#F85",
          },
          {
            start: 32,
            end: 52,
            themeColor: "#F85",
          },
          {
            start: 33,
            end: 52,
            themeColor: "#F85",
          },
          {
            start: 22,
            end: 52,
            themeColor: "#F85",
          },
        ],
        container: {
          centerX: 0,
          centerY: 0,
          scale: 1,
        },
      },
    };
  },
  methods: {
    mouseEnterBlock(e) {
      for (let link of this.scene.links) {
        link.themeColor = "#F85";
        if (link.start === e || link.end === e) {
          link.themeColor = "#f00";
        }
      }

      // this.scene.links = cloneDeep(this.scene.links);
    },
    changeTest() {
      this.msg.text = { test: 1 };
    },
    
  },
  watch: {
    msg: {
      deep: true,
      handler(val) {
        console.log("msg 变化");
        this.$emit("update:msg", val);
      },
    },
  },
  computed: {
    text() {
      return this.msg.text;
    },
    shuju() {
      return this.msg.data;
    },
    tableWidther() {
      return this.blwz(this.wstitle) || [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scene {
  position: absolute;
  top: 0;
  right: 0;
  left: 100px;
  bottom: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  position: relative;
  height: 100%;
}
</style>

<template>
  <div
    class=""
    style="background-color: rgb(245, 247, 249); padding-bottom: 22px"
  >
    <button @click="printflow">print</button>
    <!-- <flow-container
      ref="flow"
      id="flow"
      :scene.sync="scene"
      @mouseEnterBlock="mouseEnterBlock($event)"
      :defaultBlocks="defaultBlocks"
    ></flow-container> -->
    <svg-paper ref="table" :size="'a4'">
      <svg-table>
        <!-- <svg-thead>
          <svg-th>
            我 先往上去，然后往下去，然后再往上去，漂亮吧！我aaaaaa dddddd
            eeeeeee sdf asd fa sdf
            先往上去，然后往下去，然后再往上去，漂亮吧！我先往上去，然后往下去，然后再往上去，漂亮吧！我先往上去，然后往下去，然后再往上去，漂亮吧！
            我 先往上去，然后往下去，然后再往上去，漂亮吧！我aaaaaa dddddd
            eeeeeee sdf asd fa sdf
            先往上去，然后往下去，然后再往上去，漂亮吧！我先往上去，然后往下去，然后再往上去，漂亮吧！我先往上去，然后往下去，然后再往上去，漂亮吧！
          </svg-th>
        </svg-thead> -->
        <svg-tr
          v-for="(data, index) in [
            ...wsdata,
            ...wsdata,
            ...wsdata,
            ...wsdata,
            ...wsdata,
            ...wsdata,
            ...wsdata,
            ...wsdata,
          ]"
          :key="index"
        >
          <svg-td>
            vue组件递归
            刚才写了篇《element多层导航菜单》文章,顺便也写写其中核心原理
            其实没啥好说就是组件递归,这里呢简单写个例子,
            面试被问到的时候直接拿来手写代
          </svg-td>
          <svg-td>
            它不会报错,这个应该是被vue优化了。
            思想:递归调用某个组件,而这个组件的作用就是解析出此层的数据。因此数据的格式就有技巧:
          </svg-td>
          <svg-td>
            它不会报错,这个应该是被vue优化了。
            思想:递归调用某个组件,而这个组件的作用就是解析出此层的数据。因此数据的格式就有技巧:
          </svg-td>
          <svg-td>
            该是被vue优化了。
            思想:递归调用某个组件,而这个组件的作用就是解析出此层的数据。因此数据的格式就有技巧:
          </svg-td>
          <svg-td>
            ue优化了。
            思想:递归调用某个组件,而这个组件的作用就是解析出此层的数据。因此数据的格式就有技巧:
          </svg-td>
          <svg-td>
            某个组件,而这个组件的作用就是解析出此层的数据。因此数据的格式就有技巧:
          </svg-td>
          <svg-td> 数据的格式就有技巧: </svg-td>
        </svg-tr>
      </svg-table>
    </svg-paper>
  </div>
</template>

<script>
import FlowContainer from "./flow/FlowContainer";
import cloneDeep from "lodash/cloneDeep";
import svgTable from "./svgtable/svgTable";
import SvgTr from "./svgtable/svgTr";
import svgThead from "./svgtable/svgThead";
import svgTh from "./svgtable/svgTh";
import svgTd from "./svgtable/svgTd";
import svgPaper from "./svgPaper/svgPaper";
export default {
  name: "HelloWorld",
  props: {
    msg: Object,
  },
  components: {
    FlowContainer,
    svgTable,
    SvgTr,
    svgThead,
    svgTh,
    svgTd,
    svgPaper,
  },
  mounted() {
    console.log(this.$slots);
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
      wsdata: [
        {
          czid: "10001",
          data: [
            {
              info: "2021-12-01 09:46",
              fzid: "",
              tsys: "1",
              index: 1,
            },
            {
              info: "第一条数据",
              fzid: "1",
              tsys: "1",
              index: 2,
            },
            {
              info: "11",
              fzid: "1",
              tsys: "1",
              index: 3,
            },
            {
              info: "11",
              fzid: "1",
              tsys: "1",
              index: 4,
            },
            {
              info: "患者男性大段文字省略.......",
              fzid: "2",
              tsys: "1",
              index: 9,
            },
            {
              info: "管XX",
              fzid: "3",
              tsys: "1",
              index: 10,
            },
          ],
        },
        {
          czid: "10001",
          data: [
            {
              info: "第二条数据",
              fzid: "1",
              tsys: "1",
              index: 2,
            },
            {
              info: "22",
              fzid: "1",
              tsys: "1",
              index: 3,
            },
            {
              info: "22",
              fzid: "1",
              tsys: "1",
              index: 4,
            },
          ],
        },
        {
          czid: "10001",
          data: [
            {
              info: "第三条数据",
              fzid: "1",
              tsys: "1",
              index: 2,
            },
            {
              info: "33",
              fzid: "1",
              tsys: "1",
              index: 3,
            },
            {
              info: "33",
              fzid: "1",
              tsys: "1",
              index: 4,
            },
          ],
        },
        {
          czid: "10002",
          data: [
            {
              info: "2021-12-01 09:46",
              fzid: "",
              tsys: "1",
              index: 1,
            },
            {
              info: "第四条数据",
              fzid: "1",
              tsys: "1",
              index: 2,
            },
            {
              info: "44",
              fzid: "1",
              tsys: "1",
              index: 3,
            },
            {
              info: "44",
              fzid: "1",
              tsys: "1",
              index: 4,
            },
            {
              info: "管理员",
              fzid: "2",
              tsys: "1",
              index: 10,
            },
          ],
        },
      ],
      wstitle: [
        {
          info: "时间",
          width: 100,
          height: 70,
          son: [],
        },
        {
          info: "普通评估",
          width: 300,
          height: 30,
          son: [
            {
              info: "普通工具",
              width: 30,
              height: 40,
              son: [],
            },
            {
              info: "疼痛评分",
              width: 30,
              height: 40,
              son: [],
            },
            {
              info: "疼痛性质",
              width: 30,
              height: 40,
              son: [],
            },
            {
              info: "疼痛部位",
              width: 80,
              height: 40,
              son: [],
            },
            {
              info: "疼痛频率(24H)",
              width: 45,
              height: 40,
              son: [],
            },
            {
              info: "持续痛",
              width: 35,
              height: 40,
              son: [],
            },
            {
              info: "间歇痛",
              width: 35,
              height: 40,
              son: [],
            },
          ],
        },
        {
          info: "简明麦吉尔疼痛问卷",
          width: 90,
          height: 30,
          son: [
            {
              info: "总分PRI(A+B)+PPI",
              width: 90,
              height: 40,
              son: [],
            },
          ],
        },
        {
          info: "用药",
          width: 210,
          height: 30,
          son: [
            {
              info: "时间",
              width: 60,
              height: 40,
              son: [],
            },
            {
              info: "药物/剂量",
              width: 110,
              height: 40,
              son: [],
            },
            {
              info: "途径",
              width: 40,
              height: 40,
              son: [],
            },
          ],
        },
        {
          info: "护理处理措施",
          width: 40,
          height: 70,
          son: [],
        },
        {
          info: "效果评价",
          width: 90,
          height: 30,
          son: [
            {
              info: "评价时间",
              width: 60,
              height: 40,
              son: [],
            },
            {
              info: "疼痛评分",
              width: 30,
              height: 40,
              son: [],
            },
          ],
        },
        {
          info: "签名",
          width: 35,
          height: 70,
          son: [],
        },
      ],
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
    printflow() {
      // var strHTML = document.getElementsByTagName("html")[0].innerHTML;
      // var strHTML = this.$refs.flow._self.$el.innerHTML;
      var strHTML = this.$refs.table.$el.innerHTML;
      console.log(this.$refs.table, strHTML);

      LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", strHTML);
      LODOP.PREVIEW();
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

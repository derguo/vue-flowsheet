<template>
  <div
    class=""
    style="background-color: rgb(245, 247, 249); padding-bottom: 22px"
  >
    <button @click="printflow">print</button>
    <svg-paper ref="table" :size="'a4h'">
      <svg-title></svg-title>
      <svg-table>
        <svg-tr>
          <svg-th
            v-for="(item, index) in wstitle"
            :key="index + '' + item.info"
            :thData="item"
          >
            {{ item.info }}
          </svg-th>
        </svg-tr>
        <svg-tr
          v-for="(data, index) in new Array(29)"
          :key="index"
          :cutLine="index == 10"
        >
          <svg-td v-for="(tdwidth, i) in tableWidther" :key="'td' + i">
            {{ showData(index, i) }}
          </svg-td>
        </svg-tr>
      </svg-table>
      <svg-header>
        <svg-formitem
          v-for="(item, index) in wsheader"
          :key="index + 'header'"
          :defaultRelativeX="parseInt(item.x)"
          :defaultRelativeY="parseInt(item.y)"
          :label="item.name"
          >{{item.name}}</svg-formitem
        >
      </svg-header>
      <svg-content></svg-content>
      <svg-pager></svg-pager>
      <svg-footer></svg-footer>
    </svg-paper>
  </div>
</template>

<script>
import svgTable from "./svgPrint/svgtable/svgTable";
import SvgTr from "./svgPrint/svgtable/svgTr";
import svgThead from "./svgPrint/svgtable/svgThead";
import svgTh from "./svgPrint/svgtable/svgTh";
import svgTd from "./svgPrint/svgtable/svgTd";
import svgPaper from "./svgPrint/svgPaper/svgPaper";
import svgTitle from "./svgPrint/svgPaper/svgTitle";
import svgHeader from "./svgPrint/svgPaper/svgHeader";
import svgContent from "./svgPrint/svgPaper/svgContent";
import svgPager from "./svgPrint/svgPaper/svgPager";
import svgFooter from "./svgPrint/svgPaper/svgFooter";
import svgFormitem from "./svgPrint/svgForm/svgFormitem";
export default {
  name: "svgDocument",
  components: {
    svgTable,
    SvgTr,
    svgThead,
    svgTh,
    svgTd,
    svgPaper,
    svgTitle,
    svgHeader,
    svgContent,
    svgPager,
    svgFooter,
    svgFormitem,
  },
  mounted() {
    // console.log(this.$slots);
  },
  data() {
    return {
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
              info: "患者男性大段文字省略患者男性大段文字省略患者男性大段文字省略患者男性大段文字省略患者男性大段文字省略患者男性大段文字省略",
              fzid: "2",
              tsys: "1",
              index: 9,
            },
            {
              info: "管XX",
              fzid: "3",
              tsys: "1",
              index: 16,
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
              index: 16,
            },
          ],
        },
      ],
      wstitle: [
        {
          info: "观察项目",
          width: "194",
          height: "20",
          son: [
            {
              info: "箱温℃",
              width: "22",
              height: "55",
              son: [],
            },
            {
              info: "体温℃",
              width: "22",
              height: "55",
              son: [],
            },
            {
              info: "心率次/分",
              width: "25",
              height: "55",
              son: [],
            },
            {
              info: "呼吸次/分",
              width: "25",
              height: "55",
              son: [],
            },
            {
              info: "氧饱和度%",
              width: "25",
              height: "55",
              son: [],
            },
            {
              info: "血压",
              width: "30",
              height: "55",
              son: [],
            },
            {
              info: "皮肤颜色",
              width: "15",
              height: "55",
              son: [],
            },
            {
              info: "末梢循环",
              width: "15",
              height: "55",
              son: [],
            },
            {
              info: "大便性质",
              width: "15",
              height: "55",
              son: [],
            },
          ],
        },
        {
          info: "入量(ml)",
          width: "275",
          height: "20",
          son: [
            {
              info: "用药",
              width: "200",
              height: "20",
              son: [
                {
                  info: "药物名称、剂量、速度",
                  width: "140",
                  height: "35",
                  son: [],
                },
                {
                  info: "备入量",
                  width: "30",
                  height: "35",
                  son: [],
                },
                {
                  info: "实入量",
                  width: "30",
                  height: "35",
                  son: [],
                },
              ],
            },
            {
              info: "鼻饲",
              width: "15",
              height: "55",
              son: [],
            },
            {
              info: "母乳",
              width: "20",
              height: "55",
              son: [],
            },
            {
              info: "水",
              width: "20",
              height: "55",
              son: [],
            },
            {
              info: "配方奶",
              width: "20",
              height: "55",
              son: [],
            },
          ],
        },
        {
          info: "出量(ml)",
          width: "110",
          height: "20",
          son: [
            {
              info: "大便",
              width: "35",
              height: "20",
              son: [
                {
                  info: "量",
                  width: "20",
                  height: "35",
                  son: [],
                },
                {
                  info: "次",
                  width: "15",
                  height: "35",
                  son: [],
                },
              ],
            },
            {
              info: "小便",
              width: "35",
              height: "20",
              son: [
                {
                  info: "量",
                  width: "20",
                  height: "35",
                  son: [],
                },
                {
                  info: "次",
                  width: "15",
                  height: "35",
                  son: [],
                },
              ],
            },
            {
              info: "痰液",
              width: "20",
              height: "55",
              son: [],
            },
            {
              info: "其它",
              width: "20",
              height: "55",
              son: [],
            },
          ],
        },
        {
          info: "护理记录",
          width: "125",
          height: "75",
          son: [],
        },
        {
          info: "签名",
          width: "40",
          height: "75",
          son: [],
        },
      ],
      wsheader: [
        {
          name: "姓名",
          width: "0",
          height: "0",
          y: "0",
          x: "22",
        },
        {
          name: "性别",
          width: "0",
          height: "0",
          y: "0",
          x: "126",
        },
        {
          name: "年龄",
          width: "0",
          height: "0",
          y: "0",
          x: "193",
        },
        {
          name: "床号",
          width: "0",
          height: "0",
          y: "0",
          x: "263",
        },
        {
          name: "住院号",
          width: "0",
          height: "0",
          y: "0",
          x: "331",
        },
        {
          name: "病区",
          width: "0",
          height: "0",
          y: "0",
          x: "427",
        },
        {
          name: "自定义1",
          width: "100",
          height: "20",
          y: "0",
          x: "525",
        },
        {
          name: "入院诊断",
          width: "0",
          height: "0",
          y: "0",
          x: "633",
        },
      ],
    };
  },
  methods: {
    printflow() {
      // var strHTML = document.getElementsByTagName("html")[0].innerHTML;
      // var strHTML = this.$refs.flow._self.$el.innerHTML;
      var strHTML = this.$refs.table.$el.innerHTML;
      console.log(this.$refs.table, strHTML);

      LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", strHTML);
      LODOP.PREVIEW();
    },
    blwz(titles = []) {
      let r = [];
      for (const iterator of titles) {
        if (!iterator.son.length) {
          r.push(iterator.width);
        } else {
          r = [...r, ...this.blwz(iterator.son)];
        }
      }
      return r;
    },
    showData(index, i) {
      let r = "";
      if (this.wsdata[index] && this.wsdata[index].data) {
        for (const iterator of this.wsdata[index].data) {
          if (iterator.index == i + 1) r = iterator.info;
        }
      }
      return r;
    },
  },
  computed: {
    tableWidther() {
      return this.blwz(this.wstitle) || [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

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
      <svg-header></svg-header>
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
              width: 35,
              height: 40,
              son: [],
            },
            {
              info: "疼痛评分",
              width: 35,
              height: 40,
              son: [],
            },
            {
              info: "疼痛性质",
              width: 35,
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

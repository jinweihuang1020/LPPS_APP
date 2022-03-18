<template >
  <div v-loading="loading">
    QUERY
    <el-tabs type="border-card">
      <el-tab-pane label="AC平整度">
        <el-select v-model="selectedDateForACFlatQuery" placeholder="選擇測試日期" no-data-text="沒有數據">
          <el-option v-for="item in acFlatnessDateList" :key="item.id" :label="item.id" :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="QueryACFlatnessData"> 查詢</el-button>
        <el-divider></el-divider>
        <div class="charts-set" v-show="!rendering">
          <div class="title"> 平整度趨勢圖表</div>
          <AreaChart :Options="chartOptions"></AreaChart>
        </div>
        <el-divider></el-divider>
        <div class="table">
          <div class="title"> Tolerance Table</div>
          <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="itemName" label="項目" width="180">
            </el-table-column>
            <el-table-column prop="tolerance" label="Tolerance" width="300">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import AreaChart from "../components/Charts/AreaChart.vue";
export default {
  components: { AreaChart },
  data() {
    return {
      loading: true,
      rendering: false,
      active: "tab-container1",
      acFlatnessDateList: [],
      selectedDateForACFlatQuery: null,
      lastselectedDateForACFlatQuery: null,
      acFlatnessDataResponse: {},
      queryOutData: {},
      chartOptions: {
        series: [
          {
            name: "s1",
            data: [1, -1, 1, -1],
          },
        ],
        xlabels: [1, 2, 3, 4],
      },
      tableData: [],
    };
  },
  methods: {
    async GetACFlatnessDataListRequest() {
      if (this.$APPSettings.QueryFromLocalStorageFirst) {
        var local = localStorage.getItem("acFlatnessDateList");
        if (local != null) {
          this.acFlatnessDateList = JSON.parse(local);
          console.log("restore data from localStorage");
        } else {
          this.FetchDataFormCloud();
        }
      } else {
        this.FetchDataFormCloud();
      }

      this.loading = false;
    },
    async FetchDataFormCloud() {
      this.acFlatnessDateList = await this.$FireStore.FetchACFlatData();
      localStorage.setItem(
        "acFlatnessDateList",
        JSON.stringify(this.acFlatnessDateList)
      );
    },
    QueryACFlatnessData() {
      if (this.selectedDateForACFlatQuery == null) return;
      if (
        this.selectedDateForACFlatQuery == this.lastselectedDateForACFlatQuery
      )
        return;
      this.lastselectedDateForACFlatQuery = this.selectedDateForACFlatQuery;
      this.queryOutData = this.acFlatnessDateList.find(
        (i) => i.id == this.selectedDateForACFlatQuery
      ).data;
      this.RenderFlatnessData();
    },
    RenderFlatnessData() {
      this.rendering = true;
      console.log(this.queryOutData);
      this.ChartRender();
      this.TableRender();
      this.rendering = false;
    },
    ChartRender() {
      let ptNum = this.queryOutData.ILSensorValOFBeginData.length;
      this.chartOptions.series = [];
      this.chartOptions.xlabels = this.CreateXlabes(ptNum);
      this.chartOptions.series.push({
        name: "前值量測",
        data: this.queryOutData.ILSensorValOFBeginData,
      });
      var ind = 0;
      this.queryOutData.ILSensorValListOfAfter72HrsPurge.forEach((element) => {
        ind++;
        this.chartOptions.series.push({
          name: "After72HrsPurge-" + ind,
          data: element,
        });
      });
    },
    CreateXlabes(number) {
      let lables = [];
      for (let index = 1; index <= number; index++) {
        lables.push(index);
      }
      return lables;
    },
    TableRender() {
      this.tableData = [];
      this.tableData.push({
        itemName: "前值量測",
        tolerance: this.queryOutData.Tolerance_BeginData,
      });
      for (
        let index = 0;
        index < this.queryOutData.Tolerances_After72HrsPurgeData.length;
        index++
      ) {
        this.tableData.push({
          itemName: "After72HrsPurge-" + index,
          tolerance: this.queryOutData.Tolerances_After72HrsPurgeData[index],
        });
      }
    },
  },
  async mounted() {
    this.GetACFlatnessDataListRequest();
  },
  created() {
    console.log("監聽");
    this.bus.$on("data-reload", (d) => {
      console.log("reload-data");
      this.GetACFlatnessDataListRequest();
    });
  },
};
</script>

<style>
.title {
  font-size: 25px;
  margin: 10px;
}

.charts-set {
  height: 400px;
}
</style>

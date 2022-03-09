<template>
  <div v-loading="!isRestFinish">
    QUERY
    <el-tabs type="border-card">
      <el-tab-pane label="AC平整度">
        <el-select v-model="selectedDateForACFlatQuery" placeholder="選擇測試日期" no-data-text="沒有數據">
          <el-option v-for="item in acFlatnessDateList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="QueryACFlatnessData"> 查詢</el-button>

      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { QueryRequest, StartQueryResponseListen } from "../api/FirebaseAPI";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      active: "tab-container1",
      isRestFinish: false,
      acFlatnessDateList: [],
      selectedDateForACFlatQuery: null,
      lastselectedDateForACFlatQuery: null,
      acFlatnessDataResponse: {},
    };
  },
  methods: {
    GetACFlatnessDataListRequest(num) {
      let emitKey = "get-ac-flatness-data-list";
      this.bus.$on(emitKey, (d) => {
        if (d.item == emitKey) {
          if (num == 0) {
            this.isRestFinish = true;
            return;
          }
          var DateList = JSON.parse(d.DataJson);
          this.acFlatnessDateList = [];
          DateList.forEach((date) => {
            this.acFlatnessDateList.push({
              value: date,
              label: date,
            });
          });
        }
      });
      StartQueryResponseListen(emitKey);
      QueryRequest(emitKey, {
        num: num,
      });
    },
    QueryACFlatnessData() {
      if (this.selectedDateForACFlatQuery == null) return;
      if (
        this.selectedDateForACFlatQuery == this.lastselectedDateForACFlatQuery
      )
        return;
      this.lastselectedDateForACFlatQuery = this.selectedDateForACFlatQuery;
      Indicator.open({
        text: "查詢中...",
        spinnerType: "fading-circle",
      });
      let emitKey = "query-ac-flatness-data-by-date";
      QueryRequest(emitKey, {
        date: this.selectedDateForACFlatQuery,
      });
    },
  },
  mounted() {
    this.isRestFinish = false;
    this.GetACFlatnessDataListRequest(0);
    let timer = setInterval(() => {
      if (this.isRestFinish) {
        this.GetACFlatnessDataListRequest(10);
        let emitKey = "query-ac-flatness-data-by-date";
        this.bus.$on(emitKey, (res) => {
          if (res.item == emitKey) {
            this.acFlatnessDataResponse = JSON.parse(res.DataJson);
            console.log(emitKey, this.acFlatnessDataResponse);
            Indicator.close();
          }
        });
        StartQueryResponseListen(emitKey);
        clearInterval(timer);
      }
    }, 100);
  },
};
</script>

<style>
</style>

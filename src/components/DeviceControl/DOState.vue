<template>
  <div class="do-state">
    <div class="title-name">
      {{dname}}
    </div>
    <div v-if="type=='light'" class="light-show">
      <img v-if="state" src="../../assets/glowGreen.png" @click="sheetVisible=true" alt="" height="30">
      <img v-else src="../../assets/glowRed.png" @click="sheetVisible=true" height="30">
    </div>
    <div v-else class="value-display">
      <b>{{value}}</b> <span class="value-unit">{{unit}}</span>
    </div>

    <el-drawer :title="dname+'ON/OFF'" :visible.sync="sheetVisible" direction="btt">
      <mt-button size="large" plain type="default" @click="DOControl(true)">ON</mt-button>
      <mt-button size="large" plain type="default" @click="DOControl(false)">OFF</mt-button>
      <mt-button size="large" type="danger" @click="DOControl('cancel')">Cancel</mt-button>
    </el-drawer>

  </div>

</template>

<script>
import { DOStateChange } from "../../api/FirebaseAPI";
export default {
  data() {
    return {
      sheetVisible: false,
    };
  },
  props: {
    dname: String,
    state: Boolean,
    value: Number,
    type: String,
    unit: String,
    index: Number,
  },
  methods: {
    DOControl(state_req) {
      this.sheetVisible = false;
      if (state_req == "cancel") return;
      console.log(`DO${this.index} ${state_req ? "開" : "關"}`);
      DOStateChange(this.index, state_req);
    },
  },
};
</script>

<style>
.do-state {
  margin: 6px;
  font-size: 12pt;
  float: left;
  background-color: rgb(253, 253, 253);
  color: black;
  width: 112px;
  text-align: center;
  height: 60px;
  border-radius: 10px;
  box-shadow: 5px 4pt 8pt 1pt black;
}

.do-state .title-name {
  font-size: 9pt;
  margin: 4px;
  text-decoration: underline;
}

.value-display .value-unit {
  font-size: 12px;
  color: gray;
}
</style>

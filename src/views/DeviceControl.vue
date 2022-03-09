<template>
  <div>
    <Divider text="DO 狀態"> </Divider>
    <div class="block-gb do-states">
      <DoState type="light" :index="1" dname="DO1-Inlet-下盤" :state="ControlBoardData.DOState.DO1"></DoState>
      <DoState type="light" :index="2" dname="DO2-Inlet-上盤" :state="ControlBoardData.DOState.DO2"></DoState>
      <DoState type="light" :index="3" dname="DO3-Outlet" :state="ControlBoardData.DOState.DO3"></DoState>
      <DoState type="light" :index="4" dname="DO4-Vacum" :state="ControlBoardData.DOState.DO4"></DoState>
      <DoState type="light" :index="5" dname="DO5-Curtain" :state="ControlBoardData.DOState.DO5"></DoState>
    </div>
    <Divider text="AI 數值"> </Divider>
    <div class="block-gb do-states ai-values">
      <DoState type="number" dname="AI1-Source" :value="ControlBoardData.AIValue.AI1" unit="KPa"></DoState>
      <DoState type="number" dname="AI2-真空壓" :value="ControlBoardData.AIValue.AI2" unit="KPa"></DoState>
      <DoState type="number" dname="AI3-Inlet-Flow" :value="ControlBoardData.AIValue.AI3" unit="LPM"></DoState>
      <DoState type="number" dname="AI4-Curtain PS" :value="ControlBoardData.AIValue.AI4" unit="KPa"></DoState>
      <DoState type="number" dname="AI5-Curtain Flow" :value="ControlBoardData.AIValue.AI5" unit="LPM"></DoState>
      <DoState type="number" dname="AI6-Inlet N.L.P" :value="ControlBoardData.AIValue.AI6" unit="KPa"></DoState>
      <DoState type="number" dname="AI7-Inlet N.R.P" :value="ControlBoardData.AIValue.AI7" unit="KPa"></DoState>
      <DoState type="number" dname="AI8-Outlet N.L.P" :value="ControlBoardData.AIValue.AI8" unit="KPa"></DoState>
      <DoState type="number" dname="AI9" :value="ControlBoardData.AIValue.AI9" unit="KPa"></DoState>

    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { StartDOStateListen } from "../api/FirebaseAPI";
import Divider from "../components/Divider.vue";
import DoState from "../components/DeviceControl/DOState.vue";
export default {
  components: { Divider, DoState },
  data() {
    return {
      ControlBoardData: {
        AIValue: {},
        DOState: {},
      },
    };
  },
  methods: {
    StartDOStateListen() {
      let key = "DOStateListen";
      this.bus.$on(key, (data) => {
        this.ControlBoardData.AIValue = data.AIValue;
        this.ControlBoardData.DOState = data.DOState;
        console.log(key, this.ControlBoardData);
      });
      StartDOStateListen(key);
    },
  },
  mounted() {
    Indicator.open({
      text: "載入中...",
      spinnerType: "fading-circle",
    });
    setTimeout(() => {
      Indicator.close();
    }, 1000);
    this.StartDOStateListen();
  },
};
</script>

<style>
.do-states {
  height: 150px;
}

.ai-values {
  height: 230px;
}
</style>

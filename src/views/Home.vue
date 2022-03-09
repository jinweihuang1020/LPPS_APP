<template>
  <div class="home">

    <div class="block-gb c-sharp-app-state">
      <div class="img">
        <img v-bind:style="glow" v-if="AppState.IsRunning" alt="Vue logo" src="../assets/glowGreen.png" height="25">
        <img v-bind:style="glow" v-else alt="Vue logo" src="../assets/glowRed.png" height="25">
      </div>
      <div v-bind:style="GetAppStateTextStyle">
        {{AppState.IsRunning?"APP RUNNING":"APP OFFLINE"}}
      </div>
    </div>
    <Divider text="腳本狀態"></Divider>
    <div class="block-gb script-state">
      <el-row class="row" :gutter="20">
        <el-col :span="10">
          運行腳本
        </el-col>
        <el-col :span="14">
          <span style="color:rgb(26, 230,31)">{{ScriptState.RunningScriptName}}</span>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="10">
          狀態
        </el-col>
        <el-col class="val" :span="14">
          {{ScriptState.IsRunning?"Running":"IDLE"}}
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="10">
          開始時間
        </el-col>
        <el-col class="val" :span="14">
          <!-- {{moment(ScriptState.StartTime) }} -->
          {{moment(ScriptState.StartTime).format('yyyy/MM/DD HH:mm:ss')}}
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="10">
          結束時間
        </el-col>
        <el-col class="val" :span="14">
          {{moment(ScriptState.EndTime).format('yyyy/MM/DD HH:mm:ss')}}
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="10">
          執行累積時間
        </el-col>
        <el-col class="val" :span="14">
          {{ScriptState.Period}} 小時
        </el-col>
      </el-row>
    </div>
    <Divider text="Developing..."></Divider>

    <div class="block-gb">
      Developing
    </div>
    <div class="block-gb">
      <br>
      Developing
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Divider from "../components/Divider.vue";
import { Indicator } from "mint-ui";
import {
  GetScriptState,
  StartScriptStateListen,
  StartAPPStateListen,
} from "../api/FirebaseAPI";
export default {
  name: "Home",
  components: {
    HelloWorld,
    Divider,
  },
  data() {
    return {
      glow: {
        boxShadow: "2pt 2pt 12pt 12pt rgba(12,23,122,.5)",
        borderRadius: "25px",
      },
      appStateTextStyle: {
        color: "white",
      },
      ScriptState: {},
      AppState: {
        IsRunning: false,
      },
    };
  },
  computed: {
    GetAppStateTextStyle() {
      return { color: this.AppState.IsRunning ? "white" : "red" };
    },
  },

  methods: {
    GlowAnimation() {
      let index = 0;
      let s = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];
      setInterval(() => {
        index += 1;
        index = index == 12 ? 0 : index;
        this.glow.boxShadow = `0pt 0pt 2pt 2pt rgba(${
          this.AppState.IsRunning ? "83, 255, 94" : "234, 73, 73"
        },${s[index]})`;
      }, 130);
    },
    async GetScriptState() {
      this.ScriptState = await GetScriptState();
      console.log(this.ScriptState);
    },
    StartScriptStateListen() {
      let key = "ScriptStateOnChange";

      this.bus.$on(key, (data) => {
        console.log("rev", data);
        this.ScriptState = data;
      });
      StartScriptStateListen(key);
    },
    StartAPPStateListen() {
      let key = "APPStateOnChange";
      this.bus.$on(key, (data) => {
        if (data == null) return;
        let obj = Object.entries(data);
        if (obj.length == 0) return;
        this.AppState = obj[0][1];
        // console.log(key, this.AppState);
      });
      StartAPPStateListen(key);
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

    this.GetScriptState();
    this.StartScriptStateListen();
    this.StartAPPStateListen();
    this.GlowAnimation();
  },
};
</script>

<style>
.block-gb {
  background-color: rgb(17, 17, 17);
  border-radius: 5px;
  color: white;
  margin: 10px auto;
  text-align: left;
  padding: 10px;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.machine-info {
  font-size: 9px;
  /* background-color: gray; */
}
.machine-info .machine-name {
  float: left;
}

.machine-info div {
  margin-top: -10px;
}

.machine-info .cpu-ram {
  float: right;
}

.script-state .row {
  margin: 8px;
}

.script-state .val {
  font-size: 16px;
  color: whitesmoke;
}

.c-sharp-app-state {
  height: 35pt;
  font-size: 17pt;
  padding: 1px;
}

.c-sharp-app-state div {
  float: left;
  padding: 10px;
}

.c-sharp-app-state .img {
  text-align: left;
}
</style>

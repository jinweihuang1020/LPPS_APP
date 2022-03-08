<template>
  <div class="home">
    <div class="block-gb c-sharp-app-state">
      <div class="img">
        <img v-bind:style="glow" v-if="appAlive" alt="Vue logo" src="../assets/glowGreen.png" height="25">
        <img v-bind:style="glow" v-else alt="Vue logo" src="../assets/glowRed.png" height="25">
      </div>
      <div v-bind:style="GetAppStateTextStyle">
        {{appAlive?"APP RUNNING":"APP OFFLINE"}}
      </div>
    </div>
    <div class="block-gb">
      hhh
    </div>
    <mt-tabbar v-model="selected" :fixed="true" style="background-color:rgb(17,17,17);color:white">
      <mt-tab-item id="Home">
        <img slot="icon" src="../assets/home-icon.png">
        HOME
      </mt-tab-item>
      <mt-tab-item id="tab2">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        tab4
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Indicator } from "mint-ui";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      selected: "Home",
      appAlive: false,
      glow: {
        boxShadow: "2pt 2pt 12pt 12pt rgba(12,23,122,.5)",
        borderRadius: "25px",
      },
      appStateTextStyle: {
        color: "white",
      },
    };
  },
  computed: {
    GetAppStateTextStyle() {
      return { color: this.appAlive ? "white" : "red" };
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
          this.appAlive ? "83, 255, 94" : "234, 73, 73"
        },${s[index]})`; //234, 73, 73
      }, 130);
    },
  },
  mounted() {
    Indicator.open({
      text: "載入中...",
      spinnerType: "fading-circle",
    });
    this.GlowAnimation();
    setTimeout(() => {
      Indicator.close();
    }, 2000);
  },
};
</script>

<style>
.block-gb {
  background-color: rgb(17, 17, 17);
  border-radius: 5px;
  color: white;
  margin: 10px auto;
}

.c-sharp-app-state {
  height: 35pt;
  font-size: 17pt;
}

.c-sharp-app-state div {
  float: left;
  padding: 10px;
}

.c-sharp-app-state .img {
  text-align: left;
}
</style>

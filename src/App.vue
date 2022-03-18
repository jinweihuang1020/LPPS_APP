<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="block-gb machine-info">
      <div class="machine-name">
        {{AppState.MachineName}}
      </div>
      <div class="cpu-ram">
        CPU:{{ AppState.CPU}}% RAM:{{AppState.RAM}} MB
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>

    <mt-tabbar v-model="selected" :fixed="true" style="background-color:rgb(17,17,17);color:white">
      <mt-tab-item id="Home">
        <img slot="icon" src="./assets/home-icon.png">
        HOME
      </mt-tab-item>
      <mt-tab-item id="ControlBoard">
        <img slot="icon" src="./assets/control-board.png">
        ControlBoard
      </mt-tab-item>
      <mt-tab-item id="Query">
        <img slot="icon" src="./assets/query.png">
        QUERY
      </mt-tab-item>
      <mt-tab-item id="Settings">
        <img slot="icon" src="./assets/setting.png">
        SETTING
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { StartAPPStateListen } from "./api/FirebaseAPI";
export default {
  data() {
    return {
      selected: "Home",
      AppState: {
        IsRunning: false,
      },
    };
  },
  methods: {
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
  watch: {
    selected: {
      handler: function (nPath, o) {
        let currentPath = this.$route.path;
        let newPath = "/" + nPath;
        if (newPath != currentPath) this.$router.push(newPath);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.StartAPPStateListen();
  },
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: black;
  height: 100vh;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

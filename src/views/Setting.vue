<template>
  <div id="Settings">

    <div class="st-section">
      <div class="st-title">色彩主題</div>
      <div class="st-content">
        <el-switch :width="40" v-model="QueryFromLocalStorageFirst" active-text="本地資料庫" inactive-text="雲端資料庫" @change="DataSourceChange">
        </el-switch>
      </div>
    </div>
    <div class="st-section">
      <div class="st-title">資料來源</div>
      <div class="st-content">
        <div>
          <el-switch :width="40" v-model="QueryFromLocalStorageFirst" active-text="本地資料庫" inactive-text="雲端資料庫" @change="DataSourceChange">
          </el-switch>
        </div>
        <div id="download">
          <el-button type="primary" :loading="DataDowloading" :disabled="DataDowloading" @click="DownloadNewestData">從資料庫下載最新的資料</el-button>

        </div>
      </div>
    </div>
    <div class="st-section">
      <div class="st-title">資料來源</div>
      <div class="st-content">
        <el-switch :width="40" v-model="QueryFromLocalStorageFirst" active-text="本地資料庫" inactive-text="雲端資料庫" @change="DataSourceChange">
        </el-switch>
      </div>
    </div>
  </div>
</template>


<style>
#Settings {
  color: white;
}

.st-section {
  background-color: white;
  color: black;
  border-radius: 3px;
  padding: 1px;
  margin: 10px auto;
}

.st-content,
.st-title {
  text-align: left;
  margin: 10px;
}
.st-content div {
  margin: 3px auto;
}

.st-title {
  letter-spacing: 3px;
  font-size: 25px;
  font-weight: 900;
  position: relative;
  top: -10px;
  color: rgb(88, 88, 88);
}

#download {
}
</style>

<script>
export default {
  data() {
    return {
      DataDowloading: false,
      QueryFromLocalStorageFirst: false,
    };
  },
  methods: {
    async DownloadNewestData() {
      this.DataDowloading = true;
      this.$FireStore
        .FetchACFlatData()
        .then((data) => {
          console.error("cowbay", data);
          if (data.length != 0) {
            localStorage.setItem("acFlatnessDateList", JSON.stringify(data));
            this.bus.$emit("data-reload", null);
            this.DataDowloading = false;
            this.$message("資料下載成功");
          }
        })
        .catch((e) => {
          this.DataDowloading = false;
        });
    },
    DataSourceChange(e) {
      this.$APPSettings.QueryFromLocalStorageFirst = e;
    },
  },
  mounted() {
    this.QueryFromLocalStorageFirst =
      this.$APPSettings.QueryFromLocalStorageFirst;
  },
};
</script>


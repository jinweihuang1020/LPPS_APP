<template>
  <div class="divider-with-text">
    <el-row :gutter="20">
      <el-col :span="10">
        <hr class="solid">
      </el-col>
      <el-col :span="4">
        <div class="text">{{text}}</div>
      </el-col>
      <el-col :span="10">
        <hr class="solid">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style>
.divider-with-text {
  padding-top: 10px;
  width: 100%;
}

.divider-with-text .text {
  font-size: 12px;
  position: relative;
  color: white;
  top: -9px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-decoration: none;
}

hr.solid {
  border-top: 1px solid rgba(87, 87, 87, 0.4);
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  margin: 0;
  padding: 0;
}
</style>

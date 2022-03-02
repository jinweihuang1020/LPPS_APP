<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <mt-button type="danger" @click.native="handleClick">danger</mt-button>

  </div>
</template>

<script>
import { MessageBox } from "mint-ui";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    handleClick() {
      MessageBox("提示", "操作成功");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

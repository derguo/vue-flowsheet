<template>
  <div id="app">
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
  },
  data() {
    return {
      msg: {
        text: "Welcome to Your Vue.js App",
        data: [{ color: "red" }, 1, 1, 1, 1],
      },
    };
  },
  methods: {
    ok() {
      this.msg.data.push(2);
      this.msg.data[0].color = "write";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
</style>

<template>
  <div id="app">
    <div id="mytitle">
      <Header type="min"></Header>
      <Header type="max"></Header>
      <Header type="close"></Header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header';
  export default {
    name: 'print-win',
    components: {
      Header,
    }
  }
</script>

<style>
html,body{
  padding: 0px;
  margin: 0px;
  border: 0px;
  width:100%;
  height:100%
}
#mytitle {
    position: absolute;
    width: 100%;
    height: 52px;
    display: flex;
    align-content: center;
    justify-content: flex-end;
    -webkit-app-region: drag;
}
</style>

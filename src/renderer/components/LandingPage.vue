<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="right-side">
        <div class="doc">
          <button class="alt" @click="handlePrinter ()">获取打印机</button>
        </div>
        <div v-for="(item, index) in printList" :key="index"> 
          <button class="alt" @click="print(item)">{{item.name}}</button>
        </div>
      </div>
    </main>
    
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import { ipcRenderer } from "electron"
  import { Header } from './Header';
  export default {
    name: 'landing-page',
    components: { 
      SystemInformation,
      Header,
     },
    data() {
      return {
        printList: [],
      };
    },
    created() {
      this.handlePrinter()
    },
    methods: {
      handlePrinter() {
        ipcRenderer.send("getPrinterList")
        ipcRenderer.once("getPrinterList", (event, data) => {
          console.log(data)
          this.printList = data
        })
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body { 
    padding: 0 !important;
    margin: 0 !important;
    font-family: 'Source Sans Pro', sans-serif; 
    
  }

  #wrapper {
    width: 100vw;
    height: 100vh;
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
    background-image: linear-gradient(160deg,  #80D0C7 0%, #0093E9 100%);
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }


</style>

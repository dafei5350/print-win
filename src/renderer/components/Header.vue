<template>
  <div 
    class="titlebtn" 
    :style="style"
    @mouseover="Mouseover()"
    @mouseleave="Mouseleave()"
    @click="click">
      <img v-show="isMouse" :class="['icon-header', type]" :src="require('../assets/' + type + '.png')" alt="" />
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    const style = {
        min: {
            backgroundColor: '#61c554',
            right:'65px'
        },
        max: {
            backgroundColor: '#f4be50',
            right:'40px'
        },
        close: {
            backgroundColor: '#eb695d',
            right:'15px'
        }
    };
    export default {
        name: 'Header',
        props: ['type'],
        computed: {
            style: function () {
                return style[this.type];
            },
        },
        data() {
          return {
            isMouse: false,
          };
        },
        methods: {
            click: function () {
              console.log("this.type", this.type);
                ipc.send(this.type);
            },
            Mouseover() {
              this.isMouse = true
            },
            Mouseleave() {
              this.isMouse = false
            }
        },
    }
</script>
    
<style scoped>
.titlebtn {
    position: absolute;
    top: 10px;
    width: 20px;
    height: 20px;
    -webkit-app-region: no-drag;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .5px solid #ababab;
}
.titlebtn:hover{
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.icon-header{
  opacity: .5;
}
.icon-header.close{
  width: 12px;
  height: 12px;
}
.icon-header.min {
  width: 20px;
  height: 20px;
}
.icon-header.max {
  width: 20px;
  height: 20px;
}
</style>
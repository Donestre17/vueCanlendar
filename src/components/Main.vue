<template>
  <div id="main">
    <Canlendar
    :nowYear="nowYear"
    :nowMonth="nowMonth"
    :nowDay="nowDay"
    :chooseYear="chooseYear"
    :chooseMonth="chooseMonth"
    :chooseDay="chooseDay"
    @choose="choose"
    @monthPlus='monthPlus'
    @monthReduce='monthReduce'></Canlendar>
    <List
    @deletIt = "deletIt"
    :taskList="taskList"
    :renderList="renderList"
    :nowYear="nowYear"
    :nowMonth="nowMonth"
    :nowDay="nowDay"
    :chooseYear="chooseYear"
    :chooseMonth="chooseMonth"
    :chooseDay="chooseDay"></List>
  </div>
</template>

<script>
import Canlendar from './Canlendar';
import List from './List';
export default {
  name: 'main',
  props:['nowMonth','nowYear' ,'nowDay' ,'taskList','chooseYear','chooseMonth','chooseDay'],
  components:{ Canlendar, List},
  data () {
    return {
      renderList:this.filterList(this.taskList)
    }
  },
  methods:{
    choose(){
      this.$emit('choose',arguments);
    },
    deletIt(){
      this.$emit('deletIt')
    },
    filterList(d){
      var that = this;
      var arr = [];
      d.map(function(e,i){
        e.checked = false;
        if(e.time.day == that.chooseDay&&e.time.month == that.chooseMonth&&e.time.year == that.chooseYear){
          arr.push(e)
        }
      })
      return arr
    },
    monthPlus(){
      this.$emit('monthPlus')
    },
    monthReduce(){
      this.$emit('monthReduce')
    }
  },
  watch:{
    chooseDay:{
      handler(){
        this.renderList = this.filterList(this.taskList)
      },
      deep:true
    },
    taskList:{
      handler(){
        this.renderList = this.filterList(this.taskList)
      }
    }
  },
  mounted(){
      init();
      this.$emit('changeHd',false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main{
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div id="app">
    <Hd
    :nowYear="nowYear"
    :nowMonth="nowMonth"
    :Show='ShowHd'
    @backToday='backToday'></Hd>
    <router-view
    :wheatherList="wheatherList"
    :nowYear="nowYear"
    :nowMonth="nowMonth"
    :nowDay="nowDay"
    :chooseYear="chooseYear"
    :chooseMonth="chooseMonth"
    :chooseDay="chooseDay"
    :taskList="taskList"
    @choose="choose"
    @deletIt="deletIt"
    @monthPlus='monthPlus'
    @monthReduce='monthReduce'
    @changeHd='changeHd'></router-view>
  </div>
</template>

<script>
import  Hd from './components/Hd'
var storge = {
  save(data){
    window.localStorage.setItem('taskList',JSON.stringify(data));
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem('taskList'))||[];
  }
}
export default {
  name: 'app',
  components:{Hd},
  data(){
    return {
      ShowHd:false,
      nowYear:new Date().getFullYear(),
      nowMonth:((new Date().getMonth()) + 1),
      nowDay : new Date().getDate(),
      chooseDay:new Date().getDate(),
      chooseMonth:((new Date().getMonth()) + 1),
      chooseYear:new Date().getFullYear(),
      taskList:storge.fetch(),
      wheatherList:[
        {
          //昨天
          date: + (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)),
          info:''
        },
        {
          //今后五天
          date:+ (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())),
          info:''
        },
        {
          date: + (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)),
          info:''
        },
        {
          date: +(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2)),
          info:''
        },
        {
          date: + (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+3)),
          info:''
        },
        {
          date: + (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+4)),
          info:''
        },
      ]
    }
  },
  methods:{
    choose(){
      var item = arguments[0][0];
      var arr = arguments[0][1];
      this.chooseDay = item.date;
      this.chooseMonth = item.month+1;
      this.chooseYear = item.year;
      var that = this
      arr.forEach(function(e,i) {
          if(e instanceof Object){
              if(e.date == that.chooseDay&&(e.month+1) == that.chooseMonth&&e.year == that.chooseYear){
                  e.isChoose = true;
              }else{
                  e.isChoose = false
              }
          }
      });
    },
    deletIt(){
      this.taskList = this.taskList.filter(e=>{
        return (!e.delet)
      })
    },
    monthPlus(){
      this.nowMonth += 1;
      if(this.nowMonth == 13){
        this.nowMonth = 1;
        this.nowYear += 1;
      }
    },
    monthReduce(){
      this.nowMonth -= 1;
      if(this.nowMonth == 0){
        this.nowMonth = 12;
        this.nowYear -= 1;
      }
    },
    changeHd(){
      var flag = arguments[0];
      this.ShowHd = flag;
    },
    backToday(){
      this.nowYear = new Date().getFullYear();
      this.nowMonth = ((new Date().getMonth()) + 1);
      this.nowDay  =  new Date().getDate();
    }
  },
  watch:{
    taskList(){
      storge.save(this.taskList)
    }
  },
  mounted(){
      //
      var html = document.getElementsByTagName('html')[0];
      var height = html.offsetHeight;
      this.$el.style.height = height + 'px';
      //天气请求
      var arr = [];
      var that = this;
      this.$http.jsonp('http://wthrcdn.etouch.cn/weather_mini?city=北京').then((res)=>{
          var weatherData = res.body.data;
          
          for(var attr in weatherData){
            if(attr == 'forecast'){
              var forecast = weatherData[attr];
              for(var attr1 in forecast){
                arr.push(forecast[attr1])
              }
            }else if(attr == 'yesterday'){
              arr.unshift(weatherData[attr])
            }
          }
          for(var i = 0;i<arr.length;i++){
            that.wheatherList[i].info = arr[i].low.substring(2) + '~' + arr[i].high.substring(2) + '  ' + arr[i].type;
          }
          arr = [];
      });
      
    }
}
</script>

<style lang="less">
@r : 32.375rem;
html {
    height: 100%;
    width: 100%;
    font-family: 'microsoft-YaiHei';
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        #app{
          width: 100%;
          position: relative;
          overflow: hidden;
        }
    }
}
</style>

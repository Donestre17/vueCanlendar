<template>
    <div id="info">
        <section>
            <div class="bar">日程标题</div>
            <h1 class="title">{{taskTitle}}</h1>
            <div class="bar">日程时间</div>
            <p class="time">{{taskTime}}</p>
            <div class="bar">天气</div>
            <p class="weather">{{taskWeather}}</p>
            <div class="bar">日程内容</div>
            <div class="detail">
                <div>{{taskDetail}}</div>
            </div>
        </section>
    </div>
</template>
<script>
    
    export default {
        props:['nowMonth','nowYear' ,'nowDay' ,'taskList','wheatherList'],
        data(){
            return {
                itemId : null,
                renderTask : null,
                taskTitle:null,
                taskTime:null,
                taskWeather:null,
                taskDetail:null
            }
        },
        methods:{
        },
        created(){
            var str = window.location.hash;
            var i = str.indexOf('=')
            str = str.slice(i+1);
            this.itemId = str;
            for(var i =0;i<this.taskList.length;i++){
                if(this.itemId == this.taskList[i].id){
                    this.renderTask = this.taskList[i]
                    this.taskTitle = this.renderTask.title;
                    this.taskTime = this.renderTask.time.year + '年' + this.renderTask.time.month + '月' + this.renderTask.time.day +'日';
                    this.taskDetail = this.renderTask.detail;
                }
            }
            //天气渲染
            var date = +(new Date(this.renderTask.time.year,this.renderTask.time.month-1,this.renderTask.time.day))
            var that = this;
            this.wheatherList.forEach(function(e) {
                if(date == e.date){
                    that.taskWeather = e.info;
                }
            });
            if(this.taskWeather == null){
                this.taskWeather = '天气预报不给力哦'
            }
        },
        mounted(){
            init();
            this.$emit('changeHd',true)
        }
    }
</script>
<style lang="less" scoped>
    @r : 32.375rem;
    #info{
        width: 100%;
        height: 90%;
        font-size: 30/@r;
        position: relative;
        section{
            width: 100%;
            height: 100%;
            background: #fff;
            h1,p{
                padding: 0;
                margin: 0;
                text-indent: 20/@r
            }
            .bar{
                width: 100%;
                height: 35/@r;
                background: #ccc;
                font-size: 18/@r;
                line-height: 35/@r;
                padding-left: 3%;
                box-sizing: border-box;
            }
            .title{
                height: 55/@r;
                line-height: 55/@r;
                font-size: 35/@r;
                font-weight: normal;
            }
            .time{
                height: 40/@r;
                font-size: 25/@r;
                line-height: 40/@r;
                color: #555;
                font-style: italic;
            }
            .weather{
                height: 40/@r;
                font-size: 25/@r;
                line-height: 40/@r;
                color: #555;
                font-style: italic;
            }
            .detail{
                font-size: 25/@r;
                line-height: 40/@r;
                padding: 20/@r;
                text-indent: 50/@r;
            }
        }
    }
</style>
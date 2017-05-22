<template>
   <section id="canlendar">
        <div class="inner" 
        ref='container'
        @touchstart='moveStart' 
        @touchmove='moveTo' 
        @touchend = 'moveEnd'>
            <div>
                <div class="wrapper" ref="inner">
                    <Cell 
                    v-for="(item ,index) in beforeDateArry"
                    :key="Math.random()"
                    :item='item'
                    :index='index'
                    :innerWidth = 'innerWidth'
                    :innerHeight = 'innerHeight'
                    :nowYear="nowYear"
                    :nowMonth="nowMonth"
                    :nowDay="nowDay"
                    @choose='choose'></Cell>
                </div>
            </div>
            <div>
                <div class="wrapper" ref="inner">
                    <Cell 
                    v-for="(item ,index) in dateArry"
                    :key="Math.random()"
                    :item='item'
                    :index='index'
                    :innerWidth = 'innerWidth'
                    :innerHeight = 'innerHeight'
                    :nowYear="nowYear"
                    :nowMonth="nowMonth"
                    :nowDay="nowDay"
                    @choose='choose'></Cell>
                </div>
            </div>
            <div>
                <div class="wrapper" ref="inner">
                    <Cell 
                    v-for="(item ,index) in afterDateArry"
                    :key="Math.random()"
                    :item='item'
                    :index='index'
                    :innerWidth = 'innerWidth'
                    :innerHeight = 'innerHeight'
                    :nowYear="nowYear"
                    :nowMonth="nowMonth"
                    :nowDay="nowDay"
                    @choose='choose'></Cell>
                </div>
            </div>
        </div>
    </section> 
</template>
<script>
    import Velocity from 'velocity-animate';
    import Cell from './Cell'
    export default {
        components:{ Cell },
        props:['nowMonth','nowYear' ,'nowDay','chooseMonth','chooseYear' ,'chooseDay'],
        data(){
            return {
                cellNum:49,
                innerWidth:null,
                innerHeight:null,
                beforeDateArry:this.dateArr(this.nowMonth - 1,this.nowYear),
                afterDateArry:this.dateArr(this.nowMonth + 1,this.nowYear),
                dateArry:this.dateArr(this.nowMonth,this.nowYear),
                slideStatus:{
                    moveStartX:null,
                    moveX:0,
                    movedX:null,
                    nowPage:1
                }
            }
        },
        methods:{
            dateArr(m,y){
                if(m==0){
                    m=12;
                    y-=1;
                }
                if(m==13){
                    m=1;
                    y+=1;
                }
                var weekArr = ['一','二','三','四','五','六','日'];
                var arr = [];
                var date = new Date();
                var thisMonth = date.getMonth()
                var thisDay = date.getDate();
                var thisYear = date.getFullYear();
                m?date.setMonth(m-1):null;
                y?date.setFullYear(y):null;
                //处理上月数据
                date.setDate(0)
                var weekDay = date.getDay();
                var num = date.getDate()-weekDay+1;
                for(var i = 1 ;i<=weekDay;i++){
                    date.setDate(num)
                    arr.push({
                        isChoose:false,
                        date:num,
                        month:date.getMonth(),
                        year:date.getFullYear(),
                        trueDate:date,
                        isNowM:false,
                        isNowD:false
                    });
                    num++;
                }
                //处理本月和下月数据
                var x = 1
                for(var j = i;j<=42;j++){
                    date = new Date();
                    m?date.setMonth(m-1):null;
                    y?date.setFullYear(y):null;
                    date.setDate(x);
                    if(date.getMonth() == m-1){
                        if(date.getDate() == thisDay&&date.getFullYear()==thisYear&&date.getMonth()==thisMonth){
                            arr.push({
                            isChoose:false,
                            date:date.getDate(),
                            month:date.getMonth(),
                            year:date.getFullYear(),
                            isNowM:true,
                            isNowD:true
                            });
                        }else{
                            arr.push({
                            isChoose:false,
                            date:date.getDate(),
                            month:date.getMonth(),
                            year:date.getFullYear(),
                            isNowM:true,
                            isNowD:false
                            });
                        }
                    }else{
                        arr.push({
                            isChoose:false,
                            date:date.getDate(),
                            month:date.getMonth(),
                            year:date.getFullYear(),
                            isNowM:false,
                            isNowD:false
                            });
                    }
                    x++;
                }
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].date == this.chooseDay&&arr[i].month == this.chooseMonth-1&&arr[i].year == this.chooseYear){
                        arr[i].isChoose = true;
                    }
                }
                return (weekArr.concat(arr))
            },
            choose(){
                var item = arguments[0];
                
                var that = this;
                this.$emit('choose',item,this.dateArry)
            },
            moveStart(ev){
                var x = this.$refs.container.getBoundingClientRect().width*.333;
                this.slideStatus.movedX = null;
                this.slideStatus.moveStartX =this.slideStatus.movedX!==null?this.slideStatus.movedX:(-x)
                this.slideStatus.moveStartX -= ev.touches[0].clientX
            },
            moveTo(ev){
                var x = this.$refs.container.getBoundingClientRect().width*.333;
                this.slideStatus.moveX = ev.touches[0].clientX + this.slideStatus.moveStartX 
                this.$refs.container.style.transform = 'translate('+ (this.slideStatus.moveX) +'px)'
                this.slideStatus.nowPage =  Math.round(((x-this.slideStatus.moveX)%x)/x + Math.floor((x-this.slideStatus.moveX)/x)-1);
            },
            moveEnd(ev){
                var x = this.$refs.container.getBoundingClientRect().width*.333;
                var timer = null;
                var test = new Promise((resolve)=>{
                    var x = this.$refs.container.getBoundingClientRect().width*.333;
                    this.$refs.container.style.transform = 'translate('+ (-this.slideStatus.nowPage*x) +'px)'
                    this.$refs.container.style.transition = '.5s';
                    timer = setTimeout(function(){
                        resolve()
                    },600)
                })
                var that = this;
                test.then(()=>{
                    clearTimeout(timer);
                    that.$refs.container.style.transition = ''
                    if(that.slideStatus.nowPage > 1){
                        that.$emit('monthPlus')
                    }else if(that.slideStatus.nowPage < 1){
                        that.$emit('monthReduce')
                    }
                    that.slideStatus.nowPage = 1;
                    that.$refs.container.style.transform = 'translate('+ (-that.slideStatus.nowPage*x) +'px)'
                    
                })
            }
        },
        mounted(){
            var that = this;
            setTimeout(function(){
                that.innerWidth = that.$refs.inner.getBoundingClientRect().width;
                that.innerHeight = that.$refs.inner.getBoundingClientRect().height;
            },40)
            
        },
        watch:{
            nowMonth(){
                this.dateArry = this.dateArr(this.nowMonth,this.nowYear)
                this.beforeDateArry = this.dateArr(this.nowMonth - 1,this.nowYear)
                this.afterDateArry = this.dateArr(this.nowMonth + 1,this.nowYear)
            }
        }
    }
    // window.onload = function(){
    //     var swiper = new Swiper('#canlendar')
    // }
</script>
<style lang="less">
    @r : 32.375rem;
    #canlendar{
    width: 300%;
    height: 50%;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    .inner{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        transform: translate(-33.3%);
        &>div{
            float: left;
            width: 33.3%;
            height: 100%;
            padding: 10/@r;
            box-sizing: border-box;
            position: relative;
        }
        .wrapper{
            position: absolute;
            top: 10/@r;
            left: 10/@r;
            bottom: 10/@r;
            right: 10/@r;
            margin: auto;
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.56);
            background: #ccc;
        }
    }
}
</style>
<template>
   <section id="list">
        <div class="inner">
            <div class="bot-head">{{chooseYear}}年{{chooseMonth}}月{{chooseDay}}</div>
            <div class="list-panel" ref="panel">
                <button class="finishIt" @touchstart="finishIt">完成</button>
                <button class="deletIt" @touchstart="deletIt">删除</button>
            </div>
            <div class="list-container">
                <ul class="task-list">
                    <LiTask
                    v-for="(item ,index) in renderList"
                    :key="Math.random()"
                    :item="item"
                    :index="index"
                    @checkit="checkit"></LiTask>
                </ul>
            </div>
        </div>
        <div class="add">
            <a @click='openAdd' href="javascript:;">
                <span>+</span>
            </a>
        </div>
        <Vmask :msg="tipMsg" :open='isTip' @close='close'></Vmask>
    </section>
</template>
<script>
import LiTask from './Li'
import Velocity from 'velocity-animate';
import Router from '../router/index.js';
import Vmask from './mask';
    export default {
        components:{ LiTask ,Vmask},
        props:['nowMonth','nowYear' ,'nowDay' ,'taskList' ,'renderList','chooseYear','chooseMonth','chooseDay'],
        data(){
            return {
                checkData:this.renderList.filter(function(e,i){
                        return (e.checked == true)
                    }),
                tipMsg:'',
                isTip:false
            }
        },
        methods:{
            checkit(){
                var item = arguments[0]
                if(item.checked){
                    this.checkData.push(item)
                }else{
                    this.checkData = this.checkData.filter(function(e,i){
                        return (e.checked == true)
                    })
                }
            },
            finishIt(){
                var arr = this.checkData;
                for(var i = 0;i<arr.length;i++){
                    arr[i].finished = true;
                    arr[i].checked = false;
                }
            },
            deletIt(){
                var arr = this.checkData;
                for(var i = 0;i<arr.length;i++){
                    arr[i].delet = true;
                };
                this.$emit('deletIt');
                this.checkData = [];
            },
            openAdd(){
                var now = +new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
                var choose = +new Date(this.chooseYear,this.chooseMonth-1,this.chooseDay);
                if(now>choose){
                    this.tipMsg = '时光不可重来~';
                    this.isTip = true;
                    return;
                }else{
                    Router.push('/add')
                }
            },
            close(){
                this.isTip = false;
            }
        },
        watch:{
            checkData(){
                var p = this.$refs.panel;
                if(this.checkData.length>0){
                    Velocity(p,{height:'10%',opacity:1})
                }else{
                    Velocity(p,{height:0,opacity:0})
                }
            }
        }
    }
</script>
<style lang="less" scoped>
@r : 32.375rem;
    #list{
    width: 100%;
    height: 40%;
    background: #fff;
    box-sizing: border-box;
    position: relative;
        .inner{
            position: absolute;
            top: 0;
            left: 2%;
            right: 2%;
            bottom: 3%;
            margin: auto;
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.56);
            box-sizing: border-box;
            background: #ccc;
        }
        .bot-head{
            height: 20%;
            background: #fcfcfc;
            font-size: 30/@r;
            line-height: 2;
            text-indent: 3%;
            box-shadow: 0 3px 7px rgba(0, 0, 0, 0.36);
        }
        .list-panel{
            opacity: 0;
            width: 100%;
            height: 0;
            position: relative;
            background: #eee;
            button{
                width: 60/@r;
                height: 80%;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                font-size: .5em;
                padding: 0;
                border: none;
                &.finishIt{
                    right: 5%;
                }
                &.deletIt{
                    right: 20%;
                }
            }
        }
        .list-container{
            height: 80%;
            overflow-x:hidden; 
            overflow-y: scroll;
        }
        .task-list{
            font-size: 22/@r; 
            margin: 0;
            padding: 0;
            width: 100%;
            
        }
        .add{
            position: absolute;
            width: 20%;
            padding-bottom: 20%;
            height: 0;
            border-radius: 50%;
            bottom: 5%;
            right:3%;
            color: #fff;
            a{
                width: 80%;
                height: 80%;
                background: #339999;
                display: tabel-cell;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: auto;
                border-radius: 50%;
                box-shadow: 0px 0px 20px 20px rgba(255,255,255,.3);
                span{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    height: 25%;
                    line-height: 20px;
                    text-align: center;
                    font-size: 200%;
                    color: #fff;
                }
            }
        }
    }
</style>
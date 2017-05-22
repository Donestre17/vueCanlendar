<template>
    <div id="add">
        <section>
            <div class="title-box">
                <div>
                    <input type="text" placeholder="请输入标题" v-model="title">
                </div>
            </div>
            <div class="time-box">
                <div>
                    <p>{{chooseYear}}-{{chooseMonth}}-{{chooseDay}}</p>
                </div>
            </div>
            <div class="artical-box">
                <div>
                    <textarea placeholder="请输入内容" v-model="artical"></textarea>
                </div>
            </div>
            <div class="confirm-box">
                <div>
                    <button class="cancel" @touchstart.prevent="cancel">取消</button>
                    <button class="confirm" @touchstart.prevent="confirm">确认</button>
                </div>
            </div>
        </section>
        <Vmask :msg="tipMsg" :open='isTip' @close='close'></Vmask>
    </div>
</template>
<script>
    import Router from '../router/index.js'
    import Velocity from 'velocity-animate';
    import Vmask from './mask';
    export default {
        props:['nowMonth','nowYear','nowDay' ,'taskList','chooseYear','chooseMonth','chooseDay'],
        components:{ Vmask },
        data(){
            return {
                title:'',
                artical:'',
                commited:false,
                tipMsg:'',
                isTip:false
            }
        },
        methods:{
            close(){
                this.isTip = false;
            },
            cancel(){
                if(this.title != ''||this.artical != ''){
                    this.tipMsg = '未保存';
                    this.isTip = true;
                }else{
                    Router.push('/')
                }
            },
            confirm(){
                if(this.title==''||this.artical==''){
                    this.tipMsg = '请输入内容';
                    this.isTip = true;
                    return
                }else{
                    this.taskList.push({
                        title:this.title,
                        detail:this.artical,
                        checked:false,
                        finished:false,
                        time:{
                            day:this.chooseDay,
                            month:this.chooseMonth,
                            year:this.chooseYear
                        },
                        id:Math.random()
                    });
                    this.title = '';
                    this.artical = '';
                    this.commited = true;
                    this.tipMsg = '已完成';
                    this.isTip = true;
                }
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
    #add{
        width: 100%;
        height: 90%;
        font-size: 30/@r;
        position: relative;
        section{
            width: 100%;
            height: 100%;
            background: #ccc;
            &>div>div{
                position: absolute;
                top: 12/@r;
                left: 2%;
                bottom: 12/@r;
                right: 2%;
                margin: auto;
                input ,textarea{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: none;
                    padding: 0;
                    border-radius: 12/@r;
                    font-size: 25/@r;
                    padding: 10/@r;
                    box-sizing: border-box;
                    box-shadow: inset 2px 2px 16px 0px #000;
                }
                textarea{
                    font-size: 25/@r;
                }
                p{
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 12/@r;
                    font-size: 25/@r;
                    padding: 10/@r;
                    box-sizing: border-box;
                    background: #fff;
                    &.hide{
                        display: none;
                    }
                }
            }
            .title-box{
                position: relative;
                width: 100%;
                height: 10%;
            }
            .time-box{
                position: relative;
                width: 100%;
                height: 10%;
                p{
                    color: #ccc;
                    font-style: italic;
                }
            }
            .artical-box{
                position: relative;
                width: 100%;
                height: 70%;
                p{
                    word-break: normal;
                    word-wrap: break-word;
                }
            }
            .confirm-box{
                position: relative;
                width: 100%;
                height: 10%;
                &>div{
                    top: 0;
                }
                button{
                    width: 100/@r;
                    height: 90%;
                    font-size: 30/@r;
                    float: right;
                    margin-right: 20/@r;
                    border-radius: 10/@r;
                    padding: 0;
                    border: none;
                    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.7);
                    &.confirm{
                        background: #339999;
                        color: #fff;
                    }
                    &.cancel{
                        background: #d13131;
                        color: #fff;
                    }
                }
            }
        }
        
        
    }
</style>
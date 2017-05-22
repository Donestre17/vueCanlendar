<template>
    <div id="header">
        <a class="back" href="javascript:window.history.back();" v-show="isShow"></a>
        <a class="home" href="javascript:;" v-show="!isShow" @click='backToday'></a>
        <h1 class="header-year">{{nowYear}}年</h1>
        <h2 class="header-month">{{nowMonth}}月</h2>
    </div>        
</template>

<script>
export default {
    name:'Hd',
    props:['nowMonth','nowYear','Show'],
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        backToday(){
            this.$emit('backToday')
        }
    },
    watch:{
        Show(){
            this.isShow = this.Show
        }
    }
}
</script>

<style lang="less" scoped>
@r : 32.375rem;
#header{
    position: absolute;
    top: 0;
    width: 100%;
    height: 10%;
    background: #339999;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.56);
    z-index: 100;
    color:#eee;
    .back{
        position: absolute;
        height: 60/@r;
        width: 60/@r;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: 60/@r;
        text-decoration: none;
        color: #fff;
        line-height: 60/@r;
        text-align: center;
        &:after{
            display: block;
            content: '';
            width: 60%;
            height: 60%;
            position: absolute;
            box-sizing: border-box;
            border-top: 5/@r solid #fff;
            border-left: 5/@r solid #fff;
            top: 0;
            bottom: 0;
            left: 20/@r;
            margin: auto;
            transform: rotate(-45deg)
        }
    }
    .home{
        position: absolute;
        height: 60/@r;
        width: 60/@r;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: 60/@r;
        text-decoration: none;
        color: #fff;
        line-height: 60/@r;
        text-align: center;
        background: url('../assets/logo.png');
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
    }
    .header-year{
        font-size: 30/@r;
        margin: 0;
        margin-right: 3%;
        text-align: right;
    }
    .header-month{
        font-size: 20/@r;
        margin: 0;
        margin-right: 3%;
        text-align: right;
    }
}
</style>
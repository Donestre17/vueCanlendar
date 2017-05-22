<template>
    <div class="mask" ref="mask">
        <div class="tip" ref="tip">{{msg}}</div> 
    </div>
</template>
<script>
    export default {
        props:['msg','open'],
        methods:{
            haveTip(){
                var mask = this.$refs.mask;
                var tip = this.$refs.tip;
                var that = this;
                Velocity(mask,{opacity:1},{begin(){
                    mask.style.zIndex = 10;
                },complete(){
                    Velocity(mask,{opacity:0},{complete(){
                        mask.style.zIndex = -100;
                        that.$emit('close')
                    }})
                }});
            }
        },
        watch:{
            open(){
                if(this.open == true){
                    this.haveTip()
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @r : 32.375rem;
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(255,255,255,.7);
        opacity: 0;
        z-index: -100;
        .tip{
            width: 160/@r;
            font-size: 20/@r;
            height: 100/@r;
            background: #fff;
            border-radius: 12/@r;
            border: 2px solid #aaa;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            box-shadow: 0px 0px 19px 10px #ccc;
            text-align: center;
            line-height: 100/@r;
        }
    }
</style>
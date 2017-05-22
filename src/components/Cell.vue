<template>
    <div class="cell" 
    :style="{
        'width':innerWidth/7 + 'px',
        'height':innerHeight/7 + 'px',
        'top':Math.floor(index/7)*innerHeight/7 +'px',
        'left':(index%7)*innerWidth/7 +'px'
        }"
    >
        <div class="cell-inner"
        :style="{
            'width':innerHeight/7*0.75 + 'px',
            'height':innerHeight/7*0.75 + 'px',
            'lineHeight':innerHeight/7*0.7 + 'px',
            'fontSize':innerHeight/7*0.3 + 'px',
            'border':index<7?'3px solid #339999':''
        }"
        @touchstart.stop="choose"
        :class="{
            'today':item.isNowD,
            'other':item instanceof Object&&!item.isNowM,
            'choosen':item.isChoose
            }"
        >{{item instanceof Object?item.date:item}}</div>
    </div>
</template>
<script>
    export default {
        props:['item' ,'index' ,'innerWidth' ,'innerHeight' ,'nowMonth','nowYear' ,'nowDay'],
        methods:{
            choose(){
                if(this.item instanceof Object){
                    this.$emit('choose',this.item)
                }
            }
        }
    }
</script>
<style lang="less">
    .cell{
        position: absolute;
        box-sizing: border-box;
        .cell-inner{
            margin:auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            box-sizing: border-box;
            background: #eee;
            box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.36);
            text-align: center;
            transition: .5s;
            transform: scale(1);
            &.today{
                background: #339999;
                color: #fff;
            }
            &.other{
                color: #aaa;
            }
            &.choosen{
                border: 3px solid #0066CC;
                transform: scale(1.2);
                
            }
        }
    }
</style>
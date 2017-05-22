<template>
    <li 
    v-trans
    :data-index=index
    :class="{
        'checked':item.checked,
        'disabled':item.finished,
        }">
        <div>
            <div class="checkbox"
            @touchstart.stop="checkit">
                <span class="check" ></span>
            </div>
            <span  @touchstart="taskChoose">{{item.title}}</span>
        </div>
    </li>
</template>
<script>
    import Velocity from 'velocity-animate';
    import Router from '../router/index.js'
    export default {
        props:['item' ,'index'],
        methods:{
            checkit(){
                this.item.checked = !this.item.checked;
                this.$emit('checkit',this.item)
            },
            taskChoose(){
                Router.push('/info?id='+ this.item.id+'')
            }
        },
        directives:{
            trans:{
                inserted: function (el) {
                    Velocity(el,{translateX:'0%'},
                        {delay:100*el.getAttribute('data-index'),
                        easing:'linear'
                    })
                },
                unbind: function (el) {
                    Velocity(el,{translateX:'100%'},
                        {delay:100*el.getAttribute('data-index'),
                        easing:'linear'
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @r : 32.375rem;
    li{
        transform: translateX(100%);
        transition: .5s;
        list-style: none;
        height: 40/@r;
        background: #ccc;
        width: 100%;
        &>div{
            height: 90%;
            background: #fcfcfc;
        }
        &:nth-child(1){
            margin-top: 5/@r;
        }
        .checkbox{
            float: left;
            background: #fcfcfc;
            height: 90%;
            width: 10%;
            position: relative;
            .check{
                display: block;
                width: 30/@r;
                height: 30/@r;
                background: #ccc;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                border-radius: 50%;
            }
        }
        span{
            float: left;
            
        }
        &.checked{
            .check{
                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    width: 70%;
                    height: 70%;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 50%;
                    background: #339999;
                }
            }
        }
        &.disabled{
            .check{
                background: #eee;
            }
            span{
                text-decoration: line-through;
                color: #ccc;
            }
        }
    }
</style>

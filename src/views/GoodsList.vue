<template>
    <div>
        <!-- 商品列表头部导航 -->
        <van-nav-bar
            title="商品列表"
            left-text="返回"
            :right-text="`购物车(${cartList.length})`"
            left-arrow
            fixed
            @click-left="onClickLeft"
            @click-right="onClickRight"
        ></van-nav-bar>
        
        <!-- 商品列表 -->
        <div class="list-body">
            <van-grid :column-num="2" gutter="20px">
               <van-grid-item v-for="(item,index) in goods"
                  :key="index"
               >
                   <img :src="item.mainPic" width="60%"/>
                  <p>{{item.title}}</p>
                  <p style="color: #EA4546;font-weight: bold;">¥{{item.originalPrice}}</p>
                  <van-button type="danger" @click="addCarts(item)">加入购物车</van-button>
                   
               </van-grid-item>
             </van-grid>   
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                goods:[],
                cartList:[]
            }
        },
        watch:{
            cartList:{
                handler(list){
                    localStorage.cartList = JSON.stringify(list)
                },
                deep:true
            },
        },
        created(){
            this.$axios.get('/data/list.json')
                .then(res=>{
                    this.goods = res.data.data.data.list
                })
            //购物车数据
            let list = localStorage.cartList
            if(list){
                this.cartList = JSON.parse(list)
            }
        },
        methods:{
            //返回
            onClickLeft(){
                window.history.back()
            },
            onClickRight(){
                this.$router.push({
                    path:'/carts'
                })
            },
            addCarts(item){
                console.log(item)
                console.log(this.cartList)
                //判断是否重复
                let double = false
                this.cartList.map(cart=>{
                    if(cart.goods.goodsId == item.goodsId){
                        //该商品已经在购物车，数量增加
                        cart.num ++
                        double=true
                        return
                    }
                })
                //第一次添加
                if(!double){
                    this.cartList.push({
                        goods: item,
                        num:1
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .list-body{
    }
</style>
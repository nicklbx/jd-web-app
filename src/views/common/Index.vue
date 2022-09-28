<template>
    <div>
        <!-- 路由视图 -->
        <router-view></router-view>
        
        <!-- 底部导航 -->
        <van-tabbar v-model="active" route active-color="#F6230E"
        inactive-color="#8B8B8B">
            <van-tabbar-item icon="home-o"
                to="/main">
                首页
            </van-tabbar-item>
            <van-tabbar-item icon="apps-o"
                to="/classify">
                分类
            </van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o"
                to="/carts"
                :badge = "CartList.length">
                购物车
            </van-tabbar-item>
            <van-tabbar-item icon="contact"
                to="/myself">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    // import Vue from 'vue'
    // import {Tabbar,TabbarItem} from 'vant'
    // Vue.use(Tabbar)
    // Vue.use(TabbarItem)
    
    export default {
        data() {
            return {
                active: 0,
                CartList:[]
            }
        },
        created() {
            this.getCartList()
        },
        methods: {
            getCartList() {
                let list=localStorage.cartList
                if(list){
                    this.CartList= JSON.parse(list)
                }else{
                    this.CartList=[]
                }
            }
        },
    }
    
</script>

<style>
</style>
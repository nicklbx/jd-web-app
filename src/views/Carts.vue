<template>
    <div>
        <!-- 购物车头部导航 -->
        <van-nav-bar
            title="购物车"
            fixed
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        ></van-nav-bar>
        
        <!-- 商品列表 -->
        <div style="margin-top: 60px; margin-bottom:70px;">
            <!-- 复选框组 -->
            <van-checkbox-group v-model="result">
                <div class="goods-item"
                    v-for="(item,index) in cartList"
                    :key="item.goods.goodsId"
                >
                    <van-swipe-cell>
                        <!-- 复选框 -->
                        <!-- :name属性添加到v-model的result当中 -->
                        <van-checkbox :name="item"></van-checkbox>
                        <!-- 商品信息 -->
                        <van-card
                            :price="item.goods.originalPrice"
                            :title="item.goods.title"
                            :desc="item.goods.title"
                            :thumb="item.goods.mainPic"
                        >
                            <template #num>
                                <van-stepper v-model="item.num" />
                            </template>
                        </van-card>
                        <!--  -->
                        <template #right>
                            <van-button 
                                text="删除"
                                type="danger"
                                class="delete-button"
                                @click="handleDelete(item)"
                            ></van-button>
                        </template>
                    </van-swipe-cell>
                </div>
            </van-checkbox-group>
        </div>
        
        <!-- 提交订单 -->
        <van-submit-bar
            :price="totalPrice"
            button-text="提交订单"
        >
            <van-checkbox v-model="selAll" @click="handleSellAll">
                全选
            </van-checkbox>
            
        </van-submit-bar>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                cartList:[],
                selAll:false,
                totalPrice:0,
                result:[],
            }
        },
        watch:{
            cartList:{
                handler(list){
                    localStorage.cartList = JSON.stringify(list)
                },
                deep:true
            },
            result:{//监听商品选中
                handler(list){
                    if(list.length == this.cartList.length){
                        this.selAll=true
                    }else{
                        this.selAll=false
                    }
                    this.comTotalPrice()
                },
                deep:true
            }
        },
        created() {
            let list = localStorage.cartList
            if(list){
                this.cartList = JSON.parse(list)
            }
        },
        methods:{
            onClickLeft(){
                window.history.back()
            },
            comTotalPrice(){//计算总价
                let totalPrice = 0
                // console.log('result o',this.result)
                // console.log('cartList',this.cartList)
                this.result.map(item=>{
                    // console.log('result item',item)
                    totalPrice += item.goods.originalPrice * item.num
                })
                
                this.totalPrice = totalPrice * 100
            },
            handleSellAll(){//全选
                if(this.selAll){
                    this.result = this.cartList
                }else{
                    this.result=[]
                }
            },
            handleDelete(olditem){
                this.cartList.splice(this.cartList
                .findIndex(item=>item.goods.goodsId==olditem.goods.goodsId),1)
                this.result.splice(this.result
                .findIndex(item=>item.goods.goodsId==olditem.goods.goodsId),1)
                
            }
        }
    }
</script>

<style scoped>
    .goods-item{
        margin: 10px 0px;
        box-sizing: border-box;
        padding-left: 10px;
        display: flex;
    }
    .delete-button{
        height: 100%;
    }
</style>
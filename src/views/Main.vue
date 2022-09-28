<template>
    <div>
        <!-- 搜索框 -->
        <van-search placeholder="请输入搜索关键词"
            shape="round"
            background="#E43130"
            show-action
            @focus="searchFocus"
            style="position: fixed;width: 100%; top:0;z-index: 999;"
        >
            <template #left>
                <van-icon name="wap-nav"
                    color="#fff"
                    size="25px"
                    style="margin-right: 8px;"
                    />
            </template>
            <template #label>
                <span class="search-logo">JD</span>
            </template>
            <template #action>
                <span style="font-size:16px; color:#fff;">搜索</span>
            </template>
        </van-search>
        
        <!-- 轮播图 -->
        <div class="swiper-banner" style="margin-top: 70px;">
            <van-swipe class="my-swipt"
                :autoplay="3000"
                indicator-color="white"
                >
                <van-swipe-item
                    v-for="URL in imgs" :key="URL">
                    <img :src="URL" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 宫格 -->
        <div class="swiper-banner" style="margin-top: 70px;">
            <!-- 宫格列表切换控件 -->
            <van-swipe class="my-swipt"
                :autoplay="3000"
                indicator-color="red"
                :loop="false"
                style="padding: 10px 0px"
            >
                <!-- 宫格列表第一页 -->
                <van-swipe-item>
                    <van-grid :column-num="5" :border="false">
                        <van-grid-item v-for="(item,index) in navData"
                            :key="index"
                            :text="item.title"
                            v-show="index<10">
                                <template #icon>
                                    <img :src="item.imgURL" width="50px">
                                </template>
                         </van-grid-item>
                    </van-grid>
                </van-swipe-item>
                <!-- 宫格列表第二页 -->
                <van-swipe-item>
                    <van-grid :column-num="5" :border="false">
                        <van-grid-item v-for="(item,index) in navData"
                            :key="index"
                            :text="item.title"
                            v-show="index>=10 && index<20">
                            <template #icon>
                                <img :src="item.imgURL" width="50px"/>
                            </template>
                        </van-grid-item>
                    </van-grid>
                </van-swipe-item>
            </van-swipe>
        </div>
        
        <!-- 商品推荐 -->
        <div class="tuijian">
            <h2>为你推荐</h2>
        </div>
       
       <div >
          <van-grid :column-num="2" gutter="20px">
             <van-grid-item class="goods-list" v-for="(item,index) in goods"
                :key="index"
             >
                <img :src="item.imgUrl" width="60%"/>
                <p>{{item.description}}</p>
                <p style="color: #EA4546;font-weight: bold;">¥{{item.price}}</p>
             </van-grid-item>
           </van-grid>   
       </div>
       
   
    </div>
</template>

<script>
    
    export default{
        data(){
            return {
                imgs:[],
                navData:[],
                goods:[]
            }
        },
        created() {
            this.getHomeData(),
            this.getGoodList()
        },
        methods:{
            searchFocus(){
                this.$router.push({
                    path: '/search'
                })
            },
            getHomeData(){
              this.$axios.get('/data/home.json')
                      .then(res=>{
                          // axios return string if json string contains tab characters
                          //https://github.com/axios/axios/issues/3917
                          // console.log(typeof(res.data))
                          this.imgs = res.data.bannerImgs;
                          this.navData = res.data.icons;
                      }).catch(err=>{
                          console.error(err)
                      })  
            },
            getGoodList(){
                this.$axios.get('/data/goods.json')
                        .then(res=>{
                            this.goods=res.data.data.dataList
                            // console.log(this.goods)
                            // console.log(this.goods[0].imgUrl)
                        }).catch(err=>{
                            console.error(err)
                        })  
            }
        }
    }
</script>

<style scoped>
    .search-logo{
        font-size: 18px;
        color: #EA4546;
        font-weight: bold;
        padding: 0px 10px;
        border-right: 1px solid #e7e7e7;
    }
    .swiper-banner{
        width: 90%;
        margin: 10px auto;
        border-radius: 10px;
        overflow: hidden;
    }
    .tuijian{
        text-align: center;
        color: #EA4546;
    }
    .goods-list{        
/*      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; */
    }
</style>
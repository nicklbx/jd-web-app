<template>
    <div class="nav-body">
        <!-- 一级分类导航 -->
        <ul class="navOne">
            <li v-for="(item) in navs"
                :key="item.cid"
                @click="clickNavOne(item)"            
            >
                <img :src="item.cpic" width="30px" height="30px"/>
                {{item.cname}}
            </li>
        </ul>
        
        <!-- 二级分类导航 -->
        <ul class="sonNav">
            <li v-for="(item) in sonNav"
                :key="item.subcid"
                @click="toPage">
                <img :src="item.scpic" width="50px" height="50px"/>
                {{item.subcname}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                navs:[],
                sonNav:[]
            }
        },
        created() {
            this.$axios.get("/data/navs.json")
                .then(res=>{
                    this.navs = res.data.data.data
                    this.sonNav = this.navs[0].subcategories
                })
        },
        methods:{
            clickNavOne(item){
                this.sonNav = item.subcategories
            },
            toPage(){
                this.$router.push({
                    path:'/list'
                })
            }
        
        }
    }
</script>

<style scoped>
    .nav-body{
        display: flex;
    }
    .navOne li{
        margin: 10px 0px;
        text-indent: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 40px;
    }
    .sonNav li{
        margin: 10px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
    }
    .navOne{
        position: relative;
        flex: 1.5;
        border-right: 1px solid #eee;
        height: 600px;
        overflow-y: scroll;
    }
    ::-webkit-scrollbar{
        display: none;
    }
    .sonNav{
        flex: 3;
        display: flex;
        flex-wrap: wrap;
    }
</style>
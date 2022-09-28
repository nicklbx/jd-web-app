<template>
    <div>
        <!-- 搜索框 -->
        <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            shape="round"
            background="#fff"
            show-action
            autofocus
            @search="onSearch"
        >
           <template #left>
                <van-icon @click="pageBack"
                    name="arrow-left"
                    size="25px"
                    style="margin-right: 8px;"
                />
            </template>
            <template #action>
                <van-button 
                    color="#E93D3D"
                    size="small"
                    style="border-radius: 5px;"
                    @click="onSearch"
                >搜索</van-button>
            </template>
        </van-search>
        
        <!-- 搜索记录 -->
        <div class="search-history">
            <div class="search-history-title">
                <span>最近搜索</span>
                <van-icon name="delete" @click="clearHistory"></van-icon>
            </div>
            <div class="search-history-list">
                <van-tag v-for="(item,index) in historyList"
                    :key="index"
                    color="#F0F2F5"
                    text-color="#68687F"
                    size="large"
                    style="margin:0px 10px 10px 0"
                    >
                    {{item}}
                </van-tag>
            </div>
        </div>
        
        <!-- 搜索智能提示区域 -->
        <div class="kw-list" v-show="showKwList">
            <van-cell 
                v-for="kw in showList"
                :key="kw"
                :title="kw"
                value="语言"
                @click="onSearch(kw)"
            />
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                searchValue: '',//搜索内容
                showKwList: false, //控制智能索索区域的显示
                historyList:[], //搜索记录列表
                showList:[], //要展开的内容
                data: [
                    "html",
                    "css",
                    "javascript",
                    "jquery",
                    "node.js",
                    "vue",
                    "golang",
                    "scala",
                    "python",
                ]
            }
        },
        created() {
            let historyList = localStorage.historyList
            if(historyList){
                this.historyList = JSON.parse(historyList)
            }
        },
        watch:{
            searchValue(kw){
                this.showKwList = kw.length>0?true:false
                //返回包含关键字的条目
                this.showList = this.data.filter(item=>{
                    return item.includes(kw)
                })
            }
        },
        methods:{
            pageBack(){
                //返回上一页
                window.history.back()
            },
            onSearch(kw){
                let keyword = ''
                if(typeof kw=== 'string'){
                    keyword=kw
                }else if(typeof kw === 'object'){
                    if(this.searchValue.trim() == '') return
                    keyword = this.searchValue
                }
                
                //执行搜索功能
                this.$router.push({
                    path: '/list',
                    query:{
                        kw: keyword
                    }
                })
                //保存搜索记录
                this.saveSearchKw(keyword)
            },
            saveSearchKw(kw){
                if(this.historyList.includes(kw)){
                    let index = this.historyList.indexOf(kw)
                    //删除旧关键字
                    this.historyList.splice(index,1)
                    //将新关键字添加到起始位置
                    this.historyList.unshift(kw)
                }else{
                    this.historyList.unshift(kw)
                }
                //更新historyList到localstorage
                localStorage.historyList=JSON.stringify(this.historyList)
            },
            clearHistory(){//清空搜索记录
                this.$dialog.confirm({
                    message: '确定要清空吗？',
                    closeOnClickOverlay: true,
                    confirmButtonText: '清空'
                }).then(()=>{
                    this.historyList = []
                    localStorage.historyList = JSON.stringify(this.historyList)
                })
            }
        }
    }
</script>

<style scoped>
    .search-history{
        border-top: 1px solid #F2F2F2;
    }
    .search-history-title{
        height: 50px;
        display: flex;
        /* 纵轴位置 */
        align-items: center;
        /* 横轴位置 */
        justify-content: space-between;
        /* 元素总高度height和宽度width包含边距和边框 */
        box-sizing: border-box;
        padding: 0px 15px;
    }
    .search-history-list{
        box-sizing: border-box;
        padding: 0px 15px;
    }
    .kw-list{
        background: #fff;
        position: absolute;
        width: 100%;
        top: 67px;
        /* 最小高度 */
        min-height: 150px;
    }
</style>
<template>
    <div>
        <h1>我的</h1>
        Vuex:
        <h1>{{$store.state.name}}</h1>
        <h2>{{description}}</h2>
        <hr>
        <p>{{count}}</p>
        <button @click="getCount">count</button>
    </div>
</template>

<script>
    
    export default {
        data(){
            return {
                description:'',
                count:0,
            }
        },
        created() {
            this.getDesc()
        },
        methods:{
            getDesc(){
                this.description=this.$store.state.description
            },
            getCount(){
                // this.$store.commit('increment')
                // this.count=this.$store.state.count
                
                this.$store.dispatch('increment',10)
                this.count=this.$store.state.count
                console.log(this.count)
            }
        }
    }
</script>

<style>
</style>
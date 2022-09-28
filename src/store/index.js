import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      name:"hello",
      description:"飞一样的susie..",
      count:0
  },
  getters: {
  },
  mutations: {
      increment(state){
          state.count++
      },
      increment(state,n){
          state.count=state.count+n
      },
      
  },
  actions: {
      increment(context,playhold){
          context.commit('increment',playhold)
      }
  },
  modules: {
  }
})
